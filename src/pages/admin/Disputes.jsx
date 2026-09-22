import { useState } from 'react';
import { AlertTriangle, Plus, X, MessageCircle, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Disputes() {
  const { projects, members, addDispute, addDisputeComment, resolveDispute, currentUser } = useStore();
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showNewDispute, setShowNewDispute] = useState(false);
  const [newDispute, setNewDispute] = useState({ projectId: '', reason: '', description: '' });
  const [commentText, setCommentText] = useState('');

  const allDisputes = projects.flatMap(p => (p.disputes || []).map(d => ({ ...d, projectId: p.id, projectName: p.name })));
  const activeDisputes = allDisputes.filter(d => !d.resolved);
  const resolvedDisputes = allDisputes.filter(d => d.resolved);

  const handleAddDispute = () => {
    if (newDispute.projectId && newDispute.reason) {
      addDispute(parseInt(newDispute.projectId), {
        reason: newDispute.reason,
        description: newDispute.description,
        raisedBy: currentUser.id,
      });
      setNewDispute({ projectId: '', reason: '', description: '' });
      setShowNewDispute(false);
    }
  };

  const handleAddComment = () => {
    if (commentText.trim() && selectedDispute) {
      addDisputeComment(selectedDispute.projectId, selectedDispute.id, {
        text: commentText,
        author: currentUser.id,
      });
      setCommentText('');
    }
  };

  const getMemberName = (memberId) => members.find(m => m.id === memberId)?.name || 'Unknown';

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', letterSpacing: '-0.5px' }}>Resolution Center & Disputes</h1>
          <p style={{ color: '#526673', fontSize: 14, marginTop: 4 }}>Mediate project scope disagreements, timeline reviews, and transparent resolutions</p>
        </div>
        <button onClick={() => setShowNewDispute(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#102C42', color: '#FFFFFF', border: 'none', padding: '10px 18px', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 2px 8px rgba(16,44,66,0.15)' }}>
          <AlertTriangle size={16} /> Raise Dispute
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Active Disputes', value: activeDisputes.length, color: '#dc2626', bg: '#FEF2F2' },
          { label: 'Resolved Cases', value: resolvedDisputes.length, color: '#16a34a', bg: '#DCFCE7' },
          { label: 'Total Historical', value: allDisputes.length, color: '#102C42', bg: '#F2FAFD' },
        ].map(s => (
          <div key={s.label} style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 18, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: '-0.5px', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#526673' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active Disputes */}
      <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, overflow: 'hidden', marginBottom: 24, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #DCE9EE', background: '#F8FAFC' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42' }}>Active Disputes ({activeDisputes.length})</h3>
        </div>

        {activeDisputes.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#526673' }}>
            <AlertTriangle size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ fontWeight: 600 }}>No active disputes in pipeline. Operations running smoothly.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}>
            {activeDisputes.map(d => (
              <div key={d.id} onClick={() => setSelectedDispute(d)} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#102C42'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#102C42' }}>{d.projectName}</div>
                    <div style={{ fontSize: 12, color: '#526673', marginTop: 2 }}>Raised by {getMemberName(d.raisedBy)}</div>
                  </div>
                  <span style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                    {d.reason}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#526673', lineHeight: 1.5 }}>{d.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 12, color: '#102C42', fontWeight: 600 }}>
                  <MessageCircle size={14} />
                  {d.comments?.length || 0} comments
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved Disputes */}
      {resolvedDisputes.length > 0 && (
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid #DCE9EE', background: '#F8FAFC' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#526673' }}>Resolved Disputes ({resolvedDisputes.length})</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20, opacity: 0.75 }}>
            {resolvedDisputes.map(d => (
              <div key={d.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#102C42' }}>{d.projectName}</div>
                  <div style={{ fontSize: 11, color: '#526673', marginTop: 2 }}>{d.reason}</div>
                </div>
                <CheckCircle size={18} color="#16a34a" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dispute Detail Modal */}
      {selectedDispute && (
        <div className="modal-backdrop" onClick={() => setSelectedDispute(null)} style={{ background: 'rgba(16,44,66,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600, background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, boxShadow: '0 20px 40px rgba(16,44,66,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#102C42', marginBottom: 4 }}>{selectedDispute.projectName}</h2>
                <p style={{ color: '#526673', fontSize: 12 }}>Raised by {getMemberName(selectedDispute.raisedBy)}</p>
              </div>
              <button onClick={() => setSelectedDispute(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#526673', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <AlertTriangle size={16} color="#DC2626" />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>{selectedDispute.reason}</span>
              </div>
              <p style={{ fontSize: 13, color: '#102C42', lineHeight: 1.5 }}>{selectedDispute.description}</p>
            </div>

            {/* Comments */}
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#102C42', marginBottom: 12 }}>Comments ({selectedDispute.comments?.length || 0})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 250, overflowY: 'auto', marginBottom: 12 }}>
                {(selectedDispute.comments || []).map(c => (
                  <div key={c.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#102C42' }}>{getMemberName(c.author)}</span>
                      <span style={{ fontSize: 11, color: '#526673' }}>
                        {new Date(c.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: '#526673', lineHeight: 1.4 }}>{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              {!selectedDispute.resolved && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <textarea
                    placeholder="Add a comment or mediation note..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{ fontSize: 13, minHeight: 60, flex: 1, padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42' }}
                  />
                  <button onClick={handleAddComment} style={{ background: '#102C42', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '0 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            {!selectedDispute.resolved && (
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{ flex: 1, background: '#16A34A', color: '#FFFFFF', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onClick={() => { resolveDispute(selectedDispute.projectId, selectedDispute.id); setSelectedDispute(null); }}>
                  <CheckCircle size={16} /> Mark Resolved
                </button>
                <button style={{ flex: 1, background: '#FFFFFF', color: '#526673', border: '1px solid #DCE9EE', padding: '12px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer' }} onClick={() => setSelectedDispute(null)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Dispute Modal */}
      {showNewDispute && (
        <div className="modal-backdrop" onClick={() => setShowNewDispute(false)} style={{ background: 'rgba(16,44,66,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, boxShadow: '0 20px 40px rgba(16,44,66,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#102C42' }}>Raise a Dispute</h2>
              <button onClick={() => setShowNewDispute(false)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#526673', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>Project</label>
              <select
                value={newDispute.projectId}
                onChange={(e) => setNewDispute({ ...newDispute, projectId: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42', fontSize: 13, fontWeight: 600 }}
              >
                <option value="">Select a project</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>Reason</label>
              <select
                value={newDispute.reason}
                onChange={(e) => setNewDispute({ ...newDispute, reason: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42', fontSize: 13, fontWeight: 600 }}
              >
                <option value="">Select reason</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Scope Mismatch">Scope Mismatch</option>
                <option value="Quality Concern">Quality Concern</option>
                <option value="Timeline Delay">Timeline Delay</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>Description</label>
              <textarea
                placeholder="Describe the dispute in detail..."
                value={newDispute.description}
                onChange={(e) => setNewDispute({ ...newDispute, description: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42', fontSize: 13, minHeight: 90 }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ flex: 1, background: '#102C42', color: '#FFFFFF', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }} onClick={handleAddDispute}>Raise Dispute</button>
              <button style={{ flex: 1, background: '#FFFFFF', color: '#526673', border: '1px solid #DCE9EE', padding: '12px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer' }} onClick={() => setShowNewDispute(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
