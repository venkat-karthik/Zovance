import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageSquare,
  Bot,
  Calendar,
  Layers,
  Sparkles,
  Search,
  ShoppingCart,
  Receipt,
  Workflow,
  PhoneCall,
  Globe,
  Layout,
  RefreshCw,
  GitBranch,
  FileSearch,
  Check,
  Zap,
  TrendingUp,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';

export default function ServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Complete Catalog of Services requested by the user
  const allServices = [
    // 1. AI & AUTOMATION
    {
      id: 'wa-business',
      category: 'ai-automation',
      categoryLabel: 'AI & Automation',
      badge: 'High Impact',
      icon: MessageSquare,
      title: 'WhatsApp Business Automation',
      subtitle: 'End-to-end automated WhatsApp interactions.',
      details: 'Replies to every inquiry, qualifies leads, sends follow-ups, and runs broadcasts — without anyone on your team touching it.',
      roi: 'Saves 25+ hrs/wk & boosts response speed to <60s',
      color: '#38A85B',
      accentBg: '#F0FDF4',
      borderAccent: '#BBF7D0',
    },
    {
      id: 'ai-lead-qual',
      category: 'ai-automation',
      categoryLabel: 'AI & Automation',
      badge: 'Conversion Booster',
      icon: Bot,
      title: 'AI Lead Qualification',
      subtitle: 'Automatic scoring and filtering for every lead.',
      details: 'Every lead that comes in gets scored automatically. Your team only speaks to people ready to buy.',
      roi: '3.8x higher sales closing rate by eliminating tire-kickers',
      color: '#102C42',
      accentBg: '#F2FAFD',
      borderAccent: '#DCE9EE',
    },
    {
      id: 'appointment-booking',
      category: 'ai-automation',
      categoryLabel: 'AI & Automation',
      badge: 'Zero Friction',
      icon: Calendar,
      title: 'Appointment Booking Automation',
      subtitle: 'Zero-touch scheduling and reminders.',
      details: 'Inquiry comes in, system qualifies, slot is booked, reminder sent. Zero staff in the scheduling loop.',
      roi: '0 missed appointments & calendar auto-sync',
      color: '#3E9FD0',
      accentBg: '#F0F9FF',
      borderAccent: '#BAE6FD',
    },
    {
      id: 'follow-up-seq',
      category: 'ai-automation',
      categoryLabel: 'AI & Automation',
      badge: 'Retention System',
      icon: Workflow,
      title: 'Follow-up Sequence Automation',
      subtitle: 'Multi-channel automated engagement sequences.',
      details: 'Automated sequences via WhatsApp, email, or AI call — triggered after every lead, demo, or proposal. Nothing falls through.',
      roi: 'Recovers 35%+ of dropped opportunities',
      color: '#8FD3F4',
      accentBg: '#F2FAFD',
      borderAccent: '#DCE9EE',
    },
    {
      id: 'cart-abandonment',
      category: 'ai-automation',
      categoryLabel: 'AI & Automation',
      badge: 'Direct Revenue',
      icon: ShoppingCart,
      title: 'Cart Abandonment Recovery',
      subtitle: 'Automated recovery sequences for lost sales.',
      details: 'Fires the moment a cart is abandoned — WhatsApp message, AI outbound call, or both. Revenue recovered automatically.',
      roi: 'Average 18–26% cart recovery rate',
      color: '#EA580C',
      accentBg: '#FFF7ED',
      borderAccent: '#FFEDD5',
    },
    {
      id: 'invoice-reminder',
      category: 'ai-automation',
      categoryLabel: 'AI & Automation',
      badge: 'Cash Flow Protection',
      icon: Receipt,
      title: 'Invoice & Payment Reminder',
      subtitle: 'Hands-free payment collection systems.',
      details: 'Reminders before due, escalating messages after — via WhatsApp, email, or AI call. You stop chasing payments manually.',
      roi: 'Reduces overdue accounts receivable by 65%',
      color: '#16A34A',
      accentBg: '#F0FDF4',
      borderAccent: '#BBF7D0',
    },
    {
      id: 'internal-workflow',
      category: 'ai-automation',
      categoryLabel: 'AI & Automation',
      badge: 'Ops Engine',
      icon: Layers,
      title: 'Internal Workflow Automation',
      subtitle: 'Seamless data bridging across your daily tools.',
      details: 'Connects your tools — Sheets, Notion, CRMs, WhatsApp — and removes every manual step between them. Built once, saves hours every week permanently.',
      roi: 'Cuts 20–40 operational hours every week',
      color: '#102C42',
      accentBg: '#F2FAFD',
      borderAccent: '#DCE9EE',
    },
    {
      id: 'custom-automation',
      category: 'ai-automation',
      categoryLabel: 'AI & Automation',
      badge: 'Bespoke Architecture',
      icon: Cpu,
      title: 'Custom AI & Automation',
      subtitle: 'Bespoke systems engineered perfectly for your specific bottleneck.',
      details: "A specific problem that doesn't fit a standard service. Tell us what's costing you time or money — we scope and build it.",
      roi: '100% custom solution mapped to your business ROI',
      color: '#38A85B',
      accentBg: '#F0FDF4',
      borderAccent: '#BBF7D0',
    },

    // 2. AI VOICE
    {
      id: 'inbound-voice',
      category: 'ai-voice',
      categoryLabel: 'AI Voice',
      badge: '24/7 Voice Support',
      icon: PhoneCall,
      title: 'Inbound AI Voice Agent',
      subtitle: '24/7 intelligent answering and lead routing.',
      details: 'Answers every call in under 3 seconds, qualifies the caller, handles FAQs, books appointments or transfers — 24/7, sounds fully human.',
      roi: 'Zero missed calls & 100% immediate answering rate',
      color: '#3E9FD0',
      accentBg: '#F0F9FF',
      borderAccent: '#BAE6FD',
    },
    {
      id: 'outbound-voice',
      category: 'ai-voice',
      categoryLabel: 'AI Voice',
      badge: 'Scalable Outreach',
      icon: Phone,
      title: 'Outbound AI Voice Agent',
      subtitle: 'Scalable proactive calling and engagement.',
      details: 'Calls your leads at scale — follow-ups, confirmations, re-engagement campaigns. Hundreds of calls, zero staff hours.',
      roi: 'Connects with 500+ contacts per hour autonomously',
      color: '#38A85B',
      accentBg: '#F0FDF4',
      borderAccent: '#BBF7D0',
    },
    {
      id: 'custom-voice',
      category: 'ai-voice',
      categoryLabel: 'AI Voice',
      badge: 'Advanced Logic',
      icon: Bot,
      title: 'Custom Voice Agent',
      subtitle: 'Complex voice logic and deep system integrations.',
      details: 'Multi-language support, complex conversation flows, deep system integrations — scoped and built to your exact requirement.',
      roi: 'Multi-lingual coverage across Indian regional dialects & English',
      color: '#102C42',
      accentBg: '#F2FAFD',
      borderAccent: '#DCE9EE',
    },

    // 3. WEB SYSTEMS
    {
      id: 'business-website',
      category: 'web',
      categoryLabel: 'Web Systems',
      badge: 'Conversion Engine',
      icon: Globe,
      title: 'Business Website',
      subtitle: 'Professional, conversion-focused online presence.',
      details: 'Mobile-first, built to convert. Every page has one goal — getting the visitor to take action. Up to 8 pages, SEO basics, lead form.',
      roi: 'Sub-second speed & guaranteed conversion focus',
      color: '#102C42',
      accentBg: '#F2FAFD',
      borderAccent: '#DCE9EE',
    },
    {
      id: 'landing-page',
      category: 'web',
      categoryLabel: 'Web Systems',
      badge: 'High Velocity',
      icon: Layout,
      title: 'Landing Page',
      subtitle: 'High-velocity standalone pages for campaigns.',
      details: 'One page, one goal. Built for ad campaigns, launches, or lead magnets. Designed to convert, not just look good.',
      roi: 'Tuned specifically for Google & Meta ad ROAS',
      color: '#38A85B',
      accentBg: '#F0FDF4',
      borderAccent: '#BBF7D0',
    },
    {
      id: 'website-redesign',
      category: 'web',
      categoryLabel: 'Web Systems',
      badge: 'Modernization',
      icon: RefreshCw,
      title: 'Website Redesign',
      subtitle: 'Total overhaul of speed, structure, and conversion flow.',
      details: 'Your current site is losing leads. We audit it and rebuild — speed, structure, mobile, and conversion flow fixed completely.',
      roi: 'Eliminates bounce rates & rejuvenates company brand',
      color: '#3E9FD0',
      accentBg: '#F0F9FF',
      borderAccent: '#BAE6FD',
    },
    {
      id: 'website-lead-pipeline',
      category: 'web',
      categoryLabel: 'Web Systems',
      badge: 'Complete Pipeline',
      icon: GitBranch,
      title: 'Website + Lead Pipeline',
      subtitle: 'High-converting site fully wired into automated CRM follow-ups.',
      details: 'Website connected to automation. Every form submission triggers a WhatsApp reply and follow-up sequence in under 60 seconds.',
      roi: 'Zero delay between inquiry submission and contact',
      color: '#38A85B',
      accentBg: '#F0FDF4',
      borderAccent: '#BBF7D0',
    },
    {
      id: 'ecommerce-store',
      category: 'web',
      categoryLabel: 'Web Systems',
      badge: 'Storefront & Ops',
      icon: ShoppingCart,
      title: 'E-commerce Store',
      subtitle: 'Optimized storefront with integrated recovery systems.',
      details: 'Full store with product pages, payment gateway, and post-purchase WhatsApp flows that bring customers back.',
      roi: 'Integrated payment gateways and post-purchase retention',
      color: '#EA580C',
      accentBg: '#FFF7ED',
      borderAccent: '#FFEDD5',
    },
    {
      id: 'custom-web-solution',
      category: 'web',
      categoryLabel: 'Web Systems',
      badge: 'Engineered Portals',
      icon: Globe,
      title: 'Custom Web Solution',
      subtitle: 'Tailored portals, dashboards, and booking platforms.',
      details: 'Portals, dashboards, booking platforms — scoped after discovery, built around the actual business problem.',
      roi: 'Enterprise architecture with 100% custom codebase ownership',
      color: '#102C42',
      accentBg: '#F2FAFD',
      borderAccent: '#DCE9EE',
    },

    // 4. AUDIT & STRATEGY
    {
      id: 'automation-audit',
      category: 'audit',
      categoryLabel: 'Audit & Strategy',
      badge: 'Executive Diagnostic',
      icon: Search,
      title: 'Business Automation Audit',
      subtitle: 'Comprehensive mapping of operational leaks and ROI fixes.',
      details: 'We map your entire operation, find every time and money leak, and deliver a prioritised roadmap with ROI estimates per item. Actionable whether you build with us or not.',
      roi: 'Exact dollar & hour leak calculation with prioritised fixes',
      color: '#38A85B',
      accentBg: '#F0FDF4',
      borderAccent: '#BBF7D0',
    },
    {
      id: 'conversion-audit',
      category: 'audit',
      categoryLabel: 'Audit & Strategy',
      badge: 'Friction Analysis',
      icon: FileSearch,
      title: 'Conversion & Website Audit',
      subtitle: 'Deep structural analysis of digital friction points.',
      details: 'Page-by-page review of your existing site — every friction point identified with specific, prioritised fixes. Not vague feedback.',
      roi: 'Pinpoints exact code and copy barriers preventing checkouts',
      color: '#102C42',
      accentBg: '#F2FAFD',
      borderAccent: '#DCE9EE',
    }
  ];

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'ai-automation', label: 'AI & Automation' },
    { id: 'ai-voice', label: 'AI Voice Agents' },
    { id: 'web', label: 'Web Systems' },
    { id: 'audit', label: 'Audit & Strategy' },
  ];

  const filteredServices = activeCategory === 'all'
    ? allServices
    : allServices.filter(s => s.category === activeCategory);

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* ================= HERO HEADER ================= */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(120px, 14vw, 160px) clamp(20px, 5vw, 64px) clamp(40px, 5vw, 60px)',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Subtle Ambient Atmosphere */}
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

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#38A85B',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 16,
            background: '#F2FAFD',
            border: '1px solid #DCE9EE',
            padding: '6px 16px',
            borderRadius: 9999,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#38A85B' }} />
            SYSTEMS THAT OUTPERFORM
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
            Systems Engineered Around Outcomes, <br />
            <span className="highlight-gradient">Not Deliverables.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#526673',
            maxWidth: 700,
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}>
            Autonomous AI workflows, 24/7 human-sounding voice agents, high-velocity web platforms, and operational audits built to scale revenue.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={() => setBookingOpen(true)}
              className="btn-zovance-primary"
              style={{ fontSize: 15, padding: '14px 32px' }}
            >
              <span>Book Free Strategy Audit</span>
              <ArrowRight size={15} />
            </button>
            <Link
              to="/contact"
              className="btn-zovance-ghost"
              style={{ fontSize: 15, padding: '14px 28px' }}
            >
              <span>Talk to Engineering</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= OUTPERO-STYLE 3-SYSTEM LEAK DIAGNOSTIC (Color & 3D Interactive) ================= */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px) clamp(60px, 8vw, 100px)',
      }}>
        <div style={{
          background: 'linear-gradient(180deg, #F2FAFD 0%, #FFFFFF 100%)',
          border: '1px solid #DCE9EE',
          borderRadius: 32,
          padding: 'clamp(32px, 5vw, 56px)',
          boxShadow: '0 20px 48px -12px rgba(16, 44, 66, 0.06)'
        }}>
          <div style={{ maxWidth: 760, marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
              REVENUE PRESERVATION MATRIX
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#102C42', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 12 }}>
              Where Indian Businesses Leak Revenue <br />
              <span style={{ color: '#526673', fontWeight: 500 }}>And how Zovance seals each leak permanently.</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(260px, 30vw, 340px), 1fr))',
            gap: 24,
          }} className="perspective-container">
            {[
              {
                num: '01',
                problem: 'Leads Going Cold',
                desc: '78% of customers buy from whoever answers first. When responses take hours, deals evaporate.',
                solution: 'WhatsApp & Voice AI responding in <3 seconds 24/7.',
                tag: 'Revenue Capture System',
                accentColor: '#38A85B',
                icon: Zap,
              },
              {
                num: '02',
                problem: 'Manual Repetitive Friction',
                desc: 'Teams lose 20–40 hours every week manually copy-pasting data, invoicing, and chasing calendars.',
                solution: 'Hands-free workflow synchronization across CRMs, Sheets, and tools.',
                tag: 'Operations Efficiency System',
                accentColor: '#102C42',
                icon: Workflow,
              },
              {
                num: '03',
                problem: 'Websites That Don’t Convert',
                desc: 'Traffic lands on slow, clunky websites and leaves without submitting contact information.',
                solution: 'Sub-second web architectures directly wired into instant automated pipelines.',
                tag: 'Conversion Engine',
                accentColor: '#3E9FD0',
                icon: Globe,
              }
            ].map(card => {
              const Icon = card.icon;
              return (
                <div
                  key={card.num}
                  className="card-3d"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #DCE9EE',
                    borderRadius: 24,
                    padding: '32px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 280,
                    boxShadow: '0 8px 24px rgba(16, 44, 66, 0.04)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    right: 20,
                    fontSize: 48,
                    fontWeight: 900,
                    color: '#F2FAFD',
                    pointerEvents: 'none',
                    letterSpacing: '-0.05em'
                  }}>
                    {card.num}
                  </div>

                  <div>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: '#F2FAFD',
                      border: '1px solid #DCE9EE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: card.accentColor,
                      marginBottom: 20,
                    }}>
                      <Icon size={20} />
                    </div>

                    <span style={{ fontSize: 11, fontWeight: 700, color: card.accentColor, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>
                      {card.tag}
                    </span>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: '#102C42', marginBottom: 10 }}>
                      {card.problem}
                    </h3>
                    <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6, marginBottom: 16 }}>
                      {card.desc}
                    </p>
                  </div>

                  <div style={{
                    borderTop: '1px solid #F1F5F9',
                    paddingTop: 14,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#102C42',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <CheckCircle2 size={16} color="#38A85B" style={{ flexShrink: 0 }} />
                    <span>{card.solution}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE CATEGORY FILTER TABS ================= */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px) 32px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          flexWrap: 'wrap',
          borderBottom: '1px solid #DCE9EE',
          paddingBottom: 20
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: activeCategory === cat.id ? '#102C42' : '#F2FAFD',
                color: activeCategory === cat.id ? '#FFFFFF' : '#526673',
                border: `1px solid ${activeCategory === cat.id ? '#102C42' : '#DCE9EE'}`,
                padding: '10px 22px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: activeCategory === cat.id ? '0 4px 14px rgba(16, 44, 66, 0.15)' : 'none'
              }}
              onMouseEnter={e => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.borderColor = '#102C42';
                  e.currentTarget.style.color = '#102C42';
                }
              }}
              onMouseLeave={e => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.borderColor = '#DCE9EE';
                  e.currentTarget.style.color = '#526673';
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ================= COMPREHENSIVE SERVICE CARDS GRID ================= */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 12vw, 140px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 380px), 1fr))',
          gap: 24,
        }} className="perspective-container">
          {filteredServices.map(service => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="card-3d"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #DCE9EE',
                  borderRadius: 24,
                  padding: ' clamp(24px, 4vw, 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(16, 44, 66, 0.04)',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div>
                  {/* Card Header Top */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <div style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: service.accentBg,
                      border: `1px solid ${service.borderAccent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: service.color,
                    }}>
                      <Icon size={22} />
                    </div>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: service.accentBg,
                      color: service.color,
                      border: `1px solid ${service.borderAccent}`,
                      letterSpacing: '0.04em'
                    }}>
                      {service.badge}
                    </span>
                  </div>

                  {/* Category breadcrumb */}
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#8A9CA8',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 6
                  }}>
                    {service.categoryLabel}
                  </span>

                  {/* Title & Subtitle */}
                  <h3 style={{ fontSize: 21, fontWeight: 800, color: '#102C42', letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.25 }}>
                    {service.title}
                  </h3>

                  <p style={{ fontSize: 14, fontWeight: 600, color: service.color, marginBottom: 12 }}>
                    {service.subtitle}
                  </p>

                  <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.65, marginBottom: 20 }}>
                    {service.details}
                  </p>
                </div>

                {/* Card Bottom ROI & CTA */}
                <div>
                  <div style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    padding: '10px 14px',
                    marginBottom: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#102C42'
                  }}>
                    <TrendingUp size={15} color="#38A85B" style={{ flexShrink: 0 }} />
                    <span>{service.roi}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <button
                      onClick={() => setBookingOpen(true)}
                      style={{
                        background: '#102C42',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: 9999,
                        padding: '10px 20px',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#38A85B'}
                      onMouseLeave={e => e.currentTarget.style.background = '#102C42'}
                    >
                      <span>Deploy System</span>
                      <ArrowRight size={13} />
                    </button>

                    <Link
                      to="/contact"
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#526673',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#102C42'}
                      onMouseLeave={e => e.currentTarget.style.color = '#526673'}
                    >
                      Scope Requirements &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CLOSING ACTION STAGE ================= */}
      <section style={{
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 64px)',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 100%, #F2FAFD 0%, #FFFFFF 80%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: 740, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
            READY TO STOP LEAKING REVENUE?
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: '#102C42', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
            Let's build systems that outpace your competition.
          </h2>
          <p style={{ fontSize: 16, color: '#526673', lineHeight: 1.6, marginBottom: 36, maxWidth: 580, marginLeft: 'auto', marginRight: 'auto' }}>
            Book a complimentary 30-minute operational audit. We'll map your friction points and present an exact roadmap before any commitment.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={() => setBookingOpen(true)}
              className="btn-zovance-green"
              style={{ fontSize: 15, padding: '15px 36px' }}
            >
              <span>Schedule Free Audit</span>
              <ArrowRight size={16} />
            </button>
            <Link to="/contact" className="btn-zovance-ghost" style={{ fontSize: 15, padding: '15px 30px' }}>
              <span>Send Direct Inquiry</span>
            </Link>
          </div>
        </div>
      </section>

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
