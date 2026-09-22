import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import BookingModal from './BookingModal';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Our Story' },
  { to: '/services', label: 'What We Do' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function WebsiteNav() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          display: 'flex',
          justifyContent: 'center',
          padding: scrolled ? '12px 16px' : '20px 24px',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: scrolled ? 1040 : 1240,
            height: scrolled ? 58 : 66,
            borderRadius: 9999,
            background: scrolled
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(220, 233, 238, 0.85)',
            boxShadow: scrolled
              ? '0 16px 36px -10px rgba(16, 44, 66, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.6) inset'
              : '0 8px 24px -6px rgba(16, 44, 66, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 clamp(16px, 3vw, 28px)',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Logo with curved badge and pulse dot */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #102C42 0%, #193A54 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(16, 44, 66, 0.2)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20L10 18H20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="18" cy="18" r="2.5" fill="#38A85B" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: '-0.03em',
                  color: '#102C42',
                  lineHeight: 1,
                }}
              >
                ZOVANCE
              </span>
              <span
                className="hidden lg:inline-block"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: '#38A85B',
                  textTransform: 'uppercase',
                }}
              >
                &bull; People. Ideas. Impact.
              </span>
            </div>
          </Link>

          {/* Center curved pill navigation */}
          <nav
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              gap: 6,
              background: 'rgba(242, 250, 253, 0.7)',
              padding: '4px 6px',
              borderRadius: 9999,
              border: '1px solid rgba(220, 233, 238, 0.6)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    color: isActive ? '#102C42' : '#526673',
                    padding: '7px 16px',
                    borderRadius: 9999,
                    background: isActive ? '#FFFFFF' : 'transparent',
                    boxShadow: isActive ? '0 2px 8px rgba(16, 44, 66, 0.08)' : 'none',
                    transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#102C42';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#526673';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA Button with dynamic curve */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              to="/contact"
              className="hidden sm:inline-flex"
              style={{
                background: '#102C42',
                color: '#FFFFFF',
                borderRadius: 9999,
                padding: '9px 20px',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                boxShadow: '0 4px 14px rgba(16, 44, 66, 0.18)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1.5px)';
                e.currentTarget.style.background = '#193A54';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(56, 168, 91, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#102C42';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 44, 66, 0.18)';
              }}
            >
              <span>Let's Connect</span>
              <ArrowRight size={13} />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden"
              aria-label="Toggle Navigation"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #DCE9EE',
                borderRadius: 9999,
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#102C42',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(16, 44, 66, 0.05)',
              }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Dropdown Drawer */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 55,
            background: 'rgba(16, 44, 66, 0.3)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '90px 20px 24px',
          }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: 28,
              border: '1px solid #DCE9EE',
              padding: '24px 20px',
              boxShadow: '0 24px 48px rgba(16, 44, 66, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                style={{
                  padding: '12px 18px',
                  borderRadius: 16,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: pathname === link.to ? '#38A85B' : '#102C42',
                  background: pathname === link.to ? '#F2FAFD' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ paddingTop: 12, borderTop: '1px solid #DCE9EE' }}>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                style={{
                  background: '#102C42',
                  color: '#FFFFFF',
                  borderRadius: 9999,
                  padding: '13px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <span>Let's Connect</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
