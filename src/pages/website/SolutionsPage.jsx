import { useState } from 'react';
import { ArrowRight, CheckCircle2, Building2, ShoppingCart, Stethoscope, Home, Landmark, Headset, Sparkles, TrendingUp, Bot, Workflow, Layers, ShieldCheck, ExternalLink } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import ClosingCtaBanner from '../../components/ClosingCtaBanner';

const industries = [
  {
    id: 'hospitality',
    icon: Building2,
    title: 'Hospitality & Resorts',
    tag: 'Guest Concierge & Direct Booking',
    desc: 'Instant booking engines, 24/7 guest WhatsApp concierge, automated check-in flows, and PMS reservation sync.',
    metrics: '350+ monthly bookings automated | <1s availability search',
    color: '#F0FDF4',
    accent: '#38A85B',
    borderColor: '#BBF7D0',
    clientSolutions: [
      { name: 'Alluri Resorts', url: 'https://alluriresorts.com' }
    ],
    features: ['24/7 WhatsApp guest concierge', 'Direct zero-commission booking engine', 'PMS & payment gateway sync', 'Automated guest feedback collection'],
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce & D2C Brands',
    tag: 'Cart Recovery & Retention',
    desc: 'High-conversion storefronts, AI customer support, cart recovery follow-ups, and automated inventory sync.',
    metrics: '24% average cart recovery boost | 99.9% uptime SLA',
    color: '#FFF7ED',
    accent: '#EA580C',
    borderColor: '#FFEDD5',
    clientSolutions: [
      { name: 'Kesar Kosmetics', url: 'https://kesarkosmetics.com' }
    ],
    features: ['Automated cart abandonment WhatsApp/call sequence', 'WhatsApp order status & shipping tracking', '1-click checkout conversion flow', 'Inventory ERP sync'],
  },
  {
    id: 'healthcare',
    icon: Stethoscope,
    title: 'Healthcare & Medical Clinics',
    tag: 'Patient Intake & Voice Booking',
    desc: 'Multilingual voice agents for appointment scheduling, patient intake automation, and prescription notification reminders.',
    metrics: '60% reduction in call wait times | 0 missed appointments',
    color: '#F2FAFD',
    accent: '#3E9FD0',
    borderColor: '#DCE9EE',
    features: ['24/7 voice appointment booking agent', 'HIPAA-compliant data handling', 'Automated SMS / WhatsApp reminders', 'EMR calendar synchronization'],
  },
  {
    id: 'realestate',
    icon: Home,
    title: 'Real Estate & Property Developers',
    tag: 'Inbound Lead Qualification',
    desc: 'Instant lead response within 30 seconds, automated virtual tour scheduling, and CRM buyer budget matching.',
    metrics: '5x faster lead response time | 3.2x tour booking rate',
    color: '#F0FDF4',
    accent: '#16A34A',
    borderColor: '#BBF7D0',
    features: ['Instant WhatsApp property brochure sender', 'Buyer budget & location qualification bot', 'Agent calendar auto-booking', '99acres / Magicbricks lead ingestion'],
  },
  {
    id: 'finance',
    icon: Landmark,
    title: 'Financial & Legal Firms',
    tag: 'Document OCR & Client Intake',
    desc: 'AI document parsing, client onboarding workflows, automated KYC checks, and invoice reconciliation.',
    metrics: '90% faster document processing | 100% audit trail',
    color: '#F8FAFC',
    accent: '#102C42',
    borderColor: '#DCE9EE',
    features: ['Automated bank statement & invoice OCR', 'KYC & client onboarding portal', 'CRM & QuickBooks integration', 'Tamper-evident audit log tracking'],
  },
  {
    id: 'support',
    icon: Headset,
    title: 'Customer Support & BPO',
    tag: 'Omnichannel Voice & Chat',
    desc: 'Autonomous multi-channel AI agents that resolve 70%+ of customer tickets instantly across Web, WhatsApp, and Phone.',
    metrics: '70%+ instant resolution rate | 24/7 coverage',
    color: '#F0F9FF',
    accent: '#0284C7',
    borderColor: '#BAE6FD',
    features: ['Omnichannel bot deployment', 'Live human agent transfer with context', 'Knowledge base auto-training', 'CSAT & sentiment analytics'],
  },
];

export default function SolutionsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(120px, 14vw, 160px) clamp(20px, 5vw, 64px) clamp(40px, 5vw, 60px)',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Atmosphere Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(500px, 75vw, 900px)',
          height: 380,
          background: 'radial-gradient(ellipse at center, rgba(143, 211, 244, 0.4) 0%, rgba(56, 168, 91, 0.12) 50%, transparent 80%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div className="animate-fade-up" style={{ position: 'relative', zIndex: 1 }}>
          <span className="shimmer-badge animate-levitate" style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#38A85B',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 16,
            border: '1px solid #DCE9EE',
            padding: '6px 16px',
            borderRadius: 9999,
            boxShadow: '0 2px 10px rgba(56, 168, 91, 0.12)',
          }}>
            <span className="animate-pulse-ring" style={{ width: 7, height: 7, borderRadius: '50%', background: '#38A85B' }} />
            INDUSTRY SPECIFIC SYSTEMS
          </span>

          <h1 style={{
            fontSize: 'clamp(38px, 6vw, 72px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: '#102C42',
            lineHeight: 1.08,
            marginBottom: 20,
            maxWidth: 880,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Tailored AI Systems Built For <br />
            <span className="highlight-gradient">Your Exact Industry.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#526673',
            maxWidth: 680,
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}>
            Whether you run a resort, an e-commerce brand, a healthcare clinic, or a property development firm, we build systems tuned precisely to your unit economics.
          </p>

          <button
            onClick={() => setBookingOpen(true)}
            className="btn-zovance-primary"
            style={{ fontSize: 15, padding: '14px 32px' }}
          >
            <span>Schedule Industry Discovery Call</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Industry Solutions 3D Cards Grid */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 12vw, 140px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 380px), 1fr))',
          gap: 28,
        }} className="perspective-container">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="card-3d"
              style={{
                background: '#FFFFFF',
                border: '1px solid #DCE9EE',
                borderRadius: 24,
                padding: 'clamp(28px, 4vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(16, 44, 66, 0.04)',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: 16,
                    background: ind.color,
                    border: `1px solid ${ind.borderColor}`,
                    color: ind.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <ind.icon size={24} />
                  </div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: ind.accent,
                    background: ind.color,
                    border: `1px solid ${ind.borderColor}`,
                    padding: '4px 10px',
                    borderRadius: 999,
                  }}>
                    {ind.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#102C42', letterSpacing: '-0.02em', marginBottom: 12 }}>
                  {ind.title}
                </h3>

                <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6, marginBottom: 24 }}>
                  {ind.desc}
                </p>

                {/* Verified Metrics Badge */}
                <div style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 14,
                  padding: '12px 16px',
                  marginBottom: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <TrendingUp size={16} color="#38A85B" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#38A85B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      VERIFIED OUTCOME
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#102C42', marginTop: 2 }}>
                      {ind.metrics}
                    </div>
                  </div>
                </div>

                {/* Previous Client Solutions Link (if available) */}
                {ind.clientSolutions && ind.clientSolutions.length > 0 && (
                  <div style={{
                    background: '#F2FAFD',
                    border: '1px solid #DCE9EE',
                    borderRadius: 12,
                    padding: '10px 14px',
                    marginBottom: 20,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#38A85B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                      LIVE CUSTOMER SOLUTION
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {ind.clientSolutions.map(cs => (
                        <a
                          key={cs.url}
                          href={cs.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#102C42',
                            background: '#FFFFFF',
                            border: '1px solid #DCE9EE',
                            padding: '4px 10px',
                            borderRadius: 999,
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 1px 4px rgba(16, 44, 66, 0.04)'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = '#38A85B';
                            e.currentTarget.style.color = '#38A85B';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = '#DCE9EE';
                            e.currentTarget.style.color = '#102C42';
                          }}
                        >
                          <span>{cs.name}</span>
                          <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                style={{
                  width: '100%',
                  background: '#102C42',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 9999,
                  padding: '12px 20px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(16, 44, 66, 0.12)'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#38A85B'}
                onMouseLeave={e => e.currentTarget.style.background = '#102C42'}
              >
                <span>Deploy System for {ind.title.split(' ')[0]}</span>
                <ArrowRight size={14} />
              </button>
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
