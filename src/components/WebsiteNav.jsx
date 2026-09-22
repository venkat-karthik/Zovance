import { useState } from 'react';
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

export default function WebsiteNav() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <header
        className="zovance-nav-floating"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          width: '100%',
        }}
      >
        <div style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 48px)',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo Brand: Original minimal wordmark in navy with subtle green accent */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#102C42',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20L10 18H20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="18" cy="18" r="2.5" fill="#38A85B" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{
                fontWeight: 800,
                fontSize: 20,
                letterSpacing: '-0.03em',
                color: '#102C42',
                lineHeight: 1,
              }}>
                ZOVANCE
              </span>
              <span className="hidden sm:inline-block" style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: '#526673',
              }}>
                People. Ideas. Impact.
              </span>
            </div>
          </Link>

          {/* Center minimal links */}
          <nav
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              gap: 32,
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    color: isActive ? '#102C42' : '#526673',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    padding: '6px 0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#102C42';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#526673';
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: '#38A85B',
                      borderRadius: 1,
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link
              to="/contact"
              className="hidden sm:inline-flex btn-zovance-primary"
              style={{
                fontSize: 13,
                padding: '10px 22px',
              }}
            >
              <span>Let's Connect</span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden"
              aria-label="Toggle Menu"
              style={{
                background: 'transparent',
                border: '1px solid #DCE9EE',
                borderRadius: 10,
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#102C42',
                cursor: 'pointer',
              }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div
            className="md:hidden"
            style={{
              background: '#FFFFFF',
              borderTop: '1px solid #DCE9EE',
              padding: '24px 20px 32px',
              boxShadow: '0 20px 30px rgba(16,44,66,0.06)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: pathname === link.to ? '#38A85B' : '#102C42',
                    textDecoration: 'none',
                    padding: '8px 0',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ paddingTop: 16, borderTop: '1px solid #DCE9EE' }}>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-zovance-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Let's Connect</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
