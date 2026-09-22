import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';

export default function AboutPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Hero Header */}
      <section className="animate-fade-up" style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(120px, 14vw, 150px) clamp(20px, 5vw, 64px) clamp(40px, 5vw, 60px)',
        textAlign: 'center',
      }}>
        <span className="shimmer-badge animate-levitate" style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: '#38A85B',
          textTransform: 'uppercase',
          display: 'inline-block',
          marginBottom: 16,
          padding: '6px 16px',
          borderRadius: 9999,
          border: '1px solid #DCE9EE',
          boxShadow: '0 2px 10px rgba(56, 168, 91, 0.12)',
        }}>
          OUR STORY
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
          Technology that works with people, for people.
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)',
          color: '#526673',
          maxWidth: 680,
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Zovance is building intelligent automation and AI-powered systems that help businesses work smarter and communicate better. We are driven by curiosity, guided by people, and focused on long-term impact.
        </p>
      </section>

      {/* Cinematic Banner */}
      <div className="animate-scale-in delay-200" style={{ maxWidth: 1320, margin: '0 auto 80px', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div className="editorial-media-frame" style={{ aspectRatio: '21/9', minHeight: 'clamp(200px, 30vw, 360px)' }}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80"
            alt="Zovance team collaborating in light-filled modern environment"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="media-dark-overlay" />
        </div>
      </div>

      {/* Chronological Story Timeline */}
      <section style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 10vw, 120px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#38A85B', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
            THE JOURNEY
          </span>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: '#102C42' }}>
            How We Got Here
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48, position: 'relative' }}>
          {[
            {
              phase: 'The Beginning',
              year: '2023',
              title: 'A Simple Question',
              text: 'Why do modern teams spend thousands of hours performing repetitive clerical work when intelligent software exists? We began experimenting with conversational voice models and autonomous workflows to see how much burden we could lift from human shoulders.',
            },
            {
              phase: 'The Idea',
              year: '2024',
              title: 'Systems Over Software',
              text: 'We realized that off-the-shelf software often creates more silos. Businesses do not need another bloated dashboard; they need integrated systems where voice, messaging, CRMs, and APIs speak to one another seamlessly.',
            },
            {
              phase: 'The First Systems',
              year: '2025',
              title: 'Real-World Momentum',
              text: 'From luxury resorts in hospitality to high-volume healthcare practices, our autonomous booking engines and multilingual voice callers began handling hundreds of calls and reservations daily without a single drop.',
            },
            {
              phase: 'Today & What’s Next',
              year: 'Present',
              title: 'Building for the Next Decade',
              text: 'Today, Zovance architects mission-critical digital platforms and automation for forward-thinking enterprises across India and Southeast Asia. We are just getting started.',
            },
          ].map((step, idx) => (
            <div
              key={step.phase}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 28,
                padding: '36px clamp(20px, 4vw, 36px)',
                borderRadius: 24,
                background: idx % 2 === 0 ? '#F2FAFD' : '#FFFFFF',
                border: '1px solid #DCE9EE',
              }}
            >
              <div style={{ gridColumn: 'span 12 / span 12' }} className="sm:col-span-4">
                <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {step.phase}
                </span>
                <p style={{ fontSize: 28, fontWeight: 800, color: '#102C42', marginTop: 4 }}>
                  {step.year}
                </p>
              </div>
              <div style={{ gridColumn: 'span 12 / span 12' }} className="sm:col-span-8">
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#102C42', marginBottom: 10 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, color: '#526673', lineHeight: 1.7 }}>
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Principles */}
      <section style={{
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
        borderBottom: '1px solid #DCE9EE',
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 54 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#38A85B', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
              OUR FOUNDATION
            </span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, color: '#102C42' }}>
              Our Guiding Principles
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                title: 'People First',
                desc: 'Technology must enrich human potential, dignity, and relationship-building.',
                icon: HeartHandshake,
              },
              {
                title: 'Meaningful Innovation',
                desc: 'We engineer solutions that solve measurable operational friction, not vanity metrics.',
                icon: Sparkles,
              },
              {
                title: 'Long-term Thinking',
                desc: 'Clean, maintainable architectures built to last and scale without fragile lock-in.',
                icon: ShieldCheck,
              },
              {
                title: 'Responsible Technology',
                desc: 'Respecting user privacy, security, and honest communication at every layer.',
                icon: Compass,
              },
            ].map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 24,
                    padding: 32,
                    border: '1px solid #DCE9EE',
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#F2FAFD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38A85B',
                    marginBottom: 20,
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#102C42', marginBottom: 10 }}>
                    {principle.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6 }}>
                    {principle.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Bottom CTA */}
      <section style={{
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 64px)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 50px)', fontWeight: 800, color: '#102C42', marginBottom: 20 }}>
            Let's build a better tomorrow.
          </h2>
          <p style={{ fontSize: 16, color: '#526673', lineHeight: 1.6, marginBottom: 36 }}>
            Connect with us to explore what intelligent systems can do for your business.
          </p>
          <Link to="/contact" className="btn-zovance-primary">
            <span>Let's Connect</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
