import { useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import ClosingCtaBanner from '../../components/ClosingCtaBanner';
import { useStore } from '../../store/useStore';

const pricingTiers = [
  {
    name: 'Starter Automation',
    tag: 'For Growing Businesses',
    price: '₹49,999',
    period: 'one-time build',
    desc: 'Perfect for businesses seeking to automate key repetitive workflows like lead qualification or booking.',
    features: [
      '1 Core AI Workflow / Bot',
      'WhatsApp or Web Chatbot Integration',
      'Google Calendar & CRM Sync',
      '14 Days Hyper-Care Support',
      'Weekly Analytics Report',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Pro System Architecture',
    tag: 'Most Popular Choice',
    price: '₹1,49,999',
    period: 'one-time build',
    desc: 'Full-stack AI automation system with voice caller capabilities, OCR parsing, and custom dashboards.',
    features: [
      'Up to 4 Custom AI Workflows',
      'AI Inbound/Outbound Voice Agent',
      'OCR Document & Receipt Parsing',
      'Multi-App Webhook Integrations (N8N / Zapier)',
      '30 Days Dedicated Hyper-Care Support',
      'Live Admin Dashboard & SLA Guarantee',
    ],
    popular: true,
    cta: 'Build Pro System',
  },
  {
    name: 'Enterprise Custom Build',
    tag: 'Custom Roadmap',
    price: 'Custom',
    period: 'tailored scope',
    desc: 'Bespoke AI system architecture, dedicated engineer allocation, custom LLM fine-tuning, and on-prem deployment.',
    features: [
      'Unlimited AI Workflows & Voice Callers',
      'Custom LLM Fine-Tuning & Private RAG',
      'On-Premises or Private Cloud Hosting',
      'Dedicated Solutions Engineer',
      '24/7 SLA Priority Phone Support',
      'Custom API & Legacy ERP Connections',
    ],
    popular: false,
    cta: 'Talk to Architect',
  },
];

export default function PricingPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { darkMode } = useStore();

  return (
    <div style={{ background: darkMode ? '#080B13' : '#FBFBF9', color: darkMode ? '#F8FAFC' : '#0F172A', minHeight: '100vh', overflowX: 'hidden', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(50px, 8vw, 90px) clamp(16px, 4vw, 36px) clamp(30px, 4vw, 50px)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: darkMode ? '#94A3B8' : '#64748B', textTransform: 'uppercase', marginBottom: 16 }}>
          TRANSPARENT PRICING IN INR
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: darkMode ? '#F8FAFC' : '#0F172A',
          lineHeight: 1.05,
          marginBottom: 24,
        }}>
          Invest in Systems That<br />
          <span className="impact-gradient font-serif" style={{ fontStyle: 'italic' }}>Pay For Themselves</span>
        </h1>
        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: darkMode ? '#CBD5E1' : '#475569',
          maxWidth: 580,
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          No hidden fees or bloated retainers. One-time build investment with 100% code ownership and optional ongoing SLA support.
        </p>
      </section>

      {/* Pricing Cards Grid */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 36px) clamp(60px, 8vw, 100px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
          alignItems: 'stretch',
        }}>
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                background: darkMode ? (tier.popular ? '#1E293B' : '#131B2E') : '#ffffff',
                border: tier.popular ? (darkMode ? '2px solid #38BDF8' : '2px solid #0F172A') : (darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E2E8F0'),
                borderRadius: 28,
                padding: 36,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: darkMode ? '0 12px 30px rgba(0,0,0,0.5)' : (tier.popular ? '0 20px 40px rgba(15, 23, 42, 0.1)' : '0 4px 20px rgba(0,0,0,0.03)'),
              }}
            >
              {tier.popular && (
                <div style={{
                  position: 'absolute',
                  top: -14,
                  right: 28,
                  background: darkMode ? '#38BDF8' : '#0F172A',
                  color: darkMode ? '#0F172A' : '#ffffff',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '4px 14px',
                  borderRadius: 999,
                }}>
                  MOST POPULAR CHOICE
                </div>
              )}

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: darkMode ? '#94A3B8' : '#64748B', marginBottom: 12 }}>
                  {tier.tag}
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 800, color: darkMode ? '#F8FAFC' : '#0F172A', marginBottom: 16 }}>
                  {tier.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
                  <span style={{ fontSize: 38, fontWeight: 900, color: darkMode ? '#F8FAFC' : '#0F172A', letterSpacing: '-0.03em' }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: 13, color: darkMode ? '#94A3B8' : '#64748B', fontWeight: 600 }}>
                    / {tier.period}
                  </span>
                </div>

                <p style={{ fontSize: 14, color: darkMode ? '#CBD5E1' : '#475569', lineHeight: 1.6, marginBottom: 28 }}>
                  {tier.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color="#16A34A" />
                      <span style={{ fontSize: 13, color: darkMode ? '#CBD5E1' : '#334155', fontWeight: 600 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={tier.popular ? 'btn-dark-pill' : 'btn-white-pill'}
                onClick={() => setBookingOpen(true)}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: tier.popular ? (darkMode ? '#38BDF8' : '#0F172A') : (darkMode ? '#1E293B' : '#ffffff'),
                  color: tier.popular ? (darkMode ? '#0F172A' : '#ffffff') : (darkMode ? '#F8FAFC' : '#0F172A'),
                  borderColor: darkMode ? 'rgba(255,255,255,0.15)' : '#E2E8F0',
                }}
              >
                <span>{tier.cta}</span>
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
