import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, X, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function TestimonialsAdmin() {
  const {
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    publishTestimonial,
    unpublishTestimonial,
  } = useStore();

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    metrics: '',
    status: 'published',
  });

  const filteredTestimonials = (testimonials || []).filter(t =>
    (t.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.role || '').toLowerCase().includes(search.toLowerCase()) ||
    (t.text || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        role: '',
        text: '',
        metrics: '',
        status: 'published',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSaveTestimonial = () => {
    if (!formData.name || !formData.role || !formData.text) {
      alert('Please fill in Name, Role/Company, and Testimonial text');
      return;
    }

    if (editingId) {
      updateTestimonial(editingId, formData);
    } else {
      addTestimonial(formData);
    }

    handleCloseModal();
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
    }
  };

  const handleTogglePublish = (id, currentStatus) => {
    if (currentStatus === 'published') {
      unpublishTestimonial(id);
    } else {
      publishTestimonial(id);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f0f0f0', marginBottom: 8 }}>
            Client Testimonials & Reviews
          </h1>
          <p style={{ color: '#888', fontSize: 14 }}>
            Manage real client feedback displayed dynamically on your homepage
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 14,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* Search */}
      <div style={{
        marginBottom: 24,
        position: 'relative',
      }}>
        <Search size={16} style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#666',
        }} />
        <input
          type="text"
          placeholder="Search testimonials by client name, company, or text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
          style={{
            paddingLeft: 40,
            width: '100%',
            maxWidth: 400
          }}
        />
      </div>

      {/* Testimonials List / Grid */}
      {filteredTestimonials.length === 0 ? (
        <div style={{
          background: '#111',
          border: '1px dashed #222',
          borderRadius: 16,
          padding: '60px 24px',
          textAlign: 'center',
        }}>
          <MessageCircle size={48} color="#444" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e2e8f0', marginBottom: 8 }}>
            No Testimonials Added Yet
          </h3>
          <p style={{ color: '#64748b', fontSize: 14, maxWidth: 460, margin: '0 auto 24px' }}>
            When you add testimonials here and publish them, the testimonials block will automatically appear on your public Homepage!
          </p>
          <button
            onClick={() => handleOpenModal()}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Add Your First Testimonial
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px, 45vw, 340px), 1fr))',
          gap: 16,
        }}>
          {filteredTestimonials.map(item => (
            <div
              key={item.id}
              style={{
                background: '#111',
                border: '1px solid #1a1a1a',
                borderRadius: 12,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#2a2a2a';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a1a1a';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0f0f0', marginBottom: 2 }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: 13, color: '#38bdf8', fontWeight: 500 }}>
                      {item.role}
                    </p>
                  </div>
                  <button
                    onClick={() => handleTogglePublish(item.id, item.status)}
                    title={item.status === 'published' ? 'Click to Unpublish' : 'Click to Publish'}
                    style={{
                      background: item.status === 'published' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(107, 114, 128, 0.15)',
                      border: `1px solid ${item.status === 'published' ? 'rgba(74, 222, 128, 0.4)' : 'rgba(107, 114, 128, 0.4)'}`,
                      color: item.status === 'published' ? '#4ade80' : '#888',
                      padding: '6px 10px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {item.status === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                    {item.status === 'published' ? 'Live' : 'Draft'}
                  </button>
                </div>

                <p style={{
                  fontSize: 14,
                  color: '#94a3b8',
                  lineHeight: 1.6,
                  marginBottom: 16,
                  fontStyle: 'italic',
                }}>
                  "{item.text}"
                </p>

                {item.metrics && (
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    color: '#60a5fa',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 16,
                  }}>
                    ⚡ {item.metrics}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: 8,
                borderTop: '1px solid #1a1a1a',
                paddingTop: 16,
              }}>
                <button
                  onClick={() => handleOpenModal(item)}
                  style={{
                    flex: 1,
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: '#3b82f6',
                    padding: '8px 12px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Edit2 size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(item.id)}
                  style={{
                    flex: 1,
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    color: '#ef4444',
                    padding: '8px 12px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{
            maxWidth: 540,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0' }}>
                {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  padding: 8,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="label">Client Name *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Rahul Verma"
                />
              </div>

              <div>
                <label className="label">Role & Company *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g., CEO, EduPrime Academy"
                />
              </div>

              <div>
                <label className="label">Testimonial Quote *</label>
                <textarea
                  className="input"
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="What did the client say about working with Zovance?"
                  style={{ minHeight: 110 }}
                />
              </div>

              <div>
                <label className="label">Key Metric / Result Tag (Optional)</label>
                <input
                  type="text"
                  className="input"
                  value={formData.metrics}
                  onChange={(e) => setFormData(prev => ({ ...prev, metrics: e.target.value }))}
                  placeholder="e.g., +140% Qualified Leads or 4.8x ROI"
                />
              </div>

              <div>
                <label className="label">Status</label>
                <select
                  className="input"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="published">Published (Visible on Homepage)</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button
                  onClick={handleCloseModal}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid #2a2a2a',
                    color: '#f0f0f0',
                    padding: '12px 16px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTestimonial}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {editingId ? 'Update Testimonial' : 'Save & Publish'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
