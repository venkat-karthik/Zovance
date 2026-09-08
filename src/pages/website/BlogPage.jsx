import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
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
    excerpt: 'How leading e-commerce and hospitality brands automate lead qualification and booking workflows directly inside WhatsApp.',
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
    <div style={{ background: '#FBFBF9', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      {/* Header */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(50px, 8vw, 90px) clamp(16px, 4vw, 36px) clamp(30px, 4vw, 50px)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#64748B', textTransform: 'uppercase', marginBottom: 16 }}>
          INSIGHTS & GUIDES
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#0F172A',
          lineHeight: 1.05,
          marginBottom: 24,
        }}>
          AI Automation & Engineering<br />
          <span className="impact-gradient font-serif" style={{ fontStyle: 'italic' }}>Knowledge Hub</span>
        </h1>
        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#475569',
          maxWidth: 580,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          In-depth architectural guides, automation blueprints, and case studies written by our engineering team.
        </p>
      </section>

      {/* Articles Grid */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 36px) clamp(60px, 8vw, 100px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 28,
        }}>
          {articles.map((art) => (
            <div
              key={art.id}
              style={{
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2563EB', padding: '4px 10px', background: '#DBEAFE', borderRadius: 999 }}>
                    {art.category}
                  </span>
                  <span style={{ fontSize: 12, color: '#64748B' }}>
                    {art.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 12, lineHeight: 1.3 }}>
                  {art.title}
                </h3>

                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 24 }}>
                  {art.excerpt}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#64748B' }}>{art.date}</span>
                <Link
                  to={`/blog/${art.id}`}
                  style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} />
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
