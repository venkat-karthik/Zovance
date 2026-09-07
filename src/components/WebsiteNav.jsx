import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ArrowRight, Menu, X } from 'lucide-react';
import BookingModal from './BookingModal';
import WebsiteMobileNav from './WebsiteMobileNav';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Projects' }, // maps to projects showcase
  { to: '/solutions', label: 'Solutions' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
];

export default function WebsiteNav() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(251, 251, 249, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 36px)',
          height: 76,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo Brand */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            {/* Multi-color gradient dot icon */}
            <div style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #f43f5e, #fb7185 35%, #34d399 70%, #60a5fa 100%)',
              boxShadow: '0 4px 12px rgba(52, 211, 153, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffffff', opacity: 0.9 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.03em', color: '#0F172A', lineHeight: 1.1 }}>
                Zovance
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: '#64748B', marginTop: 1 }}>
                IDEAS &rarr; IMPACT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? '#0F172A' : '#475569',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#0F172A')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? '#0F172A' : '#475569')}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Search Round Button */}
            <button
              className="btn-search-round hidden sm:inline-flex"
              title="Search"
              onClick={() => alert('Search upcoming...')}
            >
              <Search size={18} />
            </button>

            {/* Book a Call Button */}
            <button
              className="btn-dark-pill hidden sm:inline-flex"
              onClick={() => setBookingOpen(true)}
            >
              <span>Book a Call</span>
              <ArrowRight size={16} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 9999,
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0F172A',
                cursor: 'pointer',
              }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Dropdown for Mobile View */}
        {open && (
          <div className="md:hidden" style={{
            background: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#0F172A',
                  textDecoration: 'none',
                  padding: '8px 0',
                }}
              >
                {link.label}
              </Link>
            ))}
            <button
              className="btn-dark-pill"
              onClick={() => { setBookingOpen(true); setOpen(false); }}
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
            >
              <span>Book a Call</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </nav>

      <WebsiteMobileNav onOpenBooking={() => setBookingOpen(true)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
