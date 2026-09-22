import { useState } from 'react';
import { Shield, Search } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function AuditLog() {
  const { auditLogs, members, currentUser } = useStore();
  const [search, setSearch] = useState('');
  const [filterUser, setFilterUser] = useState('');

  const isFounder = currentUser?.accessLevel === 'founder';

  if (!isFounder) {
    return (
      <div style={{ padding: 60, textAlign: 'center', background: '#FFFFFF', borderRadius: 16, border: '1px solid #DCE9EE', margin: 24 }}>
        <Shield size={48} color="#dc2626" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#102C42', marginBottom: 8 }}>Access Denied</h2>
        <p style={{ color: '#526673', fontSize: 14 }}>Only authorized founders can view internal audit logs.</p>
      </div>
    );
  }

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(search.toLowerCase());
    const matchesUser = !filterUser || log.userId === parseInt(filterUser);
    return matchesSearch && matchesUser;
  });

  const getMemberName = (userId) => {
    const member = members.find(m => m.id === userId);
    return member?.name || 'Unknown User';
  };

  const getMemberAvatar = (userId) => {
    const member = members.find(m => m.id === userId);
    return member?.avatar || '?';
  };

  const getActionColor = (action) => {
    if (action.includes('Approved')) return '#16a34a';
    if (action.includes('Created')) return '#2563eb';
    if (action.includes('Updated')) return '#d97706';
    if (action.includes('Deleted')) return '#dc2626';
    if (action.includes('Moved')) return '#7c3aed';
    return '#526673';
  };

  const getActionIcon = (action) => {
    if (action.includes('Approved')) return '✓';
    if (action.includes('Created')) return '+';
    if (action.includes('Updated')) return '✎';
    if (action.includes('Deleted')) return '✕';
    if (action.includes('Moved')) return '→';
    return '•';
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', letterSpacing: '-0.5px' }}>Security & Audit Trail</h1>
        <p style={{ color: '#526673', fontSize: 14, marginTop: 4 }}>System operations, pipeline edits, and administrative event verification</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Actions', value: auditLogs.length, color: '#102C42', bg: '#F2FAFD' },
          { label: 'This Month', value: auditLogs.filter(l => {
            const date = new Date(l.timestamp);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
          }).length, color: '#2563eb', bg: '#DBEAFE' },
          { label: 'Active Users', value: new Set(auditLogs.map(l => l.userId)).size, color: '#16a34a', bg: '#DCFCE7' },
        ].map(s => (
          <div key={s.label} style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 18, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: '-0.5px', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#526673' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div style={{ flex: '1 1 240px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#526673' }} />
          <input
            type="text"
            placeholder="Search actions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 40px', background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 10, color: '#102C42', fontSize: 13 }}
          />
        </div>
        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          style={{ flex: '1 1 180px', minWidth: 160, padding: '10px 14px', background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 10, color: '#102C42', fontSize: 13, fontWeight: 600 }}
        >
          <option value="">All Users</option>
          {members.filter(m => m.active).map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      {/* Audit Log Table */}
      <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', minWidth: 0 }}>
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #DCE9EE', background: '#F8FAFC' }}>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#526673', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User</th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#526673', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#526673', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timestamp</th>
                <th style={{ padding: '12px 18px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#526673', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => {
                const actionColor = getActionColor(log.action);
                const actionIcon = getActionIcon(log.action);
                const timestamp = new Date(log.timestamp);
                const now = new Date();
                const diffMs = now - timestamp;
                const diffMins = Math.floor(diffMs / 60000);
                const diffHours = Math.floor(diffMs / 3600000);
                const diffDays = Math.floor(diffMs / 86400000);
                
                let timeAgo;
                if (diffMins < 1) timeAgo = 'Just now';
                else if (diffMins < 60) timeAgo = `${diffMins}m ago`;
                else if (diffHours < 24) timeAgo = `${diffHours}h ago`;
                else if (diffDays < 7) timeAgo = `${diffDays}d ago`;
                else timeAgo = timestamp.toLocaleDateString('en-IN');

                return (
                  <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#102C42', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>
                          {getMemberAvatar(log.userId)}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#102C42' }}>{getMemberName(log.userId)}</div>
                          <div style={{ fontSize: 11, color: '#526673', marginTop: 1 }}>ID: {log.userId}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${actionColor}15`, border: `1px solid ${actionColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: actionColor }}>
                          {actionIcon}
                        </div>
                        <span style={{ fontSize: 13, color: '#102C42', fontWeight: 600 }}>{log.action}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontSize: 12, color: '#102C42', fontWeight: 600 }}>
                        {timestamp.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div style={{ fontSize: 11, color: '#526673', marginTop: 2 }}>{timeAgo}</div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ background: `${actionColor}15`, color: actionColor, border: `1px solid ${actionColor}30`, padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                        Completed
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#526673' }}>
            <Shield size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p>No audit logs found.</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 20, marginTop: 24, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#102C42', marginBottom: 12 }}>Action Types</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          {[
            { icon: '✓', label: 'Approved', color: '#16a34a' },
            { icon: '+', label: 'Created', color: '#2563eb' },
            { icon: '✎', label: 'Updated', color: '#d97706' },
            { icon: '✕', label: 'Deleted', color: '#dc2626' },
            { icon: '→', label: 'Moved', color: '#7c3aed' },
          ].map(a => (
            <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${a.color}15`, border: `1px solid ${a.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: a.color }}>
                {a.icon}
              </div>
              <span style={{ fontSize: 12, color: '#526673', fontWeight: 600 }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
