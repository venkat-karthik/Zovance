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
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#102C42', marginBottom: 8, letterSpacing: '-0.5px' }}>
            Client Testimonials & Endorsements
          </h1>
          <p style={{ color: '#526673', fontSize: 14 }}>
            Manage verified client feedback and metrics displayed dynamically on the public site
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#102C42',
            color: '#FFFFFF',
            border: 'none',
            padding: '11px 20px',
            borderRadius: 10,
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: 14,
            boxShadow: '0 2px 8px rgba(16,44,66,0.15)',
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
          left: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#526673',
        }} />
        <input
          type="text"
          placeholder="Search testimonials by name, role, or review text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            paddingLeft: 42,
            width: '100%',
            maxWidth: 420,
            padding: '12px 14px 12px 42px',
            background: '#FFFFFF',
            border: '1px solid #DCE9EE',
            borderRadius: 10,
            color: '#102C42',
            fontSize: 14,
          }}
        />
      </div>

      {/* Testimonials List / Grid */}
      {filteredTestimonials.length === 0 ? (
        <div style={{
          background: '#FFFFFF',
          border: '1px dashed #DCE9EE',
          borderRadius: 16,
          padding: '60px 24px',
          textAlign: 'center',
        }}>
          <MessageCircle size={48} color="#526673" style={{ margin: '0 auto 16px', opacity: 0.5 }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#102C42', marginBottom: 8 }}>
            No Testimonials Added Yet
          </h3>
          <p style={{ color: '#526673', fontSize: 14, maxWidth: 460, margin: '0 auto 24px' }}>
            When you add testimonials here and publish them, the testimonials block will automatically appear on your public Homepage!
          </p>
          <button
            onClick={() => handleOpenModal()}
            style={{
              background: '#102C42',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 10,
              fontWeight: 700,
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
          gap: 18,
        }}>
          {filteredTestimonials.map(item => (
            <div
              key={item.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #DCE9EE',
                borderRadius: 14,
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(16,44,66,0.03)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#102C42';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,44,66,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#DCE9EE';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(16,44,66,0.03)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#102C42', marginBottom: 2 }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: 13, color: '#526673', fontWeight: 600 }}>
                      {item.role}
                    </p>
                  </div>
                  <button
                    onClick={() => handleTogglePublish(item.id, item.status)}
                    title={item.status === 'published' ? 'Click to Unpublish' : 'Click to Publish'}
                    style={{
                      background: item.status === 'published' ? '#DCFCE7' : '#F1F5F9',
                      border: `1px solid ${item.status === 'published' ? '#BBF7D0' : '#E2E8F0'}`,
                      color: item.status === 'published' ? '#16A34A' : '#526673',
                      padding: '6px 12px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {item.status === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                    {item.status === 'published' ? 'Live' : 'Draft'}
                  </button>
                </div>

                <p style={{
                  fontSize: 13,
                  color: '#102C42',
                  lineHeight: 1.6,
                  marginBottom: 16,
                  fontStyle: 'italic',
                }}>
                  "{item.text}"
                </p>

                {item.metrics && (
                  <div style={{
                    display: 'inline-block',
                    background: '#F2FAFD',
                    border: '1px solid #DCE9EE',
                    color: '#102C42',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 700,
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
                borderTop: '1px solid #F1F5F9',
                paddingTop: 16,
              }}>
                <button
                  onClick={() => handleOpenModal(item)}
                  style={{
                    flex: 1,
                    background: '#F2FAFD',
                    border: '1px solid #DCE9EE',
                    color: '#102C42',
                    padding: '8px 12px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Edit2 size={13} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(item.id)}
                  style={{
                    flex: 1,
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    color: '#DC2626',
                    padding: '8px 12px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Trash2 size={13} />
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
