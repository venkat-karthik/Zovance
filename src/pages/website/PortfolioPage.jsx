import { useState } from 'react';
import { ArrowRight, ExternalLink, Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import { useStore } from '../../store/useStore';

export default function PortfolioPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { getPublishedProjects } = useStore();
  const projects = getPublishedProjects ? getPublishedProjects() : [];

  const defaultShowcase = [
    {
      id: 'eduprime',
      title: 'EduPrime LMS & Autonomous AI Tutor',
      category: 'Education & AI Automation',
      description: 'An intelligent learning management platform with automated AI grading, instant WhatsApp homework support, and personalized curriculum generation for 12,000+ students.',
      technologies: ['React', 'Node.js', 'OpenAI GPT-4', 'WhatsApp Business API', 'PostgreSQL'],
      metrics: [
        { label: 'Grading Time Reduced', value: '85%' },
        { label: 'Active Students', value: '12K+' },
        { label: 'Student Satisfaction', value: '98.4%' }
      ],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'finflow',
      title: 'FinFlow Autonomous Invoice & Bank OCR Pipeline',
      category: 'Fintech & Operations',
      description: 'End-to-end accounting automation parsing multi-currency PDF invoices, reconciling line items against live bank feeds, and auto-filing GST logs with zero human intervention.',
      technologies: ['Python OCR', 'Document AI', 'FastAPI', 'QuickBooks API', 'AWS Lambda'],
      metrics: [
        { label: 'Manual Processing Saved', value: '32 hrs/wk' },
        { label: 'Extraction Accuracy', value: '99.8%' },
        { label: 'Cost Reduction', value: '64%' }
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'voiceagent',
      title: 'Auris Multilingual Inbound Voice Receptionist',
      category: 'Voice AI & Real-time Telephony',
      description: 'Sub-400ms latency voice agent handling 400+ daily inbound patient appointment calls in English, Hindi, and Telugu, booking directly into Google Calendar with SMS reminders.',
      technologies: ['Vapi.ai', 'Retell AI', 'Twilio Trunking', 'OpenAI Whisper', 'HubSpot'],
      metrics: [
        { label: 'Call Wait Time', value: '0 sec' },
        { label: 'Missed Call Recovery', value: '100%' },
        { label: 'Annual Savings', value: '₹14.2L' }
      ],
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1200&auto=format&fit=crop&q=80'
    }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultShowcase;

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#102C42', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(120px, 14vw, 150px) clamp(20px, 5vw, 64px) clamp(40px, 5vw, 60px)',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: '#38A85B',
          textTransform: 'uppercase',
          marginBottom: 16,
          background: '#F2FAFD',
          border: '1px solid #DCE9EE',
          padding: '6px 16px',
          borderRadius: 9999,
        }}>
          <Sparkles size={14} color="#38A85B" />
          <span>PROVEN RESULTS</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 5.5vw, 68px)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          color: '#102C42',
          lineHeight: 1.1,
          marginBottom: 24,
          maxWidth: 860,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Work that transforms how companies operate.
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)',
          color: '#526673',
          maxWidth: 640,
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Real deployments. Verified metrics. Autonomous engineering systems custom-crafted for forward-thinking enterprises.
        </p>
      </section>

      {/* Projects Showcase */}
      <section style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 10vw, 120px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {displayProjects.map((p, idx) => (
            <div
              key={p.id || p.title}
              className="card-3d"
              style={{
                background: '#FFFFFF',
                border: '1px solid #DCE9EE',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(16, 44, 66, 0.04)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 540px), 1fr))',
              }}
            >
              {/* Media preview */}
              <div style={{
                position: 'relative',
                minHeight: 'clamp(240px, 32vw, 400px)',
                background: `url(${p.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80'}) center/cover no-repeat`,
                borderRight: '1px solid #DCE9EE',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(16,44,66,0.1) 0%, rgba(16,44,66,0.5) 100%)',
                }} />
                <div style={{ position: 'absolute', top: 20, left: 20 }}>
                  <span style={{
                    background: '#FFFFFF',
                    color: '#102C42',
                    border: '1px solid #DCE9EE',
                    padding: '6px 14px',
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 8px rgba(16,44,66,0.08)'
                  }}>
                    {p.category || 'Enterprise AI'}
                  </span>
                </div>
              </div>

              {/* Information body */}
              <div style={{
                padding: 'clamp(28px, 4vw, 44px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h2 style={{
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 800,
                    color: '#102C42',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    marginBottom: 14,
                  }}>
                    {p.title}
                  </h2>

                  <p style={{
                    color: '#526673',
                    fontSize: 'clamp(14px, 1.6vw, 15px)',
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}>
                    {p.description}
                  </p>

                  {/* Technologies */}
                  {p.technologies && p.technologies.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                      {p.technologies.map((t, i) => (
                        <span key={i} style={{
                          background: '#F2FAFD',
                          color: '#102C42',
                          border: '1px solid #DCE9EE',
                          padding: '4px 12px',
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 600,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Metrics row */}
                <div>
                  {p.metrics && p.metrics.length > 0 && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${p.metrics.length}, 1fr)`,
                      gap: 12,
                      paddingTop: 20,
                      borderTop: '1px solid #DCE9EE',
                      marginBottom: 20,
                    }}>
                      {p.metrics.map((m, i) => (
                        <div key={i}>
                          <div style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: '#38A85B', letterSpacing: '-0.02em' }}>
                            {m.value}
                          </div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: '#526673', marginTop: 2 }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setBookingOpen(true)}
                    className="btn-zovance-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 14 }}
                  >
                    <span>Request Custom Demo Like This</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Call to Action Banner */}
      <section style={{
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 64px)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#38A85B', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
            START YOUR TRANSFORMATION
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 800, color: '#102C42', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20 }}>
            Ready to build systems that give you your time back?
          </h2>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 18px)', color: '#526673', lineHeight: 1.6, marginBottom: 36, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
            Book a complimentary 30-minute system architecture session with our engineering directors.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="btn-zovance-green"
            style={{ fontSize: 16, padding: '16px 36px' }}
          >
            <span>Book Consultation</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
