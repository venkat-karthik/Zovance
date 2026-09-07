import { useState } from 'react';
import { ArrowRight, CheckCircle2, Building2, ShoppingCart, Stethoscope, Home, Landmark, Headset } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';

const industries = [
  {
    id: 'hospitality',
    icon: Building2,
    title: 'Hospitality & Resorts',
    tag: 'Hotel & Villa Tech',
    desc: 'Instant booking engines, 24/7 guest WhatsApp concierge, automated check-in flows, and billing sync.',
    metrics: '350+ monthly bookings automated | <1s availability search',
    color: '#FFEDD5',
    accent: '#EA580C',
    features: ['WhatsApp guest assistant', 'Direct booking engine', 'PMS & Stripe payment sync', 'Automated feedback collection'],
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce & Retail',
    tag: 'Conversion & Retention AI',
    desc: 'High-conversion storefronts, AI customer support, cart recovery follow-ups, and automated inventory sync.',
    metrics: '4.8x conversion boost | 99.9% uptime SLA',
    color: '#DBEAFE',
    accent: '#2563EB',
    features: ['AI product recommendation engine', 'WhatsApp order status & shipping tracking', '1-click checkout flow', 'Inventory ERP sync'],
  },
  {
    id: 'healthcare',
    icon: Stethoscope,
    title: 'Healthcare & Clinics',
    tag: 'Patient Booking & Reminders',
    desc: 'Multilingual voice agents for appointment scheduling, patient intake automation, and prescription notification reminders.',
    metrics: '60% reduction in call wait times | 0 missed appointments',
    color: '#FCE7F3',
    accent: '#DB2777',
    features: ['24/7 voice appointment booking', 'HIPAA-compliant data handling', 'Automated SMS / WhatsApp reminders', 'EMR calendar sync'],
  },
  {
    id: 'realestate',
    icon: Home,
    title: 'Real Estate & Property',
    tag: 'Inbound Lead Qualification',
    desc: 'Instant lead response within 30 seconds, automated virtual tour scheduling, and CRM buyer matching.',
    metrics: '5x faster lead response time | 3.2x tour booking rate',
    color: '#D1FAE5',
    accent: '#059669',
    features: ['Instant WhatsApp property brochure sender', 'Buyer budget & location qualification', 'Agent calendar auto-booking', 'Property portal lead parsing'],
  },
  {
    id: 'finance',
    icon: Landmark,
    title: 'Financial & Legal Services',
    tag: 'Document OCR & Compliance',
    desc: 'AI document parsing, client onboarding workflows, automated KYC checks, and invoice reconciliation.',
    metrics: '90% faster document processing | 100% audit trail',
    color: '#FEF3C7',
    accent: '#D97706',
    features: ['Automated bank statement & invoice OCR', 'KYC & client onboarding portal', 'CRM & QuickBooks integration', 'Audit log tracking'],
  },
  {
    id: 'support',
    icon: Headset,
    title: 'Customer Support & BPO',
    tag: 'Omnichannel AI Support',
    desc: 'Autonomous multi-channel AI agents that resolve 70%+ of customer tickets instantly across Web, WhatsApp, and Email.',
    metrics: '70%+ instant resolution rate | 24/7 coverage',
    color: '#EDE9FE',
    accent: '#7C3AED',
    features: ['Omnichannel bot deployment', 'Live human agent hand-off', 'Knowledge base auto-training', 'CSAT & sentiment analytics'],
  },
];

export default function SolutionsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FBFBF9', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(50px, 8vw, 90px) clamp(16px, 4vw, 36px) clamp(30px, 4vw, 50px)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#64748B', textTransform: 'uppercase', marginBottom: 16 }}>
          INDUSTRY SOLUTIONS
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#0F172A',
          lineHeight: 1.05,
          marginBottom: 24,
        }}>
          Tailored AI Systems Built For<br />
          <span className="impact-gradient font-serif" style={{ fontStyle: 'italic' }}>Your Industry</span>
        </h1>
        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#475569',
          maxWidth: 580,
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          Whether you run a resort, an e-commerce brand, a medical clinic, or a law firm, we build solutions tuned to your specific domain.
        </p>

        <button
          className="btn-dark-pill"
          onClick={() => setBookingOpen(true)}
        >
          <span>Schedule Industry Discovery Call</span>
          <ArrowRight size={16} />
        </button>
      </section>

      {/* Industry Solutions Grid */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 36px) clamp(60px, 8vw, 100px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
        }}>
          {industries.map((ind) => (
            <div
              key={ind.id}
              style={{
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    background: ind.color,
                    color: ind.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <ind.icon size={24} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748B' }}>
                    {ind.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
                  {ind.title}
                </h3>

                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 24 }}>
                  {ind.desc}
                </p>

                <div style={{ background: '#FBFBF9', border: '1px solid #E2E8F0', borderRadius: 16, padding: 16, marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    VERIFIED METRICS
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                    {ind.metrics}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {ind.features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color="#16A34A" />
                      <span style={{ fontSize: 13, color: '#334155', fontWeight: 600 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn-white-pill"
                onClick={() => setBookingOpen(true)}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Deploy For {ind.title}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
