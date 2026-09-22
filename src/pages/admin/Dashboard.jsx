import { Link } from 'react-router-dom';
import { TrendingUp, Users, DollarSign, FolderKanban, ArrowRight, CheckCircle } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useStore } from '../../store/useStore';

const revenueData = [
  { month: 'Nov', revenue: 85000 }, { month: 'Dec', revenue: 120000 }, { month: 'Jan', revenue: 95000 },
  { month: 'Feb', revenue: 180000 }, { month: 'Mar', revenue: 145000 }, { month: 'Apr', revenue: 215000 },
];

const fmt = (n) => n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : `₹${(n/1000).toFixed(0)}K`;

export default function Dashboard() {
  const { leads, projects, members, currentUser } = useStore();

  const activeLeads = leads.filter(l => !['won', 'lost'].includes(l.status)).length;
  const wonLeads = leads.filter(l => l.status === 'won').length;
  const totalRevenue = projects.filter(p => p.paymentStatus !== 'not_paid').reduce((s, p) => s + p.totalValue, 0);
  const approvedProjects = projects.filter(p => p.status === 'approved').length;
  const activeMembers = members.filter(m => m.active).length;

  const stats = [
    { label: 'Total Revenue', value: fmt(totalRevenue), icon: DollarSign, change: '+18%', color: '#3b82f6' },
    { label: 'Active Leads', value: activeLeads, icon: Users, change: '+5 this week', color: '#60a5fa' },
    { label: 'Projects', value: projects.length, icon: FolderKanban, change: `${approvedProjects} approved`, color: '#a78bfa' },
    { label: 'Team Members', value: activeMembers, icon: TrendingUp, change: 'Active', color: '#4ade80' },
  ];

  const recentActivity = [
    { text: 'New lead added: MedCare Hospitals', time: '2h ago', type: 'lead' },
    { text: 'Project EduPrime LMS approved', time: '1d ago', type: 'project' },
    { text: 'RetailX moved to Proposal', time: '2d ago', type: 'lead' },
    { text: 'Finance calc updated: RetailX Bot', time: '3d ago', type: 'finance' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', letterSpacing: '-0.03em' }}>
          Good morning, {currentUser?.name?.split(' ')[0] || 'Team'} 👋
        </h1>
        <p style={{ color: '#526673', fontSize: 14, marginTop: 4 }}>Here's what's happening across Zovance systems today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={s.label} className="fade-in-up" style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, padding: '20px', boxShadow: '0 2px 10px rgba(16,44,66,0.04)', animationDelay: `${i * 0.1}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F2FAFD', border: '1px solid #DCE9EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={16} color="#102C42" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#38A85B', background: 'rgba(56,168,91,0.1)', padding: '3px 8px', borderRadius: 999 }}>{s.change}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#102C42', letterSpacing: '-0.03em', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#526673', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 500px), 1fr))', gap: 16, marginBottom: 16 }}>
        {/* Revenue Chart */}
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, padding: 24, boxShadow: '0 2px 10px rgba(16,44,66,0.04)', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42' }}>Revenue Trend</h3>
              <p style={{ fontSize: 12, color: '#526673' }}>Last 6 months</p>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#38A85B' }}>{fmt(totalRevenue)}</span>
          </div>
          <div style={{ width: '100%', height: 160, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38A85B" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#38A85B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#526673' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 10, fontSize: 12, boxShadow: '0 8px 24px rgba(16,44,66,0.08)' }} formatter={(v) => [fmt(v), 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#38A85B" fill="url(#rg)" strokeWidth={2.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Summary */}
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, padding: 24, boxShadow: '0 2px 10px rgba(16,44,66,0.04)', minWidth: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Lead Pipeline</h3>
          {[
            { label: 'New', count: leads.filter(l => l.status === 'new').length, color: '#3E9FD0' },
            { label: 'Contacted', count: leads.filter(l => l.status === 'contacted').length, color: '#8FD3F4' },
            { label: 'Qualified', count: leads.filter(l => l.status === 'qualified').length, color: '#102C42' },
            { label: 'Proposal', count: leads.filter(l => l.status === 'proposal').length, color: '#F59E0B' },
            { label: 'Won', count: wonLeads, color: '#38A85B' },
            { label: 'Lost', count: leads.filter(l => l.status === 'lost').length, color: '#F43F5E' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                <span style={{ fontSize: 13, color: '#526673' }}>{s.label}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#102C42' }}>{s.count}</span>
            </div>
          ))}
          <Link to="/admin/crm" className="safe-touch-target" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#38A85B', fontSize: 13, fontWeight: 600, marginTop: 14, textDecoration: 'none' }}>
            <span>View Full Pipeline</span> <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 400px), 1fr))', gap: 16 }}>
        {/* Recent Projects */}
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, padding: 24, boxShadow: '0 2px 10px rgba(16,44,66,0.04)', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42' }}>Recent Projects</h3>
            <Link to="/admin/projects" className="safe-touch-target" style={{ fontSize: 12, fontWeight: 600, color: '#38A85B', textDecoration: 'none' }}>View all</Link>
          </div>
          {projects.map(p => (
            <Link key={p.id} to={`/admin/projects/${p.id}`} className="safe-touch-target" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F1F5F9', textDecoration: 'none' }}>
              <div>
                <div style={{ fontSize: 13, color: '#102C42', fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#526673', marginTop: 2 }}>₹{p.totalValue?.toLocaleString()}</div>
              </div>
              <span className={`badge status-${p.status}`} style={{ fontSize: 11 }}>{p.status}</span>
            </Link>
          ))}
          {projects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '24px', color: '#526673', fontSize: 13 }}>No projects yet</div>
          )}
        </div>

        {/* Recent Activity */}
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, padding: 24, boxShadow: '0 2px 10px rgba(16,44,66,0.04)', minWidth: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Recent Platform Activity</h3>
          {recentActivity.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#F2FAFD', border: '1px solid #DCE9EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {a.type === 'project' ? <CheckCircle size={13} color="#38A85B" /> : a.type === 'finance' ? <DollarSign size={13} color="#102C42" /> : <Users size={13} color="#3E9FD0" />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: '#102C42', lineHeight: 1.4, fontWeight: 500 }}>{a.text}</p>
                <p style={{ fontSize: 11, color: '#526673', marginTop: 2 }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
