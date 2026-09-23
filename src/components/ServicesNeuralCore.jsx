import { useState } from 'react';
import { ArrowRight, Globe, BarChart3, Cpu, MessageSquareText, CheckCircle2, ChevronRight, Zap, Sparkles, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES_DATA = [
  {
    id: 'web-making',
    title: 'Website Making',
    badge: 'Digital Presence',
    icon: Globe,
    accent: '#00f0ff',
    angle: -135, // top-left
    tagline: 'High-conversion, ultra-responsive digital flagship platforms.',
    description: 'We architect modern digital experiences with sub-second page performance, bespoke motion design, and seamless CMS architectures.',
    subServices: [
      {
        name: 'Full-Stack Web Apps',
        desc: 'React / Next.js production platforms with real-time database and auth sync.',
        tags: ['React', 'Next.js', 'Vite', 'Tailwind'],
      },
      {
        name: 'High-Conversion Landing Pages',
        desc: 'Custom UI/UX with interactive micro-animations engineered for maximum lead capture.',
        tags: ['Performance', 'Motion UI', 'Figma to Code'],
      },
      {
        name: 'E-Commerce & Portals',
        desc: 'Secure checkout systems, member dashboards, and scalable inventory backends.',
        tags: ['Stripe', 'Supabase', 'Custom Portals'],
      },
    ],
    ctaText: 'Build Your Website',
    ctaLink: '/contact?service=web-making',
  },
  {
    id: 'audit',
    title: 'Business Audit',
    badge: 'Operations & Growth',
    icon: BarChart3,
    accent: '#38bdf8',
    angle: -45, // top-right
    tagline: 'Deep architectural and workflow diagnostics for scale.',
    description: 'Identify operational bottlenecks, redundant subscription costs, and untapped automation leverage across your business stack.',
    subServices: [
      {
        name: 'Tech Stack & Cost Audit',
        desc: 'Eliminate duplicate SaaS billing and consolidate fragmentation into lean pipelines.',
        tags: ['Cost Reduction', 'SaaS Optimization', 'Tool Consolidation'],
      },
      {
        name: 'Workflow Bottleneck Analysis',
        desc: 'Map every manual touchpoint to unlock hours of lost team productivity weekly.',
        tags: ['Process Mapping', 'Team Efficiency', 'KPI Tracking'],
      },
      {
        name: 'Security & Scalability Roadmap',
        desc: 'Actionable 90-day execution blueprint for dependable, enterprise-ready growth.',
        tags: ['Architecture', 'Compliance', 'Scale Blueprint'],
      },
    ],
    ctaText: 'Request An Audit',
    ctaLink: '/contact?service=audit',
  },
  {
    id: 'automations',
    title: 'Automations',
    badge: 'Zero Manual Friction',
    icon: Cpu,
    accent: '#38A85B',
    angle: 135, // bottom-left
    tagline: 'End-to-end intelligent pipelines that work 24/7 without error.',
    description: 'Connect disjointed systems into synchronized workflows. Automate lead triage, invoice generation, customer onboarding, and data verification.',
    subServices: [
      {
        name: 'Custom Workflow Pipelines',
        desc: 'Webhook triggers, API bridges, and multi-step conditional routing without failure.',
        tags: ['Zapier / Make', 'n8n', 'Custom Python / Node'],
      },
      {
        name: 'CRM & ERP Synchronization',
        desc: 'Instant bidirectional syncing between sales records, customer data, and accounting.',
        tags: ['HubSpot', 'Salesforce', 'Stripe', 'Airtable'],
      },
      {
        name: 'Autonomous Document Processing',
        desc: 'AI parsing of PDFs, invoices, contracts, and receipts directly into databases.',
        tags: ['OCR / LLM', 'Data Extraction', 'Auto-Filing'],
      },
    ],
    ctaText: 'Automate Workflows',
    ctaLink: '/automations',
  },
  {
    id: 'voice-agents',
    title: 'Voice Agents & Messages',
    badge: 'Conversational AI',
    icon: MessageSquareText,
    accent: '#00f0ff',
    angle: 45, // bottom-right
    tagline: 'Sub-second conversational voice intelligence and SMS dispatch.',
    description: 'Natural voice AI that handles calls, qualifies inbound opportunities, books appointments, and triggers personalized instant SMS follow-ups.',
    subServices: [
      {
        name: '24/7 Inbound Receptionist',
        desc: 'Human-parity conversational reception that resolves queries and schedules clients.',
        tags: ['Sub-second Latency', 'Telephony', 'Calendar Sync'],
      },
      {
        name: 'Outbound Nurturing & Follow-ups',
        desc: 'Proactive call campaigns that confirm appointments and reactivate cold pipelines.',
        tags: ['Multi-accent', 'Warm Transfers', 'Sentiment Analysis'],
      },
      {
        name: 'Multi-Channel SMS & WhatsApp',
        desc: 'Instant automated message confirmation, follow-up chains, and booking reminders.',
        tags: ['Twilio', 'WhatsApp Business', 'Omnichannel'],
      },
    ],
    ctaText: 'Deploy Voice AI',
    ctaLink: '/contact?service=voice-agents',
  },
];

export default function ServicesNeuralCore() {
  const [selectedServiceId, setSelectedServiceId] = useState('web-making');
  const [hoveredServiceId, setHoveredServiceId] = useState(null);

  const activeService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 30%, #0d1e2e 0%, #060e17 60%, #02070c 100%)',
        color: '#FFFFFF',
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 4vw, 48px)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
      }}
    >
      {/* Background Cybernetic Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient Sci-Fi Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(500px, 60vw, 900px)',
          height: 'clamp(500px, 60vw, 900px)',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, rgba(56, 189, 248, 0.05) 45%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.18em',
              color: '#00f0ff',
              textTransform: 'uppercase',
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              padding: '6px 18px',
              borderRadius: 9999,
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#00f0ff',
                boxShadow: '0 0 10px #00f0ff',
                animation: 'pulse-ring 2s infinite',
              }}
            />
            <span>NEURAL ARCHITECTURE • SERVICES CORE</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(34px, 5.2vw, 64px)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.08,
              color: '#FFFFFF',
              marginBottom: 16,
            }}
          >
            Engineered Capabilities.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 50%, #38A85B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Intelligent Scale.
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 19px)',
              color: '#94a9b8',
              maxWidth: 680,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Click any circuit node to initiate branch diagnostic and inspect sub-service capabilities.
          </p>
        </div>

        {/* Desktop Circuit Core Layout (SVG Traces + Interactive Nodes) */}
        <div
          className="circuit-board-container"
          style={{
            position: 'relative',
            background: 'rgba(10, 24, 38, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 36,
            border: '1px solid rgba(0, 240, 255, 0.22)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 240, 255, 0.08) inset',
            padding: 'clamp(28px, 4vw, 56px)',
            overflow: 'hidden',
          }}
        >
          {/* Top 4 Circuit Branch Selector Buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
              marginBottom: 44,
              position: 'relative',
              zIndex: 3,
            }}
          >
            {SERVICES_DATA.map((service, index) => {
              const isSelected = selectedServiceId === service.id;
              const isHovered = hoveredServiceId === service.id;
              const Icon = service.icon;

              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  onMouseEnter={() => setHoveredServiceId(service.id)}
                  onMouseLeave={() => setHoveredServiceId(null)}
                  style={{
                    position: 'relative',
                    background: isSelected
                      ? 'linear-gradient(145deg, rgba(0, 240, 255, 0.18) 0%, rgba(16, 44, 66, 0.75) 100%)'
                      : isHovered
                      ? 'rgba(14, 34, 52, 0.8)'
                      : 'rgba(9, 21, 32, 0.6)',
                    border: isSelected
                      ? '1px solid #00f0ff'
                      : isHovered
                      ? '1px solid rgba(0, 240, 255, 0.45)'
                      : '1px solid rgba(220, 233, 238, 0.12)',
                    borderRadius: 20,
                    padding: '20px 22px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isSelected
                      ? '0 0 28px rgba(0, 240, 255, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4)'
                      : '0 4px 14px rgba(0, 0, 0, 0.25)',
                    transform: isSelected ? 'translateY(-3px)' : 'none',
                  }}
                >
                  {/* Active Terminal Indicator Pin */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: isSelected ? '#00f0ff' : 'rgba(255, 255, 255, 0.2)',
                      boxShadow: isSelected ? '0 0 10px #00f0ff, 0 0 16px #00f0ff' : 'none',
                    }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: isSelected ? '#00f0ff' : 'rgba(0, 240, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? '#060e17' : '#00f0ff',
                        boxShadow: isSelected ? '0 0 18px rgba(0, 240, 255, 0.6)' : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: '0.12em',
                        color: isSelected ? '#00f0ff' : '#6f8695',
                        textTransform: 'uppercase',
                      }}
                    >
                      0{index + 1} // NODE
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: isSelected ? '#FFFFFF' : '#DCE9EE',
                      marginBottom: 4,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 12,
                      color: isSelected ? '#8FD3F4' : '#6f8695',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {service.badge}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Circuit Core Canvas & Trace Diagram */}
          <div
            style={{
              position: 'relative',
              borderRadius: 24,
              background: 'rgba(6, 14, 23, 0.95)',
              border: '1px solid rgba(0, 240, 255, 0.18)',
              padding: 'clamp(24px, 4vw, 44px)',
              overflow: 'hidden',
            }}
          >
            {/* SVG Circuit Traces Diagram */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
              }}
            >
              {/* Center Core Sci-Fi Reactor Display */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 20,
                  paddingBottom: 24,
                  borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Glowing Sci-Fi Core Reactor */}
                  <div
                    style={{
                      position: 'relative',
                      width: 58,
                      height: 58,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Outer Rotating Ring */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '2px dashed rgba(0, 240, 255, 0.65)',
                        animation: 'spin 14s linear infinite',
                      }}
                    />
                    {/* Middle Pulse Ring */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 6,
                        borderRadius: '50%',
                        border: '1px solid #38bdf8',
                        boxShadow: '0 0 16px rgba(0, 240, 255, 0.5) inset, 0 0 20px rgba(0, 240, 255, 0.4)',
                        animation: 'pulse-ring 2.5s infinite',
                      }}
                    />
                    {/* Core Light Center */}
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: '#00f0ff',
                        boxShadow: '0 0 20px #00f0ff, 0 0 32px #00f0ff',
                      }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#00f0ff', letterSpacing: '0.12em' }}>
                        ACTIVE BRANCH: {activeService.id.toUpperCase()}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          padding: '2px 8px',
                          borderRadius: 6,
                          background: 'rgba(56, 168, 91, 0.2)',
                          color: '#38A85B',
                          fontWeight: 700,
                          border: '1px solid rgba(56, 168, 91, 0.4)',
                        }}
                      >
                        STREAM SYNCHRONIZED
                      </span>
                    </div>
                    <h4 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginTop: 4 }}>
                      {activeService.title}
                    </h4>
                  </div>
                </div>

                <Link
                  to={activeService.ctaLink}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'linear-gradient(135deg, #00f0ff 0%, #38bdf8 100%)',
                    color: '#060e17',
                    fontWeight: 800,
                    fontSize: 14,
                    padding: '12px 24px',
                    borderRadius: 9999,
                    textDecoration: 'none',
                    boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                    e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 240, 255, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.4)';
                  }}
                >
                  <span>{activeService.ctaText}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Tagline & Core Summary */}
              <div>
                <p style={{ fontSize: 'clamp(16px, 2vw, 21px)', color: '#8FD3F4', fontWeight: 600, lineHeight: 1.45, marginBottom: 8 }}>
                  "{activeService.tagline}"
                </p>
                <p style={{ fontSize: 15, color: '#9bb1c1', maxWidth: 880, lineHeight: 1.6 }}>
                  {activeService.description}
                </p>
              </div>

              {/* Circuit Bus Decorative SVG Strip */}
              <div style={{ position: 'relative', width: '100%', height: 26, overflow: 'hidden' }}>
                <svg width="100%" height="26" viewBox="0 0 800 26" fill="none" preserveAspectRatio="none">
                  <path d="M0 13 H340 L360 3 H440 L460 13 H800" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1.5" />
                  <path d="M360 3 H440" stroke="#00f0ff" strokeWidth="2.5" />
                  <circle cx="360" cy="3" r="3" fill="#00f0ff" />
                  <circle cx="440" cy="3" r="3" fill="#00f0ff" />
                  <circle cx="400" cy="3" r="4" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Dynamic Child Nodes (Sub-Services) */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#6f8695', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
                  EXPANDED SUBSYSTEMS & CAPABILITIES (3 NODES)
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 18,
                  }}
                >
                  {activeService.subServices.map((sub, idx) => (
                    <div
                      key={sub.name}
                      style={{
                        background: 'rgba(12, 29, 45, 0.75)',
                        border: '1px solid rgba(0, 240, 255, 0.18)',
                        borderRadius: 18,
                        padding: 22,
                        position: 'relative',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#00f0ff';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.18)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      {/* Node Header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: '#00f0ff', letterSpacing: '0.1em' }}>
                          SUB-NODE 0{idx + 1}
                        </span>
                        <Zap size={14} color="#00f0ff" />
                      </div>

                      <h5 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 8, letterSpacing: '-0.01em' }}>
                        {sub.name}
                      </h5>

                      <p style={{ fontSize: 13, color: '#9bb1c1', lineHeight: 1.55, marginBottom: 16 }}>
                        {sub.desc}
                      </p>

                      {/* Tech/Tag Badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {sub.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: '#8FD3F4',
                              background: 'rgba(0, 240, 255, 0.08)',
                              border: '1px solid rgba(0, 240, 255, 0.2)',
                              padding: '3px 10px',
                              borderRadius: 6,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
