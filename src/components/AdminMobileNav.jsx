import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  FolderKanban, TrendingUp, FileText, LayoutDashboard, 
  DollarSign, MessageCircle, Calendar, UserCog, 
  Menu, X, Bell, LogOut, Shield, ChevronRight, Grid, Zap 
} from 'lucide-react';

export default function AdminMobileNav({ currentUser, unreadNotifications, onOpenNotifications, onLogout }) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setToolsOpen(false);
  }, [pathname]);

  const allAdminTools = [
    { to: '/admin/crm', icon: FolderKanban, label: 'CRM & Leads', desc: 'Manage lead pipeline & stages', color: '#3b82f6' },
    { to: '/admin/team', icon: TrendingUp, label: 'Team & Roster', desc: 'Productivity & analytics hub', color: '#4ade80' },
    { to: '/admin/projects', icon: FileText, label: 'Client Projects', desc: 'Milestones & deliverables', color: '#f59e0b' },
    { to: '/admin/portfolio-projects', icon: LayoutDashboard, label: 'Portfolio Hub', desc: 'Showcase projects manager', color: '#a855f7' },
    { to: '/admin/testimonials', icon: MessageCircle, label: 'Testimonials', desc: 'Review & publish quotes', color: '#ec4899' },
    { to: '/admin/bookings', icon: Calendar, label: 'Consultations', desc: 'Discovery call bookings', color: '#06b6d4' },
    { to: '/admin/earnings', icon: DollarSign, label: 'Financials', desc: 'Revenue & member splits', color: '#10b981' },
  ];

  if (currentUser?.accessLevel === 'founder') {
    allAdminTools.push({
      to: '/admin/members', icon: UserCog, label: 'Member Access', desc: 'Founder equity & permissions', color: '#eab308'
    });
  }

  return (
    <div className="mobile-only-ui" style={{ display: 'block' }}>
      {/* Top Frosted Admin Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 45,
        height: 60,
        background: 'rgba(8, 8, 10, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="Zovance Logo" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.3px', color: '#fff', lineHeight: 1.1 }}>
              Zovance<span style={{ color: '#f59e0b' }}>.</span>
            </div>
            <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Admin Hub
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            style={{
              position: 'relative',
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Bell size={17} />
            {unreadNotifications > 0 && (
              <span style={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                background: '#f87171',
                borderRadius: '50%',
                boxShadow: '0 0 8px #f87171'
              }} />
            )}
          </button>

          {/* User profile avatar */}
          <div style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            color: '#fff',
            border: '2px solid rgba(245, 158, 11, 0.4)'
          }}>
            {currentUser?.name ? currentUser.name[0].toUpperCase() : 'A'}
          </div>
        </div>
      </header>

      {/* Fixed Bottom Admin App Navigation Bar */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 68,
        background: 'rgba(10, 10, 14, 0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}>
        {[
          { label: 'CRM Leads', to: '/admin/crm', icon: FolderKanban, active: pathname === '/admin/crm' && !toolsOpen },
          { label: 'Projects', to: '/admin/projects', icon: FileText, active: pathname.includes('/admin/projects') && !toolsOpen },
          { label: 'Earnings', to: '/admin/earnings', icon: DollarSign, active: pathname === '/admin/earnings' && !toolsOpen },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <NavLink 
              key={tab.label}
              to={tab.to}
              onClick={() => setToolsOpen(false)}
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
            </NavLink>
          );
        })}

        {/* All Tools Grid Button */}
        <button
          onClick={() => setToolsOpen(!toolsOpen)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            color: toolsOpen ? '#f59e0b' : '#888',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
        >
          {toolsOpen && (
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
          <Grid size={20} strokeWidth={toolsOpen ? 2.5 : 1.8} />
          <span style={{ fontSize: 11, fontWeight: toolsOpen ? 700 : 500, letterSpacing: '-0.01em' }}>
            All Tools
          </span>
        </button>
      </nav>

      {/* Full-Screen Admin Tools Grid Sheet */}
      {toolsOpen && (
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 4 }}>
                Admin Dashboard Hub
              </h2>
              <p style={{ fontSize: 13, color: '#888' }}>
                Tap any tool to manage system workflows
              </p>
            </div>
            <button 
              onClick={() => setToolsOpen(false)}
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

          {/* App-like Grid of Large Icon Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 28 }}>
            {allAdminTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <NavLink
                  key={idx}
                  to={tool.to}
                  onClick={() => setToolsOpen(false)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: '#121218',
                    border: '1px solid #1f1f2a',
                    borderRadius: 16,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    minHeight: 110
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: `${tool.color}18`,
                      border: `1px solid ${tool.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: tool.color
                    }}>
                      <Icon size={22} />
                    </div>
                    <ChevronRight size={18} color="#444" />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
                      {tool.label}
                    </div>
                    <div style={{ fontSize: 11, color: '#888', lineHeight: 1.3 }}>
                      {tool.desc}
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* Quick Sign Out / Account Info Card */}
          <div style={{
            background: '#111117',
            border: '1px solid #1f1f2a',
            borderRadius: 16,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                <LogOut size={18} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Sign Out of Admin</div>
                <div style={{ fontSize: 11, color: '#888' }}>End current secure session</div>
              </div>
            </div>
            <button
              onClick={() => { setToolsOpen(false); onLogout(); }}
              style={{
                padding: '8px 14px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
