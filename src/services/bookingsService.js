import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { sendBookingInquiryEmail } from './emailHelper';

const ADMIN_EMAIL = 'zovance6@gmail.com';

// Add a new booking and send email notification
export const addBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Send email notification via free frontend dispatch in background (non-blocking)
    sendBookingInquiryEmail(bookingData).catch(err => console.error('Background booking email failed:', err));

    return docRef.id;
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error;
  }
};

// Get all bookings
export const getBookings = async () => {
  try {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting bookings:', error);
    throw error;
  }
};

// Listen to bookings in real-time
export const listenToBookings = (callback) => {
  try {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const bookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(bookings);
    });
  } catch (error) {
    console.error('Error listening to bookings:', error);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status: status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

// Add notes to booking
export const addBookingNotes = async (bookingId, notes) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      notes: notes,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding notes:', error);
    throw error;
  }
};

// Delete booking
export const deleteBooking = async (bookingId) => {
  try {
    await deleteDoc(doc(db, 'bookings', bookingId));
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};

// Get booking by ID
export const getBookingById = async (bookingId) => {
  try {
    const docRef = doc(db, 'bookings', bookingId);
    const docSnap = await getDocs(collection(db, 'bookings'));
    const booking = docSnap.docs.find(d => d.id === bookingId);
    return booking ? { id: booking.id, ...booking.data() } : null;
  } catch (error) {
    console.error('Error getting booking:', error);
    throw error;
  }
};
