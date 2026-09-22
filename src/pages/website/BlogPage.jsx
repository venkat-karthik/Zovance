import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Tag, Sparkles } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import ClosingCtaBanner from '../../components/ClosingCtaBanner';

const articles = [
  {
    id: 'ai-agents-vs-chatbots',
    title: 'Autonomous AI Agents vs Traditional Chatbots: What Businesses Need to Know',
    category: 'AI Architecture',
    date: 'Sep 02, 2026',
    readTime: '5 min read',
    excerpt: 'Traditional chatbots follow static scripts. Autonomous AI agents reason, plan, and execute multi-step workflows across your software stack.',
  },
  {
    id: 'whatsapp-automation-blueprint',
    title: 'The 2026 WhatsApp AI Automation Blueprint For High-Growth Brands',
    category: 'Workflow Automation',
    date: 'Aug 28, 2026',
    readTime: '7 min read',
    excerpt: 'How leading e-commerce and hospitality brands automate lead qualification, sales inquiries, and booking workflows directly inside WhatsApp.',
  },
  {
    id: 'voice-ai-for-inbound-calls',
    title: 'Reducing Call Center Costs by 70% With Multilingual Voice AI Systems',
    category: 'Voice AI',
    date: 'Aug 15, 2026',
    readTime: '6 min read',
    excerpt: 'A deep dive into how real-time speech synthesis and LLM reasoning handle high-volume inbound phone calls with zero wait time.',
  },
];

export default function BlogPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(56px, 8vw, 96px) clamp(20px, 5vw, 48px) clamp(36px, 5vw, 60px)',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#F2FAFD',
          border: '1px solid #DCE9EE',
          borderRadius: 999,
          padding: '6px 16px',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: '#102C42',
          textTransform: 'uppercase',
          marginBottom: 20
        }}>
          <Sparkles size={14} color="#38A85B" />
          <span>ENGINEERING INSIGHTS & CASE STUDIES</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          color: '#102C42',
          lineHeight: 1.08,
          marginBottom: 20,
        }}>
          AI Automation & Engineering<br />
          <span style={{ color: '#38A85B', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            Knowledge Hub
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 19px)',
          color: '#526673',
          maxWidth: 620,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          In-depth architectural guides, automation blueprints, and production case studies written directly by our senior engineering team.
        </p>
      </section>

      {/* Articles Grid */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 48px) clamp(60px, 8vw, 100px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 28,
        }}>
          {articles.map((art) => (
            <div
              key={art.id}
              className="card-3d"
              style={{
                background: '#FFFFFF',
                border: '1px solid #DCE9EE',
                borderRadius: 24,
                padding: 'clamp(24px, 3.5vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(16, 44, 66, 0.04)',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#38A85B',
                    background: '#F2FAFD',
                    border: '1px solid #DCE9EE',
                    padding: '4px 12px',
                    borderRadius: 999,
                  }}>
                    {art.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#526673' }}>
                    <Clock size={13} />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#102C42', marginBottom: 14, lineHeight: 1.3 }}>
                  <Link
                    to={`/blog/${art.id}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {art.title}
                  </Link>
                </h2>

                <p style={{ fontSize: 14, color: '#526673', lineHeight: 1.6, marginBottom: 28 }}>
                  {art.excerpt}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #F2FAFD',
                paddingTop: 20
              }}>
                <span style={{ fontSize: 12, color: '#526673', fontWeight: 600 }}>
                  {art.date}
                </span>

                <Link
                  to={`/blog/${art.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#102C42',
                    textDecoration: 'none',
                  }}
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} color="#38A85B" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ClosingCtaBanner onBookCall={() => setBookingOpen(true)} />
      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
