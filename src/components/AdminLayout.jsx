import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, TrendingUp, DollarSign, UserCog, FileText, Bell,
  LogOut, Menu, X, ExternalLink, Calendar, MessageCircle
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAdminAuth } from '../context/AdminAuthContext';
import AdminMobileNav from './AdminMobileNav';

const navItems = [
  { to: '/admin/crm', icon: FolderKanban, label: 'CRM & Lead Pipeline' },
  { to: '/admin/team', icon: TrendingUp, label: 'Team & Roster Hub' },
  { to: '/admin/projects', icon: FileText, label: 'Client Projects' },
  { to: '/admin/portfolio-projects', icon: LayoutDashboard, label: 'Portfolio Showcase' },
  { to: '/admin/testimonials', icon: MessageCircle, label: 'Client Testimonials' },
  { to: '/admin/bookings', icon: Calendar, label: 'Consultations' },
  { to: '/admin/earnings', icon: DollarSign, label: 'Financial Overview' },
];

const founderOnly = [
  { to: '/admin/members', icon: UserCog, label: 'Member Access & Equity' },
];

export default function AdminLayout() {
  const { currentUser, members, notifications, setCurrentUser } = useStore();
  const { adminUser, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const unread = notifications.filter(n => !n.read).length;

  const isFounder = currentUser?.accessLevel === 'founder';

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#F2FAFD', color: '#102C42', overflow: 'hidden', position: 'relative' }}>
      {/* Mobile Backdrop Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="mobile-sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className="desktop-only-ui" style={{
        width: isMobile ? 260 : (sidebarOpen ? 230 : 68),
        flexShrink: 0,
        background: '#FFFFFF',
        borderRight: '1px solid #DCE9EE',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        position: isMobile ? 'fixed' : 'relative',
        top: 0,
        bottom: 0,
        left: isMobile ? (sidebarOpen ? 0 : -280) : 0,
        zIndex: isMobile ? 100 : 20,
      }}>
        {/* Logo */}
        <div style={{ padding: '16px 18px', borderBottom: '1px solid #DCE9EE', display: 'flex', alignItems: 'center', gap: 10, minHeight: 64, justifyContent: (!sidebarOpen && !isMobile) ? 'center' : 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: 'linear-gradient(135deg, #102C42 0%, #193A54 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(16, 44, 66, 0.15)',
              flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20L10 18H20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="18" cy="18" r="2.5" fill="#38A85B" />
              </svg>
            </div>
            {(sidebarOpen || isMobile) && (
              <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.03em', color: '#102C42', whiteSpace: 'nowrap' }}>
                ZOVANCE<span style={{ color: '#38A85B' }}>.</span>
              </span>
            )}
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#526673', cursor: 'pointer', padding: 4 }}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>
          <div style={{ marginBottom: 8 }}>
            {(sidebarOpen || isMobile) && <p style={{ fontSize: 10, color: '#526673', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', marginBottom: 4 }}>Main Platform</p>}
            {navItems.map(item => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                onClick={() => isMobile && setSidebarOpen(false)}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} 
                style={{ justifyContent: (sidebarOpen || isMobile) ? 'flex-start' : 'center' }} 
                title={!sidebarOpen && !isMobile ? item.label : undefined}
              >
                <item.icon size={16} style={{ flexShrink: 0 }} />
                {(sidebarOpen || isMobile) && item.label}
              </NavLink>
            ))}
          </div>

          {isFounder && (
            <div style={{ marginTop: 16 }}>
              {(sidebarOpen || isMobile) && <p style={{ fontSize: 10, color: '#526673', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', marginBottom: 4 }}>Founder Access</p>}
              {founderOnly.map(item => (
                <NavLink 
                  key={item.to} 
                  to={item.to} 
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} 
                  style={{ justifyContent: (sidebarOpen || isMobile) ? 'flex-start' : 'center' }} 
                  title={!sidebarOpen && !isMobile ? item.label : undefined}
                >
                  <item.icon size={16} style={{ flexShrink: 0 }} />
                  {(sidebarOpen || isMobile) && item.label}
                </NavLink>
              ))}
            </div>
          )}

          <div style={{ marginTop: 16, borderTop: '1px solid #DCE9EE', paddingTop: 16 }}>
            <Link key="website-link" to="/" className="sidebar-link" style={{ justifyContent: (sidebarOpen || isMobile) ? 'flex-start' : 'center' }} title={!sidebarOpen && !isMobile ? 'View Website' : undefined}>
              <ExternalLink size={16} style={{ flexShrink: 0 }} />
              {(sidebarOpen || isMobile) && 'View Live Website'}
            </Link>
          </div>
        </nav>

        {/* User */}
        <div style={{ padding: '14px 10px', borderTop: '1px solid #DCE9EE' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, cursor: 'pointer', transition: 'background 0.15s' }}
            onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#102C42', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {adminUser?.displayName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A'}
            </div>
            {(sidebarOpen || isMobile) && (
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#102C42', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adminUser?.displayName || 'Admin'}</div>
                <div style={{ fontSize: 11, color: '#38A85B', textTransform: 'capitalize', fontWeight: 600 }}>Founder</div>
              </div>
            )}
          </div>

          {/* User Menu */}
          {userMenuOpen && (sidebarOpen || isMobile) && (
            <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 12, padding: 8, marginTop: 6, boxShadow: '0 8px 24px rgba(16,44,66,0.08)' }}>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 10px',
                  cursor: 'pointer',
                  color: '#e11d48',
                  fontSize: 12,
                  fontWeight: 600,
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#FFF1F2'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {/* Header (Desktop/Tablet) */}
        <div className="desktop-only-ui">
          <header style={{ height: 64, borderBottom: '1px solid #DCE9EE', background: '#FFFFFF', display: 'flex', alignItems: 'center', padding: '0 clamp(12px, 3vw, 24px)', gap: 'clamp(8px, 2vw, 12px)', flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="safe-touch-target" style={{ background: '#F2FAFD', border: '1px solid #DCE9EE', color: '#102C42', cursor: 'pointer', display: 'flex', padding: 8, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Menu size={18} />
          </button>

          <div style={{ flex: 1, minWidth: 0 }} />

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setNotifOpen(!notifOpen)} style={{ position: 'relative', background: '#F2FAFD', border: '1px solid #DCE9EE', borderRadius: 10, padding: '8px', cursor: 'pointer', color: '#526673', display: 'flex' }}>
              <Bell size={16} />
              {unread > 0 && <span style={{ position: 'absolute', top: -3, right: -3, width: 16, height: 16, borderRadius: '50%', background: '#38A85B', color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>}
            </button>
            {notifOpen && (
              <div style={{ position: 'absolute', top: 46, right: isMobile ? -50 : 0, width: 'clamp(260px, 90vw, 320px)', background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, padding: 14, zIndex: 50, boxShadow: '0 20px 40px rgba(16,44,66,0.12)' }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#102C42', marginBottom: 12, padding: '4px 8px' }}>Platform Notifications</p>
                {notifications.map(n => (
                  <div key={n.id} style={{ padding: '10px 8px', borderRadius: 8, background: n.read ? 'none' : '#F2FAFD', marginBottom: 4, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    {!n.read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#38A85B', flexShrink: 0, marginTop: 4 }} />}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, color: '#102C42', lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: 11, color: '#526673', marginTop: 2 }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Role Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#F2FAFD', border: '1px solid #DCE9EE', borderRadius: 9999, maxWidth: isMobile ? 130 : 220 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#102C42', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{currentUser?.avatar || 'Z'}</div>
            <span style={{ fontSize: 12, color: '#102C42', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser?.name}</span>
            {!isMobile && <span className="badge" style={{ background: isFounder ? 'rgba(56,168,91,0.12)' : '#E2E8F0', color: isFounder ? '#38A85B' : '#526673', fontSize: 10, fontWeight: 700 }}>{currentUser?.accessLevel}</span>}
          </div>
          </header>
        </div>

        {/* Dedicated Phone Mode Admin Navigation */}
        <AdminMobileNav 
          currentUser={currentUser} 
          unreadNotifications={unread} 
          onOpenNotifications={() => setNotifOpen(!notifOpen)} 
          onLogout={handleLogout} 
        />

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 'clamp(14px, 3.5vw, 28px)', minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
