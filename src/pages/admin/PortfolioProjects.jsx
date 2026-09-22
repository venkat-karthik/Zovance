import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, GitBranch, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function PortfolioProjects() {
  const {
    portfolioProjects,
    addPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
    publishPortfolioProject,
    unpublishPortfolioProject,
  } = useStore();

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    github_link: '',
    technologies: [],
    metrics: [],
    status: 'draft',
  });
  const [techInput, setTechInput] = useState('');
  const [metricInput, setMetricInput] = useState({ label: '', value: '', icon: 'TrendingUp' });

  const filteredProjects = portfolioProjects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project.id);
      setFormData(project);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        github_link: '',
        technologies: [],
        metrics: [],
        status: 'draft',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setTechInput('');
    setMetricInput({ label: '', value: '', icon: 'TrendingUp' });
  };

  const handleAddTechnology = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleAddMetric = () => {
    if (metricInput.label && metricInput.value) {
      setFormData(prev => ({
        ...prev,
        metrics: [...prev.metrics, { ...metricInput }],
      }));
      setMetricInput({ label: '', value: '', icon: 'TrendingUp' });
    }
  };

  const handleRemoveMetric = (index) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));
  };

  const handleSaveProject = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      updatePortfolioProject(editingId, formData);
    } else {
      addPortfolioProject(formData);
    }

    handleCloseModal();
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deletePortfolioProject(id);
    }
  };

  const handleTogglePublish = (id, currentStatus) => {
    if (currentStatus === 'published') {
      unpublishPortfolioProject(id);
    } else {
      publishPortfolioProject(id);
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
            Showcase & Portfolio Hub
          </h1>
          <p style={{ color: '#526673', fontSize: 14 }}>
            Manage client case studies and high-impact engineering work displayed on the public site
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
          Add Project
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
          placeholder="Search projects by name, technologies, or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px 12px 42px',
            background: '#FFFFFF',
            border: '1px solid #DCE9EE',
            borderRadius: 10,
            color: '#102C42',
            fontSize: 14,
          }}
        />
      </div>

      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px, 45vw, 320px), 1fr))',
        gap: 18,
      }}>
        {filteredProjects.map(project => (
          <div
            key={project.id}
            style={{
              background: '#FFFFFF',
              border: '1px solid #DCE9EE',
              borderRadius: 14,
              overflow: 'hidden',
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
            {/* Image */}
            <div style={{
              width: '100%',
              height: 160,
              background: `url(${project.image}) center/cover`,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 6,
              }}>
                <button
                  onClick={() => handleTogglePublish(project.id, project.status)}
                  style={{
                    background: project.status === 'published' ? '#DCFCE7' : '#F1F5F9',
                    border: `1px solid ${project.status === 'published' ? '#BBF7D0' : '#E2E8F0'}`,
                    color: project.status === 'published' ? '#16A34A' : '#526673',
                    padding: '6px 10px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {project.status === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: 18 }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 800,
                color: '#102C42',
                marginBottom: 8,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {project.title}
              </h3>

              <p style={{
                fontSize: 13,
                color: '#526673',
                marginBottom: 12,
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {project.description}
              </p>

              {/* Technologies */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                marginBottom: 14,
              }}>
                {project.technologies?.slice(0, 2).map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 11,
                      padding: '3px 8px',
                      borderRadius: 6,
                      background: '#F2FAFD',
                      color: '#102C42',
                      border: '1px solid #DCE9EE',
                      fontWeight: 600,
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies?.length > 2 && (
                  <span style={{
                    fontSize: 11,
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: '#F8FAFC',
                    color: '#526673',
                    border: '1px solid #E2E8F0',
                    fontWeight: 600,
                  }}>
                    +{project.technologies.length - 2}
                  </span>
                )}
              </div>

              {/* GitHub Link */}
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    color: '#102C42',
                    fontSize: 12,
                    textDecoration: 'none',
                    marginBottom: 14,
                    fontWeight: 600,
                  }}
                >
                  <GitBranch size={13} />
                  Repository
                </a>
              )}

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: 8,
              }}>
                <button
                  onClick={() => handleOpenModal(project)}
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
                    gap: 4,
                  }}
                >
                  <Edit2 size={13} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
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
                    gap: 4,
                  }}
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={handleCloseModal} style={{ background: 'rgba(16,44,66,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{
            maxWidth: 600,
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#FFFFFF',
            border: '1px solid #DCE9EE',
            borderRadius: 16,
            boxShadow: '0 20px 40px rgba(16,44,66,0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#102C42' }}>
                {editingId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={handleCloseModal}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  color: '#526673',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Title */}
              <div>
                <label className="label">Project Title *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., EduPrime Academy - AI LMS"
                />
              </div>

              {/* Description */}
              <div>
                <label className="label">Description *</label>
                <textarea
                  className="input"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the project and its impact..."
                  style={{ minHeight: 100 }}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="label">Image URL *</label>
                <input
                  type="url"
                  className="input"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              {/* Live Website / App URL */}
              <div>
                <label className="label">Live Website / App URL</label>
                <input
                  type="url"
                  className="input"
                  value={formData.url || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value, github_link: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="label">Technologies</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  <input
                    type="text"
                    className="input"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTechnology()}
                    placeholder="e.g., React"
                    style={{ flex: '1 1 180px' }}
                  />
                  <button
                    onClick={handleAddTechnology}
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#3b82f6',
                      padding: '10px 16px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >
                    Add
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {formData.technologies.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        padding: '6px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {tech}
                      <button
                        onClick={() => handleRemoveTechnology(i)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3b82f6',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                        }}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div>
                <label className="label">Metrics</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
                  <input
                    type="text"
                    className="input"
                    value={metricInput.label}
                    onChange={(e) => setMetricInput(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="e.g., Conversion Rate"
                  />
                  <input
                    type="text"
                    className="input"
                    value={metricInput.value}
                    onChange={(e) => setMetricInput(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="e.g., 340%"
                  />
                  <button
                    onClick={handleAddMetric}
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#3b82f6',
                      padding: '10px 16px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >
                    Add Metric
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {formData.metrics.map((metric, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#0e0e0e',
                        border: '1px solid #1a1a1a',
                        padding: 12,
                        borderRadius: 6,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f0f0' }}>
                          {metric.label}
                        </div>
                        <div style={{ fontSize: 11, color: '#888' }}>
                          {metric.value}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveMetric(i)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="label">Status</label>
                <select
                  className="input"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="draft">Draft (Hidden)</option>
                  <option value="published">Published (Visible)</option>
                </select>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
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
                  onClick={handleSaveProject}
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
                  {editingId ? 'Update Project' : 'Add Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
