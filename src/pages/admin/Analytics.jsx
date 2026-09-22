import { useMemo } from 'react';
import { TrendingUp, BarChart3, PieChart, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStore } from '../../store/useStore';

export default function Analytics() {
  const { leads, projects, members, calculateProject } = useStore();

  // Revenue by service
  const revenueByService = useMemo(() => {
    const services = {};
    projects.forEach(p => {
      const calc = calculateProject(p);
      if (calc && !calc.error) {
        const service = p.name.includes('LMS') ? 'Web Solutions' : p.name.includes('Bot') ? 'AI Voice' : 'AI Automation';
        services[service] = (services[service] || 0) + calc.workPool;
      }
    });
    return Object.entries(services).map(([name, value]) => ({ name, value }));
  }, [projects, calculateProject]);

  // Conversion funnel
  const conversionFunnel = useMemo(() => {
    return [
      { stage: 'New', count: leads.filter(l => l.status === 'new').length },
      { stage: 'Contacted', count: leads.filter(l => l.status === 'contacted').length },
      { stage: 'Qualified', count: leads.filter(l => l.status === 'qualified').length },
      { stage: 'Proposal', count: leads.filter(l => l.status === 'proposal').length },
      { stage: 'Won', count: leads.filter(l => l.status === 'won').length },
    ];
  }, [leads]);

  // Monthly revenue trend
  const monthlyRevenue = [
    { month: 'Jan', revenue: 85000, target: 100000 },
    { month: 'Feb', revenue: 120000, target: 100000 },
    { month: 'Mar', revenue: 95000, target: 100000 },
    { month: 'Apr', revenue: 215000, target: 150000 },
  ];

  // Top performers
  const topPerformers = useMemo(() => {
    return members
      .filter(m => m.active)
      .map(m => {
        const dealsWon = leads.filter(l => l.assigned === m.id && l.status === 'won').length;
        const totalValue = leads
          .filter(l => l.assigned === m.id && l.status === 'won')
          .reduce((sum, l) => sum + l.value, 0);
        return { name: m.name, deals: dealsWon, value: totalValue };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [members, leads]);

  // KPIs
  const totalRevenue = projects.reduce((sum, p) => {
    const calc = calculateProject(p);
    return sum + (calc && !calc.error ? calc.workPool : 0);
  }, 0);

  const conversionRate = leads.length > 0 ? ((leads.filter(l => l.status === 'won').length / leads.length) * 100).toFixed(1) : 0;
  const avgDealValue = leads.length > 0 ? (leads.reduce((sum, l) => sum + l.value, 0) / leads.length).toFixed(0) : 0;
  const activeProjects = projects.filter(p => p.status !== 'approved').length;

  const serviceColors = {
    'Web Solutions': '#60a5fa',
    'AI Voice': '#a78bfa',
    'AI Automation': '#c9a84c',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', letterSpacing: '-0.5px' }}>Business Intelligence & Analytics</h1>
        <p style={{ color: '#526673', fontSize: 14, marginTop: 4 }}>High-level business metrics, conversion funnels, and performance insights</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: TrendingUp, color: '#16a34a', bg: '#DCFCE7' },
          { label: 'Conversion Rate', value: `${conversionRate}%`, icon: Target, color: '#2563eb', bg: '#DBEAFE' },
          { label: 'Avg Deal Value', value: `₹${(avgDealValue / 1000).toFixed(0)}K`, icon: BarChart3, color: '#7c3aed', bg: '#EDE9FE' },
          { label: 'Active Projects', value: activeProjects, icon: PieChart, color: '#0284c7', bg: '#E0F2FE' },
        ].map(s => (
          <div key={s.label} style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 18, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={18} color={s.color} />
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#102C42', letterSpacing: '-0.5px', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#526673' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 420px), 1fr))', gap: 16, marginBottom: 24 }}>
        {/* Revenue Trend */}
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 22, minWidth: 0, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Revenue Trend vs Target</h3>
          <div style={{ width: '100%', height: 250, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#526673' }} />
                <YAxis tick={{ fontSize: 11, fill: '#526673' }} />
                <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 10, fontSize: 12, color: '#102C42' }} formatter={(v) => `₹${v.toLocaleString()}`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} dot={{ fill: '#16a34a', r: 4 }} />
                <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Service */}
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 22, minWidth: 0, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Revenue by Service</h3>
          <div style={{ width: '100%', height: 250, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie data={revenueByService} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                {revenueByService.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={serviceColors[entry.name] || '#102C42'} />
                ))}
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 420px), 1fr))', gap: 16, marginBottom: 24 }}>
        {/* Conversion Funnel */}
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 22, minWidth: 0, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Lead Conversion Funnel</h3>
          <div style={{ width: '100%', height: 250, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionFunnel}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#526673' }} />
                <YAxis tick={{ fontSize: 11, fill: '#526673' }} />
                <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 10, fontSize: 12, color: '#102C42' }} />
                <Bar dataKey="count" fill="#102C42" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performers */}
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 22, minWidth: 0, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Top Performers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {topPerformers.map((p, i) => (
              <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#102C42' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#526673', marginTop: 2 }}>{p.deals} deals won</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#16a34a' }}>₹{(p.value / 100000).toFixed(1)}L</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 420px), 1fr))', gap: 16 }}>
        {/* Lead Metrics */}
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 22, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Lead Metrics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Total Leads', value: leads.length, color: '#102C42' },
              { label: 'New Leads', value: leads.filter(l => l.status === 'new').length, color: '#526673' },
              { label: 'Qualified', value: leads.filter(l => l.status === 'qualified').length, color: '#d97706' },
              { label: 'Won Deals', value: leads.filter(l => l.status === 'won').length, color: '#16a34a' },
              { label: 'Lost Deals', value: leads.filter(l => l.status === 'lost').length, color: '#dc2626' },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 13, color: '#526673', fontWeight: 600 }}>{m.label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: m.color }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Metrics */}
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 22, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Project Metrics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Total Projects', value: projects.length, color: '#102C42' },
              { label: 'Draft', value: projects.filter(p => p.status === 'draft').length, color: '#526673' },
              { label: 'Under Review', value: projects.filter(p => p.status === 'review').length, color: '#d97706' },
              { label: 'Approved', value: projects.filter(p => p.status === 'approved').length, color: '#16a34a' },
              { label: 'Fully Paid', value: projects.filter(p => p.paymentStatus === 'fully_paid').length, color: '#2563eb' },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: 13, color: '#526673', fontWeight: 600 }}>{m.label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: m.color }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
