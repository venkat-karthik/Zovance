import { useState } from 'react';
import { ArrowRight, Zap, Code2, Cpu, Globe, MessageCircle, Database, Lock, RefreshCw, CheckCircle2 } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import ClosingCtaBanner from '../../components/ClosingCtaBanner';

const templates = [
  {
    title: 'WhatsApp Lead Qualifier & Scheduler',
    category: 'Sales Automation',
    desc: 'Automatically responds to inbound WhatsApp messages, qualifies budget & timeline, and books meetings into Google Calendar.',
    tools: ['WhatsApp Business API', 'OpenAI GPT-4', 'Google Calendar', 'N8N'],
    timeSaved: '15 hrs / week',
  },
  {
    title: 'Multi-Channel Inbound Voice Agent',
    category: 'Customer Support',
    desc: '24/7 AI voice caller that answers phone queries, handles appointment bookings, and logs transcripts into your CRM.',
    tools: ['Vapi.ai', 'Retell Voice', 'HubSpot CRM', 'Twilio'],
    timeSaved: '25 hrs / week',
  },
  {
    title: 'Invoice & Bank Statement OCR Parser',
    category: 'Finance & Operations',
    desc: 'Automatically extracts line items, totals, tax, and vendor data from PDF receipts and updates QuickBooks & Google Sheets.',
    tools: ['Document AI', 'Python OCR', 'Google Drive API', 'QuickBooks'],
    timeSaved: '18 hrs / week',
  },
  {
    title: 'E-Commerce Cart Recovery & Retention',
    category: 'Retail & E-Com',
    desc: 'Sends personalized WhatsApp & Email discount nudges when users abandon checkout, syncing order status automatically.',
    tools: ['Shopify Webhooks', 'Klaviyo API', 'WhatsApp API', 'Stripe'],
    timeSaved: '20 hrs / week',
  },
  {
    title: 'Real Estate Property Matching Bot',
    category: 'Property & Sales',
    desc: 'Parses incoming portal leads, matches preferences with active listings database, and texts property brochures instantly.',
    tools: ['Meta Lead Ads', 'PostgreSQL', 'WhatsApp API', 'Make.com'],
    timeSaved: '22 hrs / week',
  },
  {
    title: 'Executive AI Digest & Report Generator',
    category: 'Management & Analytics',
    desc: 'Aggregates sales performance, ad spend, and support tickets into a crisp daily morning Slack / WhatsApp summary.',
    tools: ['Stripe API', 'Google Analytics 4', 'Slack API', 'OpenAI'],
    timeSaved: '10 hrs / week',
  },
];

const integrations = [
  'WhatsApp', 'OpenAI', 'N8N', 'Zapier', 'Stripe', 'HubSpot', 'Salesforce', 'Make.com', 'PostgreSQL', 'Google Cloud', 'Shopify', 'Twilio'
];

export default function AutomationsPage() {
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
          AUTOMATION PIPELINES
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#0F172A',
          lineHeight: 1.05,
          marginBottom: 24,
        }}>
          Pre-Built & Custom<br />
          <span className="impact-gradient font-serif" style={{ fontStyle: 'italic' }}>AI Workflow Templates</span>
        </h1>
        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#475569',
          maxWidth: 580,
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          Explore production-tested automation workflows engineered to connect your favorite apps and eliminate repetitive manual tasks.
        </p>

        <button
          className="btn-dark-pill"
          onClick={() => setBookingOpen(true)}
        >
          <span>Build Custom Workflow</span>
          <ArrowRight size={16} />
        </button>
      </section>

      {/* Integration Logos Bar */}
      <section style={{
        background: '#ffffff',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        padding: '24px clamp(16px, 4vw, 36px)',
        marginBottom: 60,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: '#64748B', textTransform: 'uppercase', marginBottom: 16 }}>
            NATIVELY CONNECTED WITH 100+ APPS & PLATFORMS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {integrations.map((tool) => (
              <span
                key={tool}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#334155',
                  padding: '6px 16px',
                  borderRadius: 999,
                  background: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Workflow Cards Grid */}
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
          {templates.map((tmpl) => (
            <div
              key={tmpl.title}
              style={{
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2563EB', padding: '4px 10px', background: '#DBEAFE', borderRadius: 999 }}>
                    {tmpl.category}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#16A34A' }}>
                    ⚡ {tmpl.timeSaved}
                  </span>
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
                  {tmpl.title}
                </h3>

                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 24 }}>
                  {tmpl.desc}
                </p>

                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    INTEGRATED TECH STACK:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {tmpl.tools.map((t) => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 600, color: '#475569', background: '#FBFBF9', border: '1px solid #E2E8F0', borderRadius: 6, padding: '4px 8px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="btn-dark-pill"
                onClick={() => setBookingOpen(true)}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Deploy This Workflow</span>
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
