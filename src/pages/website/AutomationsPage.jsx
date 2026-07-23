import { useState, useEffect } from 'react';
import { Search, Zap, Lock, CheckCircle2, Loader, X, Sparkles } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import { addBooking } from '../../services/bookingsService';

export default function AutomationsPage() {
  const [workflows, setWorkflows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedWorkflows, setDisplayedWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', message: '', automationTitle: '', date: '', time: ''
  });

  // Load workflows
  useEffect(() => {
    const loadWorkflows = async () => {
      try {
        const response = await fetch('/n8n_workflows_data.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setWorkflows(data);
          setDisplayedWorkflows(data.slice(0, 12));
        }
      } catch (error) {
        console.error('Error loading workflows:', error);
      }
    };
    loadWorkflows();
  }, []);

  // Search logic
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setDisplayedWorkflows(workflows.slice(0, 12));
      return;
    }
    const matches = workflows.filter(w => {
      const title = (w.title || '').toLowerCase();
      const summary = (w.summary || '').toLowerCase();
      const categories = (w.categories || []).map(c => (c || '').toLowerCase()).join(' ');
      return title.includes(query) || summary.includes(query) || categories.includes(query);
    });
    if (matches.length > 0) {
      setDisplayedWorkflows(matches.slice(0, 12));
    } else {
      setDisplayedWorkflows([{
        id: 'not-found-' + Date.now(),
        title: `${searchQuery} Integration`,
        summary: `Request this custom automation and our team will build it for you.`,
        isNotFound: true,
        author: 'Custom',
        categories: ['Custom'],
        nodes: {}
      }]);
    }
  }, [searchQuery, workflows]);

  const handleOpenBooking = (workflow) => {
    setSelectedWorkflow(workflow);
    setFormData(prev => ({ ...prev, automationTitle: workflow.title }));
    setBookingDrawerOpen(true);
    setBookingSuccess(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      await addBooking({...formData});
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingDrawerOpen(false);
        setBookingSuccess(false);
        setFormData({ name: '', email: '', company: '', phone: '', message: '', automationTitle: '', date: '', time: '' });
      }, 2000);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error submitting booking');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <WebsiteNav />
      <main style={{ flex: 1, padding: 'clamp(60px, 10vw, 80px) clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Premium Header */}
          <div style={{ marginBottom: 'clamp(50px, 10vw, 100px)', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(245, 158, 11, 0.2)' }}>
                <Zap size={32} color="white" />
              </div>
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff', marginBottom: 16, lineHeight: 1.1 }}>
              Explore 9,500+ Automations
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#94a3b8', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
              Discover pre-built workflows or request custom automation solutions tailored to your business needs
            </p>
          </div>

          {/* Search Bar - Enhanced */}
          <div style={{ marginBottom: 'clamp(50px, 8vw, 80px)', maxWidth: 800, margin: '0 auto clamp(50px, 8vw, 80px)' }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(30, 41, 59, 0.8))',
              border: '2px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 16,
              padding: '20px 28px',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
              <Search size={24} style={{ color: '#f59e0b', marginRight: 16, flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search automations, integrations, or describe what you need..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: 'clamp(15px, 2vw, 17px)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <p style={{ fontSize: 14, color: '#666', marginTop: 12, textAlign: 'center' }}>
              {displayedWorkflows.length > 0 
                ? `${displayedWorkflows.length} automation${displayedWorkflows.length !== 1 ? 's' : ''} found${searchQuery ? ' matching your search' : ''}`
                : 'Type to search our catalog...'}
            </p>
          </div>

          {/* Cards Grid - Beautiful */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 32,
            marginBottom: 'clamp(60px, 10vw, 100px)'
          }}>
            {displayedWorkflows.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', padding: '100px 40px', textAlign: 'center', color: '#666' }}>
                <p style={{ fontSize: 18 }}>Loading automations...</p>
              </div>
            ) : (
              displayedWorkflows.map(workflow => (
                <div
                  key={workflow.id}
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.7))',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: 20,
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                    ':hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 30px 60px rgba(99, 102, 241, 0.15)'
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 30px 60px rgba(99, 102, 241, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                  }}
                >
                  {/* Badge */}
                  <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 8 }}>
                    {workflow.isNotFound ? (
                      <div style={{ background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)', color: '#fff', padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Sparkles size={14} /> Coming Soon
                      </div>
                    ) : (
                      <div style={{ background: 'rgba(107, 114, 128, 0.6)', color: '#e5e7eb', padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Lock size={14} /> Locked
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 12, lineHeight: 1.3, paddingRight: 120 }}>
                      {workflow.title}
                    </h3>
                    <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.6, marginBottom: 8 }}>
                      {workflow.summary}
                    </p>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {Array.isArray(workflow.categories) && workflow.categories.slice(0, 3).map((cat, i) => (
                      <span key={i} style={{
                        background: 'rgba(99, 102, 241, 0.15)',
                        color: '#c7d2fe',
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        border: '1px solid rgba(99, 102, 241, 0.25)',
                        whiteSpace: 'nowrap'
                      }}>
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Tools */}
                  {!workflow.isNotFound && Object.keys(workflow.nodes || {}).length > 0 && (
                    <div style={{ fontSize: 13, color: '#9ca3af', paddingTop: 12, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      ⚙️ {Object.keys(workflow.nodes).length} integrated tools
                    </div>
                  )}

                  {/* Button */}
                  <button
                    onClick={() => handleOpenBooking(workflow)}
                    style={{
                      marginTop: 'auto',
                      padding: '14px 24px',
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 28px rgba(245, 158, 11, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.3)';
                    }}
                  >
                    Request Setup
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Booking Drawer - Will add in next part */}
      {bookingDrawerOpen && (
        <>
          <div
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
              zIndex: 999
            }}
            onClick={() => !bookingSuccess && setBookingDrawerOpen(false)}
          />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0,
            width: 'min(100%, 500px)',
            background: 'rgba(6, 6, 8, 0.98)', backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(99, 102, 241, 0.2)',
            zIndex: 1000, display: 'flex', flexDirection: 'column',
            boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)'
          }}>
            {bookingSuccess ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
                <CheckCircle2 size={64} style={{ color: '#10b981', marginBottom: 24 }} />
                <h3 style={{ fontSize: 28, fontWeight: 800, color: '#ffffff', marginBottom: 16 }}>Booking Confirmed!</h3>
                <p style={{ fontSize: 16, color: '#9ca3af', lineHeight: 1.6 }}>
                  Our team will reach out within 2 hours with a discovery call invite and Google Meet link.
                </p>
              </div>
            ) : (
              <>
                <div style={{ padding: 32, borderBottom: '1px solid rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#ffffff' }}>Request Setup</h2>
                  <button
                    onClick={() => setBookingDrawerOpen(false)}
                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 10, padding: 10, color: '#f0f0f0', cursor: 'pointer', fontSize: 24, lineHeight: 1 }}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleBookingSubmit} style={{ flex: 1, overflowY: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Form fields will be added in next part */}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Automation</label>
                    <input type="text" value={formData.automationTitle} disabled style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#999', fontSize: 14, fontFamily: 'inherit', opacity: 0.6 }} />
                  </div>
                  {/* Additional form fields... (truncated for space) */}
                  <input type="text" name="name" placeholder="Full Name*" value={formData.name} onChange={handleFormChange} required style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#fff', fontSize: 14 }} />
                  <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleFormChange} required style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#fff', fontSize: 14 }} />
                  <button type="submit" disabled={bookingLoading} style={{ marginTop: 'auto', padding: '14px 24px', borderRadius: 10, background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 15, cursor: bookingLoading ? 'not-allowed' : 'pointer', opacity: bookingLoading ? 0.7 : 1 }}>
                    {bookingLoading ? 'Submitting...' : 'Request Automation Setup'}
                  </button>
                </form>
              </>
            )}
          </div>
        </>
      )}

      <WebsiteFooter />
    </div>
  );
}
