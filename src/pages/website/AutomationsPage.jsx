import { useState, useEffect } from 'react';
import { Search, Zap, Calendar, X, Phone, Mail, Building2, CheckCircle2, Loader } from 'lucide-react';
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

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    automationTitle: '',
    date: '',
    time: ''
  });

  // Load workflows from public JSON file
  useEffect(() => {
    const loadWorkflows = async () => {
      try {
        const response = await fetch('/n8n_workflows_data.json');
        const data = await response.json();
        setWorkflows(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading workflows:', error);
        setWorkflows([]);
      }
    };
    loadWorkflows();
  }, []);

  // Search and semantic matching
  useEffect(() => {
    if (!searchQuery.trim()) {
      setDisplayedWorkflows(workflows.slice(0, 12)); // Show first 12
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Direct matches from catalog
    const directMatches = workflows.filter(w => {
      const title = (w.title || '').toLowerCase();
      const summary = (w.summary || '').toLowerCase();
      const categories = (w.categories || []).map(c => (c || '').toLowerCase()).join(' ');
      const author = (w.author || '').toLowerCase();
      
      return title.includes(query) || 
             summary.includes(query) || 
             categories.includes(query) ||
             author.includes(query);
    });

    // If matches found, show them first (limit to 12)
    if (directMatches.length > 0) {
      setDisplayedWorkflows(directMatches.slice(0, 12));
    } else {
      // No matches: create dynamic fallback card
      const dynamicCard = {
        id: 'custom-' + Date.now(),
        title: `${searchQuery} Integration`,
        summary: `Fully managed, automated, and secure data sync and integration for ${searchQuery}. Custom engineered for your operational scale and security requirements.`,
        isDynamic: true,
        author: 'Zovance',
        categories: ['Custom Integration', 'Automation'],
        nodes: {},
        folder_name: 'dynamic-integration'
      };
      setDisplayedWorkflows([dynamicCard]);
    }
  }, [searchQuery, workflows]);

  const handleOpenBooking = (workflow) => {
    setSelectedWorkflow(workflow);
    setFormData(prev => ({
      ...prev,
      automationTitle: workflow.title
    }));
    setBookingDrawerOpen(true);
    setBookingSuccess(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      await addBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        automationTitle: formData.automationTitle,
        date: formData.date,
        time: formData.time
      });

      setBookingSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        automationTitle: '',
        date: '',
        time: ''
      });

      // Close after 2 seconds
      setTimeout(() => {
        setBookingDrawerOpen(false);
        setBookingSuccess(false);
        setSelectedWorkflow(null);
      }, 2000);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error submitting booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div style={{ background: '#060608', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <WebsiteNav />

      <main style={{ flex: 1, padding: 'clamp(40px, 8vw, 60px) clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          {/* Header Section */}
          <div style={{ marginBottom: 'clamp(40px, 8vw, 80px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Zap size={32} style={{ color: '#f59e0b' }} />
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>
                9,500+ Automations Catalog
              </h1>
            </div>
            <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#94a3b8', lineHeight: 1.6, maxWidth: 600 }}>
              Search our comprehensive automation library, or describe your custom requirements. If the automation isn't in our catalog, we'll custom-engineer a solution tailored to your operational needs.
            </p>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: 'clamp(40px, 6vw, 60px)' }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(17, 24, 39, 0.5)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: 12,
              padding: '16px 20px',
              backdropFilter: 'blur(16px)',
              transition: 'all 0.3s ease'
            }}>
              <Search size={20} style={{ color: '#6366f1', marginRight: 12 }} />
              <input
                type="text"
                placeholder="Search 'Google Sheets', 'sync Stripe to Slack', 'email automations'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  outline: 'none',
                  fontSize: 'clamp(14px, 1.5vw, 16px)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
              {displayedWorkflows.length > 0 
                ? `Showing ${displayedWorkflows.length} automation${displayedWorkflows.length !== 1 ? 's' : ''}${searchQuery ? ' matching your search' : ''}`
                : 'No results found'}
            </p>
          </div>

          {/* Workflow Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'clamp(20px, 3vw, 32px)',
            marginBottom: 'clamp(40px, 8vw, 80px)'
          }}>
            {displayedWorkflows.map(workflow => (
              <div
                key={workflow.id}
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 12,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  backdropFilter: 'blur(16px)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Badge */}
                {workflow.isDynamic && (
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '-0.01em'
                  }}>
                    Custom Solution
                  </div>
                )}

                {/* Title */}
                <div>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    marginBottom: 8,
                    lineHeight: 1.3
                  }}>
                    {workflow.title}
                  </h3>
                  <p style={{
                    fontSize: 14,
                    color: '#9ca3af',
                    lineHeight: 1.5
                  }}>
                    {workflow.summary}
                  </p>
                </div>

                {/* Categories & Info */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                  {Array.isArray(workflow.categories) && workflow.categories.slice(0, 2).map((cat, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: '#a5b4fc',
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Nodes Info */}
                {!workflow.isDynamic && Object.keys(workflow.nodes || {}).length > 0 && (
                  <div style={{
                    fontSize: 13,
                    color: '#6b7280',
                    paddingTop: 12,
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    {Object.keys(workflow.nodes).length} integrated tools
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => handleOpenBooking(workflow)}
                  style={{
                    marginTop: 'auto',
                    padding: '12px 20px',
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: 14,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                  }}
                >
                  Book Integration Setup
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Booking Drawer Overlay */}
      {bookingDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => !bookingSuccess && setBookingDrawerOpen(false)}
        />
      )}

      {/* Booking Drawer */}
      {bookingDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: 'min(100%, 480px)',
            background: 'rgba(6, 6, 8, 0.95)',
            backdropFilter: 'blur(16px)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideInFromRight 0.3s ease'
          }}
        >
          {/* Header */}
          <div style={{
            padding: 24,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Setup Automation
            </h2>
            <button
              onClick={() => setBookingDrawerOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 6,
                padding: 8,
                color: '#f0f0f0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          {bookingSuccess ? (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
              flexDirection: 'column',
              gap: 16,
              textAlign: 'center'
            }}>
              <CheckCircle2 size={48} style={{ color: '#10b981' }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff' }}>Booking Confirmed!</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.5 }}>
                We've received your request. Our team will send you a Google Calendar invite and connect via email within 2 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleBookingSubmit}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 20
              }}
            >
              {/* Automation Title (Read-only) */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Automation
                </label>
                <input
                  type="text"
                  value={formData.automationTitle}
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    cursor: 'not-allowed',
                    opacity: 0.6
                  }}
                />
              </div>

              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Your full name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                />
              </div>

              {/* Business Email */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Business Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="your@company.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                />
              </div>

              {/* Company */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  placeholder="Your company"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                />
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  WhatsApp / Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+91 8309827125"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Preferred Setup Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Additional Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Describe your requirements, integrations needed, or any special considerations..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={bookingLoading}
                style={{
                  marginTop: 24,
                  padding: '14px 20px',
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: bookingLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  opacity: bookingLoading ? 0.7 : 1
                }}
              >
                {bookingLoading && <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />}
                {bookingLoading ? 'Submitting...' : 'Request Automation Setup'}
              </button>
            </form>
          )}
        </div>
      )}

      <WebsiteFooter />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
