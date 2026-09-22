import { Link } from 'react-router-dom';

export default function WebsiteFooter() {
  return (
    <footer style={{
      background: '#F2FAFD',
      borderTop: '1px solid #DCE9EE',
      padding: 'clamp(48px, 6vw, 72px) clamp(20px, 5vw, 64px) 36px',
      color: '#102C42',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Apple-style 4-column minimal category grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(28px, 4vw, 48px)',
          paddingBottom: 48,
          borderBottom: '1px solid #DCE9EE',
        }}>
          {/* Column 1: Brand & Identity */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 14 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: '#102C42',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6H20L10 18H20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="18" cy="18" r="2.5" fill="#38A85B" />
                </svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: 18, color: '#102C42', letterSpacing: '-0.03em' }}>
                ZOVANCE
              </span>
            </Link>
            <p style={{ fontSize: 13, color: '#526673', lineHeight: 1.6, marginBottom: 16, maxWidth: 260 }}>
              Building technology that makes work simpler, smarter, and more human.
            </p>
            {/* Live Operational Status */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#FFFFFF',
              border: '1px solid #DCE9EE',
              borderRadius: 9999,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 500,
              color: '#102C42',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#38A85B', display: 'inline-block' }} />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#102C42', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
              Capabilities
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Conversational Voice AI', '/services'],
                ['Intelligent Automation', '/services'],
                ['Custom Business Platforms', '/services'],
                ['Enterprise Data Hubs', '/services'],
              ].map(([title, url]) => (
                <Link
                  key={title}
                  to={url}
                  style={{
                    fontSize: 13,
                    color: '#526673',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#102C42')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#526673')}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Company */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#102C42', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
              Company
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Our Story', '/about'],
                ['Guiding Principles', '/about'],
                ['Careers & Culture', '/careers'],
                ['Get in Touch', '/contact'],
              ].map(([title, url]) => (
                <Link
                  key={title}
                  to={url}
                  style={{
                    fontSize: 13,
                    color: '#526673',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#102C42')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#526673')}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Portals & Connect */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#102C42', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
              Connect & Portals
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              <Link
                to="/admin/login"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#38A85B',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>Enterprise Admin Hub &rarr;</span>
              </Link>
              <a
                href="mailto:contact@zovance.com"
                style={{ fontSize: 13, color: '#526673', textDecoration: 'none' }}
              >
                contact@zovance.com
              </a>
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              {[
                ['LinkedIn', 'https://linkedin.com'],
                ['X (Twitter)', 'https://x.com'],
                ['Instagram', 'https://instagram.com'],
              ].map(([social, href]) => (
                <a
                  key={social}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#526673',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#38A85B')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#526673')}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-footer copyright & legal line */}
        <div style={{
          paddingTop: 24,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          fontSize: 12,
          color: '#526673',
        }}>
          <div>
            &copy; {new Date().getFullYear()} Zovance Technologies Private Limited. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/about" style={{ color: '#526673', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: '#526673', textDecoration: 'none' }}>Terms of Service</Link>
            <Link to="/about" style={{ color: '#526673', textDecoration: 'none' }}>Security Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
