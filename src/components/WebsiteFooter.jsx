import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function WebsiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: '#040406', padding: '70px clamp(16px, 4vw, 32px) 36px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #2563eb, #38bdf8)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(56, 189, 248, 0.3)' }}>
                <Zap size={18} color="#ffffff" fill="#ffffff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 20, color: '#ffffff', letterSpacing: '-0.03em' }}>Zovance<span style={{ color: '#38bdf8' }}>.</span></span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65, marginBottom: 22 }}>Build Less. Automate More.<br />We architect autonomous systems that scale enterprise revenue.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Mail, Phone, MapPin].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', transition: 'all 0.2s ease' }}
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
              <Link key={s} to="/services" style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 12, textDecoration: 'none', transition: 'all 0.15s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{s}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ color: '#ffffff', fontSize: 14, fontWeight: 700, marginBottom: 18, letterSpacing: '0.02em' }}>Company</p>
            {[['About', '/about'], ['Portfolio', '/portfolio'], ['Blog', '/blog'], ['Pricing', '/pricing'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={l} to={h} style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 12, textDecoration: 'none', transition: 'all 0.15s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>{l}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: '#ffffff', fontSize: 14, fontWeight: 700, marginBottom: 18, letterSpacing: '0.02em' }}>Get in Touch</p>
            <a href="mailto:zovance1@gmail.com" style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 12, textDecoration: 'none' }}>zovance1@gmail.com</a>
            <button onClick={() => window.open('https://wa.me/918309827125', '_blank')} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 12, fontWeight: 600 }}>
              <MessageCircle size={16} /> WhatsApp Us
            </button>
            <p style={{ color: '#64748b', fontSize: 13 }}>Response within 15 minutes</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>© 2026 Zovance. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" style={{ color: '#64748b', fontSize: 13, textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
