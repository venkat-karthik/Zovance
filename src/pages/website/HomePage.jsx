import { useState } from 'react';
import { ArrowRight, MessageCircle, Zap, Phone, Layers, BarChart3, ChevronRight, Star, Sparkles, CheckCircle2, ShieldCheck, Terminal, Play, ExternalLink } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import ClosingCtaBanner from '../../components/ClosingCtaBanner';
import { useStore } from '../../store/useStore';

const featuredProjects = [
  {
    id: 'alluri',
    name: 'Alluri Resorts',
    subtitle: 'Luxury Booking Engine',
    tag: 'Hospitality & Resort Tech',
    desc: 'A full-stack reservation system with real-time room availability, automated guest WhatsApp communication, and zero-friction payment processing.',
    url: 'https://alluriresorts.com/',
    image: '/alluri-resort.jpg',
    quote: '"Zovance transformed our booking process. It\'s fast, reliable, and effortless."',
    author: 'Alluri Resorts Client',
    metrics: [
      { label: 'Monthly Bookings', value: '350+' },
      { label: 'Automated Flow', value: '100%' },
      { label: 'Booking Speed', value: '< 1 sec' },
    ],
  },
  {
    id: 'primalane',
    name: 'Prima Lane',
    subtitle: 'Luxury E-Commerce Platform',
    tag: 'E-Commerce & Retail AI',
    desc: 'Custom high-conversion storefront featuring automated inventory sync, dynamic checkout experience, and integrated WhatsApp cart recovery flows.',
    url: 'https://primalane.com/',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
    quote: '"Our sales increased by 3.4x within 60 days of deploying Zovance\'s AI retention workflow."',
    author: 'Prima Lane Founder',
    metrics: [
      { label: 'Conversion Boost', value: '4.8x' },
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Revenue Scaled', value: '+340%' },
    ],
  },
  {
    id: 'manacare',
    name: 'Mana Care',
    subtitle: 'Healthcare Voice AI Suite',
    tag: 'Healthcare & Medical Tech',
    desc: 'Multilingual 24/7 AI voice caller system that handles patient appointment intake, prescription reminders, and EMR calendar synchronization.',
    url: '#',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=500&fit=crop',
    quote: '"No more chaotic phone lines during morning hours. The AI handles 200+ appointment calls daily."',
    author: 'MedCare Operations',
    metrics: [
      { label: 'Call Wait Reduction', value: '60%' },
      { label: 'Daily Voice Calls', value: '200+' },
      { label: 'Missed Calls', value: '0%' },
    ],
  },
];

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [viewportMode, setViewportMode] = useState('desktop');
  const activeProj = featuredProjects[activeProjectIdx];
  const { darkMode } = useStore();

  return (
    <div style={{ background: '#FBFBF9', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* ================= HERO SECTION WITH ANIMATED AMBIENT MESH GLOW ================= */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(32px, 5vw, 64px) clamp(16px, 4vw, 36px)',
        position: 'relative',
      }}>
        {/* Animated Perfectly Light Pastel Mesh Glow Background */}
        <div
          className="ambient-mesh-glow"
          style={{
            position: 'absolute',
            top: -60,
            left: '10%',
            width: 'clamp(400px, 50vw, 650px)',
            height: 'clamp(400px, 50vw, 580px)',
            background: darkMode
              ? 'radial-gradient(circle, rgba(45, 212, 191, 0.28) 0%, rgba(96, 165, 250, 0.22) 38%, rgba(244, 114, 182, 0.16) 75%, transparent 100%)'
              : 'radial-gradient(circle, rgba(45, 212, 191, 0.42) 0%, rgba(96, 165, 250, 0.35) 38%, rgba(244, 114, 182, 0.24) 75%, transparent 100%)',
            filter: 'blur(34px)',
            willChange: 'transform, opacity',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>

          {/* Hero Content Block with Laptop Mockup beside text */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-12">

            {/* Headline + Subtitle Statement */}
            <div style={{ marginBottom: 28 }}>
              <h1 style={{
                fontSize: 'clamp(42px, 6.5vw, 76px)',
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: '-0.03em',
                color: darkMode ? '#F8FAFC' : '#0F172A',
                marginBottom: 20,
                maxWidth: 760,
              }}>
                Turn Ideas Into Real{' '}
                <span className="impact-gradient font-serif" style={{ fontStyle: 'italic', paddingRight: 8 }}>
                  Impact.
                </span>
              </h1>
              <p style={{
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: darkMode ? '#CBD5E1' : '#475569',
                lineHeight: 1.6,
                maxWidth: 620,
              }}>
                We design, build, and deploy AI-powered systems that automate, scale, and create measurable growth for modern businesses.
              </p>
            </div>


            {/* Tech Stack Badge Pills */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 32,
            }}>
              {['WhatsApp API', 'Voice AI Agents', 'OpenAI GPT-4o', 'N8N Pipelines', 'Stripe Billing'].map((tech) => (
                <span key={tech} style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#475569',
                  background: '#ffffff',
                  border: '1px solid #E2E8F0',
                  padding: '4px 12px',
                  borderRadius: 9999,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              flexWrap: 'wrap',
              marginBottom: 28,
            }}>
              <button
                className="btn-dark-pill"
                onClick={() => setBookingOpen(true)}
              >
                <span>Book a Strategy Call</span>
                <ArrowRight size={16} />
              </button>

              <button
                className="btn-white-pill"
                onClick={() => window.open('https://wa.me/918309827125', '_blank')}
              >
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}>
                  <MessageCircle size={12} />
                </div>
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* Social Proof Founder Rating Chip */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 44,
            }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: darkMode ? '#F8FAFC' : '#0F172A' }}>
                4.5/5 Average Rating
              </span>
              <span style={{ fontSize: 12, color: darkMode ? '#94A3B8' : '#64748B' }}>
                • Trusted by 10 Companies
              </span>
            </div>

            {/* Integrated Client Trust Marquee with Continuous Motion (Above Metrics) */}
            <div style={{
              marginTop: 36,
              paddingTop: 20,
              paddingBottom: 24,
              borderTop: '1px solid #E2E8F0',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              overflow: 'hidden',
            }}>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#64748B',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                paddingRight: 16,
                borderRight: '1px solid #E2E8F0',
              }}>
                TRUSTED BY
              </div>

              <div className="marquee-container">
                <div className="marquee-track">
                  {[...Array(3)].map((_, loopIdx) => (
                    <div key={loopIdx} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(28px, 4vw, 52px)' }}>
                      {/* Alluri Resorts */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: '#334155' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>Alluri Resorts</span>
                      </div>

                      {/* PRIMA LANE */}
                      <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '0.08em', color: '#1E293B', fontFamily: 'Instrument Serif, serif' }}>
                        PRIMA LANE
                      </div>

                      {/* Mana Care */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: '#334155' }}>
                        <div style={{ width: 17, height: 17, background: '#475569', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 900 }}>+</div>
                        <span>Mana Care</span>
                      </div>

                      {/* Kesar Kosmetics */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 14, color: '#334155' }}>
                        <span style={{ fontSize: 15 }}>✦</span>
                        <span>Kesar Kosmetics</span>
                      </div>

                      {/* Weather Wiz */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 14, color: '#334155' }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.5 19.5A4.5 4.5 0 0 0 21 12c-1.07 0-2.07.38-2.85 1.02A7 7 0 0 0 5 13.5a5 5 0 0 0 1 9.9" />
                        </svg>
                        <span>Weather Wiz</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Row (Below Marquee) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
              paddingTop: 28,
            }}>
              <div>
                <div style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  ₹2.4Cr+
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2, fontWeight: 500 }}>
                  Revenue<br />Generated
                </div>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  50+
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2, fontWeight: 500 }}>
                  Projects<br />Delivered
                </div>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  95%
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2, fontWeight: 500 }}>
                  Client<br />Retention
                </div>
              </div>
              <div>
                <div style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                  3x
                </div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2, fontWeight: 500 }}>
                  Average<br />Client ROI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DO (SERIF WATERMARK PASTEL CARDS) ================= */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 4vw, 36px)',
      }}>
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 24,
          marginBottom: 48,
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#64748B', textTransform: 'uppercase', marginBottom: 12 }}>
              WHAT WE DO
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#0F172A',
              lineHeight: 1.15,
            }}>
              End-to-end solutions<br />
              for modern businesses.
            </h2>
          </div>

          <div style={{ maxWidth: 360 }}>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 16 }}>
              From AI agents to full-stack platforms, we build what your business needs next.
            </p>
            <button
              className="btn-white-pill"
              onClick={() => setBookingOpen(true)}
              style={{ fontSize: 13, padding: '10px 20px' }}
            >
              <span>Explore all services</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 4 Card Pastel Grid with Giant Watermark Numbers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          
          {/* Card 01: AI & Workflow Automation */}
          <div className="card-pastel-peach" style={{
            borderRadius: 24,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 300,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div className="watermark-num">01</div>
            <div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: '#FFEDD5',
                color: '#EA580C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                boxShadow: '0 10px 25px rgba(234, 88, 12, 0.18)',
              }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
                AI & Workflow Automation
              </h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                Eliminate manual work with autonomous AI agents and smart workflows.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, position: 'relative', zIndex: 1 }}>
              <button
                onClick={() => setBookingOpen(true)}
                style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 700, color: '#0F172A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <span>Learn more</span>
                <ArrowRight size={14} />
              </button>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#EA580C' }}>01</span>
            </div>
          </div>

          {/* Card 02: AI Voice Systems */}
          <div className="card-pastel-blue" style={{
            borderRadius: 24,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 300,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div className="watermark-num">02</div>
            <div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: '#DBEAFE',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                boxShadow: '0 10px 25px rgba(37, 99, 235, 0.18)',
              }}>
                <Phone size={24} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
                AI Voice Systems
              </h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                24/7 multilingual voice agents for support, sales, and bookings.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, position: 'relative', zIndex: 1 }}>
              <button
                onClick={() => setBookingOpen(true)}
                style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 700, color: '#0F172A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <span>Learn more</span>
                <ArrowRight size={14} />
              </button>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#2563EB' }}>02</span>
            </div>
          </div>

          {/* Card 03: Custom Web Engineering */}
          <div className="card-pastel-pink" style={{
            borderRadius: 24,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 300,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div className="watermark-num">03</div>
            <div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: '#FCE7F3',
                color: '#DB2777',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                boxShadow: '0 10px 25px rgba(219, 39, 119, 0.18)',
              }}>
                <Layers size={24} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
                Custom Web Engineering
              </h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                High-performance web apps, e-commerce platforms, and internal tools.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, position: 'relative', zIndex: 1 }}>
              <button
                onClick={() => setBookingOpen(true)}
                style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 700, color: '#0F172A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <span>Learn more</span>
                <ArrowRight size={14} />
              </button>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#DB2777' }}>03</span>
            </div>
          </div>

          {/* Card 04: Strategy & Audits */}
          <div className="card-pastel-mint" style={{
            borderRadius: 24,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 300,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div className="watermark-num">04</div>
            <div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: '#D1FAE5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                boxShadow: '0 10px 25px rgba(5, 150, 105, 0.18)',
              }}>
                <BarChart3 size={24} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
                Strategy & Audits
              </h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                Discover opportunities, get a 90-day automation roadmap, and achieve measurable ROI.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, position: 'relative', zIndex: 1 }}>
              <button
                onClick={() => setBookingOpen(true)}
                style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 700, color: '#0F172A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <span>Learn more</span>
                <ArrowRight size={14} />
              </button>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#059669' }}>04</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE FEATURED PROJECTS SHOWCASE ================= */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 36px) clamp(60px, 8vw, 100px)',
      }}>
        {/* Section Title */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: darkMode ? '#94A3B8' : '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>
            FEATURED CLIENT SHOWCASE
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, color: darkMode ? '#F8FAFC' : '#0F172A', letterSpacing: '-0.02em' }}>
            Explore Working Systems We Built
          </h2>
        </div>

        {/* Interactive Visual Project Selector Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 36,
        }}>
          {featuredProjects.map((proj, idx) => {
            const isSelected = activeProjectIdx === idx;
            return (
              <div
                key={proj.id}
                onClick={() => setActiveProjectIdx(idx)}
                style={{
                  padding: '18px 22px',
                  borderRadius: 20,
                  border: isSelected
                    ? '2px solid #3B82F6'
                    : (darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0'),
                  background: isSelected
                    ? (darkMode ? '#1E293B' : '#0F172A')
                    : (darkMode ? '#131B2E' : '#ffffff'),
                  color: isSelected ? '#ffffff' : (darkMode ? '#CBD5E1' : '#0F172A'),
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isSelected ? '0 12px 28px rgba(59, 130, 246, 0.25)' : '0 2px 8px rgba(0,0,0,0.02)',
                  transform: isSelected ? 'translateY(-3px)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: isSelected ? '#60A5FA' : '#64748B', letterSpacing: '0.08em' }}>
                    0{idx + 1} • {proj.tag.split(' ')[0]}
                  </span>
                  {isSelected && (
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 10px #60A5FA' }} />
                  )}
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>{proj.name}</div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>{proj.subtitle}</div>
              </div>
            );
          })}
        </div>

        {/* Selected Project Dynamic Showcase Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'center',
        }}>
          
          {/* Left Project Info */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-5">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 9999,
              background: darkMode ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF',
              border: darkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid #BFDBFE',
              color: darkMode ? '#60A5FA' : '#2563EB',
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 16,
            }}>
              <Sparkles size={13} />
              <span>{activeProj.tag}</span>
            </div>

            <h3 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: darkMode ? '#F8FAFC' : '#0F172A',
              marginBottom: 16,
            }}>
              {activeProj.name}<br />
              <span className="font-serif" style={{ fontWeight: 400, fontStyle: 'italic', color: darkMode ? '#CBD5E1' : '#475569' }}>{activeProj.subtitle}</span>
            </h3>

            <p style={{ fontSize: 15, color: darkMode ? '#CBD5E1' : '#475569', lineHeight: 1.6, marginBottom: 28 }}>
              {activeProj.desc}
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
              <button
                className="btn-dark-pill"
                onClick={() => window.open(activeProj.url, '_blank')}
              >
                <span>Launch Live System</span>
                <ExternalLink size={15} />
              </button>
            </div>

            {/* Metrics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${activeProj.metrics.length}, 1fr)`,
              gap: 16,
              paddingTop: 24,
              borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
            }}>
              {activeProj.metrics.map((m) => (
                <div key={m.label}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: darkMode ? '#F8FAFC' : '#0F172A' }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: darkMode ? '#94A3B8' : '#64748B', marginTop: 2, fontWeight: 500 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Project Media Showcase (Unique Browser Window Frame) */}
          <div style={{ gridColumn: 'span 12 / span 12', position: 'relative' }} className="lg:col-span-7">
            
            {/* Browser Chrome Window Mockup */}
            <div style={{
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: darkMode ? '0 24px 60px rgba(0, 0, 0, 0.5)' : '0 20px 48px rgba(15, 23, 42, 0.12)',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #E2E8F0',
              background: darkMode ? '#0F1420' : '#ffffff',
            }}>
              
              {/* Browser Header Bar */}
              <div style={{
                background: darkMode ? '#1E293B' : '#0F172A',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  borderRadius: 8,
                  padding: '4px 14px',
                  fontSize: 12,
                  color: '#E2E8F0',
                  fontFamily: 'monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  maxWidth: 320,
                  width: '100%',
                }}>
                  <span style={{ color: '#34D399', fontSize: 10 }}>🔒 https://</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {activeProj.url !== '#' ? activeProj.url.replace('https://', '') : `${activeProj.id}.zovance.ai`}
                  </span>
                </div>

                {/* Viewport Mode Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button
                    onClick={() => setViewportMode('desktop')}
                    style={{
                      background: viewportMode === 'desktop' ? 'rgba(255,255,255,0.2)' : 'transparent',
                      border: 'none',
                      borderRadius: 6,
                      padding: '4px 8px',
                      color: '#ffffff',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    💻 <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    onClick={() => setViewportMode('mobile')}
                    style={{
                      background: viewportMode === 'mobile' ? 'rgba(255,255,255,0.2)' : 'transparent',
                      border: 'none',
                      borderRadius: 6,
                      padding: '4px 8px',
                      color: '#ffffff',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    📱 <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>
              </div>

              {/* Viewport Frame Window */}
              <div style={{
                position: 'relative',
                background: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: viewportMode === 'mobile' ? '24px 16px' : 0,
                minHeight: 420,
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  width: viewportMode === 'mobile' ? '300px' : '100%',
                  borderRadius: viewportMode === 'mobile' ? 24 : 0,
                  overflow: 'hidden',
                  border: viewportMode === 'mobile' ? '4px solid #334155' : 'none',
                  boxShadow: viewportMode === 'mobile' ? '0 16px 36px rgba(0,0,0,0.5)' : 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}>
                  <img
                    src={activeProj.image}
                    alt={activeProj.name}
                    style={{
                      width: '100%',
                      height: viewportMode === 'mobile' ? '450px' : '420px',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'all 0.4s ease',
                    }}
                  />
                </div>

                {/* Floating Testimonial Quote Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  maxWidth: 250,
                  background: darkMode ? 'rgba(19, 27, 46, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  padding: 14,
                  borderRadius: 16,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
                }} className="hidden sm:block">
                  <div style={{ fontSize: 20, lineHeight: 1, color: darkMode ? '#F8FAFC' : '#0F172A', fontFamily: 'serif', marginBottom: 2 }}>
                    “
                  </div>
                  <p style={{ fontSize: 11, color: darkMode ? '#CBD5E1' : '#334155', lineHeight: 1.4, marginBottom: 10, fontStyle: 'italic' }}>
                    {activeProj.quote}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, background: '#3B82F6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900 }}>
                      ✓
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: darkMode ? '#F8FAFC' : '#0F172A' }}>{activeProj.author}</div>
                  </div>
                </div>

                {/* Carousel Counter Chip */}
                <div style={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '6px 14px',
                  borderRadius: 9999,
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      <ClosingCtaBanner onBookCall={() => setBookingOpen(true)} />

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
