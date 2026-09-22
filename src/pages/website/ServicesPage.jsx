import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Phone, Layers, Workflow, ShieldCheck } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';

export default function ServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(120px, 14vw, 150px) clamp(20px, 5vw, 64px) clamp(40px, 5vw, 60px)',
        textAlign: 'center',
      }}>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: '#38A85B',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 16,
        }}>
          WHAT WE DO
        </span>

        <h1 style={{
          fontSize: 'clamp(36px, 5.5vw, 68px)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          color: '#102C42',
          lineHeight: 1.1,
          marginBottom: 24,
          maxWidth: 820,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Turning Ideas Into Real Change.
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)',
          color: '#526673',
          maxWidth: 680,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          We build technology, products and intelligent systems that help businesses work smarter and communicate better.
        </p>
      </section>

      {/* Visual Storytelling Areas (NOT a feature table) */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 10vw, 120px)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {/* Area 1: AI & Automation */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
            padding: 'clamp(32px, 5vw, 56px)',
            borderRadius: 32,
            background: '#F2FAFD',
            border: '1px solid #DCE9EE',
          }}>
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
              <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                CAPABILITY 01
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#102C42', marginBottom: 16 }}>
                AI & Automation
              </h2>
              <p style={{ fontSize: 16, color: '#526673', lineHeight: 1.7, marginBottom: 24 }}>
                Intelligent systems that reduce repetitive work and improve business operations. We connect disparate data, eliminate manual entry, and trigger instant automated decisions with 100% precision.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {['Direct CRM, accounting, and database synchronization', 'Automated document and invoice data extraction', 'Real-time multi-channel lead routing & notifications'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#102C42' }}>
                    <CheckCircle2 size={16} color="#38A85B" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-zovance-primary">
                <span>Discuss Automation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
              <div className="editorial-media-frame" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80"
                  alt="Modern architectural structure and interconnected systems"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="media-dark-overlay" />
              </div>
            </div>
          </div>

          {/* Area 2: Voice AI */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
            padding: 'clamp(32px, 5vw, 56px)',
            borderRadius: 32,
            background: '#FFFFFF',
            border: '1px solid #DCE9EE',
          }}>
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6 order-2 lg:order-1">
              <div className="editorial-media-frame" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80"
                  alt="Voice AI conversation and customer relationship"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="media-dark-overlay" />
              </div>
            </div>
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6 order-1 lg:order-2">
              <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                CAPABILITY 02
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#102C42', marginBottom: 16 }}>
                Voice AI
              </h2>
              <p style={{ fontSize: 16, color: '#526673', lineHeight: 1.7, marginBottom: 24 }}>
                Natural AI-powered conversations for customer support, sales, and business communication. Our voice agents speak fluently, handle inbound inquiries 24/7, and book appointments directly into your calendar.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {['Human-like conversational fluency in multiple languages', 'Instant Google Calendar and CRM calendar sync', 'Automatic call transcription, summarization, and sentiment logging'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#102C42' }}>
                    <CheckCircle2 size={16} color="#38A85B" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-zovance-primary">
                <span>Explore Voice AI</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Area 3: Business Systems & Engineering */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
            padding: 'clamp(32px, 5vw, 56px)',
            borderRadius: 32,
            background: '#F2FAFD',
            border: '1px solid #DCE9EE',
          }}>
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
              <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                CAPABILITY 03
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#102C42', marginBottom: 16 }}>
                Connected Business Systems
              </h2>
              <p style={{ fontSize: 16, color: '#526673', lineHeight: 1.7, marginBottom: 24 }}>
                Digital platforms that connect people, processes, and information. We build ultra-fast web architectures, internal operation hubs, and bespoke customer portals engineered for performance and longevity.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {['Sub-second load times engineered with React and modern APIs', 'Clean modular architecture with 100% client code ownership', 'Secure payments, custom auth, and enterprise data security'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#102C42' }}>
                    <CheckCircle2 size={16} color="#38A85B" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-zovance-primary">
                <span>Build a System</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
              <div className="editorial-media-frame" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80"
                  alt="Connected business software system engineering"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="media-dark-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 64px)',
        textAlign: 'center',
        background: '#FFFFFF',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 50px)', fontWeight: 800, color: '#102C42', marginBottom: 20 }}>
            Let's build something meaningful.
          </h2>
          <p style={{ fontSize: 16, color: '#526673', lineHeight: 1.6, marginBottom: 36 }}>
            Tell us about your team's operational goals and let's craft the solution together.
          </p>
          <Link to="/contact" className="btn-zovance-green" style={{ fontSize: 15, padding: '14px 32px' }}>
            <span>Let's Connect</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
