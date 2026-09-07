import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';

export default function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'General Inquiry', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div style={{ background: '#FBFBF9', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(50px, 8vw, 90px) clamp(16px, 4vw, 36px) clamp(20px, 4vw, 40px)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#64748B', textTransform: 'uppercase', marginBottom: 16 }}>
          GET IN TOUCH
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#0F172A',
          lineHeight: 1.05,
          marginBottom: 24,
        }}>
          Let's Build Your<br />
          <span className="impact-gradient font-serif" style={{ fontStyle: 'italic' }}>AI System Today</span>
        </h1>
        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#475569',
          maxWidth: 580,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Have a project in mind or want to explore what AI can automate for your business? Send us a message or schedule a free 30-min strategy call.
        </p>
      </section>

      {/* Contact Form & Info Cards */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 36px) clamp(60px, 8vw, 100px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(24px, 4vw, 48px)',
          alignItems: 'start',
        }}>

          {/* Left Form */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-7">
            <div style={{
              background: '#ffffff',
              border: '1px solid #E2E8F0',
              borderRadius: 28,
              padding: 'clamp(28px, 5vw, 44px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>
                Send Us a Message
              </h2>
              <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>
                We typically respond within 15 minutes during business hours.
              </p>

              {submitted ? (
                <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: 16, padding: 24, textAlign: 'center', color: '#166534' }}>
                  <CheckCircle2 size={36} color="#16A34A" style={{ margin: '0 auto 12px' }} />
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Message Received!</div>
                  <div style={{ fontSize: 14 }}>Thank you for reaching out. Our engineering team will get back to you shortly.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #E2E8F0', background: '#FBFBF9', fontSize: 14, outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #E2E8F0', background: '#FBFBF9', fontSize: 14, outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #E2E8F0', background: '#FBFBF9', fontSize: 14, outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Interest / Service</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #E2E8F0', background: '#FBFBF9', fontSize: 14, outline: 'none' }}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="AI Workflow Automation">AI Workflow Automation</option>
                        <option value="AI Voice Systems">AI Voice Systems</option>
                        <option value="Custom Web Engineering">Custom Web Engineering</option>
                        <option value="Automation Strategy Audit">Automation Strategy Audit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Project Details / Goals *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about what you want to build or automate..."
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #E2E8F0', background: '#FBFBF9', fontSize: 14, outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-dark-pill"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Send Message</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Info Cards */}
          <div style={{ gridColumn: 'span 12 / span 12', display: 'flex', flexDirection: 'column', gap: 20 }} className="lg:col-span-5">
            {/* Quick WhatsApp Connect */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #E2E8F0',
              borderRadius: 24,
              padding: 28,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>WhatsApp Quick Connect</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Fastest response time</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, marginBottom: 20 }}>
                Chat directly with our team for quick technical questions or urgent project requests.
              </p>
              <button
                className="btn-white-pill"
                onClick={() => window.open('https://wa.me/918309827125', '_blank')}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Direct Booking Card */}
            <div style={{
              background: '#0F172A',
              color: '#ffffff',
              borderRadius: 24,
              padding: 28,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#38BDF8', textTransform: 'uppercase', marginBottom: 10 }}>
                PREFERRED METHOD
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                Book a 30-Min Strategy Call
              </h3>
              <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginBottom: 20 }}>
                Pick a convenient time slot on our calendar to discuss your automation roadmap with an engineer.
              </p>
              <button
                className="btn-dark-pill"
                onClick={() => setBookingOpen(true)}
                style={{ width: '100%', justifyContent: 'center', background: '#ffffff', color: '#0F172A' }}
              >
                <span>Select Calendar Slot</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
