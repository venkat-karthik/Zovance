import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function WebsiteFooter() {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #E2E8F0',
      padding: '70px clamp(16px, 4vw, 36px) 36px',
      color: '#0F172A',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(180px, 45vw, 240px), 1fr))',
          gap: 'clamp(24px, 5vw, 48px)',
          marginBottom: 'clamp(36px, 6vw, 56px)',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #f43f5e, #fb7185 35%, #34d399 70%, #60a5fa 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffffff' }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.03em' }}>
                Zovance
              </span>
            </div>

            <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              Build Less. Automate More.<br />
              We design and deploy autonomous AI systems that create real growth.
            </p>

            <div style={{ display: 'flex', gap: 10 }}>
              {[Mail, Phone, MapPin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: '1px solid #E2E8F0',
                    background: '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748B',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#0F172A';
                    e.currentTarget.style.color = '#0F172A';
                    e.currentTarget.style.background = '#F1F5F9';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.color = '#64748B';
                    e.currentTarget.style.background = '#F8FAFC';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{ color: '#0F172A', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
              Services
            </p>
            {['AI & Workflow Automation', 'AI Voice Systems', 'Custom Web Engineering', 'Strategy & Audits'].map(s => (
              <Link
                key={s}
                to="/services"
                style={{
                  display: 'block',
                  color: '#64748B',
                  fontSize: 14,
                  marginBottom: 10,
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#0F172A'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ color: '#0F172A', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
              Company
            </p>
            {[['About Us', '/about'], ['Featured Projects', '/pricing'], ['Solutions', '/solutions'], ['Blog & Insights', '/blog']].map(([l, h]) => (
              <Link
                key={l}
                to={h}
                style={{
                  display: 'block',
                  color: '#64748B',
                  fontSize: 14,
                  marginBottom: 10,
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#0F172A'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
              >
                {l}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: '#0F172A', fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
              Get in Touch
            </p>
            <a
              href="mailto:zovance6@gmail.com"
              style={{
                display: 'block',
                color: '#64748B',
                fontSize: 14,
                marginBottom: 12,
                textDecoration: 'none',
              }}
            >
              zovance6@gmail.com
            </a>
            <button
              onClick={() => window.open('https://wa.me/918309827125', '_blank')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#16a34a',
                fontSize: 14,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              <MessageCircle size={16} /> WhatsApp Us
            </button>
            <p style={{ color: '#94A3B8', fontSize: 13 }}>Response within 15 minutes</p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #E2E8F0',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>
            © 2026 Zovance. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a
                key={t}
                href="#"
                style={{
                  color: '#94A3B8',
                  fontSize: 13,
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#0F172A'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
