import { useState } from 'react';
import { ArrowRight, CheckCircle2, Users, Target, Shield, Heart, Sparkles } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import ClosingCtaBanner from '../../components/ClosingCtaBanner';

const values = [
  {
    title: 'No Corporate BS',
    desc: 'We speak plain English, move fast, and build actual working systems rather than presenting 80-page decks.',
    icon: Target,
  },
  {
    title: 'Result-Driven ROI',
    desc: 'Every workflow and line of code we ship is measured by time saved, error reduction, or direct revenue growth.',
    icon: Sparkles,
  },
  {
    title: 'Full Code Ownership',
    desc: 'You own 100% of your platform, code repositories, and automation blueprints. No vendor lock-in ever.',
    icon: Shield,
  },
  {
    title: 'Continuous Innovation',
    desc: 'We obsessively test the latest AI model updates, voice APIs, and autonomous agent frameworks so you stay ahead.',
    icon: Users,
  },
];

export default function AboutPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FBFBF9', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Hero Header */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(50px, 8vw, 90px) clamp(16px, 4vw, 36px) clamp(30px, 4vw, 50px)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#64748B', textTransform: 'uppercase', marginBottom: 16 }}>
          OUR MISSION & STORY
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#0F172A',
          lineHeight: 1.05,
          marginBottom: 24,
        }}>
          Student-Built AI For<br />
          <span className="impact-gradient font-serif" style={{ fontStyle: 'italic' }}>Real Business Impact</span>
        </h1>
        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#475569',
          maxWidth: 640,
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          Zovance started as a collective of passionate software engineers and builders obsessed with artificial intelligence. Today, we architect autonomous AI pipelines for forward-thinking brands across India & SEA.
        </p>

        <button
          className="btn-dark-pill"
          onClick={() => setBookingOpen(true)}
        >
          <span>Meet Our Engineering Team</span>
          <ArrowRight size={16} />
        </button>
      </section>

      {/* Values Grid */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 36px) clamp(60px, 8vw, 100px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#64748B', textTransform: 'uppercase', marginBottom: 12 }}>
            OUR GUIDING PRINCIPLES
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#0F172A' }}>
            How We Work & Deliver
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {values.map((v) => (
            <div
              key={v.title}
              style={{
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: 24,
                padding: 32,
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: '#F1F5F9',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <v.icon size={22} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>
                {v.title}
              </h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ClosingCtaBanner onBookCall={() => setBookingOpen(true)} />
      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
