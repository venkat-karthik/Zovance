import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// List of authorized admin emails
const AUTHORIZED_ADMINS = [
  'karthikvenkat316@gmail.com',
  'velfound1@gmail.com',
  'zovance1@gmail.com',
  'zovance6@gmail.com',
  'akshath.tumkur@velfound.com',
  'akshath.tumkur@zovance.com',
  'sahil.ranakoti@velfound.com',
  'sahil.ranakoti@zovance.com',
  'jayanth.karthik@velfound.com',
  'jayanth.karthik@zovance.com',
  'vikas.reddy@velfound.com',
  'vikas.reddy@zovance.com',
  'nishanth.konakondu@velfound.com',
  'nishanth.konakondu@zovance.com',
  'varshith@velfound.com',
  'varshith@zovance.com',
  'gudipati.srinadh@velfound.com',
  'gudipati.srinadh@zovance.com',
];

export const adminAuthService = {
  // Sign in with Google
  async signInWithGoogle() {
    try {
      console.log('Starting Google Sign-In...');
      
      // Set persistence
      await setPersistence(auth, browserLocalPersistence);
      
      console.log('Attempting popup sign-in...');
      const result = await Promise.race([
        signInWithPopup(auth, googleProvider),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Sign-in timeout. Please try again.')), 30000)
        )
      ]);
      
      const user = result.user;
      const email = (user.email || '').toLowerCase().trim();

      console.log('User signed in:', email);

      // Check if user is authorized admin (case-insensitive)
      const normalizedAdmins = AUTHORIZED_ADMINS.map(e => e.toLowerCase().trim());
      if (!normalizedAdmins.includes(email)) {
        console.warn('Unauthorized admin attempt:', email);
        // Sign out unauthorized user
        await signOut(auth);
        throw new Error(`Access Denied: The email "${email}" is not authorized to access the Admin Dashboard.`);
      }

      console.log('User authorized, checking admin profile...');

      // Attempt to get or create admin user document in Firestore without blocking sign-in
      try {
        const adminDocRef = doc(db, 'admins', user.uid);
        const adminDocSnap = await getDoc(adminDocRef);

        if (!adminDocSnap.exists()) {
          console.log('Creating new admin document...');
          await setDoc(adminDocRef, {
            uid: user.uid,
            email: user.email,
            name: user.displayName || 'Admin',
            photoURL: user.photoURL,
            role: 'admin',
            accessLevel: 'founder',
            active: true,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
          });
        } else {
          console.log('Updating existing admin document...');
          await setDoc(
            adminDocRef,
            { lastLogin: serverTimestamp() },
            { merge: true }
          );
        }
      } catch (firestoreErr) {
        // Log warning but DO NOT crash sign-in if Firestore security rules deny writes to /admins
        console.warn('Firestore admin profile sync skipped (security rules):', firestoreErr.message);
      }

      console.log('Admin sign-in successful');
      return user;
    } catch (error) {
      console.error('Admin sign in error:', error);
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Listen to auth state
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = (user.email || '').toLowerCase().trim();
        const normalizedAdmins = AUTHORIZED_ADMINS.map(e => e.toLowerCase().trim());
        
        // Fast-path: Check whitelist directly first
        if (!normalizedAdmins.includes(email)) {
          console.warn('Unauthorized user in onAuthStateChanged:', email);
          await signOut(auth);
          callback(null);
          return;
        }

        try {
          // Attempt to get additional profile data from Firestore
          const adminDocRef = doc(db, 'admins', user.uid);
          const adminDocSnap = await getDoc(adminDocRef);
          
          if (adminDocSnap.exists()) {
            const adminData = adminDocSnap.data();
            callback({ ...user, ...adminData });
            return;
          }
        } catch (error) {
          console.warn('Firestore read in onAuthStateChanged skipped (security rules):', error.message);
        }

        // Whitelisted admin: always grant access with founder role
        callback({
          ...user,
          role: 'admin',
          accessLevel: 'founder',
          name: user.displayName || 'Admin',
        });
      } else {
        callback(null);
      }
    });
  },

  // Get admin data from Firestore
  async getAdminData(uid) {
    try {
      const adminDocRef = doc(db, 'admins', uid);
      const adminDocSnap = await getDoc(adminDocRef);
      return adminDocSnap.exists() ? adminDocSnap.data() : null;
    } catch (error) {
      console.error('Error getting admin data:', error);
      throw error;
    }
  },

  // Check if user is authorized admin
  isAuthorizedAdmin(email) {
    return AUTHORIZED_ADMINS.includes(email);
  },

  // Add authorized admin (only for existing admins)
  async addAuthorizedAdmin(email) {
    // This should only be called by existing admins
    if (!AUTHORIZED_ADMINS.includes(email)) {
      AUTHORIZED_ADMINS.push(email);
    }
  },
};
