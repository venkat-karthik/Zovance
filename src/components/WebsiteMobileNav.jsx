import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Zap, DollarSign, Compass, X, Calendar, MessageCircle, Layers, Cpu, Users, 
  FileText, Phone, Sparkles, ChevronRight, Search 
} from 'lucide-react';

export default function WebsiteMobileNav({ onOpenBooking }) {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { pathname } = useLocation();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setExploreOpen(false);
    setPrevPathname(pathname);
  }

  const exploreCategories = [
    {
      title: 'Core Solutions',
      items: [
        { label: 'AI & Autonomous Systems', to: '/services', icon: Cpu, desc: 'Enterprise AI workflows & bots', badge: 'Popular' },
        { label: 'AI Voice Agents', to: '/services', icon: Sparkles, desc: '24/7 intelligent voice call handling', badge: 'New' },
        { label: 'Full-Stack Web Architecture', to: '/solutions', icon: Layers, desc: 'High-converting custom web apps' },
        { label: '9,500+ Automations Catalog', to: '/automations', icon: Zap, desc: 'Search, browse & request automations', badge: '9k+ Tools' },
      ]
    },
    {
      title: 'Explore & Pricing',
      items: [
        { label: 'Transparent Pricing', to: '/pricing', icon: DollarSign, desc: 'Predictable growth tiers' },
        { label: 'Case Studies & Portfolio', to: '/portfolio', icon: FileText, desc: 'Proven ROI & past results' },
        { label: 'Insights & AI Blog', to: '/blog', icon: Compass, desc: 'Deep-dives & tech tutorials' },
      ]
    },
    {
      title: 'Company & Support',
      items: [
        { label: 'About Zovance', to: '/about', icon: Users, desc: 'Meet our founders & team' },
        { label: 'Contact Us directly', to: '/contact', icon: Phone, desc: 'We respond in < 15 mins' },
      ]
    }
  ];

  const filteredCategories = exploreCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="mobile-only-ui" style={{ display: 'block' }}>
      {/* Top Frosted Mobile Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 45,
        height: 60,
        background: 'rgba(8, 8, 12, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.png" alt="Zovance Logo" style={{ height: 36, width: 'auto', objectFit: 'contain', borderRadius: 8 }} />
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.03em', color: '#ffffff' }}>
            Zovance<span style={{ color: '#f59e0b' }}>.</span>
          </span>
        </Link>

        <button 
          onClick={onOpenBooking}
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#fff',
            border: 'none',
            borderRadius: 20,
            padding: '7px 14px',
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
            cursor: 'pointer'
          }}
        >
          <Calendar size={13} />
          <span>Book Call</span>
        </button>
      </header>

      {/* Fixed Bottom App Navigation Bar */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 68,
        background: 'rgba(10, 10, 14, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}>
        {[
          { label: 'Home', to: '/', icon: Home, active: pathname === '/' && !exploreOpen },
          { label: 'Services', to: '/services', icon: Zap, active: pathname === '/services' && !exploreOpen },
          { label: 'Pricing', to: '/pricing', icon: DollarSign, active: pathname === '/pricing' && !exploreOpen },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <Link 
              key={tab.label}
              to={tab.to}
              onClick={() => setExploreOpen(false)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                textDecoration: 'none',
                color: tab.active ? '#f59e0b' : '#888',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              {tab.active && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  width: 24,
                  height: 3,
                  background: '#f59e0b',
                  borderRadius: '0 0 4px 4px',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.6)'
                }} />
              )}
              <Icon size={20} strokeWidth={tab.active ? 2.5 : 1.8} />
              <span style={{ fontSize: 11, fontWeight: tab.active ? 700 : 500, letterSpacing: '-0.01em' }}>
                {tab.label}
              </span>
            </Link>
          );
        })}

        {/* Explore / Menu Button */}
        <button
          onClick={() => setExploreOpen(!exploreOpen)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            color: exploreOpen ? '#f59e0b' : '#888',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
        >
          {exploreOpen && (
            <div style={{
              position: 'absolute',
              top: 0,
              width: 24,
              height: 3,
              background: '#f59e0b',
              borderRadius: '0 0 4px 4px',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.6)'
            }} />
          )}
          <Compass size={20} strokeWidth={exploreOpen ? 2.5 : 1.8} />
          <span style={{ fontSize: 11, fontWeight: exploreOpen ? 700 : 500, letterSpacing: '-0.01em' }}>
            Explore
          </span>
        </button>
      </nav>

      {/* Full-Screen Explorer Sheet Modal */}
      {exploreOpen && (
        <div style={{
          position: 'fixed',
          top: 60,
          bottom: 68,
          left: 0,
          right: 0,
          background: '#07070a',
          zIndex: 48,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          padding: '20px 16px 36px',
          animation: 'fadeIn 0.25s ease-out'
        }}>
          {/* Header & Search */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 4 }}>
                  Explore Zovance
                </h2>
                <p style={{ fontSize: 13, color: '#888' }}>
                  Navigate all autonomous AI & web architecture solutions
                </p>
              </div>
              <button 
                onClick={() => setExploreOpen(false)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input 
                type="text"
                placeholder="Search solutions, pricing, AI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: 12,
                  background: '#121218',
                  border: '1px solid #22222e',
                  color: '#fff',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                onBlur={(e) => e.target.style.borderColor = '#22222e'}
              />
            </div>
          </div>

          {/* Direct Action Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            <div 
              onClick={() => { setExploreOpen(false); onOpenBooking(); }}
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.05))',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: 14,
                padding: '14px 12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Calendar size={18} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Book Discovery</div>
                <div style={{ fontSize: 11, color: '#f59e0b' }}>Free 30-min strategy</div>
              </div>
            </div>

            <a 
              href="https://wa.me/918309827125"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.05))',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                borderRadius: 14,
                padding: '14px 12px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 10, background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <MessageCircle size={18} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>WhatsApp Chat</div>
                <div style={{ fontSize: 11, color: '#4ade80' }}>Instant reply</div>
              </div>
            </a>
          </div>

          {/* Categorized Navigation Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {filteredCategories.map((cat, idx) => (
              <div key={idx}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginBottom: 10, paddingLeft: 4 }}>
                  {cat.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {cat.items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={i}
                        to={item.to}
                        onClick={() => setExploreOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '14px 16px',
                          background: '#111117',
                          border: '1px solid #1c1c26',
                          borderRadius: 14,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{item.label}</span>
                              {item.badge && (
                                <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: '2px 6px', borderRadius: 6, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{item.desc}</div>
                          </div>
                        </div>
                        <ChevronRight size={18} color="#555" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Branding & Legal */}
          <div style={{ marginTop: 36, paddingBottom: 20, textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 20 }}>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
              AUTOMATE. INNOVATE. ELEVATE.
            </p>
            <p style={{ fontSize: 11, color: '#444' }}>
              © {new Date().getFullYear()} Zovance. All rights reserved.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
