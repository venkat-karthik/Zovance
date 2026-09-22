import { useState } from 'react';
import { Plus, X, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function BlogAdmin() {
  const { blogPosts, addBlogPost, updateBlogPost } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'AI Automation',
    readTime: 5,
    published: false,
  });

  const handleAddPost = () => {
    if (newPost.title && newPost.slug) {
      if (editingId) {
        updateBlogPost(editingId, newPost);
        setEditingId(null);
      } else {
        addBlogPost(newPost);
      }
      setNewPost({ title: '', slug: '', excerpt: '', content: '', category: 'AI Automation', readTime: 5, published: false });
      setShowModal(false);
    }
  };

  const handleEdit = (post) => {
    setNewPost(post);
    setEditingId(post.id);
    setShowModal(true);
  };

  const handleTogglePublish = (post) => {
    updateBlogPost(post.id, { ...post, published: !post.published });
  };

  const publishedPosts = blogPosts.filter(p => p.published);
  const draftPosts = blogPosts.filter(p => !p.published);

  const categories = ['AI Automation', 'AI Voice', 'Web Solutions', 'Case Studies', 'Tips & Tricks'];

  return (
    <div>
      {/* Header */}
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', letterSpacing: '-0.5px' }}>Knowledge Hub & Blog Admin</h1>
          <p style={{ color: '#526673', fontSize: 14, marginTop: 4 }}>Compose, publish, and curate insights for the Zovance publications</p>
        </div>
        <button onClick={() => { setEditingId(null); setNewPost({ title: '', slug: '', excerpt: '', content: '', category: 'AI Automation', readTime: 5, published: false }); setShowModal(true); }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#102C42', color: '#FFFFFF', border: 'none', padding: '10px 18px', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 2px 8px rgba(16,44,66,0.15)' }}>
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Articles', value: blogPosts.length, color: '#102C42', bg: '#F2FAFD' },
          { label: 'Published', value: publishedPosts.length, color: '#16a34a', bg: '#DCFCE7' },
          { label: 'Drafts', value: draftPosts.length, color: '#d97706', bg: '#FEF3C7' },
        ].map(s => (
          <div key={s.label} style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, padding: 18, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: '-0.5px', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#526673' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Published Posts */}
      <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, overflow: 'hidden', marginBottom: 24, boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #DCE9EE', background: '#F8FAFC' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#102C42' }}>Published Articles ({publishedPosts.length})</h3>
        </div>

        {publishedPosts.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#526673' }}>
            <p>No published articles yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}>
            {publishedPosts.map(post => (
              <div key={post.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#102C42', marginBottom: 4 }}>{post.title}</h4>
                    <p style={{ fontSize: 13, color: '#526673', lineHeight: 1.5, marginBottom: 8 }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ background: '#DCFCE7', color: '#16a34a', border: '1px solid #BBF7D0', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: 12, color: '#526673', fontWeight: 600 }}>{post.readTime} min read</span>
                      <span style={{ fontSize: 12, color: '#94A3B8' }}>
                        {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(post)} style={{ background: '#F2FAFD', border: '1px solid #DCE9EE', color: '#102C42', cursor: 'pointer', padding: 6, borderRadius: 6 }}>
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleTogglePublish(post)} style={{ background: '#DCFCE7', border: '1px solid #BBF7D0', color: '#16a34a', cursor: 'pointer', padding: 6, borderRadius: 6 }}>
                      <Eye size={14} />
                    </button>
                    <button style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', cursor: 'pointer', padding: 6, borderRadius: 6 }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Draft Posts */}
      {draftPosts.length > 0 && (
        <div style={{ background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(16,44,66,0.03)' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid #DCE9EE', background: '#F8FAFC' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#526673' }}>Drafts ({draftPosts.length})</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20 }}>
            {draftPosts.map(post => (
              <div key={post.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#526673', marginBottom: 4 }}>{post.title}</h4>
                    <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.5, marginBottom: 8 }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ background: '#FEF3C7', color: '#d97706', border: '1px solid #FDE68A', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                        Draft
                      </span>
                      <span style={{ fontSize: 12, color: '#526673', fontWeight: 600 }}>{post.readTime} min read</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(post)} style={{ background: '#F2FAFD', border: '1px solid #DCE9EE', color: '#102C42', cursor: 'pointer', padding: 6, borderRadius: 6 }}>
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleTogglePublish(post)} style={{ background: '#FEF3C7', border: '1px solid #FDE68A', color: '#d97706', cursor: 'pointer', padding: 6, borderRadius: 6 }}>
                      <EyeOff size={14} />
                    </button>
                    <button style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', cursor: 'pointer', padding: 6, borderRadius: 6 }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog Post Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)} style={{ background: 'rgba(16,44,66,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 700, background: '#FFFFFF', border: '1px solid #DCE9EE', borderRadius: 16, boxShadow: '0 20px 40px rgba(16,44,66,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#102C42' }}>
                {editingId ? 'Edit Post' : 'New Blog Post'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#526673', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 45vw, 220px), 1fr))', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>Title *</label>
                <input
                  type="text"
                  placeholder="Post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42', fontSize: 13 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>Slug *</label>
                <input
                  type="text"
                  placeholder="post-slug"
                  value={newPost.slug}
                  onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42', fontSize: 13 }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>Excerpt</label>
              <textarea
                placeholder="Brief summary of the post..."
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42', fontSize: 13, minHeight: 60 }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>Content</label>
              <textarea
                placeholder="Full post content..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42', fontSize: 13, minHeight: 150 }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(140px, 40vw, 180px), 1fr))', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42', fontSize: 13, fontWeight: 600 }}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>Read Time (min)</label>
                <input
                  type="number"
                  placeholder="5"
                  min="1"
                  value={newPost.readTime}
                  onChange={(e) => setNewPost({ ...newPost, readTime: parseInt(e.target.value) })}
                  style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42', fontSize: 13 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#102C42', marginBottom: 6 }}>Status</label>
                <select
                  value={newPost.published ? 'published' : 'draft'}
                  onChange={(e) => setNewPost({ ...newPost, published: e.target.value === 'published' })}
                  style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #DCE9EE', borderRadius: 8, color: '#102C42', fontSize: 13, fontWeight: 600 }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ flex: 1, background: '#102C42', color: '#FFFFFF', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }} onClick={handleAddPost}>
                {editingId ? 'Update Post' : 'Create Post'}
              </button>
              <button style={{ flex: 1, background: '#FFFFFF', color: '#526673', border: '1px solid #DCE9EE', padding: '12px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer' }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
