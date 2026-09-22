import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, X, Compass, Cpu, HeartHandshake, ShieldCheck, Sparkles, MessageSquareCode, Workflow, ChevronRight } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState('Our Story & Vision');

  const openVideo = (title) => {
    setVideoTitle(title);
    setVideoModalOpen(true);
  };

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* ================= 1. HERO SECTION ================= */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 64px) 32px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #F2FAFD 0%, #FFFFFF 100%)',
      }}>
        {/* Soft atmospheric background light */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: 'clamp(350px, 45vw, 650px)',
          height: 'clamp(350px, 45vw, 650px)',
          background: 'radial-gradient(circle, rgba(143, 211, 244, 0.45) 0%, rgba(242, 250, 253, 0.1) 70%, transparent 100%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{
          maxWidth: 1320,
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
          flex: 1,
        }}>
          {/* Left Hero Content */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#38A85B',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#38A85B' }} />
              <span>ZOVANCE</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(44px, 6.2vw, 76px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: '#102C42',
              marginBottom: 24,
            }}>
              Ideas for a<br />
              <span className="highlight-gradient">Brighter Tomorrow</span>
            </h1>

            <p style={{
              fontSize: 'clamp(17px, 2vw, 20px)',
              color: '#526673',
              lineHeight: 1.6,
              maxWidth: 540,
              marginBottom: 36,
              letterSpacing: '-0.01em',
            }}>
              Building technology that makes work simpler, smarter and more human.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
              marginBottom: 28,
            }}>
              <Link to="/about" className="btn-zovance-primary">
                <span>Our Story</span>
                <ArrowRight size={15} />
              </Link>

              <button
                onClick={() => openVideo('Watch Our Story')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  color: '#102C42',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <div className="play-btn-circle" style={{ width: 44, height: 44 }}>
                  <Play size={16} style={{ marginLeft: 2 }} fill="#102C42" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

            <p style={{
              fontSize: 13,
              color: '#38A85B',
              fontWeight: 600,
              letterSpacing: '0.02em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <span>✦</span> Technology for a kinder tomorrow.
            </p>
          </div>

          {/* Right Hero Cinematic Media Showcase */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
            <div className="editorial-media-frame" style={{ aspectRatio: '16/11' }}>
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&auto=format&fit=crop&q=80"
                alt="Panoramic natural landscape meeting modern architecture and horizon"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: 'scale(1.02)',
                  transition: 'transform 0.7s ease',
                }}
              />
              <div className="media-dark-overlay" />

              {/* Centered Play Trigger & Emotional Label */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                textAlign: 'center',
                padding: 20,
              }}>
                <button
                  onClick={() => openVideo('Zovance — Brand Film')}
                  className="play-btn-circle"
                  aria-label="Play Brand Film"
                  style={{ marginBottom: 14 }}
                >
                  <Play size={22} style={{ marginLeft: 3 }} fill="#102C42" />
                </button>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.9 }}>
                  Zovance Film &bull; 01:45
                </span>
              </div>

              {/* Bottom Subtle Bar Inside Video Container */}
              <div style={{
                position: 'absolute',
                bottom: 20,
                left: 24,
                right: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#FFFFFF',
                fontSize: 12,
                opacity: 0.85,
              }}>
                <span>People &bull; Ideas &bull; Impact</span>
                <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 9999, fontSize: 11 }}>
                  4K Cinematic
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll To Explore Indicator */}
        <div style={{
          textAlign: 'center',
          marginTop: 20,
          position: 'relative',
          zIndex: 1,
        }}>
          <a
            href="#vision"
            className="animate-subtle-bounce"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#526673',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>Scroll to explore</span>
            <span style={{ color: '#38A85B' }}>↓</span>
          </a>
        </div>
      </section>

      {/* ================= 2. OUR VISION SECTION ================= */}
      <section id="vision" style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(36px, 6vw, 72px)',
          alignItems: 'center',
        }}>
          {/* Left Vision Copy */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-5">
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#38A85B',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 16,
            }}>
              OUR VISION
            </span>

            <h2 style={{
              fontSize: 'clamp(34px, 4.5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#102C42',
              marginBottom: 24,
            }}>
              A more human<br />
              <span className="highlight-green">connected world.</span>
            </h2>

            <p style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              color: '#526673',
              lineHeight: 1.7,
              marginBottom: 36,
            }}>
              We believe technology should create real value for people, businesses and the world around us. Not complexity for the sake of complexity, but quiet intelligence that moves humanity forward.
            </p>

            <Link to="/about" className="btn-zovance-ghost">
              <span>Our Story</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right Video Container */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-7">
            <div className="editorial-media-frame" style={{ aspectRatio: '16/10' }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&auto=format&fit=crop&q=80"
                alt="Modern team collaborating in light-filled architectural workspace"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div className="media-dark-overlay" />

              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                textAlign: 'center',
                padding: 20,
              }}>
                <button
                  onClick={() => openVideo('Our Vision & Philosophy')}
                  className="play-btn-circle"
                  aria-label="Play Our Vision Video"
                  style={{ marginBottom: 14 }}
                >
                  <Play size={22} style={{ marginLeft: 3 }} fill="#102C42" />
                </button>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Our Vision</h3>
                <span style={{ fontSize: 13, opacity: 0.85, fontWeight: 500 }}>1–2 min overview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. WHO WE ARE SECTION ================= */}
      <section style={{
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
        borderBottom: '1px solid #DCE9EE',
        padding: 'clamp(70px, 9vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#38A85B',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 16,
          }}>
            WHO WE ARE
          </span>

          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 54px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#102C42',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 780,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Driven by Purpose.<br />
            <span className="highlight-sky">Guided by People.</span>
          </h2>

          <p style={{
            fontSize: 16,
            color: '#526673',
            maxWidth: 620,
            margin: '0 auto clamp(40px, 6vw, 64px)',
            lineHeight: 1.6,
          }}>
            We design, build, and deploy intelligent systems that bring calm and clarity to how businesses operate every single day.
          </p>

          {/* 4 Minimal Principles */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
            textAlign: 'left',
          }}>
            {[
              {
                title: 'People First',
                desc: 'Technology exists to serve human ambition, not replace genuine connection.',
                icon: HeartHandshake,
              },
              {
                title: 'Meaningful Innovation',
                desc: 'Every system we ship creates clear, tangible value and effortless momentum.',
                icon: Sparkles,
              },
              {
                title: 'Long-term Impact',
                desc: 'We architect enduring infrastructure designed to evolve cleanly over decades.',
                icon: ShieldCheck,
              },
              {
                title: 'A Better Tomorrow',
                desc: 'A healthier, more connected future built step by intentional step.',
                icon: Compass,
              },
            ].map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 24,
                    padding: '32px 28px',
                    border: '1px solid #DCE9EE',
                    boxShadow: '0 4px 20px rgba(16,44,66,0.03)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(16,44,66,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(16,44,66,0.03)';
                  }}
                >
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: '#F2FAFD',
                    border: '1px solid #DCE9EE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38A85B',
                    marginBottom: 20,
                  }}>
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#102C42', marginBottom: 10 }}>
                    {principle.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6 }}>
                    {principle.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 4. WHAT WE BELIEVE ================= */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(70px, 9vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(36px, 6vw, 72px)',
          alignItems: 'center',
        }}>
          {/* Left Large Visual */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
            <div className="editorial-media-frame" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=80"
                alt="Thoughtfully designed modern office with daylight and open spaces"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div className="media-dark-overlay" />
              <div style={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                right: 24,
                color: '#FFFFFF',
              }}>
                <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>
                  "Simplicity is the ultimate sophistication."
                </p>
                <span style={{ fontSize: 12, opacity: 0.8, marginTop: 4, display: 'block' }}>
                  The Zovance Philosophy
                </span>
              </div>
            </div>
          </div>

          {/* Right What We Believe List */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#38A85B',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 16,
            }}>
              WHAT WE BELIEVE
            </span>

            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 50px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#102C42',
              lineHeight: 1.15,
              marginBottom: 20,
            }}>
              Ideas today.<br />
              <span className="highlight-gradient">A better tomorrow.</span>
            </h2>

            <p style={{
              fontSize: 16,
              color: '#526673',
              lineHeight: 1.7,
              marginBottom: 32,
            }}>
              Real technological advancement does not overwhelm; it clarifies. We hold ourselves to five core convictions in everything we build.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { name: 'People First', detail: 'Designing with empathy, clarity, and human dignity at the center.' },
                { name: 'Meaningful Innovation', detail: 'Solving real problems rather than chasing transient hype.' },
                { name: 'Long-term Thinking', detail: 'Crafting reliable systems engineered to scale gracefully.' },
                { name: 'Responsible Technology', detail: 'Safe, private, and transparent data architectures.' },
                { name: 'Open Collaboration', detail: 'Building as true long-term partners alongside our clients.' },
              ].map((item, idx) => (
                <div
                  key={item.name}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 16,
                    background: '#F2FAFD',
                    border: '1px solid #DCE9EE',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 16,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#38A85B';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F2FAFD';
                    e.currentTarget.style.borderColor = '#DCE9EE';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#38A85B' }}>0{idx + 1}</span>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#102C42', marginBottom: 2 }}>{item.name}</h3>
                    <p style={{ fontSize: 13, color: '#526673' }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. WHAT WE DO (Storytelling Panels) ================= */}
      <section style={{
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
        borderBottom: '1px solid #DCE9EE',
        padding: 'clamp(70px, 9vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: clampHeaderMargin }}>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#38A85B',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 16,
            }}>
              WHAT WE DO
            </span>

            <h2 style={{
              fontSize: 'clamp(34px, 4.8vw, 58px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#102C42',
              lineHeight: 1.15,
              marginBottom: 20,
            }}>
              Turning Ideas<br />
              <span className="highlight-green">Into Real Change.</span>
            </h2>

            <p style={{
              fontSize: 17,
              color: '#526673',
              maxWidth: 640,
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
              We build technology, products and intelligent systems that help businesses move forward.
            </p>
          </div>

          {/* 4 Large Visual Panels */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(24px, 4vw, 36px)',
          }}>
            {/* Panel 1: AI & Automation */}
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
              <div style={{
                background: '#FFFFFF',
                borderRadius: 28,
                border: '1px solid #DCE9EE',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(16,44,66,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80"
                    alt="Modern skyscraper architectural grid in sunlight"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="media-dark-overlay" />
                  <div style={{ position: 'absolute', top: 20, left: 24 }}>
                    <span style={{
                      background: 'rgba(255,255,255,0.92)',
                      color: '#102C42',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '6px 12px',
                      borderRadius: 9999,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      Automation
                    </span>
                  </div>
                </div>
                <div style={{ padding: '32px 32px 36px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', marginBottom: 12 }}>
                      AI & Automation
                    </h3>
                    <p style={{ fontSize: 15, color: '#526673', lineHeight: 1.6, marginBottom: 24 }}>
                      Intelligent systems that reduce repetitive work and improve business operations.
                    </p>
                  </div>
                  <Link to="/services" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#38A85B',
                    textDecoration: 'none',
                  }}>
                    <span>Explore Systems</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Panel 2: Voice AI */}
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
              <div style={{
                background: '#FFFFFF',
                borderRadius: 28,
                border: '1px solid #DCE9EE',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(16,44,66,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80"
                    alt="Professional speaking and communicating with confidence"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="media-dark-overlay" />
                  <div style={{ position: 'absolute', top: 20, left: 24 }}>
                    <span style={{
                      background: 'rgba(255,255,255,0.92)',
                      color: '#102C42',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '6px 12px',
                      borderRadius: 9999,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      Conversations
                    </span>
                  </div>
                </div>
                <div style={{ padding: '32px 32px 36px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', marginBottom: 12 }}>
                      Voice AI
                    </h3>
                    <p style={{ fontSize: 15, color: '#526673', lineHeight: 1.6, marginBottom: 24 }}>
                      Natural AI-powered conversations for customer support, sales and business communication.
                    </p>
                  </div>
                  <Link to="/services" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#38A85B',
                    textDecoration: 'none',
                  }}>
                    <span>Discover Voice AI</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Panel 3: Business Systems */}
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
              <div style={{
                background: '#FFFFFF',
                borderRadius: 28,
                border: '1px solid #DCE9EE',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(16,44,66,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80"
                    alt="Engineers and architects collaborating around connected digital systems"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="media-dark-overlay" />
                  <div style={{ position: 'absolute', top: 20, left: 24 }}>
                    <span style={{
                      background: 'rgba(255,255,255,0.92)',
                      color: '#102C42',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '6px 12px',
                      borderRadius: 9999,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      Platforms
                    </span>
                  </div>
                </div>
                <div style={{ padding: '32px 32px 36px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', marginBottom: 12 }}>
                      Business Systems
                    </h3>
                    <p style={{ fontSize: 15, color: '#526673', lineHeight: 1.6, marginBottom: 24 }}>
                      Digital platforms that connect people, processes and information effortlessly.
                    </p>
                  </div>
                  <Link to="/services" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#38A85B',
                    textDecoration: 'none',
                  }}>
                    <span>View Platforms</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Panel 4: Intelligent Workflows */}
            <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
              <div style={{
                background: '#FFFFFF',
                borderRadius: 28,
                border: '1px solid #DCE9EE',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(16,44,66,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80"
                    alt="Digital earth and connected orbital workflows"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="media-dark-overlay" />
                  <div style={{ position: 'absolute', top: 20, left: 24 }}>
                    <span style={{
                      background: 'rgba(255,255,255,0.92)',
                      color: '#102C42',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '6px 12px',
                      borderRadius: 9999,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      Efficiency
                    </span>
                  </div>
                </div>
                <div style={{ padding: '32px 32px 36px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', marginBottom: 12 }}>
                      Intelligent Workflows
                    </h3>
                    <p style={{ fontSize: 15, color: '#526673', lineHeight: 1.6, marginBottom: 24 }}>
                      Automation that helps teams work faster, smarter, and with genuine peace of mind.
                    </p>
                  </div>
                  <Link to="/services" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#38A85B',
                    textDecoration: 'none',
                  }}>
                    <span>Explore Workflows</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. PRODUCT / TECHNOLOGY STORY ================= */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(70px, 9vw, 120px) clamp(20px, 5vw, 64px)',
        textAlign: 'center',
      }}>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: '#38A85B',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 16,
        }}>
          TECHNOLOGY STORY
        </span>

        <h2 style={{
          fontSize: 'clamp(34px, 4.8vw, 60px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: '#102C42',
          lineHeight: 1.15,
          marginBottom: 20,
          maxWidth: 760,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Technology that<br />
          <span className="highlight-gradient">works with people.</span>
        </h2>

        <p style={{
          fontSize: 17,
          color: '#526673',
          maxWidth: 580,
          margin: '0 auto clamp(36px, 5vw, 56px)',
          lineHeight: 1.6,
        }}>
          When intelligent systems operate silently in harmony with people, businesses operate with effortless confidence.
        </p>

        {/* Cinematic media banner with 4-pillar narrative */}
        <div className="editorial-media-frame" style={{ aspectRatio: '21/9', minHeight: 340, marginBottom: 40 }}>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&auto=format&fit=crop&q=80"
            alt="Colleagues collaborating on modern technology around clean workspace"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div className="media-dark-overlay" />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(20px, 4vw, 44px)',
            color: '#FFFFFF',
            textAlign: 'left',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 24,
              background: 'rgba(16, 44, 66, 0.7)',
              backdropFilter: 'blur(16px)',
              padding: '24px 28px',
              borderRadius: 20,
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#8FD3F4', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pillar 01</span>
                <p style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>Human Intent</p>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#38A85B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pillar 02</span>
                <p style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>Autonomous Agents</p>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#8FD3F4', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pillar 03</span>
                <p style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>Unified Data</p>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#38A85B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Pillar 04</span>
                <p style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>Measurable Impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. A GLIMPSE INTO ZOVANCE ================= */}
      <section style={{
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
        borderBottom: '1px solid #DCE9EE',
        padding: 'clamp(70px, 9vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <div>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#38A85B',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 12,
              }}>
                A GLIMPSE INTO ZOVANCE
              </span>
              <h2 style={{
                fontSize: 'clamp(30px, 4vw, 48px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#102C42',
              }}>
                Everyday Moments in Motion
              </h2>
            </div>
            <Link to="/about" style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#102C42',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>Learn our story</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 4 Large Editorial Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                title: 'Smarter Businesses',
                caption: 'Quiet automation running smoothly in background operations.',
                img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
              },
              {
                title: 'Better Conversations',
                caption: 'Natural voice agents responding without human delay.',
                img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
              },
              {
                title: 'Connected Work',
                caption: 'Teams collaborating with contextual AI at their fingertips.',
                img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80',
              },
              {
                title: 'Intelligent Systems',
                caption: 'Modern web engineering delivering speed, stability, and scale.',
                img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 24,
                  border: '1px solid #DCE9EE',
                  overflow: 'hidden',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(16,44,66,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ height: 220, overflow: 'hidden' }}>
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#102C42', marginBottom: 8 }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.5 }}>
                    {card.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. OUR IMPACT ================= */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(70px, 9vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(36px, 6vw, 72px)',
          alignItems: 'center',
        }}>
          {/* Left Media */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
            <div className="editorial-media-frame" style={{ aspectRatio: '16/11' }}>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&auto=format&fit=crop&q=80"
                alt="Impactful modern collaborative technology meeting"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div className="media-dark-overlay" />
            </div>
          </div>

          {/* Right Copy */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-6">
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#38A85B',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 16,
            }}>
              OUR IMPACT
            </span>

            <h2 style={{
              fontSize: 'clamp(32px, 4.2vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#102C42',
              lineHeight: 1.15,
              marginBottom: 20,
            }}>
              Turning Ideas<br />
              <span className="highlight-green">Into Real Change.</span>
            </h2>

            <p style={{
              fontSize: 16,
              color: '#526673',
              lineHeight: 1.7,
              marginBottom: 36,
            }}>
              We build products, experiences and intelligent systems designed to create lasting value for businesses and the people they serve.
            </p>

            <Link to="/services" className="btn-zovance-primary">
              <span>What We Do</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 9. STORIES / CASE STUDIES ================= */}
      <section style={{
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
        borderBottom: '1px solid #DCE9EE',
        padding: 'clamp(70px, 9vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 54 }}>
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#38A85B',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 14,
            }}>
              REAL-WORLD WORK
            </span>
            <h2 style={{
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#102C42',
            }}>
              Stories from the people building with Zovance
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 28,
          }}>
            {[
              {
                type: 'Hospitality & Travel',
                title: 'Alluri Resorts',
                result: 'Zero-friction booking engine with instant guest WhatsApp sync and automated room allocation.',
                img: '/alluri-resort.jpg',
              },
              {
                type: 'E-Commerce & Retail',
                title: 'Prima Lane',
                result: 'Automated omnichannel checkout with integrated customer support workflows that scaled conversion.',
                img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
              },
              {
                type: 'Healthcare & Wellness',
                title: 'Mana Care',
                result: '24/7 conversational voice system for patient intake, scheduling, and calendar synchronization.',
                img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80',
              },
            ].map((story) => (
              <div
                key={story.title}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 24,
                  border: '1px solid #DCE9EE',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(16,44,66,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ height: 230, overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={story.img}
                      alt={story.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div style={{ position: 'absolute', top: 16, left: 16 }}>
                      <span style={{
                        background: 'rgba(16, 44, 66, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 9999,
                      }}>
                        {story.type}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '24px 24px 16px' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#102C42', marginBottom: 10 }}>
                      {story.title}
                    </h3>
                    <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6 }}>
                      {story.result}
                    </p>
                  </div>
                </div>
                <div style={{ padding: '0 24px 24px' }}>
                  <Link
                    to="/services"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#38A85B',
                      textDecoration: 'none',
                    }}
                  >
                    <span>View Story</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 10. CASE STUDY VIDEO SECTION ================= */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(70px, 9vw, 120px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 54 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#38A85B',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 14,
          }}>
            CASE STUDY FILMS
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 54px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#102C42',
          }}>
            Inside the Systems
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {[
            {
              title: 'A business that never misses a conversation',
              duration: '01:30',
              img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80',
            },
            {
              title: 'A team that works smarter',
              duration: '02:05',
              img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
            },
            {
              title: 'A better way to serve customers',
              duration: '01:50',
              img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
            },
          ].map((film) => (
            <div
              key={film.title}
              onClick={() => openVideo(film.title)}
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                background: '#102C42',
                position: 'relative',
                aspectRatio: '16/10',
                cursor: 'pointer',
                border: '1px solid #DCE9EE',
              }}
            >
              <img
                src={film.img}
                alt={film.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div className="media-dark-overlay" />

              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                textAlign: 'center',
                padding: 24,
              }}>
                <div className="play-btn-circle" style={{ marginBottom: 14 }}>
                  <Play size={20} style={{ marginLeft: 3 }} fill="#102C42" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, maxWidth: 280 }}>
                  {film.title}
                </h3>
                <span style={{ fontSize: 12, opacity: 0.8 }}>{film.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 11. CAREERS SECTION ================= */}
      <section style={{
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
        borderBottom: '1px solid #DCE9EE',
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 64px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 840, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#38A85B',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 16,
          }}>
            CAREERS AT ZOVANCE
          </span>

          <h2 style={{
            fontSize: 'clamp(34px, 5vw, 60px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: '#102C42',
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            Great people<br />
            <span className="highlight-gradient">build extraordinary things.</span>
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: '#526673',
            lineHeight: 1.6,
            maxWidth: 600,
            margin: '0 auto 36px',
          }}>
            Work with people who care deeply about technology, ideas and meaningful impact.
          </p>

          <Link to="/careers" className="btn-zovance-primary">
            <span>Join Our Team</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ================= 12. FINAL CINEMATIC CTA ================= */}
      <section style={{
        position: 'relative',
        padding: 'clamp(90px, 12vw, 160px) clamp(20px, 5vw, 64px)',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at bottom, #F2FAFD 0%, #FFFFFF 80%)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(400px, 70vw, 900px)',
          height: 350,
          background: 'radial-gradient(circle, rgba(143, 211, 244, 0.35) 0%, rgba(56, 168, 91, 0.1) 60%, transparent 100%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: '#102C42',
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Let's Build a Better Tomorrow.
          </h2>

          <p style={{
            fontSize: 'clamp(17px, 2.2vw, 22px)',
            color: '#526673',
            lineHeight: 1.6,
            maxWidth: 540,
            margin: '0 auto 40px',
          }}>
            Different ideas. A brighter future.
          </p>

          <Link
            to="/contact"
            className="btn-zovance-green"
            style={{ fontSize: 16, padding: '15px 36px' }}
          >
            <span>Let's Connect</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Editorial Video Modal */}
      {videoModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(16, 44, 66, 0.8)',
          backdropFilter: 'blur(12px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 24,
            overflow: 'hidden',
            maxWidth: 900,
            width: '100%',
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            position: 'relative',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 24px',
              borderBottom: '1px solid #DCE9EE',
            }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#102C42' }}>{videoTitle}</span>
              <button
                onClick={() => setVideoModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#526673',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 4,
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0D1B2A' }}>
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&auto=format&fit=crop&q=80"
                alt="Zovance Film Poster"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                textAlign: 'center',
                padding: 20,
              }}>
                <div className="play-btn-circle" style={{ marginBottom: 16 }}>
                  <Play size={24} style={{ marginLeft: 3 }} fill="#102C42" />
                </div>
                <p style={{ fontSize: 16, fontWeight: 600 }}>Zovance Brand Film &bull; High Fidelity Stream</p>
                <span style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>People &bull; Ideas &bull; Impact</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Website Footer */}
      <WebsiteFooter />

      {/* Booking Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
const clampHeaderMargin = 48;
