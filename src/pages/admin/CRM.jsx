import { useState, useMemo } from 'react';
import { Plus, Search, X, Phone, Mail, MessageSquare, ArrowRight, LayoutGrid, List, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';

const statuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
const statusLabels = { new: 'New Inquiry', contacted: 'Contacted', qualified: 'Qualified Lead', proposal: 'Proposal Sent', won: 'Closed Won', lost: 'Closed Lost' };
const statusProbabilities = { new: 0.1, contacted: 0.25, qualified: 0.5, proposal: 0.75, won: 1.0, lost: 0.0 };
const statusColors = {
  new: '#38bdf8', contacted: '#818cf8', qualified: '#a78bfa',
  proposal: '#fbbf24', won: '#4ade80', lost: '#f87171'
};

export default function CRM() {
  const { leads, members, updateLead, addLead, deleteLead, moveLead } = useStore();
  const [search, setSearch] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', contact: '', email: '', source: 'Website Inquiry', status: 'new', assigned: null, notes: '', tags: ['AI Automation'], value: 75000 });
  const [draggedLead, setDraggedLead] = useState(null);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = l.name?.toLowerCase().includes(search.toLowerCase()) || 
                            l.email?.toLowerCase().includes(search.toLowerCase()) ||
                            l.notes?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = selectedStatusFilter === 'all' || l.status === selectedStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, selectedStatusFilter]);

  // Intelligence Metrics
  const pipelineMetrics = useMemo(() => {
    let totalValue = 0;
    let weightedForecast = 0;
    let wonCount = 0;
    let activeLeadsCount = 0;

    leads.forEach(l => {
      const val = Number(l.value || 0);
      totalValue += val;
      const prob = statusProbabilities[l.status] || 0;
      weightedForecast += val * prob;
      if (l.status === 'won') wonCount++;
      if (l.status !== 'won' && l.status !== 'lost') activeLeadsCount++;
    });

    const winRate = leads.length > 0 ? Math.round((wonCount / leads.length) * 100) : 0;
    const avgDeal = leads.length > 0 ? Math.round(totalValue / leads.length) : 0;

    return { totalValue, weightedForecast, activeLeadsCount, winRate, avgDeal };
  }, [leads]);

  const handleAddLead = () => {
    if (newLead.name && (newLead.contact || newLead.email)) {
      addLead({
        ...newLead,
        createdAt: new Date().toISOString()
      });
      setNewLead({ name: '', contact: '', email: '', source: 'Website Inquiry', status: 'new', assigned: null, notes: '', tags: ['AI Automation'], value: 75000 });
      setShowModal(false);
    } else {
      alert('Please enter a Client/Company Name and at least one Contact number or Email.');
    }
  };

  const handleDragStart = (lead) => {
    setDraggedLead(lead);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (status) => {
    if (draggedLead && draggedLead.status !== status) {
      moveLead(draggedLead.id, status);
      setDraggedLead(null);
    }
  };

  const advanceLeadNextStage = (lead, e) => {
    if (e) e.stopPropagation();
    const currentIndex = statuses.indexOf(lead.status);
    if (currentIndex < statuses.length - 2) { // don't auto advance past won/lost easily
      const nextStatus = statuses[currentIndex + 1];
      moveLead(lead.id, nextStatus);
    }
  };

  const triggerWhatsAppOutreach = (lead, e) => {
    if (e) e.stopPropagation();
    const phone = lead.contact?.replace(/[^0-9]/g, '') || '';
    if (!phone) {
      alert('No valid contact number found for this lead.');
      return;
    }
    const cleanPhone = phone.startsWith('91') ? phone : `91${phone}`;
    const msg = encodeURIComponent(`Hi ${lead.name},\n\nWe received your inquiry regarding autonomous AI & engineering solutions from Zovance. I'm reaching out to share how we can streamline and scale your workflows.\n\nAre you available for a brief 10-minute discovery chat today?`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  const triggerEmailOutreach = (lead, e) => {
    if (e) e.stopPropagation();
    if (!lead.email) {
      alert('No email address provided for this lead.');
      return;
    }
    const subject = encodeURIComponent(`Scaling ${lead.name} with Autonomous AI Systems - Zovance`);
    const body = encodeURIComponent(`Hi ${lead.name},\n\nThank you for exploring Zovance. We specialize in custom AI agent architectures and automated revenue pipelines designed to eliminate manual bottlenecks.\n\nWe would love to walk you through a tailored demonstration of our systems for your team.\n\nBest regards,\nZovance Engineering Team`);
    window.location.href = `mailto:${lead.email}?subject=${subject}&body=${body}`;
  };

  const getAssignedMember = (memberId) => members.find(m => m.id === memberId);

  return (
    <div style={{ maxWidth: 1600, margin: '0 auto' }}>
      {/* Top Banner / Pipeline Intelligence Header */}
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
              <Sparkles size={13} /> Automated CRM Command Center
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: 6 }}>
            Lead Pipeline & Deal Automations
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>
            Real-time pipeline valuation, instant 1-click WhatsApp/Email outreach, and automated stage tracking.
          </p>
        </div>

        {/* Intelligence Metrics Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 12, padding: '12px 18px', minWidth: 140 }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Pipeline</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8', marginTop: 4 }}>
              ₹{(pipelineMetrics.totalValue / 100000).toFixed(1)}L
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{leads.length} total deals</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 12, padding: '12px 18px', minWidth: 140 }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weighted Forecast</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#818cf8', marginTop: 4 }}>
              ₹{(pipelineMetrics.weightedForecast / 100000).toFixed(1)}L
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Probability adjusted</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 12, padding: '12px 18px', minWidth: 130 }}>
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Leads</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', marginTop: 4 }}>
              {pipelineMetrics.activeLeadsCount}
            </div>
            <div style={{ fontSize: 11, color: '#4ade80', marginTop: 2 }}>{pipelineMetrics.winRate}% win rate</div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              fontWeight: 700,
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 99, 235, 0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.35)'; }}
          >
            <Plus size={18} /> Add New Lead
          </button>
        </div>
      </div>

      {/* Controls & View Switcher */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12, flex: '1 1 320px', maxWidth: 600 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search leads by name, email, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 10,
                padding: '10px 14px 10px 42px',
                color: '#ffffff',
                fontSize: 13,
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#38bdf8'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                <X size={14} />
              </button>
            )}
          </div>

          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 10,
              padding: '10px 14px',
              color: '#cbd5e1',
              fontSize: 13,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="all">All Stages ({leads.length})</option>
            {statuses.map(s => (
              <option key={s} value={s}>{statusLabels[s]} ({leads.filter(l => l.status === s).length})</option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 10, padding: 4, gap: 4 }}>
          <button
            onClick={() => setViewMode('kanban')}
            style={{
              background: viewMode === 'kanban' ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
              color: viewMode === 'kanban' ? '#38bdf8' : '#64748b',
              border: viewMode === 'kanban' ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <LayoutGrid size={15} /> Kanban Board
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              background: viewMode === 'table' ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
              color: viewMode === 'table' ? '#38bdf8' : '#64748b',
              border: viewMode === 'table' ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <List size={15} /> Pipeline Table
          </button>
        </div>
      </div>

      {/* VIEW 1: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 24, minWidth: '100%' }}>
          {statuses.map(status => {
            const statusLeads = filteredLeads.filter(l => l.status === status);
            const colTotal = statusLeads.reduce((acc, curr) => acc + Number(curr.value || 0), 0);

            return (
              <div
                key={status}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(status)}
                style={{
                  background: 'rgba(11, 15, 25, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: 14,
                  padding: 14,
                  minHeight: 480,
                  minWidth: 'clamp(260px, 75vw, 300px)',
                  flex: '0 0 auto',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Column Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColors[status], boxShadow: `0 0 10px ${statusColors[status]}` }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff', letterSpacing: '0.01em' }}>{statusLabels[status]}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: 999 }}>
                      {statusLeads.length}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b' }}>
                    ₹{(colTotal / 1000).toFixed(0)}K
                  </div>
                </div>

                {/* Cards Container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  {statusLeads.length === 0 ? (
                    <div style={{ border: '1px dashed rgba(255, 255, 255, 0.08)', borderRadius: 10, padding: 24, textAlign: 'center', color: '#475569', fontSize: 12 }}>
                      Drop deals here
                    </div>
                  ) : (
                    statusLeads.map(lead => (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={() => handleDragStart(lead)}
                        onClick={() => setSelectedLead(lead)}
                        style={{
                          background: 'linear-gradient(135deg, rgba(20, 28, 46, 0.8), rgba(13, 18, 30, 0.9))',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: 12,
                          padding: 14,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          position: 'relative'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.borderColor = statusColors[status];
                          e.currentTarget.style.boxShadow = `0 10px 24px rgba(0, 0, 0, 0.4), 0 0 16px ${statusColors[status]}20`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {/* Title and Value */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', lineHeight: 1.3, margin: 0 }}>
                            {lead.name}
                          </h4>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: 6,
                            background: 'rgba(56, 189, 248, 0.12)',
                            color: '#38bdf8',
                            fontSize: 11,
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            border: '1px solid rgba(56, 189, 248, 0.25)'
                          }}>
                            ₹{(lead.value / 1000).toFixed(0)}K
                          </span>
                        </div>

                        {/* Source & Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                          <span style={{ fontSize: 10, color: '#94a3b8', background: 'rgba(255, 255, 255, 0.04)', padding: '2px 7px', borderRadius: 4, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            {lead.source}
                          </span>
                          {lead.tags && lead.tags.slice(0, 2).map((t, i) => (
                            <span key={i} style={{ fontSize: 10, color: '#a78bfa', background: 'rgba(167, 139, 250, 0.1)', padding: '2px 7px', borderRadius: 4 }}>
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Assigned and Actions Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            {lead.assigned ? (
                              <>
                                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>
                                  {getAssignedMember(lead.assigned)?.avatar || 'M'}
                                </div>
                                <span style={{ fontSize: 11, color: '#94a3b8' }}>{getAssignedMember(lead.assigned)?.name?.split(' ')[0]}</span>
                              </>
                            ) : (
                              <span style={{ fontSize: 11, color: '#64748b', fontStyle: 'italic' }}>Unassigned</span>
                            )}
                          </div>

                          {/* Instant Outreach & Quick Actions */}
                          <div style={{ display: 'flex', gap: 6 }}>
                            {lead.contact && (
                              <button
                                onClick={(e) => triggerWhatsAppOutreach(lead, e)}
                                title="1-Click WhatsApp Discovery Invite"
                                style={{
                                  background: 'rgba(74, 222, 128, 0.15)',
                                  color: '#4ade80',
                                  border: '1px solid rgba(74, 222, 128, 0.3)',
                                  borderRadius: 6,
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4,
                                  fontSize: 10,
                                  fontWeight: 600
                                }}
                              >
                                <MessageSquare size={12} /> WA
                              </button>
                            )}

                            {lead.email && (
                              <button
                                onClick={(e) => triggerEmailOutreach(lead, e)}
                                title="Send Intro Email"
                                style={{
                                  background: 'rgba(56, 189, 248, 0.15)',
                                  color: '#38bdf8',
                                  border: '1px solid rgba(56, 189, 248, 0.3)',
                                  borderRadius: 6,
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4,
                                  fontSize: 10,
                                  fontWeight: 600
                                }}
                              >
                                <Mail size={12} />
                              </button>
                            )}

                            {status !== 'won' && status !== 'lost' && (
                              <button
                                onClick={(e) => advanceLeadNextStage(lead, e)}
                                title="Advance to Next Stage"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  color: '#cbd5e1',
                                  border: '1px solid rgba(255, 255, 255, 0.12)',
                                  borderRadius: 6,
                                  padding: '4px 6px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <ArrowRight size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: PIPELINE TABLE VIEW */}
      {viewMode === 'table' && (
        <div style={{ background: 'rgba(11, 15, 25, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', minWidth: 0 }}>
            <table style={{ width: '100%', minWidth: '760px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)' }}>
                  <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client / Company</th>
                  <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stage & Status</th>
                  <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deal Value</th>
                  <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source</th>
                  <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Info</th>
                  <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned Member</th>
                  <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Automations</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#64748b', fontSize: 14 }}>
                      No deals match your search or filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead, idx) => (
                    <tr
                      key={lead.id}
                      style={{
                        borderBottom: idx === filteredLeads.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'background 0.15s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedLead(lead)}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Client */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#ffffff', fontSize: 14 }}>{lead.name}</div>
                        {lead.notes && (
                          <div style={{ fontSize: 11, color: '#64748b', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {lead.notes}
                          </div>
                        )}
                      </td>

                      {/* Stage */}
                      <td style={{ padding: '14px 18px' }} onClick={e => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => moveLead(lead.id, e.target.value)}
                          style={{
                            background: 'rgba(15, 23, 42, 0.9)',
                            border: `1px solid ${statusColors[lead.status] || '#38bdf8'}40`,
                            color: statusColors[lead.status] || '#ffffff',
                            borderRadius: 8,
                            padding: '6px 10px',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          {statuses.map(s => (
                            <option key={s} value={s}>{statusLabels[s]}</option>
                          ))}
                        </select>
                      </td>

                      {/* Value */}
                      <td style={{ padding: '14px 18px', fontWeight: 700, color: '#38bdf8', fontSize: 14 }}>
                        ₹{lead.value?.toLocaleString() || '0'}
                      </td>

                      {/* Source */}
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ fontSize: 12, color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.05)', padding: '4px 10px', borderRadius: 6 }}>
                          {lead.source}
                        </span>
                      </td>

                      {/* Contact */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontSize: 12, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Phone size={13} color="#38bdf8" /> {lead.contact || 'N/A'}
                        </div>
                        {lead.email && (
                          <div style={{ fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                            <Mail size={13} color="#60a5fa" /> {lead.email}
                          </div>
                        )}
                      </td>

                      {/* Assigned */}
                      <td style={{ padding: '14px 18px' }} onClick={e => e.stopPropagation()}>
                        <select
                          value={lead.assigned || ''}
                          onChange={(e) => updateLead(lead.id, { assigned: e.target.value ? parseInt(e.target.value) : null })}
                          style={{
                            background: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#e2e8f0',
                            borderRadius: 8,
                            padding: '6px 10px',
                            fontSize: 12,
                            cursor: 'pointer'
                          }}
                        >
                          <option value="">Unassigned</option>
                          {members.filter(m => m.active).map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                          ))}
                        </select>
                      </td>

                      {/* Automations */}
                      <td style={{ padding: '14px 18px', textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <button
                            onClick={(e) => triggerWhatsAppOutreach(lead, e)}
                            className="btn-gold"
                            style={{ padding: '6px 12px', fontSize: 11, background: 'linear-gradient(135deg, #16a34a, #22c55e)', border: 'none' }}
                          >
                            <MessageSquare size={13} /> WhatsApp
                          </button>
                          <button
                            onClick={(e) => triggerEmailOutreach(lead, e)}
                            style={{
                              background: 'rgba(56, 189, 248, 0.15)',
                              color: '#38bdf8',
                              border: '1px solid rgba(56, 189, 248, 0.3)',
                              borderRadius: 8,
                              padding: '6px 12px',
                              fontSize: 11,
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6
                            }}
                          >
                            <Mail size={13} /> Email
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <div className="modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: statusColors[selectedLead.status] || '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {statusLabels[selectedLead.status]}
                </span>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#ffffff', marginTop: 4 }}>{selectedLead.name}</h2>
                <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>Inquiry Source: {selectedLead.source}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            {/* Instant Automated Actions */}
            <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: 12, padding: 14, marginBottom: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#38bdf8' }}>
                Quick Outreach Automations:
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={(e) => triggerWhatsAppOutreach(selectedLead, e)}
                  style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <MessageSquare size={14} /> Send WhatsApp Discovery Invite
                </button>
                <button
                  onClick={(e) => triggerEmailOutreach(selectedLead, e)}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Mail size={14} /> Email Proposal Template
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 45vw, 220px), 1fr))', gap: 16, marginBottom: 18 }}>
              <div>
                <label className="label">Contact Phone</label>
                <input
                  type="text"
                  value={selectedLead.contact || ''}
                  onChange={(e) => updateLead(selectedLead.id, { contact: e.target.value })}
                  className="input"
                  style={{ fontSize: 13 }}
                />
              </div>
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  value={selectedLead.email || ''}
                  onChange={(e) => updateLead(selectedLead.id, { email: e.target.value })}
                  className="input"
                  style={{ fontSize: 13 }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 45vw, 220px), 1fr))', gap: 16, marginBottom: 18 }}>
              <div>
                <label className="label">Deal Value (₹)</label>
                <input
                  type="number"
                  value={selectedLead.value || 0}
                  onChange={(e) => updateLead(selectedLead.id, { value: parseInt(e.target.value) || 0 })}
                  className="input"
                  style={{ fontSize: 13 }}
                />
              </div>
              <div>
                <label className="label">Pipeline Stage</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateLead(selectedLead.id, { status: e.target.value })}
                  className="input"
                  style={{ fontSize: 13 }}
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>{statusLabels[s]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 45vw, 220px), 1fr))', gap: 16, marginBottom: 18 }}>
              <div>
                <label className="label">Assigned Roster Member</label>
                <select
                  value={selectedLead.assigned || ''}
                  onChange={(e) => updateLead(selectedLead.id, { assigned: e.target.value ? parseInt(e.target.value) : null })}
                  className="input"
                  style={{ fontSize: 13 }}
                >
                  <option value="">Unassigned</option>
                  {members.filter(m => m.active).map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Lead Source</label>
                <input
                  type="text"
                  value={selectedLead.source || ''}
                  onChange={(e) => updateLead(selectedLead.id, { source: e.target.value })}
                  className="input"
                  style={{ fontSize: 13 }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="label">Deal Notes & Architecture Requirements</label>
              <textarea
                value={selectedLead.notes || ''}
                onChange={(e) => updateLead(selectedLead.id, { notes: e.target.value })}
                className="input"
                style={{ fontSize: 13, minHeight: 90 }}
                placeholder="Key technical requirements, timeline, and client budget expectations..."
              />
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
              <button
                className="btn-gold"
                style={{ flex: 2, padding: '12px 20px', justifyContent: 'center' }}
                onClick={() => setSelectedLead(null)}
              >
                Save Deal Changes
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${selectedLead.name} from the pipeline?`)) {
                    deleteLead(selectedLead.id);
                    setSelectedLead(null);
                  }
                }}
                style={{
                  flex: 1,
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  borderRadius: 10,
                  padding: '12px 20px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Remove Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW LEAD MODAL */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>Add New Inquiry / Deal</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 45vw, 220px), 1fr))', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Company / Client Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Apex Global AI"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">WhatsApp / Contact Phone *</label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={newLead.contact}
                  onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })}
                  className="input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 45vw, 220px), 1fr))', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  placeholder="founders@company.com"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Lead Source</label>
                <select
                  value={newLead.source}
                  onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                  className="input"
                >
                  {['Website Inquiry', 'WhatsApp Discovery', 'Referral Network', 'LinkedIn Outreach', 'Cold Email Automation', 'Custom'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 45vw, 220px), 1fr))', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Estimated Ticket Value (₹)</label>
                <input
                  type="number"
                  placeholder="75000"
                  value={newLead.value}
                  onChange={(e) => setNewLead({ ...newLead, value: parseInt(e.target.value) || 0 })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Assign Roster Engineer</label>
                <select
                  value={newLead.assigned || ''}
                  onChange={(e) => setNewLead({ ...newLead, assigned: e.target.value ? parseInt(e.target.value) : null })}
                  className="input"
                >
                  <option value="">Unassigned</option>
                  {members.filter(m => m.active).map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="label">Initial Requirement Notes</label>
              <textarea
                placeholder="What systems or AI workflows is this client seeking?"
                value={newLead.notes}
                onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                className="input"
                style={{ minHeight: 80 }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-gold" style={{ flex: 2, padding: '12px 20px', justifyContent: 'center' }} onClick={handleAddLead}>
                Launch Deal into Pipeline
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#cbd5e1', borderRadius: 10, padding: '12px 20px', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
