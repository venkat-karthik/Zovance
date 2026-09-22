import { Link } from 'react-router-dom';

export default function WebsiteFooter() {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '1px solid #DCE9EE',
      padding: '48px clamp(20px, 5vw, 64px) 36px',
      color: '#102C42',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          paddingBottom: 28,
          borderBottom: '1px solid #F1F5F9',
        }}>
          {/* Logo & Tagline */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
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
            <span style={{ fontSize: 12, color: '#526673', fontWeight: 500, marginLeft: 4 }}>
              &bull; People. Ideas. Impact.
            </span>
          </Link>

          {/* Clean Horizontal Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center' }}>
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
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#526673',
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

          {/* Socials */}
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            {[
              ['LinkedIn', 'https://linkedin.com'],
              ['X', 'https://x.com'],
              ['Instagram', 'https://instagram.com'],
            ].map(([social, href]) => (
              <a
                key={social}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 13,
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

        {/* Sub-footer copyright */}
        <div style={{
          paddingTop: 24,
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
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/about" style={{ color: '#526673', textDecoration: 'none' }}>Privacy</Link>
            <Link to="/about" style={{ color: '#526673', textDecoration: 'none' }}>Terms</Link>
            <Link to="/about" style={{ color: '#526673', textDecoration: 'none' }}>Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
