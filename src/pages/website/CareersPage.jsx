import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, HeartHandshake, Sparkles, Compass } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';

export default function CareersPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(64px, 8vw, 100px) clamp(20px, 5vw, 64px) clamp(40px, 5vw, 60px)',
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
          CAREERS AT ZOVANCE
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
          Great people build extraordinary things.
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)',
          color: '#526673',
          maxWidth: 640,
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Work with people who care deeply about technology, ideas and meaningful impact. We are always looking for curious minds, thoughtful engineers, and genuine builders.
        </p>
      </section>

      {/* Workspace Visual Banner */}
      <div style={{ maxWidth: 1320, margin: '0 auto 80px', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div className="editorial-media-frame" style={{ aspectRatio: '21/9', minHeight: 320 }}>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80"
            alt="Modern architectural Zovance workspace filled with light"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="media-dark-overlay" />
        </div>
      </div>

      {/* Culture and Values */}
      <section style={{
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
        borderBottom: '1px solid #DCE9EE',
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 54 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#38A85B', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
              LIFE AT ZOVANCE
            </span>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 800, color: '#102C42' }}>
              Why Build With Us
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                title: 'Autonomy & Ownership',
                desc: 'Every team member has direct ownership over what they architect. No red tape, no endless approval chains.',
                icon: Compass,
              },
              {
                title: 'High Craftsmanship',
                desc: 'We pride ourselves on elegant code, crisp design, and systems that feel calm, durable, and reliable.',
                icon: Sparkles,
              },
              {
                title: 'Human-Centered Culture',
                desc: 'We care about your well-being, rest, and growth just as much as we care about customer impact.',
                icon: HeartHandshake,
              },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 24,
                    padding: 36,
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
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: '#102C42', marginBottom: 10 }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6 }}>
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Opportunities */}
      <section style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 54 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#38A85B', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
            JOIN US
          </span>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: '#102C42' }}>
            Current Openings
          </h2>
          <p style={{ fontSize: 16, color: '#526673', marginTop: 12 }}>
            Explore available opportunities to shape the future of intelligent business systems.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              role: 'Full-Stack Systems Engineer',
              department: 'Engineering',
              location: 'Remote / India',
              type: 'Full-Time',
            },
            {
              role: 'AI & Voice Systems Architect',
              department: 'Applied AI',
              location: 'Remote / India',
              type: 'Full-Time',
            },
            {
              role: 'Product Designer (UI / UX / Motion)',
              department: 'Design',
              location: 'Remote',
              type: 'Full-Time',
            },
          ].map((job) => (
            <div
              key={job.role}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
                padding: '24px 28px',
                borderRadius: 20,
                border: '1px solid #DCE9EE',
                background: '#FFFFFF',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#38A85B';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,44,66,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#DCE9EE';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>
                  {job.role}
                </h3>
                <div style={{ display: 'flex', gap: 14, fontSize: 13, color: '#526673' }}>
                  <span>{job.department}</span>
                  <span>&bull;</span>
                  <span>{job.location}</span>
                  <span>&bull;</span>
                  <span>{job.type}</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="btn-zovance-ghost"
                style={{ fontSize: 13, padding: '8px 18px' }}
              >
                <span>Apply Now</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Bottom CTA */}
      <section style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 64px)',
        textAlign: 'center',
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#102C42', marginBottom: 16 }}>
            Don't see your role?
          </h2>
          <p style={{ fontSize: 16, color: '#526673', lineHeight: 1.6, marginBottom: 32 }}>
            We are always interested in connecting with passionate builders. Send us a message telling us what you love creating.
          </p>
          <Link to="/contact" className="btn-zovance-primary">
            <span>Send An Open Application</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
