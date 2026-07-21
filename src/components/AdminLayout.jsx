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
    <div style={{ display: 'flex', height: '100vh', background: '#080808', overflow: 'hidden', position: 'relative' }}>
      {/* Mobile Backdrop Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="mobile-sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className="desktop-only-ui" style={{
        width: isMobile ? 260 : (sidebarOpen ? 220 : 60),
        flexShrink: 0,
        background: '#0a0a0a',
        borderRight: '1px solid #141414',
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
        <div style={{ padding: '16px 16px', borderBottom: '1px solid #141414', display: 'flex', alignItems: 'center', gap: 10, minHeight: 60, justifyContent: (!sidebarOpen && !isMobile) ? 'center' : 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="Zovance Logo" style={{ width: 34, height: 34, objectFit: 'contain', borderRadius: 6, flexShrink: 0 }} />
            {(sidebarOpen || isMobile) && <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px', color: '#f0f0f0', whiteSpace: 'nowrap' }}>Zovance<span style={{ color: '#f59e0b' }}>.</span></span>}
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 4 }}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          <div style={{ marginBottom: 8 }}>
            {(sidebarOpen || isMobile) && <p style={{ fontSize: 10, color: '#333', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px', marginBottom: 4 }}>Main</p>}
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
              {(sidebarOpen || isMobile) && <p style={{ fontSize: 10, color: '#333', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px', marginBottom: 4 }}>Founder Only</p>}
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

          <div style={{ marginTop: 16, borderTop: '1px solid #141414', paddingTop: 16 }}>
            <Link key="website-link" to="/" className="sidebar-link" style={{ justifyContent: (sidebarOpen || isMobile) ? 'flex-start' : 'center' }} title={!sidebarOpen && !isMobile ? 'View Website' : undefined}>
              <ExternalLink size={16} style={{ flexShrink: 0 }} />
              {(sidebarOpen || isMobile) && 'View Website'}
            </Link>
          </div>
        </nav>

        {/* User */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid #141414' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s' }}
            onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {adminUser?.displayName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A'}
            </div>
            {(sidebarOpen || isMobile) && (
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adminUser?.displayName || 'Admin'}</div>
                <div style={{ fontSize: 10, color: '#3b82f6', textTransform: 'capitalize' }}>Founder</div>
              </div>
            )}
          </div>

          {/* User Menu */}
          {userMenuOpen && (sidebarOpen || isMobile) && (
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: 8, padding: 8, marginTop: 4 }}>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 8px',
                  cursor: 'pointer',
                  color: '#f87171',
                  fontSize: 12,
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1a1a1a'}
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
          <header style={{ height: 60, borderBottom: '1px solid #141414', background: '#0a0a0a', display: 'flex', alignItems: 'center', padding: '0 clamp(12px, 3vw, 20px)', gap: 'clamp(8px, 2vw, 12px)', flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="safe-touch-target" style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', padding: 6, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
            <Menu size={20} />
          </button>

          <div style={{ flex: 1, minWidth: 0 }} />

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setNotifOpen(!notifOpen)} style={{ position: 'relative', background: 'none', border: '1px solid #1e1e1e', borderRadius: 8, padding: '7px', cursor: 'pointer', color: '#666', display: 'flex' }}>
              <Bell size={16} />
              {unread > 0 && <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#3b82f6', color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>}
            </button>
            {notifOpen && (
              <div style={{ position: 'absolute', top: 44, right: isMobile ? -50 : 0, width: 'clamp(260px, 90vw, 300px)', background: '#111', border: '1px solid #222', borderRadius: 12, padding: 12, zIndex: 50, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0', marginBottom: 12, padding: '4px 8px' }}>Notifications</p>
                {notifications.map(n => (
                  <div key={n.id} style={{ padding: '10px 8px', borderRadius: 8, background: n.read ? 'none' : '#1a1a1a', marginBottom: 4, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    {!n.read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', flexShrink: 0, marginTop: 4 }} />}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, color: '#ccc', lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Role Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, maxWidth: isMobile ? 130 : 220 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{currentUser?.avatar || 'Z'}</div>
            <span style={{ fontSize: 12, color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser?.name}</span>
            {!isMobile && <span className="badge" style={{ background: isFounder ? 'rgba(59,130,246,0.15)' : '#1a1a1a', color: isFounder ? '#3b82f6' : '#666', fontSize: 10 }}>{currentUser?.accessLevel}</span>}
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
        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 'clamp(14px, 3.5vw, 24px)', minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
