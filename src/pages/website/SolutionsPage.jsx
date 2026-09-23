import { useState } from 'react';
import { ArrowRight, CheckCircle2, Building2, ShoppingCart, Stethoscope, Home, Landmark, Headset, Sparkles, TrendingUp, Bot, Workflow, Layers, ShieldCheck, ExternalLink, Cpu } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import ClosingCtaBanner from '../../components/ClosingCtaBanner';
import ServicesNeuralCore from '../../components/ServicesNeuralCore';

const industries = [
  {
    id: 'hospitality',
    icon: Building2,
    title: 'Hospitality & Resorts',
    tag: 'Guest Concierge & Direct Booking',
    desc: 'Instant booking engines, 24/7 guest WhatsApp concierge, automated check-in flows, and PMS reservation sync.',
    metrics: '350+ monthly bookings automated | <1s availability search',
    color: 'rgba(0, 240, 255, 0.08)',
    accent: '#00f0ff',
    borderColor: 'rgba(0, 240, 255, 0.25)',
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
    color: 'rgba(56, 189, 248, 0.08)',
    accent: '#38bdf8',
    borderColor: 'rgba(56, 189, 248, 0.25)',
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
    color: 'rgba(0, 240, 255, 0.08)',
    accent: '#00f0ff',
    borderColor: 'rgba(0, 240, 255, 0.25)',
    features: ['24/7 voice appointment booking agent', 'HIPAA-compliant data handling', 'Automated SMS / WhatsApp reminders', 'EMR calendar synchronization'],
  },
  {
    id: 'realestate',
    icon: Home,
    title: 'Real Estate & Property Developers',
    tag: 'Inbound Lead Qualification',
    desc: 'Instant lead response within 30 seconds, automated virtual tour scheduling, and CRM buyer budget matching.',
    metrics: '5x faster lead response time | 3.2x tour booking rate',
    color: 'rgba(56, 168, 91, 0.08)',
    accent: '#38A85B',
    borderColor: 'rgba(56, 168, 91, 0.25)',
    features: ['Instant WhatsApp property brochure sender', 'Buyer budget & location qualification bot', 'Agent calendar auto-booking', '99acres / Magicbricks lead ingestion'],
  },
  {
    id: 'finance',
    icon: Landmark,
    title: 'Financial & Legal Firms',
    tag: 'Document OCR & Client Intake',
    desc: 'AI document parsing, client onboarding workflows, automated KYC checks, and invoice reconciliation.',
    metrics: '90% faster document processing | 100% audit trail',
    color: 'rgba(56, 189, 248, 0.08)',
    accent: '#38bdf8',
    borderColor: 'rgba(56, 189, 248, 0.25)',
    features: ['Automated bank statement & invoice OCR', 'KYC & client onboarding portal', 'CRM & QuickBooks integration', 'Tamper-evident audit log tracking'],
  },
  {
    id: 'support',
    icon: Headset,
    title: 'Customer Support & BPO',
    tag: 'Omnichannel Voice & Chat',
    desc: 'Autonomous multi-channel AI agents that resolve 70%+ of customer tickets instantly across Web, WhatsApp, and Phone.',
    metrics: '70%+ instant resolution rate | 24/7 coverage',
    color: 'rgba(0, 240, 255, 0.08)',
    accent: '#00f0ff',
    borderColor: 'rgba(0, 240, 255, 0.25)',
    features: ['Omnichannel bot deployment', 'Live human agent transfer with context', 'Knowledge base auto-training', 'CSAT & sentiment analytics'],
  },
];

export default function SolutionsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#02070c', color: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav theme="dark" />

      {/* Hero Header with Cybernetic Dark Theme */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(130px, 16vw, 175px) clamp(20px, 5vw, 64px) clamp(50px, 6vw, 80px)',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Cybernetic Atmosphere Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(500px, 75vw, 900px)',
          height: 420,
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.25) 0%, rgba(56, 189, 248, 0.1) 45%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div className="animate-fade-up" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.18em',
            color: '#00f0ff',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 20,
            background: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            padding: '6px 18px',
            borderRadius: 9999,
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }} />
            INTELLIGENT SOLUTIONS & ARCHITECTURE
          </span>

          <h1 style={{
            fontSize: 'clamp(38px, 6vw, 76px)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            color: '#FFFFFF',
            lineHeight: 1.08,
            marginBottom: 22,
            maxWidth: 960,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Turnkey Systems Engineered For{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 50%, #38A85B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}>
              Autonomous Scale.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#94a9b8',
            maxWidth: 720,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            Explore our neural service architecture below, followed by custom-tuned execution engines tailored specifically for your vertical economics.
          </p>

          <button
            onClick={() => setBookingOpen(true)}
            style={{
              fontSize: 15,
              fontWeight: 800,
              padding: '14px 34px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 100%)',
              color: '#060e17',
              borderRadius: 9999,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.45)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 240, 255, 0.65)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.45)';
            }}
          >
            <span>Schedule Architecture Call</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ================= INTERACTIVE NEURAL CORE SERVICES SECTION IN SOLUTIONS ================= */}
      <ServicesNeuralCore />

      {/* Industry Solutions 3D Cards Grid in Sci-Fi Dark Aesthetic */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 12vw, 140px)',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#00f0ff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            VERTICAL DEPLOYMENTS
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.025em', marginTop: 8 }}>
            Engineered By Industry Domain
          </h2>
        </div>

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
                background: 'rgba(10, 24, 38, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                borderRadius: 24,
                padding: 'clamp(28px, 4vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 240, 255, 0.05) inset',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ind.accent;
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(0, 0, 0, 0.5), 0 0 25px ${ind.accent}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 240, 255, 0.05) inset';
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
                    boxShadow: `0 0 16px ${ind.accent}33`,
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
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}>
                    {ind.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: 12 }}>
                  {ind.title}
                </h3>

                <p style={{ fontSize: 14, color: '#9bb1c1', lineHeight: 1.6, marginBottom: 24 }}>
                  {ind.desc}
                </p>

                {/* Verified Metrics Badge */}
                <div style={{
                  background: 'rgba(6, 14, 23, 0.8)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  borderRadius: 14,
                  padding: '12px 16px',
                  marginBottom: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <TrendingUp size={16} color="#00f0ff" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      VERIFIED OUTCOME
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#DCE9EE', marginTop: 2 }}>
                      {ind.metrics}
                    </div>
                  </div>
                </div>

                {/* Previous Client Solutions Link (if available) */}
                {ind.clientSolutions && ind.clientSolutions.length > 0 && (
                  <div style={{
                    background: 'rgba(6, 14, 23, 0.65)',
                    border: '1px solid rgba(0, 240, 255, 0.15)',
                    borderRadius: 12,
                    padding: '10px 14px',
                    marginBottom: 20,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
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
                            color: '#FFFFFF',
                            background: 'rgba(0, 240, 255, 0.1)',
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            padding: '4px 10px',
                            borderRadius: 999,
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = '#00f0ff';
                            e.currentTarget.style.color = '#00f0ff';
                            e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 240, 255, 0.4)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                            e.currentTarget.style.color = '#FFFFFF';
                            e.currentTarget.style.boxShadow = 'none';
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
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(56, 189, 248, 0.2) 100%)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  borderRadius: 9999,
                  padding: '12px 20px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 100%)';
                  e.currentTarget.style.color = '#060e17';
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(56, 189, 248, 0.2) 100%)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.3)';
                }}
              >
                <span>Deploy System for {ind.title.split(' ')[0]}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <ClosingCtaBanner onBookCall={() => setBookingOpen(true)} />
      <WebsiteFooter theme="dark" />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
