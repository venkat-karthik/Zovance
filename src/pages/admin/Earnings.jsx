import { useMemo, useState } from 'react';
import { Download, DollarSign, TrendingUp, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../../store/useStore';

export default function Earnings() {
  const { members, projects, calculateProject, currentUser } = useStore();
  const [selectedMember, setSelectedMember] = useState(null);

  const activeMembers = members.filter(m => m.active);

  // Calculate earnings for each member
  const memberEarnings = useMemo(() => {
    return activeMembers.map(member => {
      let totalWork = 0;
      let totalBD = 0;
      let totalSub = 0;
      const projectBreakdown = [];

      projects.forEach(p => {
        const calc = calculateProject(p);
        if (calc && !calc.error) {
          // Work share
          const payout = calc.payouts.find(py => py.memberId === member.id);
          if (payout) {
            totalWork += payout.share;
            totalSub += payout.subDeductions;
            projectBreakdown.push({
              projectName: p.name,
              workShare: payout.share,
              subDeductions: payout.subDeductions,
              finalShare: payout.finalShare,
              bdBonus: 0,
            });
          }

          // BD bonus
          if (calc.bdMemberId === member.id) {
            totalBD += calc.bdAmount;
            const existing = projectBreakdown.find(pb => pb.projectName === p.name);
            if (existing) {
              existing.bdBonus = calc.bdAmount;
            } else {
              projectBreakdown.push({
                projectName: p.name,
                workShare: 0,
                subDeductions: 0,
                finalShare: 0,
                bdBonus: calc.bdAmount,
              });
            }
          }
        }
      });

      return {
        id: member.id,
        name: member.name,
        avatar: member.avatar,
        role: member.role,
        equity: member.equity,
        totalWork,
        totalBD,
        totalSub,
        totalEarnings: totalWork + totalBD - totalSub,
        projectBreakdown,
      };
    });
  }, [activeMembers, projects, calculateProject]);

  const totalEarnings = memberEarnings.reduce((sum, m) => sum + m.totalEarnings, 0);
  const totalBD = memberEarnings.reduce((sum, m) => sum + m.totalBD, 0);

  const monthlyEarnings = [
    { month: 'Jan', earnings: 145000 },
    { month: 'Feb', earnings: 168000 },
    { month: 'Mar', earnings: 152000 },
    { month: 'Apr', earnings: 195000 },
  ];

  const handleExport = () => {
    let csv = 'Member,Role,Total Work,BD Bonus,Sub Deductions,Total Earnings\n';
    memberEarnings.forEach(m => {
      csv += `${m.name},${m.role},₹${m.totalWork.toLocaleString()},₹${m.totalBD.toLocaleString()},₹${m.totalSub.toLocaleString()},₹${m.totalEarnings.toLocaleString()}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `earnings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', letterSpacing: '-0.5px' }}>Earnings & Payouts</h1>
          <p style={{ color: '#526673', fontSize: 14, marginTop: 4 }}>Track member earnings, performance bonuses, and transparent payouts</p>
        </div>
        <button className="btn-outline" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFFFFF', color: '#102C42', border: '1px solid #DCE9EE', padding: '9px 16px', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Earnings', value: `₹${(totalEarnings / 100000).toFixed(1)}L`, icon: DollarSign, color: '#16a34a', bg: '#DCFCE7' },
          { label: 'BD Bonuses', value: `₹${(totalBD / 100000).toFixed(1)}L`, icon: Award, color: '#d97706', bg: '#FEF3C7' },
          { label: 'Active Members', value: activeMembers.length, icon: TrendingUp, color: '#2563eb', bg: '#DBEAFE' },
          { label: 'Avg per Member', value: `₹${(totalEarnings / activeMembers.length / 100000).toFixed(1)}L`, icon: DollarSign, color: '#7c3aed', bg: '#EDE9FE' },
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

      {/* Monthly Trend */}
      <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 22, marginBottom: 24, minWidth: 0, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Monthly Earnings Trend</h3>
        <div style={{ width: '100%', height: 260, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#526673' }} />
              <YAxis tick={{ fontSize: 12, fill: '#526673' }} />
              <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 10, fontSize: 12, color: '#102C42', boxShadow: '0 4px 14px rgba(16,44,66,0.08)' }} formatter={(v) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="earnings" fill="#102C42" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Member Earnings Table */}
      <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, overflow: 'hidden', marginBottom: 24, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #DCE9EE', background: '#F8FAFC' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42' }}>Member Earnings Summary</h3>
        </div>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', minWidth: 0 }}>
          <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #DCE9EE', background: '#F8FAFC' }}>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#526673', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Member</th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#526673', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Work Share</th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#526673', textTransform: 'uppercase', letterSpacing: '0.05em' }}>BD Bonus</th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#526673', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sub Deductions</th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#526673', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Earnings</th>
                <th style={{ padding: '12px 18px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#526673', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {memberEarnings.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#102C42', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>
                        {m.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#102C42' }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: '#526673', marginTop: 1 }}>{m.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#2563eb' }}>₹{(m.totalWork / 100000).toFixed(1)}L</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#d97706' }}>₹{(m.totalBD / 100000).toFixed(1)}L</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#dc2626' }}>-₹{(m.totalSub / 100000).toFixed(1)}L</div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#16a34a' }}>₹{(m.totalEarnings / 100000).toFixed(1)}L</div>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                    <button onClick={() => setSelectedMember(m)} style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#16a34a', padding: '5px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="modal-backdrop" onClick={() => setSelectedMember(null)} style={{ background: 'rgba(16,44,66,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, boxShadow: '0 20px 40px rgba(16,44,66,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#102C42', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>
                  {selectedMember.avatar}
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#102C42' }}>{selectedMember.name}</h2>
                  <p style={{ color: '#526673', fontSize: 12 }}>{selectedMember.role}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#526673', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(140px, 40vw, 180px), 1fr))', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Work Share', value: `₹${(selectedMember.totalWork / 100000).toFixed(1)}L`, color: '#2563eb', bg: '#EFF6FF' },
                { label: 'BD Bonus', value: `₹${(selectedMember.totalBD / 100000).toFixed(1)}L`, color: '#d97706', bg: '#FFFBEB' },
                { label: 'Sub Deductions', value: `-₹${(selectedMember.totalSub / 100000).toFixed(1)}L`, color: '#dc2626', bg: '#FEF2F2' },
                { label: 'Total Earnings', value: `₹${(selectedMember.totalEarnings / 100000).toFixed(1)}L`, color: '#16a34a', bg: '#F0FDF4' },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: 14, border: '1px solid #E2E8F0' }}>
                  <p style={{ fontSize: 12, color: '#526673', fontWeight: 600, marginBottom: 4 }}>{s.label}</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#102C42', marginBottom: 12 }}>Project Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
                {selectedMember.projectBreakdown.map((pb, i) => (
                  <div key={i} style={{ background: '#F8FAFC', borderRadius: 10, padding: 14, border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#102C42' }}>{pb.projectName}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#16a34a' }}>₹{(pb.finalShare / 100000).toFixed(1)}L</span>
                    </div>
                    {pb.workShare > 0 && (
                      <div style={{ fontSize: 12, color: '#526673', marginBottom: 3 }}>Work: ₹{(pb.workShare / 100000).toFixed(1)}L</div>
                    )}
                    {pb.bdBonus > 0 && (
                      <div style={{ fontSize: 12, color: '#d97706', marginBottom: 3 }}>BD Bonus: ₹{(pb.bdBonus / 100000).toFixed(1)}L</div>
                    )}
                    {pb.subDeductions > 0 && (
                      <div style={{ fontSize: 12, color: '#dc2626' }}>Sub Deductions: -₹{(pb.subDeductions / 100000).toFixed(1)}L</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button style={{ width: '100%', background: '#102C42', color: '#FFFFFF', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }} onClick={() => setSelectedMember(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
