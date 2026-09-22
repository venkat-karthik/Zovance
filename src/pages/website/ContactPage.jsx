import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import { contactService } from '../../services/contactService';

export default function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    whatToBuild: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactService.submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.company,
        service: formData.whatToBuild || 'General Inquiry',
        message: formData.message,
      });
    } catch (err) {
      console.error('Failed submitting contact form:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', company: '', whatToBuild: '', message: '' });
      }, 6000);
    }
  };

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: 'clamp(120px, 14vw, 150px) clamp(20px, 5vw, 64px) clamp(30px, 4vw, 50px)',
        textAlign: 'center',
      }}>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: '#38A85B',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 16,
        }}>
          GET IN TOUCH
        </span>

        <h1 style={{
          fontSize: 'clamp(36px, 5.5vw, 64px)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          color: '#102C42',
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          Let's build something meaningful.
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)',
          color: '#526673',
          maxWidth: 580,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          We are here to help your business work smarter, automate repetitive friction, and communicate better.
        </p>
      </section>

      {/* Contact Content */}
      <section style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 10vw, 120px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'start',
        }}>
          {/* Left Form */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-7">
            <div style={{
              background: '#F2FAFD',
              border: '1px solid #DCE9EE',
              borderRadius: 32,
              padding: 'clamp(28px, 5vw, 48px)',
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#102C42', marginBottom: 8 }}>
                Tell us about your project
              </h2>
              <p style={{ fontSize: 14, color: '#526673', marginBottom: 28 }}>
                Fill out the details below and a member of our team will respond within a few hours.
              </p>

              {submitted ? (
                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid #38A85B',
                  borderRadius: 20,
                  padding: 32,
                  textAlign: 'center',
                  color: '#102C42',
                }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#F2FAFD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#38A85B',
                  }}>
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Message Received</h3>
                  <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6 }}>
                    Thank you for reaching out. We look forward to exploring how we can build together.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#102C42', marginBottom: 6 }}>Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #DCE9EE', background: '#FFFFFF', fontSize: 14, outline: 'none', color: '#102C42' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#102C42', marginBottom: 6 }}>Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #DCE9EE', background: '#FFFFFF', fontSize: 14, outline: 'none', color: '#102C42' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#102C42', marginBottom: 6 }}>Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp"
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #DCE9EE', background: '#FFFFFF', fontSize: 14, outline: 'none', color: '#102C42' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#102C42', marginBottom: 6 }}>What are you looking to build?</label>
                      <input
                        type="text"
                        value={formData.whatToBuild}
                        onChange={(e) => setFormData({ ...formData, whatToBuild: e.target.value })}
                        placeholder="AI Automation, Voice AI, Web Platform..."
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #DCE9EE', background: '#FFFFFF', fontSize: 14, outline: 'none', color: '#102C42' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#102C42', marginBottom: 6 }}>Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Give us a brief overview of your current workflow or goals..."
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #DCE9EE', background: '#FFFFFF', fontSize: 14, outline: 'none', color: '#102C42', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-zovance-primary"
                    style={{ alignSelf: 'flex-start', padding: '13px 32px' }}
                  >
                    <span>{submitting ? 'Sending...' : "Let's Connect"}</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Info Cards */}
          <div style={{ gridColumn: 'span 12 / span 12' }} className="lg:col-span-5">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Direct Info */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #DCE9EE',
                borderRadius: 24,
                padding: 32,
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#102C42', marginBottom: 20 }}>
                  Direct Channels
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F2FAFD', border: '1px solid #DCE9EE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38A85B' }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: 12, color: '#526673', display: 'block' }}>Official Email</span>
                      <a href="mailto:zovance1@gmail.com" style={{ fontSize: 15, fontWeight: 600, color: '#102C42', textDecoration: 'none' }}>
                        zovance1@gmail.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F2FAFD', border: '1px solid #DCE9EE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38A85B' }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: 12, color: '#526673', display: 'block' }}>Direct Helpline & WhatsApp</span>
                      <a href="tel:+918309827125" style={{ fontSize: 15, fontWeight: 600, color: '#102C42', textDecoration: 'none' }}>
                        +91 83098 27125
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F2FAFD', border: '1px solid #DCE9EE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38A85B' }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: 12, color: '#526673', display: 'block' }}>Headquarters</span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#102C42' }}>
                        Hyderabad &bull; Bangalore, India
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategy Session Box */}
              <div style={{
                background: '#F2FAFD',
                border: '1px solid #DCE9EE',
                borderRadius: 24,
                padding: 32,
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#102C42', marginBottom: 8 }}>
                  Prefer a conversation?
                </h3>
                <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6, marginBottom: 20 }}>
                  Book a direct 30-minute system architecture conversation with our engineering lead.
                </p>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="btn-zovance-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Book a Conversation</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
