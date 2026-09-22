import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { useStore } from '../../store/useStore';

const effortLevels = { none: 'Not involved', helped: 'Helped a little', contributed: 'Contributed', core: 'Core worker', led: 'Led the build' };


export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, members, leads, updateProject, approveProject, calculateProject, addAuditLog, currentUser } = useStore();
  const project = projects.find(p => p.id === parseInt(id));


  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddSub, setShowAddSub] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [newMember, setNewMember] = useState({ memberId: '', effort: 'contributed' });
  const [newSub, setNewSub] = useState({ name: '', percent: 15 });

  if (!project) return <div style={{ padding: 20, color: '#f0f0f0' }}>Project not found</div>;

  const isLocked = project.status === 'approved';
  const isFounder = currentUser?.accessLevel === 'founder';
  const client = leads.find(l => l.id === project.clientId);
  const calculation = calculateProject(project);

  const getMemberName = (memberId) => members.find(m => m.id === memberId)?.name || 'Unknown';
  const getMemberAvatar = (memberId) => members.find(m => m.id === memberId)?.avatar || '?';

  const handleAddMember = () => {
    if (newMember.memberId) {
      const updated = {
        ...project,
        teamMembers: [...project.teamMembers, { memberId: parseInt(newMember.memberId), effort: newMember.effort, subEmployees: [] }]
      };
      updateProject(project.id, updated);
      setNewMember({ memberId: '', effort: 'contributed' });
      setShowAddMember(false);
    }
  };

  const handleRemoveMember = (memberId) => {
    const updated = {
      ...project,
      teamMembers: project.teamMembers.filter(m => m.memberId !== memberId)
    };
    updateProject(project.id, updated);
  };

  const handleUpdateEffort = (memberId, effort) => {
    const updated = {
      ...project,
      teamMembers: project.teamMembers.map(m => m.memberId === memberId ? { ...m, effort } : m)
    };
    updateProject(project.id, updated);
  };

  const handleAddSubEmployee = (memberId) => {
    if (newSub.name) {
      const updated = {
        ...project,
        teamMembers: project.teamMembers.map(m =>
          m.memberId === memberId
            ? { ...m, subEmployees: [...m.subEmployees, { ...newSub, id: Date.now() }] }
            : m
        )
      };
      updateProject(project.id, updated);
      setNewSub({ name: '', percent: 15 });
      setShowAddSub(false);
      setSelectedMemberId(null);
    }
  };

  const handleRemoveSubEmployee = (memberId, subId) => {
    const updated = {
      ...project,
      teamMembers: project.teamMembers.map(m =>
        m.memberId === memberId
          ? { ...m, subEmployees: m.subEmployees.filter(s => s.id !== subId) }
          : m
      )
    };
    updateProject(project.id, updated);
  };

  const handleApprove = () => {
    if (isFounder && !isLocked) {
      approveProject(project.id);
      addAuditLog({ userId: currentUser.id, action: `Approved project ${project.name}` });
    }
  };

  const generateWhatsAppSummary = () => {
    if (!calculation || calculation.error) return;
    const summary = `*${project.name} - Finance Summary*\n\n` +
      `Total Value: ₹${project.totalValue.toLocaleString()}\n` +
      `Company Reserve (${project.companyReserve}%): ₹${calculation.reserve.toLocaleString()}\n` +
      `BD Bonus (${project.bdBonus?.percent}%): ₹${calculation.bdAmount.toLocaleString()}\n` +
      `Work Pool: ₹${calculation.workPool.toLocaleString()}\n\n` +
      `*Payouts:*\n` +
      calculation.payouts.map(p => `${getMemberName(p.memberId)}: ₹${p.finalShare.toLocaleString()}`).join('\n');
    
    const encoded = encodeURIComponent(summary);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const chartData = calculation && !calculation.error ? calculation.payouts.map(p => ({
    name: getMemberName(p.memberId),
    value: p.finalShare,
    fill: ['#c9a84c', '#60a5fa', '#a78bfa', '#4ade80', '#f59e0b'][calculation.payouts.indexOf(p) % 5]
  })) : [];

  const waterfall = calculation && !calculation.error ? [
    { name: 'Total Value', value: project.totalValue, fill: '#c9a84c' },
    { name: 'Company Reserve', value: -calculation.reserve, fill: '#f87171' },
    { name: 'BD Bonus', value: -calculation.bdAmount, fill: '#f59e0b' },
    { name: 'Work Pool', value: calculation.workPool, fill: '#4ade80' }
  ] : [];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button onClick={() => navigate('/admin/projects')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4 }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#102C42', letterSpacing: '-0.5px' }}>{project.name}</h1>
          <p style={{ color: '#526673', fontSize: 13, marginTop: 2 }}>{client?.name} • ₹{project.totalValue.toLocaleString()}</p>
        </div>
        <span className="badge" style={{ background: project.status === 'approved' ? 'rgba(22,163,74,0.1)' : 'rgba(217,119,6,0.1)', color: project.status === 'approved' ? '#16A34A' : '#D97706' }}>
          {project.status === 'approved' ? 'Approved' : 'Under Review'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 500px), 1fr))', gap: 16, marginBottom: 24 }}>
        {/* Main Content */}
        <div style={{ minWidth: 0 }}>
          {/* Project Info */}
          <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 24, marginBottom: 16, minWidth: 0, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Project Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 45vw, 220px), 1fr))', gap: 16 }}>
              <div>
                <label className="label">Total Value</label>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#16a34a' }}>₹{project.totalValue.toLocaleString()}</div>
              </div>
              <div>
                <label className="label">Payment Status</label>
                <select
                  value={project.paymentStatus}
                  onChange={(e) => updateProject(project.id, { paymentStatus: e.target.value })}
                  disabled={isLocked}
                  className="input"
                  style={{ opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'not-allowed' : 'pointer', background: '#FFFFFF', border: '1px solid #DCE9EE', color: '#102C42', fontWeight: 600 }}
                >
                  <option value="not_paid">Not Paid</option>
                  <option value="partial">Partial</option>
                  <option value="fully_paid">Fully Paid</option>
                </select>
              </div>
              <div>
                <label className="label">Company Reserve (%)</label>
                <input
                  type="number"
                  value={project.companyReserve}
                  onChange={(e) => updateProject(project.id, { companyReserve: parseInt(e.target.value) })}
                  disabled={isLocked}
                  className="input"
                  style={{ opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'not-allowed' : 'pointer', background: '#FFFFFF', border: '1px solid #DCE9EE', color: '#102C42' }}
                />
              </div>
              <div>
                <label className="label">BD Bonus Member</label>
                <select
                  value={project.bdBonus?.memberId || ''}
                  onChange={(e) => updateProject(project.id, { bdBonus: { ...project.bdBonus, memberId: e.target.value ? parseInt(e.target.value) : null } })}
                  disabled={isLocked}
                  className="input"
                  style={{ opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'not-allowed' : 'pointer', background: '#FFFFFF', border: '1px solid #DCE9EE', color: '#102C42', fontWeight: 600 }}
                >
                  <option value="">None</option>
                  {members.filter(m => m.active).map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              {project.bdBonus?.memberId && (
                <div>
                  <label className="label">BD Bonus %</label>
                  <input
                    type="number"
                    value={project.bdBonus.percent}
                    onChange={(e) => updateProject(project.id, { bdBonus: { ...project.bdBonus, percent: parseInt(e.target.value) } })}
                    disabled={isLocked}
                    className="input"
                    style={{ opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'not-allowed' : 'pointer', background: '#FFFFFF', border: '1px solid #DCE9EE', color: '#102C42' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 24, marginBottom: 16, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#102C42' }}>Team Members</h3>
              {!isLocked && (
                <button className="btn-sm" onClick={() => setShowAddMember(true)} style={{ background: '#102C42', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}>
                  <Plus size={14} /> Add Member
                </button>
              )}
            </div>

            {project.teamMembers.length === 0 ? (
              <p style={{ color: '#526673', fontSize: 13 }}>No team members assigned yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {project.teamMembers.map(tm => (
                  <div key={tm.memberId} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#102C42', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>
                          {getMemberAvatar(tm.memberId)}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#102C42' }}>{getMemberName(tm.memberId)}</div>
                          <div style={{ fontSize: 12, color: '#526673', marginTop: 1 }}>Effort: {effortLevels[tm.effort]}</div>
                        </div>
                      </div>
                      {!isLocked && (
                        <button onClick={() => handleRemoveMember(tm.memberId)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: 4 }}>
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    {!isLocked && (
                      <div style={{ marginBottom: 12 }}>
                        <label className="label">Effort Level</label>
                        <select
                          value={tm.effort}
                          onChange={(e) => handleUpdateEffort(tm.memberId, e.target.value)}
                          className="input"
                          style={{ fontSize: 12, background: '#FFFFFF', border: '1px solid #DCE9EE', color: '#102C42' }}
                        >
                          {Object.entries(effortLevels).map(([k, v]) => (
                            <option key={k} value={k}>{v}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Sub-employees */}
                    {tm.subEmployees.length > 0 && (
                      <div style={{ background: '#FFFFFF', borderRadius: 8, padding: 10, marginBottom: 10, border: '1px solid #E2E8F0' }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: '#526673', marginBottom: 8 }}>Sub-employees ({tm.subEmployees.length})</p>
                        {tm.subEmployees.map(se => (
                          <div key={se.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
                            <span style={{ fontSize: 11, color: '#102C42' }}>{se.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 600 }}>{se.percent}%</span>
                              {!isLocked && (
                                <button onClick={() => handleRemoveSubEmployee(tm.memberId, se.id)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: 2 }}>
                                  <X size={12} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {!isLocked && (
                      <button
                        className="btn-sm"
                        onClick={() => { setSelectedMemberId(tm.memberId); setShowAddSub(true); }}
                        style={{ background: '#FFFFFF', color: '#526673', border: '1px solid #DCE9EE', width: '100%', borderRadius: 8, padding: '6px 12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        <Plus size={12} /> Add Sub-employee
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ minWidth: 0 }}>
          {/* Finance Summary */}
          {calculation && !calculation.error ? (
            <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Finance Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: 13, color: '#526673' }}>Total Value</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#102C42' }}>₹{calculation.totalValue.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: 13, color: '#526673' }}>Company Reserve ({project.companyReserve}%)</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#DC2626' }}>-₹{calculation.reserve.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: 13, color: '#526673' }}>BD Bonus ({project.bdBonus?.percent}%)</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#D97706' }}>-₹{calculation.bdAmount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F0FDF4', borderRadius: 10, padding: '12px 14px', border: '1px solid #BBF7D0' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#16A34A' }}>Work Pool</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#16A34A' }}>₹{calculation.workPool.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : calculation?.error ? (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 14, padding: 16, marginBottom: 16, display: 'flex', gap: 12 }}>
              <AlertCircle size={18} color="#DC2626" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#DC2626', marginBottom: 4 }}>Calculation Error</p>
                <p style={{ fontSize: 12, color: '#DC2626' }}>{calculation.error}</p>
              </div>
            </div>
          ) : null}

          {/* Payouts */}
          {calculation && !calculation.error && (
            <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 22, marginBottom: 16, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Payouts (Sorted)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {calculation.payouts.map((p, i) => (
                  <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#102C42' }}>{getMemberName(p.memberId)}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#16A34A' }}>₹{p.finalShare.toLocaleString()}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#526673' }}>
                      Work: ₹{p.share.toLocaleString()} {p.subDeductions > 0 && `- Sub: ₹${p.subDeductions.toLocaleString()}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {!isLocked && isFounder && (
              <button className="btn-gold" onClick={handleApprove} style={{ width: '100%', justifyContent: 'center', background: '#102C42', color: '#FFFFFF', border: 'none', borderRadius: 10, padding: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={16} /> Approve & Lock
              </button>
            )}
            {calculation && !calculation.error && (
              <button className="btn-outline" onClick={generateWhatsAppSummary} style={{ width: '100%', justifyContent: 'center', background: '#FFFFFF', color: '#102C42', border: '1px solid #DCE9EE', borderRadius: 10, padding: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <MessageCircle size={16} /> WhatsApp Summary
              </button>
            )}
            {isLocked && (
              <div style={{ background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.2)', borderRadius: 10, padding: 12, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <CheckCircle size={14} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#16A34A' }}>Project Approved</p>
                  <p style={{ fontSize: 11, color: '#16A34A', opacity: 0.8 }}>No further edits allowed</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Charts */}
      {calculation && !calculation.error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(260px, 45vw, 380px), 1fr))', gap: 16 }}>
          {/* Donut Chart */}
          <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 20, minWidth: 0, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Final Payouts</h3>
            <div style={{ width: '100%', height: 250, minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} contentStyle={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 8, fontSize: 12, color: '#102C42' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Waterfall Chart */}
          <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 20, minWidth: 0, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#102C42', marginBottom: 16 }}>Money Flow</h3>
            <div style={{ width: '100%', height: 250, minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterfall}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#526673' }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 11, fill: '#526673' }} />
                  <Tooltip formatter={(v) => `₹${Math.abs(v).toLocaleString()}`} contentStyle={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 8, fontSize: 12, color: '#102C42' }} />
                  <Bar dataKey="value" fill="#102C42" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="modal-backdrop" onClick={() => setShowAddMember(false)} style={{ background: 'rgba(16,44,66,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, boxShadow: '0 20px 40px rgba(16,44,66,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#102C42' }}>Add Team Member</h2>
              <button onClick={() => setShowAddMember(false)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#526673', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Member</label>
              <select
                value={newMember.memberId}
                onChange={(e) => setNewMember({ ...newMember, memberId: e.target.value })}
                className="input"
                style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', color: '#102C42', fontWeight: 600 }}
              >
                <option value="">Select a member</option>
                {members.filter(m => m.active && !project.teamMembers.find(tm => tm.memberId === m.id)).map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="label">Effort Level</label>
              <select
                value={newMember.effort}
                onChange={(e) => setNewMember({ ...newMember, effort: e.target.value })}
                className="input"
              >
                {Object.entries(effortLevels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ flex: 1, background: '#102C42', color: '#FFFFFF', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }} onClick={handleAddMember}>Add Member</button>
              <button style={{ flex: 1, background: '#FFFFFF', color: '#526673', border: '1px solid #DCE9EE', padding: '12px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer' }} onClick={() => setShowAddMember(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sub-employee Modal */}
      {showAddSub && (
        <div className="modal-backdrop" onClick={() => setShowAddSub(false)} style={{ background: 'rgba(16,44,66,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, boxShadow: '0 20px 40px rgba(16,44,66,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#102C42' }}>Add Sub-employee</h2>
              <button onClick={() => setShowAddSub(false)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#526673', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Name</label>
              <input
                type="text"
                placeholder="e.g., Dev Intern"
                value={newSub.name}
                onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                className="input"
                style={{ background: '#F8FAFC', border: '1px solid #DCE9EE', color: '#102C42' }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="label">% of Member's Share (Max 30%)</label>
              <input
                type="number"
                placeholder="15"
                min="1"
                max="30"
                value={newSub.percent}
                onChange={(e) => setNewSub({ ...newSub, percent: parseInt(e.target.value) })}
                className="input"
                style={{ background: '#F8FAFC', border: '1px solid #DCE9EE', color: '#102C42' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ flex: 1, background: '#102C42', color: '#FFFFFF', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }} onClick={() => handleAddSubEmployee(selectedMemberId)}>Add Sub-employee</button>
              <button style={{ flex: 1, background: '#FFFFFF', color: '#526673', border: '1px solid #DCE9EE', padding: '12px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer' }} onClick={() => setShowAddSub(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
