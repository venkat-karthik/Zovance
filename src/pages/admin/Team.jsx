import { useMemo } from 'react';
import { TrendingUp, Award, Target, DollarSign, Sparkles, Users, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useStore } from '../../store/useStore';

export default function Team() {
  const { members, leads, projects, calculateProject } = useStore();

  const activeMembers = members.filter(m => m.active);

  // Calculate member metrics
  const memberMetrics = useMemo(() => {
    return activeMembers.map(member => {
      const leadsHandled = leads.filter(l => l.assigned === member.id).length;
      const dealsWon = leads.filter(l => l.assigned === member.id && l.status === 'won').length;
      const conversionRate = leadsHandled > 0 ? ((dealsWon / leadsHandled) * 100).toFixed(1) : 0;
      
      const memberProjects = projects.filter(p => p.teamMembers.some(tm => tm.memberId === member.id));
      const totalRevenue = memberProjects.reduce((sum, p) => {
        const calc = calculateProject(p);
        if (calc && !calc.error) {
          const payout = calc.payouts?.find(py => py.memberId === member.id);
          return sum + (payout?.finalShare || 0);
        }
        return sum;
      }, 0);

      return {
        id: member.id,
        name: member.name,
        avatar: member.avatar,
        role: member.role,
        equity: member.equity,
        leadsHandled,
        dealsWon,
        conversionRate,
        projectsWorked: memberProjects.length,
        totalRevenue,
      };
    });
  }, [activeMembers, leads, projects, calculateProject]);

  // Sort by revenue
  const leaderboard = [...memberMetrics].sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Monthly performance data
  const monthlyData = [
    { month: 'Jan', 'Arjun': 45000, 'Priya': 38000, 'Rohan': 32000, 'Sneha': 28000 },
    { month: 'Feb', 'Arjun': 52000, 'Priya': 41000, 'Rohan': 35000, 'Sneha': 31000 },
    { month: 'Mar', 'Arjun': 48000, 'Priya': 39000, 'Rohan': 33000, 'Sneha': 29000 },
    { month: 'Apr', 'Arjun': 61000, 'Priya': 45000, 'Rohan': 38000, 'Sneha': 35000 },
  ];

  const conversionData = memberMetrics.map(m => ({
    name: m.name.split(' ')[0],
    conversion: parseFloat(m.conversionRate),
    deals: m.dealsWon,
  }));

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto' }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(6, 6, 8, 0.95))',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: 16,
        padding: '24px clamp(16px, 3vw, 28px)',
        marginBottom: 28,
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ padding: '4px 12px', borderRadius: 999, background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={13} /> Team & Roster Command Center
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 6 }}>
            Member Performance & Revenue Attribution
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>
            Monitor active engineering capacity, conversion rates, and profit-share payouts.
          </p>
        </div>

        {/* Quick Stats Banner Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 12, padding: '12px 18px', minWidth: 140 }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Roster</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8', marginTop: 4 }}>{activeMembers.length} Engineers</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 12, padding: '12px 18px', minWidth: 140 }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Payouts</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#4ade80', marginTop: 4 }}>
              ₹{(memberMetrics.reduce((s, m) => s + m.totalRevenue, 0) / 100000).toFixed(1)}L
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Active Roster Members', value: activeMembers.length, icon: Users, color: '#38bdf8' },
          { label: 'Total Assigned Leads', value: leads.length, icon: Target, color: '#60a5fa' },
          { label: 'Total Closed Deals', value: leads.filter(l => l.status === 'won').length, icon: Award, color: '#818cf8' },
          { label: 'Distributed Revenue Share', value: `₹${(memberMetrics.reduce((s, m) => s + m.totalRevenue, 0) / 100000).toFixed(1)}L`, icon: DollarSign, color: '#4ade80' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(11, 15, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={18} color={s.color} />
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div style={{ background: 'rgba(11, 15, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: 24, marginBottom: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={18} color="#38bdf8" /> Revenue Attribution Leaderboard
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {leaderboard.map((m, i) => (
            <div key={m.id} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: i === 0 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)', border: i === 0 ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: i === 0 ? '#38bdf8' : '#cbd5e1' }}>
                #{i + 1}
              </div>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#ffffff', boxShadow: '0 0 12px rgba(37, 99, 235, 0.3)' }}>
                {m.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff' }}>{m.name}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{m.role} <span style={{ color: '#64748b' }}>•</span> {m.equity}% Equity Share</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#38bdf8' }}>₹{(m.totalRevenue / 100000).toFixed(1)}L</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{m.projectsWorked} active projects</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(260px, 45vw, 380px), 1fr))', gap: 16, marginBottom: 28 }}>
        {/* Monthly Revenue */}
        <div style={{ background: 'rgba(11, 15, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: 22, minWidth: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 18 }}>Monthly Revenue Allocation by Engineer</h3>
          <div style={{ width: '100%', height: 260, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, fontSize: 12, color: '#fff' }} formatter={(v) => `₹${v.toLocaleString()}`} />
                <Legend wrapperStyle={{ fontSize: 12, color: '#cbd5e1' }} />
                <Bar dataKey="Arjun" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Priya" fill="#60a5fa" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Rohan" fill="#818cf8" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Sneha" fill="#a78bfa" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Rate */}
        <div style={{ background: 'rgba(11, 15, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: 22, minWidth: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', marginBottom: 18 }}>Lead Conversion Rate vs Deals Closed</h3>
          <div style={{ width: '100%', height: 260, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: 10, fontSize: 12, color: '#fff' }} formatter={(v) => `${v}%`} />
                <Bar dataKey="conversion" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Member Details Table */}
      <div style={{ background: 'rgba(11, 15, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff' }}>Detailed Member Performance Metrics</h3>
        </div>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', minWidth: 0 }}>
          <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.01)' }}>
                <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Member / Engineer</th>
                <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned Leads</th>
                <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deals Won</th>
                <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conversion Rate</th>
                <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Projects</th>
                <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              {memberMetrics.map((m, idx) => (
                <tr
                  key={m.id}
                  style={{
                    borderBottom: idx === memberMetrics.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#ffffff' }}>
                        {m.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff' }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{m.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#cbd5e1', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                      {m.leadsHandled}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ background: 'rgba(74, 222, 128, 0.12)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.25)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                      {m.dealsWon}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                      {m.conversionRate}%
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: '#cbd5e1' }}>{m.projectsWorked}</td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#38bdf8' }}>₹{(m.totalRevenue / 100000).toFixed(1)}L</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
