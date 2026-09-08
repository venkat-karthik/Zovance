import { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import BookingModal from './BookingModal';
import { useStore } from '../store/useStore';

export default function ClosingCtaBanner({ onBookCall }) {
  const [internalBookingOpen, setInternalBookingOpen] = useState(false);
  const { darkMode } = useStore();

  const handleBook = () => {
    if (onBookCall) {
      onBookCall();
    } else {
      setInternalBookingOpen(true);
    }
  };

  return (
    <>
      {/* ================= CLOSING CTA BANNER ================= */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto 60px',
        padding: '0 clamp(16px, 4vw, 36px)',
      }}>
        <div style={{
          position: 'relative',
          borderRadius: 32,
          overflow: 'hidden',
          minHeight: 380,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(40px, 6vw, 64px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        }}>
          {/* Background Image with Warm Soft Overlay */}
          <img
            src="/mountain-cta.jpg"
            alt="Mountain sunrise horizon"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: darkMode
              ? 'linear-gradient(90deg, rgba(11, 15, 25, 0.95) 0%, rgba(11, 15, 25, 0.8) 50%, rgba(11, 15, 25, 0.45) 100%)'
              : 'linear-gradient(90deg, rgba(251, 251, 249, 0.95) 0%, rgba(251, 251, 249, 0.75) 50%, rgba(251, 251, 249, 0.4) 100%)',
            zIndex: 1,
          }} />

          {/* Content Left */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 560 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: darkMode ? '#94A3B8' : '#64748B', textTransform: 'uppercase', marginBottom: 16 }}>
              LET'S BUILD TOGETHER
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: darkMode ? '#F8FAFC' : '#0F172A',
              marginBottom: 20,
            }}>
              A more efficient<br />
              tomorrow starts <span className="text-terracotta font-serif" style={{ fontStyle: 'italic' }}>today.</span>
            </h2>

            <p style={{ fontSize: 16, color: darkMode ? '#CBD5E1' : '#475569', lineHeight: 1.6, marginBottom: 32 }}>
              Tell us about your project — we'll help you turn it into a scalable, future-ready solution.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <button
                className="btn-dark-pill"
                onClick={handleBook}
              >
                <span>Book a Call</span>
                <ArrowRight size={16} />
              </button>

              <button
                className="btn-white-pill"
                onClick={() => window.open('https://wa.me/918309827125', '_blank')}
              >
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}>
                  <MessageCircle size={12} />
                </div>
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Tagline Right */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'right',
            color: darkMode ? '#94A3B8' : '#64748B',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.18em',
            lineHeight: 1.6,
          }} className="hidden md:block">
            SAME<br />
            PEOPLE.<br />
            BIGGER<br />
            TOMORROWS.
          </div>

        </div>
      </section>

      {!onBookCall && (
        <BookingModal isOpen={internalBookingOpen} onClose={() => setInternalBookingOpen(false)} />
      )}
    </>
  );
}
