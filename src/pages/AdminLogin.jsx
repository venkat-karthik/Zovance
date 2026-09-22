import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { AlertCircle, Loader } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { signInWithGoogle, loading, error } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setLocalError(null);
      console.log('Login page: Starting sign-in');
      await signInWithGoogle();
      console.log('Login page: Sign-in successful, navigating to dashboard');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login page: Sign-in error:', err);
      const errorMsg = err.message || 'Failed to sign in. Please check your email and try again.';
      setLocalError(errorMsg);
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#F2FAFD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader size={32} color="#102C42" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#526673', fontWeight: 500 }}>Initializing administrative portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F2FAFD', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px, 4vw, 24px)' }}>
      <div style={{
        width: 'calc(100% - 8px)',
        maxWidth: '440px',
        margin: '0 auto',
        background: '#FFFFFF',
        border: '1px solid #DCE9EE',
        borderRadius: 24,
        padding: ' clamp(24px, 5vw, 40px)',
        boxShadow: '0 20px 40px -15px rgba(16, 44, 66, 0.08)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#102C42', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 22 }}>
              Z
            </div>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px', color: '#102C42' }}>
              Zovance<span style={{ color: '#38A85B' }}>.</span>
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 5vw, 26px)', fontWeight: 800, color: '#102C42', marginBottom: 8, letterSpacing: '-0.5px' }}>
            Enterprise Console
          </h1>
          <p style={{ color: '#526673', fontSize: 13, lineHeight: 1.5 }}>
            Authenticate with your authorized corporate Google account to access operational tools.
          </p>
        </div>

        {/* Error Message */}
        {(error || localError) && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 12, padding: 14, marginBottom: 20, display: 'flex', gap: 12 }}>
            <AlertCircle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#991B1B', marginBottom: 2 }}>Access Restricted</p>
              <p style={{ fontSize: 12, color: '#B91C1C', lineHeight: 1.5 }}>
                {error || localError}
              </p>
            </div>
          </div>
        )}

        {/* Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="safe-touch-target"
          style={{
            width: '100%',
            background: '#102C42',
            color: '#FFFFFF',
            fontWeight: 600,
            border: 'none',
            borderRadius: 999,
            padding: '14px 20px',
            fontSize: 14,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isLoading ? 0.7 : 1,
            boxShadow: '0 4px 14px rgba(16, 44, 66, 0.15)'
          }}
          onMouseEnter={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-1px)', e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 44, 66, 0.25)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 44, 66, 0.15)')}
        >
          {isLoading ? (
            <>
              <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Authenticating Credentials...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Sign in with Corporate Google
            </>
          )}
        </button>

        {/* Info Box */}
        <div style={{ background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 14, padding: 14, marginTop: 24 }}>
          <p style={{ fontSize: 12, color: '#526673', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: '#102C42' }}>Restricted Portal:</strong> Access is guarded by Google OAuth whitelist (@zovance.com & @velfound.com corporate credentials).
          </p>
        </div>

        {/* Back to Website */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="/" className="safe-touch-target" style={{ color: '#526673', fontSize: 13, textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            ← Back to Public Website
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
