import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BookingModal from './BookingModal';
import WebsiteMobileNav from './WebsiteMobileNav';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function WebsiteNav() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <div className="desktop-only-ui">
        <nav style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(6, 6, 8, 0.85)', backdropFilter: blur('16px'), position: 'sticky', top: 0, zIndex: 40, transition: 'all 0.3s ease' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)', minHeight: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.png" alt="Zovance Logo" style={{ height: 42, width: 'auto', objectFit: 'contain', borderRadius: 8 }} />
          <span style={{ fontWeight: 800, fontSize: 'clamp(16px, 3vw, 20px)', letterSpacing: '-0.03em', color: '#ffffff' }}>Zovance<span style={{ color: '#f59e0b' }}>.</span></span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 6 }} className="hidden md:flex">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, textDecoration: 'none',
              color: pathname === l.to ? '#ffffff' : '#94a3b8',
              background: pathname === l.to ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              border: pathname === l.to ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button id="nav-cta-desktop" className="btn-gold" style={{ fontSize: 13, padding: '10px 24px' }} onClick={() => setBookingOpen(true)}>Book Discovery Call</button>
          <button data-mobile-menu-btn className="safe-touch-target" onClick={() => setOpen(!open)} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 8, padding: 8, color: '#f0f0f0', cursor: 'pointer', display: 'flex', alignItems: 'center', justify: 'center' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: '#0b0f19', padding: '16px clamp(16px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{
              padding: '12px 16px', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none',
              color: pathname === l.to ? '#38bdf8' : '#cbd5e1',
              background: pathname === l.to ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              border: pathname === l.to ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
            }}>
              {l.label}
            </Link>
          ))}
          <button onClick={() => { setBookingOpen(true); setOpen(false); }} className="btn-gold" style={{
            padding: '14px 16px', borderRadius: 10, fontSize: 14, fontWeight: 600,
            width: '100%',
            justifyContent: 'center',
            marginTop: 10,
          }}>
            Book Discovery Call
          </button>
        </div>
      )}

        </nav>
      </div>

      {/* Dedicated Mobile Phone Mode Navigation */}
      <WebsiteMobileNav onOpenBooking={() => setBookingOpen(true)} />

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
