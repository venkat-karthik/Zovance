import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import BookingModal from './BookingModal';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Our Story' },
  { to: '/services', label: 'What We Do' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function WebsiteNav({ onOurStoryClick, theme = 'light' }) {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const isDark = theme === 'dark';

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
          padding: scrolled ? '10px 16px' : '16px 20px',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: scrolled ? 1040 : 1200,
            height: scrolled ? 54 : 62,
            borderRadius: 9999,
            background: isDark
              ? 'rgba(6, 14, 23, 0.85)'
              : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: isDark
              ? '1px solid rgba(0, 240, 255, 0.25)'
              : '1px solid rgba(220, 233, 238, 0.85)',
            boxShadow: isDark
              ? '0 12px 30px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 240, 255, 0.1) inset'
              : scrolled
              ? '0 12px 30px -10px rgba(16, 44, 66, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.6) inset'
              : '0 6px 20px -6px rgba(16, 44, 66, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 clamp(14px, 2.5vw, 24px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: 'linear-gradient(135deg, #102C42 0%, #193A54 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(16, 44, 66, 0.18)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                  color: isDark ? '#FFFFFF' : '#102C42',
                  lineHeight: 1,
                }}
              >
                ZOVANCE
              </span>
              <span
                className="hidden xl:inline-block"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: isDark ? '#00f0ff' : '#38A85B',
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
              gap: 4,
              background: isDark ? 'rgba(10, 24, 38, 0.7)' : 'rgba(242, 250, 253, 0.75)',
              padding: '4px',
              borderRadius: 9999,
              border: isDark ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid rgba(220, 233, 238, 0.7)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.to;

              const handleClick = (e) => {
                if (link.to === '/about' && onOurStoryClick) {
                  e.preventDefault();
                  onOurStoryClick();
                }
              };

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleClick}
                  style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    color: isActive
                      ? (isDark ? '#00f0ff' : '#102C42')
                      : (isDark ? '#8FD3F4' : '#526673'),
                    padding: '6px 16px',
                    borderRadius: 9999,
                    background: isActive
                      ? (isDark ? 'rgba(0, 240, 255, 0.15)' : '#FFFFFF')
                      : 'transparent',
                    boxShadow: isActive
                      ? (isDark ? '0 0 12px rgba(0, 240, 255, 0.2)' : '0 2px 8px rgba(16, 44, 66, 0.08)')
                      : 'none',
                    border: isActive && isDark ? '1px solid rgba(0, 240, 255, 0.35)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark ? '#FFFFFF' : '#102C42';
                      e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark ? '#8FD3F4' : '#526673';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <Link
              to="/contact"
              style={{
                background: isDark ? 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 100%)' : '#102C42',
                color: isDark ? '#060e17' : '#FFFFFF',
                borderRadius: 9999,
                padding: '7px clamp(12px, 2.5vw, 18px)',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: isDark ? '0 0 20px rgba(0, 240, 255, 0.4)' : '0 4px 12px rgba(16, 44, 66, 0.16)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1.5px)';
                if (isDark) {
                  e.currentTarget.style.boxShadow = '0 0 28px rgba(0, 240, 255, 0.6)';
                } else {
                  e.currentTarget.style.background = '#193A54';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(56, 168, 91, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                if (isDark) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.4)';
                } else {
                  e.currentTarget.style.background = '#102C42';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 44, 66, 0.16)';
                }
              }}
            >
              <span>Let's Connect</span>
              <ArrowRight size={13} className="hidden sm:inline-block" color={isDark ? '#060e17' : '#FFFFFF'} />
            </Link>

            {/* Mobile Hamburger Menu Toggle - strictly hidden on desktop md+ */}
            <button
              onClick={() => setOpen(!open)}
              className="flex md:hidden"
              aria-label="Toggle Navigation"
              style={{
                background: isDark ? 'rgba(10, 24, 38, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                border: isDark ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid #DCE9EE',
                borderRadius: 9999,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                color: isDark ? '#00f0ff' : '#102C42',
                cursor: 'pointer',
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
            background: isDark ? 'rgba(2, 7, 12, 0.75)' : 'rgba(16, 44, 66, 0.3)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '84px 20px 24px',
          }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: isDark ? '#060e17' : '#FFFFFF',
              borderRadius: 24,
              border: isDark ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid #DCE9EE',
              padding: '20px',
              boxShadow: isDark ? '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.15)' : '0 20px 40px rgba(16, 44, 66, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => {
                  setOpen(false);
                  if (link.to === '/about' && onOurStoryClick) {
                    e.preventDefault();
                    onOurStoryClick();
                  }
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: pathname === link.to
                    ? (isDark ? '#00f0ff' : '#38A85B')
                    : (isDark ? '#DCE9EE' : '#102C42'),
                  background: pathname === link.to
                    ? (isDark ? 'rgba(0, 240, 255, 0.12)' : '#F2FAFD')
                    : 'transparent',
                  border: pathname === link.to && isDark ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ paddingTop: 10, borderTop: isDark ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid #DCE9EE' }}>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                style={{
                  background: isDark ? 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 100%)' : '#102C42',
                  color: isDark ? '#060e17' : '#FFFFFF',
                  borderRadius: 9999,
                  padding: '12px 20px',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: isDark ? '0 0 20px rgba(0, 240, 255, 0.4)' : 'none',
                }}
              >
                <span>Let's Connect</span>
                <ArrowRight size={14} color={isDark ? '#060e17' : '#FFFFFF'} />
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
