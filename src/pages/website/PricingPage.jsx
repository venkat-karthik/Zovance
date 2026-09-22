import { useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Sparkles, HelpCircle, Check } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import ClosingCtaBanner from '../../components/ClosingCtaBanner';

const pricingTiers = [
  {
    name: 'Starter Automation',
    tag: 'For Growing Businesses',
    price: '₹49,999',
    period: 'one-time build',
    desc: 'Perfect for businesses seeking to automate key repetitive workflows like lead qualification, customer intake, or appointment booking.',
    features: [
      '1 Core Production AI Bot / Workflow',
      'WhatsApp or Web Chatbot Integration',
      'Google Calendar, Sheets & CRM Sync',
      '14 Days Hyper-Care Engineering Support',
      'Weekly Analytics & Lead Volume Report',
      'Full Source Code & Infrastructure Ownership',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Pro System Architecture',
    tag: 'Most Popular Choice',
    price: '₹1,49,999',
    period: 'one-time build',
    desc: 'Full-stack enterprise AI automation with voice callers, multi-step agent reasoning, document parsing, and custom dashboards.',
    features: [
      'Up to 4 Custom Production AI Workflows',
      'AI Inbound / Outbound Voice Agent (Vapi / Retell)',
      'OCR Document & Receipt Data Extraction',
      'Multi-App Webhook Integrations (N8N / Make / APIs)',
      'Custom Admin Control Center & Analytics',
      '30 Days Dedicated Hyper-Care Support',
      'Zero-Downtime Migration & SLA Guarantee',
    ],
    popular: true,
    cta: 'Build Pro System',
  },
  {
    name: 'Enterprise Custom Build',
    tag: 'Tailored Scope',
    price: 'Custom',
    period: 'tailored roadmap',
    desc: 'Bespoke AI system architecture, dedicated senior engineer allocation, custom private LLM fine-tuning, and on-premises deployment.',
    features: [
      'Unlimited AI Workflows & Voice Callers',
      'Custom LLM Fine-Tuning & Private RAG Search',
      'On-Premises or Private Cloud Hosting (AWS / GCP)',
      'Dedicated Solutions Engineer & Custom SLAs',
      '24/7 Priority Phone & Slack Channel Support',
      'Legacy ERP, SAP & Custom SQL Database Connections',
      'Compliance & Security Auditing (SOC2 / GDPR)',
    ],
    popular: false,
    cta: 'Talk to Lead Architect',
  },
];

const faqs = [
  {
    q: 'Do you take recurring revenue shares or monthly platform markups?',
    a: 'No. We believe in transparent, one-time engineering builds. You own 100% of your source code, automations, and LLM keys. We also offer optional hyper-care SLAs if you need ongoing maintenance.'
  },
  {
    q: 'How long does a typical AI workflow implementation take?',
    a: 'Starter builds deploy within 5 to 7 business days. Pro System Architectures take roughly 2 to 3 weeks including rigorous testing and staff onboarding.'
  },
  {
    q: 'Can these AI agents integrate with our current CRM and tools?',
    a: 'Yes. We build native webhooks and API bridges with WhatsApp Business, HubSpot, Salesforce, Zoho, Google Workspace, Slack, Stripe, and custom internal SQL databases.'
  }
];

export default function PricingPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Hero Header */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(56px, 8vw, 96px) clamp(20px, 5vw, 48px) clamp(36px, 5vw, 64px)',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#F2FAFD',
          border: '1px solid #DCE9EE',
          borderRadius: 999,
          padding: '6px 16px',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: '#102C42',
          textTransform: 'uppercase',
          marginBottom: 20
        }}>
          <Sparkles size={14} color="#38A85B" />
          <span>TRANSPARENT ENGINEERING PRICING</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          color: '#102C42',
          lineHeight: 1.08,
          marginBottom: 20,
        }}>
          Invest in Systems That<br />
          <span style={{ color: '#38A85B', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            Pay For Themselves
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)',
          color: '#526673',
          maxWidth: 620,
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          No hidden fees or bloated retainers. One-time build investment with 100% code ownership and optional ongoing SLA support.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', fontSize: 13, fontWeight: 700, color: '#102C42' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Check size={16} color="#38A85B" />
            <span>100% Code & Workflow Ownership</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Check size={16} color="#38A85B" />
            <span>Fixed-Scope Pricing in INR</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Check size={16} color="#38A85B" />
            <span>Dedicated Hyper-Care Support</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 48px) clamp(60px, 8vw, 100px)',
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
              className="card-3d"
              style={{
                background: tier.popular ? '#F2FAFD' : '#FFFFFF',
                border: tier.popular ? '2px solid #102C42' : '1px solid #DCE9EE',
                borderRadius: 28,
                padding: 'clamp(28px, 4vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: tier.popular ? '0 16px 40px rgba(16, 44, 66, 0.09)' : '0 4px 24px rgba(16, 44, 66, 0.04)',
                transition: 'all 0.3s ease',
              }}
            >
              {tier.popular && (
                <div style={{
                  position: 'absolute',
                  top: -14,
                  right: 28,
                  background: '#102C42',
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '5px 16px',
                  borderRadius: 999,
                  boxShadow: '0 4px 12px rgba(16, 44, 66, 0.15)',
                }}>
                  MOST POPULAR CHOICE
                </div>
              )}

              <div>
                <div style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: tier.popular ? '#38A85B' : '#526673',
                  marginBottom: 12,
                }}>
                  {tier.tag}
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', marginBottom: 14 }}>
                  {tier.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
                  <span style={{ fontSize: 40, fontWeight: 900, color: '#102C42', letterSpacing: '-0.035em' }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: 13, color: '#526673', fontWeight: 600 }}>
                    / {tier.period}
                  </span>
                </div>

                <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6, marginBottom: 28 }}>
                  {tier.desc}
                </p>

                <div style={{
                  height: 1,
                  background: tier.popular ? '#DCE9EE' : '#F2FAFD',
                  marginBottom: 24
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle2 size={17} color="#38A85B" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 14, color: '#102C42', fontWeight: 600, lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={tier.popular ? 'btn-zovance-primary' : 'btn-zovance-white'}
                onClick={() => setBookingOpen(true)}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px 24px',
                  borderRadius: 999,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  border: tier.popular ? 'none' : '1px solid #DCE9EE',
                  background: tier.popular ? '#102C42' : '#FFFFFF',
                  color: tier.popular ? '#FFFFFF' : '#102C42',
                  boxShadow: tier.popular ? '0 8px 24px rgba(16, 44, 66, 0.15)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{tier.cta}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Enterprise Callout */}
        <div style={{
          marginTop: 48,
          background: '#F2FAFD',
          border: '1px solid #DCE9EE',
          borderRadius: 24,
          padding: ' clamp(24px, 4vw, 36px)',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#38A85B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              NEED A TAILORED ARCHITECTURE AUDIT?
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#102C42' }}>
              Schedule a free 30-minute system discovery session with our lead engineer.
            </div>
            <div style={{ fontSize: 14, color: '#526673', marginTop: 4 }}>
              We review your existing tech stack, identify high-ROI automations, and quote an exact fixed timeline.
            </div>
          </div>
          <button
            onClick={() => setBookingOpen(true)}
            className="btn-zovance-green"
            style={{
              padding: '12px 24px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <span>Book Discovery Call</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 48px) clamp(60px, 8vw, 100px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: '#526673', textTransform: 'uppercase', marginBottom: 12 }}>
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#102C42' }}>
            Everything You Need to Know
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                border: '1px solid #DCE9EE',
                borderRadius: 20,
                padding: '24px 28px',
                boxShadow: '0 4px 16px rgba(16, 44, 66, 0.03)',
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 700, color: '#102C42', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                <HelpCircle size={18} color="#38A85B" />
                <span>{faq.q}</span>
              </div>
              <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6, paddingLeft: 28 }}>
                {faq.a}
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
