import { useState } from 'react';
import { ArrowRight, Zap, Code2, Cpu, Globe, MessageCircle, Database, Lock, RefreshCw, CheckCircle2, Sparkles, Check } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import ClosingCtaBanner from '../../components/ClosingCtaBanner';

const templates = [
  {
    title: 'WhatsApp Lead Qualifier & Scheduler',
    category: 'Sales Automation',
    desc: 'Automatically responds to inbound WhatsApp messages, qualifies budget & timeline, and books meetings into Google Calendar.',
    tools: ['WhatsApp Business API', 'OpenAI GPT-4o', 'Google Calendar', 'N8N'],
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
    tools: ['Property Finder API', 'OpenAI RAG', 'WhatsApp API', 'Salesforce'],
    timeSaved: '22 hrs / week',
  },
  {
    title: 'Automated Client Onboarding Vault',
    category: 'Agency & B2B',
    desc: 'Generates client Google Drive folders, sends contract e-signatures, creates Slack channels, and posts kickoff invites.',
    tools: ['DocuSign API', 'Google Drive API', 'Slack API', 'Make.com'],
    timeSaved: '12 hrs / week',
  },
];

const integrations = [
  'WhatsApp Business', 'OpenAI GPT-4o', 'N8N', 'Zapier', 'Stripe', 'HubSpot', 'Salesforce', 'Make.com', 'PostgreSQL', 'Google Cloud', 'Shopify', 'Twilio'
];

export default function AutomationsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(56px, 8vw, 96px) clamp(20px, 5vw, 48px) clamp(36px, 5vw, 60px)',
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
          <span>PRODUCTION AUTOMATION PIPELINES</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          color: '#102C42',
          lineHeight: 1.08,
          marginBottom: 20,
        }}>
          Pre-Built & Custom<br />
          <span style={{ color: '#38A85B', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            AI Workflow Templates
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)',
          color: '#526673',
          maxWidth: 620,
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          Explore production-tested automation workflows engineered to connect your favorite business apps, eliminate repetitive friction, and generate revenue on autopilot.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button
            className="btn-zovance-primary"
            onClick={() => setBookingOpen(true)}
            style={{
              padding: '14px 28px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            <span>Deploy Custom Pipeline</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Integrations Ribbon */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 48px) 48px',
      }}>
        <div style={{
          background: '#F2FAFD',
          border: '1px solid #DCE9EE',
          borderRadius: 24,
          padding: '24px 32px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#526673', marginBottom: 16 }}>
            NATIVE INTEGRATIONS SUPPORTED ACROSS YOUR ENTIRE STACK
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {integrations.map((tool) => (
              <span
                key={tool}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #DCE9EE',
                  borderRadius: 999,
                  padding: '6px 16px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#102C42',
                  boxShadow: '0 2px 8px rgba(16, 44, 66, 0.04)'
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 48px) clamp(60px, 8vw, 100px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 28,
        }}>
          {templates.map((tpl) => (
            <div
              key={tpl.title}
              className="card-3d"
              style={{
                background: '#FFFFFF',
                border: '1px solid #DCE9EE',
                borderRadius: 24,
                padding: 'clamp(24px, 3.5vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(16, 44, 66, 0.04)',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#38A85B',
                    background: '#F2FAFD',
                    border: '1px solid #DCE9EE',
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}>
                    {tpl.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#102C42' }}>
                    <Zap size={14} color="#38A85B" />
                    <span>{tpl.timeSaved}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#102C42', marginBottom: 12, lineHeight: 1.3 }}>
                  {tpl.title}
                </h3>

                <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6, marginBottom: 24 }}>
                  {tpl.desc}
                </p>

                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#526673', marginBottom: 8 }}>
                    Connected Stack:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {tpl.tools.map((tool) => (
                      <span
                        key={tool}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          background: '#F2FAFD',
                          color: '#102C42',
                          padding: '4px 10px',
                          borderRadius: 8,
                          border: '1px solid #DCE9EE',
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                className="btn-zovance-white"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '12px 20px',
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  border: '1px solid #DCE9EE',
                  background: '#FFFFFF',
                  color: '#102C42',
                  boxShadow: '0 2px 8px rgba(16, 44, 66, 0.04)',
                }}
              >
                <span>Request This Pipeline</span>
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
