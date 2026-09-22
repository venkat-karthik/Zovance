import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function WebsiteFooter() {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '1px solid #DCE9EE',
      padding: '80px clamp(20px, 5vw, 64px) 48px',
      color: '#102C42',
    }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(32px, 5vw, 64px)',
          marginBottom: 64,
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-4">
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 20 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
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
              <span style={{ fontWeight: 800, fontSize: 20, color: '#102C42', letterSpacing: '-0.03em' }}>
                ZOVANCE
              </span>
            </Link>

            <p style={{
              color: '#526673',
              fontSize: 14,
              lineHeight: 1.6,
              maxWidth: 340,
              marginBottom: 20,
            }}>
              People. Ideas. Impact.<br />
              Building technology that makes work simpler, smarter and more human.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#38A85B', fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38A85B' }} />
              <span>Technology for a more connected tomorrow.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ gridColumn: 'span 6 / span 6' }} className="sm:col-span-3 lg:col-span-2 lg:col-start-6">
            <p style={{ color: '#102C42', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 20 }}>
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

          {/* Capabilities */}
          <div style={{ gridColumn: 'span 6 / span 6' }} className="sm:col-span-3 lg:col-span-3">
            <p style={{ color: '#102C42', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 20 }}>
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

          {/* Connect Column */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="sm:col-span-6 lg:col-span-3">
            <p style={{ color: '#102C42', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 20 }}>
              Connect
            </p>
            <p style={{ color: '#526673', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
              Have an idea or a system you want to build together?
            </p>
            <Link
              to="/contact"
              className="btn-zovance-primary"
              style={{ fontSize: 13, padding: '10px 20px', display: 'inline-flex', marginBottom: 20 }}
            >
              <span>Let's Connect</span>
              <ArrowRight size={14} />
            </Link>

            <div style={{ display: 'flex', gap: 16 }}>
              {[
                ['LinkedIn', 'https://linkedin.com'],
                ['X', 'https://x.com'],
                ['Instagram', 'https://instagram.com'],
                ['YouTube', 'https://youtube.com'],
              ].map(([social, href]) => (
                <a
                  key={social}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
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

        {/* Bottom Sub-footer */}
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
            &copy; {new Date().getFullYear()} Zovance Technologies. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link to="/privacy" style={{ color: '#526673', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: '#526673', textDecoration: 'none' }}>Terms of Service</Link>
            <Link to="/security" style={{ color: '#526673', textDecoration: 'none' }}>Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
