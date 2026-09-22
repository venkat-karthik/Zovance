import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, X, Compass, HeartHandshake, ShieldCheck, Sparkles, ChevronRight, Pause } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState('Our Story & Vision');
  const [isPlayingHero, setIsPlayingHero] = useState(true);

  const openVideo = (title) => {
    setVideoTitle(title);
    setVideoModalOpen(true);
  };

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* ================= 1. APPLE-STYLE HERO STAGE ================= */}
      <section style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '130px 24px 60px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 20%, #F2FAFD 0%, #FFFFFF 85%)',
      }}>
        {/* Atmosphere ambient glow */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(500px, 80vw, 1000px)',
          height: 'clamp(350px, 45vw, 600px)',
          background: 'radial-gradient(ellipse at center, rgba(143, 211, 244, 0.45) 0%, rgba(56, 168, 91, 0.12) 50%, transparent 80%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 2, marginBottom: 44 }}>
          {/* Subtle brand tag */}
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
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid #DCE9EE',
            padding: '6px 16px',
            borderRadius: 9999,
            boxShadow: '0 2px 8px rgba(16, 44, 66, 0.04)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#38A85B' }} />
            <span>ZOVANCE</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(46px, 7vw, 84px)',
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: '-0.04em',
            color: '#102C42',
            marginBottom: 20,
          }}>
            Ideas for a<br />
            <span className="highlight-gradient">Brighter Tomorrow.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2.4vw, 22px)',
            color: '#526673',
            maxWidth: 620,
            margin: '0 auto 36px',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
            fontWeight: 400,
          }}>
            Building technology that makes work simpler, smarter, and more human.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            <Link
              to="/about"
              className="btn-zovance-primary"
              style={{ fontSize: 15, padding: '14px 32px' }}
            >
              <span>Our Story</span>
              <ArrowRight size={15} />
            </Link>

            <button
              onClick={() => openVideo('Watch Our Story')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #DCE9EE',
                borderRadius: 9999,
                padding: '8px 24px 8px 10px',
                cursor: 'pointer',
                color: '#102C42',
                fontWeight: 600,
                fontSize: 14,
                boxShadow: '0 4px 16px rgba(16, 44, 66, 0.04)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.borderColor = '#38A85B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#DCE9EE';
              }}
            >
              <div className="play-btn-circle" style={{ width: 40, height: 40 }}>
                <Play size={15} style={{ marginLeft: 2 }} fill="#102C42" />
              </div>
              <span>Watch Brand Film</span>
            </button>
          </div>
        </div>

        {/* Apple-Style Cinematic Video Canvas Window */}
        <div style={{
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          <div
            className="editorial-media-frame"
            style={{
              aspectRatio: '16/9',
              maxHeight: 640,
              borderRadius: 'clamp(24px, 4vw, 36px)',
              cursor: 'pointer',
            }}
            onClick={() => openVideo('Watch Our Story')}
          >
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1800&auto=format&fit=crop&q=85"
              alt="Panoramic alpine lake landscape and modern architectural clarity"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transform: 'scale(1.02)',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            <div className="media-dark-overlay" />

            {/* Apple-style floating controller */}
            <div style={{
              position: 'absolute',
              bottom: 'clamp(20px, 4vw, 36px)',
              left: 'clamp(20px, 4vw, 36px)',
              right: 'clamp(20px, 4vw, 36px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#FFFFFF',
              zIndex: 3,
            }}>
              <div>
                <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 700, letterSpacing: '-0.01em' }}>
                  A more human, connected world.
                </p>
                <span style={{ fontSize: 13, opacity: 0.85 }}>01:45 Brand Experience Film</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(255, 255, 255, 0.22)',
                backdropFilter: 'blur(16px)',
                padding: '8px 18px',
                borderRadius: 9999,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontSize: 13,
                fontWeight: 600,
              }}>
                <Play size={14} fill="#FFFFFF" />
                <span>Play Full Film</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{ marginTop: 40, position: 'relative', zIndex: 2 }}>
          <a
            href="#vision"
            className="animate-subtle-bounce"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#526673',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>Explore the story</span>
            <span style={{ color: '#38A85B', fontSize: 14 }}>↓</span>
          </a>
        </div>
      </section>

      {/* ================= 2. APPLE-STYLE FULL-WIDTH VISION MARQUEE ================= */}
      <section id="vision" style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 64px)',
        background: '#FFFFFF',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#38A85B',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 20,
          }}>
            OUR VISION
          </span>

          <h2 style={{
            fontSize: 'clamp(38px, 6vw, 70px)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            color: '#102C42',
            marginBottom: 24,
          }}>
            A more human<br />
            <span className="highlight-green">connected world.</span>
          </h2>

          <p style={{
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            color: '#526673',
            maxWidth: 720,
            margin: '0 auto 48px',
            lineHeight: 1.6,
          }}>
            We believe technology should create real value for people, businesses and the world around us. Not noise, but quiet intelligence that moves humanity forward.
          </p>

          <Link to="/about" className="btn-zovance-ghost">
            <span>Our Story</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ================= 3. WHO WE ARE (Large Visual Window + 4 Minimal Statements) ================= */}
      <section style={{
        padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 12vw, 140px)',
        background: '#FFFFFF',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Big Editorial Architecture Window */}
          <div className="editorial-media-frame" style={{ aspectRatio: '21/9', minHeight: 380, marginBottom: 48 }}>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&auto=format&fit=crop&q=80"
              alt="Bright modern daylight office environment"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="media-dark-overlay" />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 24,
              color: '#FFFFFF',
            }}>
              <div>
                <h3 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
                  Driven by Purpose. Guided by People.
                </h3>
                <p style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', opacity: 0.9, maxWidth: 540, margin: '0 auto' }}>
                  Four commitments that govern every line of code and system we architect.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Minimal Principles */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
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
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  style={{
                    background: '#F2FAFD',
                    borderRadius: 24,
                    padding: '32px 28px',
                    border: '1px solid #DCE9EE',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#38A85B';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(16, 44, 66, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.background = '#F2FAFD';
                    e.currentTarget.style.borderColor = '#DCE9EE';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: '#FFFFFF',
                    border: '1px solid #DCE9EE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38A85B',
                    marginBottom: 20,
                  }}>
                    <Icon size={20} />
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 700, color: '#102C42', marginBottom: 8 }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 4. WHAT WE DO (Apple-Style Giant Media Showcase Panels) ================= */}
      <section style={{
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
        borderBottom: '1px solid #DCE9EE',
        padding: 'clamp(90px, 12vw, 150px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
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
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: '#102C42',
              lineHeight: 1.1,
              marginBottom: 16,
            }}>
              Turning Ideas<br />
              <span className="highlight-green">Into Real Change.</span>
            </h2>

            <p style={{
              fontSize: 'clamp(17px, 2vw, 20px)',
              color: '#526673',
              maxWidth: 640,
              margin: '0 auto',
            }}>
              We build technology, products, and intelligent systems that help businesses move forward.
            </p>
          </div>

          {/* 4 Storytelling Visual Feature Panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Panel 1: Voice AI */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: 32,
              border: '1px solid #DCE9EE',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              alignItems: 'center',
              boxShadow: '0 12px 36px rgba(16, 44, 66, 0.04)',
            }}>
              <div style={{ gridColumn: 'span 12 / span 12', padding: 'clamp(36px, 5vw, 64px)' }} className="lg:col-span-5">
                <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                  Voice AI
                </span>
                <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#102C42', lineHeight: 1.15, marginBottom: 16 }}>
                  Conversations that never miss an opportunity.
                </h3>
                <p style={{ fontSize: 16, color: '#526673', lineHeight: 1.6, marginBottom: 28 }}>
                  Natural AI-powered voice agents handling customer inquiries, bookings, and operations 24/7 with zero human delay.
                </p>
                <Link to="/services" className="btn-zovance-primary">
                  <span>Explore Voice AI</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div style={{ gridColumn: 'span 12 / span 12', height: 420 }} className="lg:col-span-7">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80"
                    alt="Conversational Voice AI in professional context"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="media-dark-overlay" />
                </div>
              </div>
            </div>

            {/* Panel 2: AI & Automation */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: 32,
              border: '1px solid #DCE9EE',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              alignItems: 'center',
              boxShadow: '0 12px 36px rgba(16, 44, 66, 0.04)',
            }}>
              <div style={{ gridColumn: 'span 12 / span 12', height: 420 }} className="lg:col-span-7 order-2 lg:order-1">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80"
                    alt="Interconnected modern architectural technology systems"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="media-dark-overlay" />
                </div>
              </div>
              <div style={{ gridColumn: 'span 12 / span 12', padding: 'clamp(36px, 5vw, 64px)' }} className="lg:col-span-5 order-1 lg:order-2">
                <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                  AI & Automation
                </span>
                <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#102C42', lineHeight: 1.15, marginBottom: 16 }}>
                  Intelligent systems that liberate teams.
                </h3>
                <p style={{ fontSize: 16, color: '#526673', lineHeight: 1.6, marginBottom: 28 }}>
                  End-to-end automation pipelines that remove repetitive clerical friction, sync databases, and verify records instantly.
                </p>
                <Link to="/services" className="btn-zovance-primary">
                  <span>Explore Automation</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Panel 3: Business Systems & Custom Technology */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: 32,
              border: '1px solid #DCE9EE',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              alignItems: 'center',
              boxShadow: '0 12px 36px rgba(16, 44, 66, 0.04)',
            }}>
              <div style={{ gridColumn: 'span 12 / span 12', padding: 'clamp(36px, 5vw, 64px)' }} className="lg:col-span-5">
                <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                  Business Platforms
                </span>
                <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#102C42', lineHeight: 1.15, marginBottom: 16 }}>
                  Digital platforms engineered to endure.
                </h3>
                <p style={{ fontSize: 16, color: '#526673', lineHeight: 1.6, marginBottom: 28 }}>
                  High-conversion web platforms, operations hubs, and internal architectures built with sub-second responsiveness.
                </p>
                <Link to="/services" className="btn-zovance-primary">
                  <span>View Engineering</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div style={{ gridColumn: 'span 12 / span 12', height: 420 }} className="lg:col-span-7">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80"
                    alt="Engineers collaborating on digital business platform"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="media-dark-overlay" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. A GLIMPSE INTO ZOVANCE (Gallery Carousel) ================= */}
      <section style={{
        padding: 'clamp(90px, 12vw, 150px) clamp(20px, 5vw, 64px)',
        background: '#FFFFFF',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 44 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
                A GLIMPSE INTO ZOVANCE
              </span>
              <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 50px)', fontWeight: 800, color: '#102C42', letterSpacing: '-0.03em' }}>
                Everyday Moments in Motion
              </h2>
            </div>
            <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#102C42', textDecoration: 'none' }}>
              <span>Learn our story</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                title: 'Smarter Businesses',
                caption: 'Intelligent automation operating smoothly in the background.',
                img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
              },
              {
                title: 'Better Conversations',
                caption: 'Natural voice systems responding with human-like warmth.',
                img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
              },
              {
                title: 'Connected Work',
                caption: 'Distributed teams with unified, synchronized workflows.',
                img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80',
              },
              {
                title: 'Intelligent Systems',
                caption: 'Modern web engineering delivering speed and reliability.',
                img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  background: '#F2FAFD',
                  border: '1px solid #DCE9EE',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(16, 44, 66, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ height: 230, overflow: 'hidden' }}>
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px 24px 28px' }}>
                  <h4 style={{ fontSize: 18, fontWeight: 700, color: '#102C42', marginBottom: 8 }}>
                    {card.title}
                  </h4>
                  <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.5 }}>
                    {card.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. CASE STUDY FILMS (Horizontal 3-Video Stage) ================= */}
      <section style={{
        background: '#F2FAFD',
        borderTop: '1px solid #DCE9EE',
        borderBottom: '1px solid #DCE9EE',
        padding: 'clamp(90px, 12vw, 150px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 54 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
              CASE STUDY FILMS
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, color: '#102C42', letterSpacing: '-0.03em' }}>
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
                  borderRadius: 28,
                  overflow: 'hidden',
                  background: '#102C42',
                  position: 'relative',
                  aspectRatio: '16/10',
                  cursor: 'pointer',
                  border: '1px solid #DCE9EE',
                  boxShadow: '0 8px 24px rgba(16, 44, 66, 0.08)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
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
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, maxWidth: 280 }}>
                    {film.title}
                  </h4>
                  <span style={{ fontSize: 12, opacity: 0.85 }}>{film.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. APPLE-STYLE FINAL CALL TO ACTION STAGE ================= */}
      <section style={{
        position: 'relative',
        padding: 'clamp(100px, 14vw, 180px) clamp(20px, 5vw, 64px)',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 100%, #F2FAFD 0%, #FFFFFF 80%)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(400px, 70vw, 900px)',
          height: 380,
          background: 'radial-gradient(circle, rgba(143, 211, 244, 0.35) 0%, rgba(56, 168, 91, 0.12) 60%, transparent 100%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 840, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(40px, 6.5vw, 76px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: '#102C42',
            lineHeight: 1.08,
            marginBottom: 20,
          }}>
            Let's Build a Better Tomorrow.
          </h2>

          <p style={{
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            color: '#526673',
            lineHeight: 1.6,
            maxWidth: 560,
            margin: '0 auto 40px',
          }}>
            Different ideas. A brighter future.
          </p>

          <Link
            to="/contact"
            className="btn-zovance-green"
            style={{ fontSize: 16, padding: '16px 40px' }}
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
          background: 'rgba(16, 44, 66, 0.85)',
          backdropFilter: 'blur(16px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 28,
            overflow: 'hidden',
            maxWidth: 960,
            width: '100%',
            boxShadow: '0 32px 64px rgba(0,0,0,0.3)',
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
                alt="Zovance Film"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
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
                <p style={{ fontSize: 16, fontWeight: 700 }}>Zovance Brand Film &bull; High Fidelity Stream</p>
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
