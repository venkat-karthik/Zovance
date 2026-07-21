import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function WebsiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: '#040406', padding: '70px clamp(16px, 4vw, 32px) 36px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 45vw, 220px), 1fr))', gap: 'clamp(24px, 5vw, 48px)', marginBottom: 'clamp(36px, 6vw, 56px)' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <img src="/logo.png" alt="Zovance Logo" style={{ height: 44, width: 'auto', objectFit: 'contain', borderRadius: 8 }} />
              <span style={{ fontWeight: 800, fontSize: 20, color: '#ffffff', letterSpacing: '-0.03em' }}>Zovance<span style={{ color: '#f59e0b' }}>.</span></span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65, marginBottom: 22 }}>Build Less. Automate More.<br />We architect autonomous systems that scale enterprise revenue.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Mail, Phone, MapPin].map((Icon, i) => (
                <a key={i} href="#" className="safe-touch-target" style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#38bdf8'; e.currentTarget.style.color = '#38bdf8'; e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{ color: '#ffffff', fontSize: 14, fontWeight: 700, marginBottom: 18, letterSpacing: '0.02em' }}>Services</p>
            {['AI & Automation', 'AI Voice Systems', 'Web Solutions', 'Audit & Strategy'].map(s => (
              <Link key={s} to="/services" style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 12, textDecoration: 'none', transition: 'all 0.15s ease', padding: '4px 0' }}
                onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{s}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ color: '#ffffff', fontSize: 14, fontWeight: 700, marginBottom: 18, letterSpacing: '0.02em' }}>Company</p>
            {[['About', '/about'], ['Portfolio', '/portfolio'], ['Blog', '/blog'], ['Pricing', '/pricing'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={l} to={h} style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 12, textDecoration: 'none', transition: 'all 0.15s ease', padding: '4px 0' }}
                onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{l}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: '#ffffff', fontSize: 14, fontWeight: 700, marginBottom: 18, letterSpacing: '0.02em' }}>Get in Touch</p>
            <a href="mailto:zovance6@gmail.com" style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 12, textDecoration: 'none', padding: '4px 0' }}>zovance6@gmail.com</a>
            <button className="safe-touch-target" onClick={() => window.open('https://wa.me/918309827125', '_blank')} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', marginBottom: 12, fontWeight: 600 }}>
              <MessageCircle size={16} /> WhatsApp Us
            </button>
            <p style={{ color: '#64748b', fontSize: 13 }}>Response within 15 minutes</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>© 2026 Zovance. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" style={{ color: '#64748b', fontSize: 13, textDecoration: 'none', transition: 'all 0.15s', padding: '4px 0' }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
