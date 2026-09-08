import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, Sun, Moon, Sparkles, ChevronRight } from 'lucide-react';
import BookingModal from './BookingModal';
import { useStore } from '../store/useStore';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/pricing', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
];

export default function WebsiteNav() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { pathname } = useLocation();
  const { darkMode, setDarkMode } = useStore();

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: darkMode ? 'rgba(8, 11, 19, 0.92)' : 'rgba(251, 251, 249, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 36px)',
          height: 84,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo Brand */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #3B82F6, #10B981 60%, #F59E0B 100%)',
              boxShadow: '0 6px 18px rgba(59, 130, 246, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffffff', opacity: 0.95 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: '-0.035em',
                color: darkMode ? '#F8FAFC' : '#0F172A',
                lineHeight: 1.1,
              }}>
                Zovance
              </span>
              <span style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: darkMode ? '#94A3B8' : '#64748B',
                marginTop: 2,
                textTransform: 'uppercase',
              }}>
                IDEAS &rarr; IMPACT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation: FLOATING CAPSULE ISLAND BAR */}
          <div
            className="hidden md:flex"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '5px 6px',
              borderRadius: 9999,
              background: darkMode
                ? 'rgba(15, 23, 42, 0.85)'
                : 'rgba(255, 255, 255, 0.9)',
              border: darkMode
                ? '1px solid rgba(255, 255, 255, 0.12)'
                : '1px solid #E2E8F0',
              boxShadow: darkMode
                ? '0 12px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 10px 28px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 20px',
                    borderRadius: 9999,
                    fontSize: 15,
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    color: isActive
                      ? '#ffffff'
                      : (darkMode ? '#CBD5E1' : '#334155'),
                    background: isActive
                      ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
                      : 'transparent',
                    boxShadow: isActive
                      ? '0 4px 16px rgba(37, 99, 235, 0.4)'
                      : 'none',
                    transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = darkMode
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(15, 23, 42, 0.06)';
                      e.currentTarget.style.color = darkMode ? '#F8FAFC' : '#0F172A';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = darkMode ? '#CBD5E1' : '#334155';
                      e.currentTarget.style.transform = 'none';
                    }
                  }}
                >
                  {isActive && (
                    <Sparkles size={13} color="#ffffff" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }} />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Theme Dark/Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: darkMode ? '#1E293B' : '#ffffff',
                border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: darkMode ? '#F59E0B' : '#475569',
                boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              {darkMode ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#475569" />}
            </button>

            {/* Book a Call Button */}
            <button
              className="btn-dark-pill hidden sm:inline-flex"
              onClick={() => setBookingOpen(true)}
              style={{
                padding: '11px 22px',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              <span>Book a Call</span>
              <ArrowRight size={16} />
            </button>

            {/* 3-Line Menu Toggle Button (Visible & Interactive on ALL Screens) */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: darkMode ? '#1E293B' : '#ffffff',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid #CBD5E1',
                borderRadius: 9999,
                width: 42,
                height: 42,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: darkMode ? '#F8FAFC' : '#0F172A',
                cursor: 'pointer',
                boxShadow: darkMode ? '0 4px 14px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Right Corner Enterprise Navigation Drawer Sheet (Z-Index 99999) */}
      {open && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.45)',
              zIndex: 99998,
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* Right Corner Slide-In Enterprise Sheet */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'clamp(290px, 85vw, 350px)',
              height: '100vh',
              overflowY: 'auto',
              background: darkMode ? '#0B0F17' : '#ffffff',
              borderLeft: darkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #E2E8F0',
              borderTopLeftRadius: 24,
              borderBottomLeftRadius: 24,
              padding: '24px 24px 32px',
              boxShadow: darkMode
                ? '-20px 0 60px rgba(0, 0, 0, 0.85)'
                : '-16px 0 48px rgba(15, 23, 42, 0.18)',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              animation: 'slideInFromRight 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div>
              {/* Header Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #F1F5F9', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #3B82F6, #10B981 60%, #F59E0B 100%)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffffff' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 800, fontSize: 18, color: darkMode ? '#F8FAFC' : '#0F172A', lineHeight: 1.1 }}>
                      Zovance
                    </span>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: darkMode ? '#94A3B8' : '#64748B', marginTop: 1 }}>
                      IDEAS &rarr; IMPACT
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: darkMode ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: darkMode ? '#F8FAFC' : '#0F172A',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Section Header Label */}
              <div style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: darkMode ? '#64748B' : '#94A3B8',
                textTransform: 'uppercase',
                marginBottom: 12,
                paddingLeft: 4,
              }}>
                Navigation
              </div>

              {/* Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {navLinks.map((link) => {
                  const isActive = pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        textDecoration: 'none',
                        color: isActive ? '#ffffff' : (darkMode ? '#CBD5E1' : '#334155'),
                        background: isActive
                          ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
                          : 'transparent',
                        padding: '11px 16px',
                        borderRadius: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        boxShadow: isActive ? '0 4px 14px rgba(37, 99, 235, 0.35)' : 'none',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} opacity={isActive ? 1 : 0.4} color={isActive ? '#ffffff' : (darkMode ? '#94A3B8' : '#64748B')} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div style={{ paddingTop: 16, borderTop: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                className="btn-dark-pill"
                onClick={() => { setOpen(false); setBookingOpen(true); }}
                style={{ width: '100%', justifyContent: 'center', padding: '13px 20px', fontSize: 14, fontWeight: 700 }}
              >
                <span>Book a Strategy Call</span>
                <ArrowRight size={16} />
              </button>

              {/* Theme Toggle Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 4px 0' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: darkMode ? '#94A3B8' : '#64748B' }}>Theme Mode</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: darkMode ? 'rgba(255,255,255,0.08)' : '#F1F5F9',
                    border: 'none',
                    borderRadius: 9999,
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                    color: darkMode ? '#F59E0B' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {darkMode ? <Sun size={14} color="#F59E0B" /> : <Moon size={14} color="#475569" />}
                  <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
