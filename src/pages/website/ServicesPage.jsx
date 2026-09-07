import { useState } from 'react';
import { Zap, Phone, Layers, BarChart3, ArrowRight, CheckCircle2, MessageCircle, Sparkles, Clock, ShieldCheck, Play, ChevronRight, HelpCircle } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';

const serviceCategories = [
  {
    id: 'automation',
    icon: Zap,
    title: 'AI & Workflow Automation',
    subtitle: 'Eliminate manual data entry & repetitive work',
    tag: 'MOST POPULAR',
    color: '#FFEDD5',
    iconColor: '#EA580C',
    accentBorder: '#FDBA74',
    pricing: 'Starting at ₹49,999',
    flow: {
      input: 'Inbound Lead / Webhook',
      process: 'AI Agent Reasoning & Enrichment',
      output: 'Cal Booking + CRM Sync',
    },
    beforeAfter: {
      before: '20+ hours lost / team member / week',
      after: 'Completed in <2 seconds with 0 human error',
    },
    quote: '"Zovance automated our lead qualification on WhatsApp. We save 30 hours a week and our conversion rate doubled."',
    author: 'Rahul Verma, CEO at EduPrime',
    features: [
      'Custom N8N / Zapier / Python API automation pipelines',
      'AI-powered document & invoice OCR extraction',
      'Instant CRM enrichment (HubSpot, Salesforce, Pipedrive)',
      'Automated WhatsApp & Email follow-up sequences',
      'Real-time automated Slack & WhatsApp digests',
    ],
  },
  {
    id: 'voice',
    icon: Phone,
    title: 'AI Voice Systems',
    subtitle: '24/7 multilingual inbound & outbound voice agents',
    tag: 'HIGH ROI',
    color: '#DBEAFE',
    iconColor: '#2563EB',
    accentBorder: '#93C5FD',
    pricing: 'Starting at ₹79,999',
    flow: {
      input: 'Phone Call Ringing',
      process: 'Voice Synthesis & LLM Dialogue',
      output: 'Appointment Booked & SMS Sent',
    },
    beforeAfter: {
      before: 'High missed calls & expensive phone team',
      after: '100% calls answered 24/7 with zero wait time',
    },
    quote: '"Our phone lines used to be chaotic. Now the AI voice agent handles 200+ appointment calls a day smoothly in English & Hindi."',
    author: 'Dr. Suresh Nair, MedCare Hospitals',
    features: [
      '24/7 natural-sounding conversational voice callers',
      'Multilingual support (English, Hindi, SEA languages)',
      '1-click Google Calendar & PMS booking integration',
      'Automatic call transcription & sentiment logging',
      'Inbound customer query resolution & FAQ support',
    ],
  },
  {
    id: 'web',
    icon: Layers,
    title: 'Custom Web Engineering',
    subtitle: 'High-conversion platforms, web apps & internal tools',
    tag: 'FULL STACK',
    color: '#FCE7F3',
    iconColor: '#DB2777',
    accentBorder: '#F9A8D4',
    pricing: 'Starting at ₹89,999',
    flow: {
      input: 'Visitor Traffic',
      process: 'Ultra-Fast React / Next.js Engine',
      output: '3x to 5x Lead Conversion',
    },
    beforeAfter: {
      before: 'Slow 4s load time & 1.2% conversion rate',
      after: '<1s speed & 4.8x higher conversion rate',
    },
    quote: '"Our luxury booking engine built by Zovance processes reservations in under a second. Highly reliable software."',
    author: 'Alluri Resorts Management',
    features: [
      'High-performance React & Next.js web applications',
      'Custom e-commerce platforms & Shopify API integrations',
      'Seamless payment gateways (Stripe, Razorpay, UPI)',
      'SEO-first architecture & responsive mobile UI',
      'Custom admin dashboards & client portals',
    ],
  },
  {
    id: 'audit',
    icon: BarChart3,
    title: 'Strategy & Audits',
    subtitle: 'Deep-dive operations mapping & 90-day AI roadmap',
    tag: 'EXECUTIVE ADVISORY',
    color: '#D1FAE5',
    iconColor: '#059669',
    accentBorder: '#6EE7B7',
    pricing: 'Starting at ₹29,999',
    flow: {
      input: 'Operations Audit',
      process: 'Bottleneck Ranking & ROI Model',
      output: '90-Day Execution Blueprint',
    },
    beforeAfter: {
      before: 'Confusion on AI tools & waste of budget',
      after: 'Prioritized roadmap with 100% clarity on payback',
    },
    quote: '"The 90-day audit showed us exactly which 3 workflows to automate first. The payback was under 3 weeks."',
    author: 'Anita Joshi, COO at RetailX',
    features: [
      'Full business workflow & bottleneck mapping',
      'Tech stack evaluation & redundancies audit',
      'Prioritized automation opportunity matrix',
      'ROI & payback timeline projections',
      'Monthly executive advisory & coaching sessions',
    ],
  },
];

export default function ServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('automation');

  // Solution Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({ goal: '', team: '' });

  const selectedService = serviceCategories.find((s) => s.id === activeTab) || serviceCategories[0];

  return (
    <div style={{ background: '#FBFBF9', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Hero Header */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(50px, 8vw, 90px) clamp(16px, 4vw, 36px) clamp(30px, 4vw, 40px)',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 500,
          height: 300,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(52, 211, 153, 0.05) 60%, transparent 80%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 9999,
          background: '#ffffff',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          marginBottom: 20,
        }}>
          <Sparkles size={14} color="#059669" />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#0F172A', textTransform: 'uppercase' }}>
            ENGINEERED FOR MEASURABLE ROI
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#0F172A',
          lineHeight: 1.05,
          marginBottom: 20,
        }}>
          Every System We Build Is<br />
          <span className="impact-gradient font-serif" style={{ fontStyle: 'italic' }}>Architected to Scale</span>
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#475569',
          maxWidth: 600,
          margin: '0 auto 36px',
          lineHeight: 1.6,
        }}>
          We don't sell generic templates. We engineer custom AI pipelines, 24/7 voice agents, and full-stack software tailored for your business.
        </p>

        {/* Interactive Category Selector Tabs */}
        <div style={{
          display: 'inline-flex',
          gap: 8,
          padding: 6,
          background: '#ffffff',
          border: '1px solid #E2E8F0',
          borderRadius: 9999,
          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {serviceCategories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 9999,
                  border: 'none',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: isActive ? '#0F172A' : 'transparent',
                  color: isActive ? '#ffffff' : '#64748B',
                  transition: 'all 0.25s ease',
                }}
              >
                <cat.icon size={16} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Service Hero Card */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto 60px',
        padding: '0 clamp(16px, 4vw, 36px)',
      }}>
        <div style={{
          background: '#ffffff',
          border: `2px solid ${selectedService.accentBorder}`,
          borderRadius: 32,
          padding: 'clamp(32px, 6vw, 56px)',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.06)',
          transition: 'all 0.3s ease',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'center',
          }}>
            {/* Left Content */}
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-7">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: selectedService.color,
                  color: selectedService.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <selectedService.icon size={24} />
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: selectedService.iconColor, textTransform: 'uppercase' }}>
                    {selectedService.tag}
                  </span>
                  <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{selectedService.pricing}</div>
                </div>
              </div>

              <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, marginBottom: 12 }}>
                {selectedService.title}
              </h2>
              <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.6, marginBottom: 28 }}>
                {selectedService.subtitle}
              </p>

              {/* Before vs After Comparison Badge */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 16,
                marginBottom: 32,
              }}>
                <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 16, padding: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', marginBottom: 4 }}>
                    ❌ WITHOUT AUTOMATION
                  </div>
                  <div style={{ fontSize: 13, color: '#7F1D1D', fontWeight: 600 }}>
                    {selectedService.beforeAfter.before}
                  </div>
                </div>

                <div style={{ background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: 16, padding: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>
                    ✅ WITH ZOVANCE AI
                  </div>
                  <div style={{ fontSize: 13, color: '#064E3B', fontWeight: 700 }}>
                    {selectedService.beforeAfter.after}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                className="btn-dark-pill"
                onClick={() => setBookingOpen(true)}
              >
                <span>Book Strategy Call For {selectedService.title}</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Right Visual Flow Diagram & Testimonial Quote */}
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-5">
              
              {/* Process Flow Graphic Card */}
              <div style={{
                background: '#FBFBF9',
                border: '1px solid #E2E8F0',
                borderRadius: 24,
                padding: 24,
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#64748B', textTransform: 'uppercase', marginBottom: 16 }}>
                  ⚡ HOW IT WORKS IN REAL-TIME
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 12, padding: '10px 14px', fontSize: 13, fontWeight: 600, color: '#475569' }}>
                    1. <span style={{ color: '#0F172A', fontWeight: 700 }}>{selectedService.flow.input}</span>
                  </div>
                  <div style={{ textAlign: 'center', color: '#64748B', fontSize: 12 }}>↓</div>
                  <div style={{ background: '#0F172A', color: '#ffffff', borderRadius: 12, padding: '10px 14px', fontSize: 13, fontWeight: 700 }}>
                    2. 🤖 {selectedService.flow.process}
                  </div>
                  <div style={{ textAlign: 'center', color: '#64748B', fontSize: 12 }}>↓</div>
                  <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', color: '#166534', borderRadius: 12, padding: '10px 14px', fontSize: 13, fontWeight: 700 }}>
                    3. ✨ {selectedService.flow.output}
                  </div>
                </div>
              </div>

              {/* Client Quote Overlay */}
              <div style={{
                background: selectedService.color,
                borderRadius: 20,
                padding: 20,
                border: `1px solid ${selectedService.accentBorder}`,
              }}>
                <p style={{ fontSize: 13, color: '#0F172A', fontStyle: 'italic', lineHeight: 1.5, marginBottom: 10, fontWeight: 600 }}>
                  {selectedService.quote}
                </p>
                <div style={{ fontSize: 11, fontWeight: 800, color: selectedService.iconColor }}>
                  — {selectedService.author}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Feature Checklists Grid Across All Services */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 36px) clamp(60px, 8vw, 100px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#64748B', textTransform: 'uppercase', marginBottom: 12 }}>
            COMPLETE TECHNICAL SPECS
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#0F172A' }}>
            What's Included in Every Deployment
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {serviceCategories.map((srv) => (
            <div
              key={srv.id}
              style={{
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: 24,
                padding: 28,
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: srv.color, color: srv.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <srv.icon size={18} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>{srv.title}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {srv.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle2 size={15} color="#16A34A" />
                    <span style={{ fontSize: 13, color: '#334155', fontWeight: 600 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Solution Finder Widget */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto 80px',
        padding: '0 clamp(16px, 4vw, 36px)',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: 32,
          padding: 'clamp(32px, 6vw, 56px)',
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#38BDF8', textTransform: 'uppercase', marginBottom: 12 }}>
            INTERACTIVE SOLUTION FINDER
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, marginBottom: 16 }}>
            Not sure which AI system your business needs?
          </h2>
          <p style={{ fontSize: 15, color: '#94A3B8', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.6 }}>
            Tell us your main operational bottleneck and we will recommend the exact automation build.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            maxWidth: 900,
            margin: '0 auto 36px',
          }}>
            {[
              { title: 'Too many manual leads & emails', rec: 'AI Workflow Pipeline' },
              { title: 'High missed calls & phone bookings', rec: '24/7 AI Voice Agent' },
              { title: 'Slow website & poor conversions', rec: 'Custom Web Platform' },
              { title: 'Unsure where to start with AI', rec: '90-Day Strategy Audit' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setBookingOpen(true)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 16,
                  padding: 20,
                  color: '#ffffff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)';
                  e.currentTarget.style.borderColor = '#38BDF8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <div style={{ fontSize: 13, color: '#CBD5E1', marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>Rec: {item.rec}</span>
                  <ArrowRight size={14} />
                </div>
              </button>
            ))}
          </div>

          <button
            className="btn-dark-pill"
            onClick={() => setBookingOpen(true)}
            style={{ background: '#ffffff', color: '#0F172A' }}
          >
            <span>Book Free 30-Min Discovery Session</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
