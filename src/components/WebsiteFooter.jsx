import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, HeartHandshake, Sparkles } from 'lucide-react';

export default function WebsiteFooter() {
  return (
    <footer style={{
      background: '#F2FAFD',
      borderTop: '1px solid #DCE9EE',
      padding: 'clamp(64px, 8vw, 96px) clamp(20px, 5vw, 64px) 40px',
      color: '#102C42',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Soft Glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: '10%',
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(143, 211, 244, 0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(50px)',
      }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Top Feature Floating Banner Inside Footer */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 28,
          border: '1px solid #DCE9EE',
          padding: 'clamp(28px, 4vw, 44px) clamp(24px, 4vw, 48px)',
          marginBottom: 64,
          boxShadow: '0 12px 36px -10px rgba(16, 44, 66, 0.05)',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 32,
          alignItems: 'center',
        }}>
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-8">
            <span style={{ fontSize: 12, fontWeight: 700, color: '#38A85B', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              THE ZOVANCE VISION
            </span>
            <h3 style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 800, color: '#102C42', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Technology for a more connected tomorrow.
            </h3>
            <p style={{ fontSize: 15, color: '#526673', marginTop: 10, maxWidth: 620, lineHeight: 1.6 }}>
              Crafting calm, intelligent systems that connect people, scale ideas, and deliver lasting impact.
            </p>
          </div>
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-4 lg:text-right">
            <Link
              to="/contact"
              style={{
                background: '#102C42',
                color: '#FFFFFF',
                borderRadius: 9999,
                padding: '14px 28px',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 6px 20px rgba(16, 44, 66, 0.18)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = '#193A54';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#102C42';
              }}
            >
              <span>Let's Connect</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Main Footer Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(32px, 5vw, 64px)',
          marginBottom: 64,
        }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-4">
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: '#102C42',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6H20L10 18H20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="18" cy="18" r="2.5" fill="#38A85B" />
                </svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: 21, color: '#102C42', letterSpacing: '-0.03em' }}>
                ZOVANCE
              </span>
            </Link>

            <p style={{
              color: '#526673',
              fontSize: 14,
              lineHeight: 1.65,
              maxWidth: 340,
              marginBottom: 24,
            }}>
              Building technology that makes work simpler, smarter and more human.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#38A85B', fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38A85B' }} />
              <span>People. Ideas. Impact.</span>
            </div>
          </div>

          {/* Company Column */}
          <div style={{ gridColumn: 'span 6 / span 6' }} className="sm:col-span-3 lg:col-span-2 lg:col-start-6">
            <p style={{ color: '#102C42', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
              Company
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Home', '/'],
                ['Our Story', '/about'],
                ['What We Do', '/services'],
                ['Careers', '/careers'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  to={href}
                  style={{
                    color: '#526673',
                    fontSize: 14,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#102C42')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#526673')}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Capabilities Column */}
          <div style={{ gridColumn: 'span 6 / span 6' }} className="sm:col-span-3 lg:col-span-3">
            <p style={{ color: '#102C42', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
              Capabilities
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'AI & Automation',
                'Voice AI Conversations',
                'Connected Business Systems',
                'Intelligent Workflows',
                'Custom Technology Engineering',
              ].map((cap) => (
                <Link
                  key={cap}
                  to="/services"
                  style={{
                    color: '#526673',
                    fontSize: 14,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#102C42')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#526673')}
                >
                  {cap}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Channels */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="sm:col-span-6 lg:col-span-3">
            <p style={{ color: '#102C42', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                ['LinkedIn', 'https://linkedin.com'],
                ['X (Twitter)', 'https://x.com'],
                ['Instagram', 'https://instagram.com'],
                ['YouTube', 'https://youtube.com'],
              ].map(([social, href]) => (
                <a
                  key={social}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 14,
                    color: '#526673',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#102C42')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#526673')}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-footer Bar with Curves & Micro-details */}
        <div style={{
          borderTop: '1px solid #DCE9EE',
          paddingTop: 32,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          fontSize: 13,
          color: '#526673',
        }}>
          <div>
            &copy; {new Date().getFullYear()} Zovance Technologies Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link to="/about" style={{ color: '#526673', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: '#526673', textDecoration: 'none' }}>Terms of Use</Link>
            <Link to="/about" style={{ color: '#526673', textDecoration: 'none' }}>Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
