import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ArrowRight, MessageCircle } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FBFBF9', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      <section style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 24px)',
      }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: '#64748B', textDecoration: 'none', marginBottom: 32 }}>
          <ArrowLeft size={16} />
          <span>Back to all articles</span>
        </Link>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#2563EB', textTransform: 'uppercase', marginBottom: 12 }}>
          AI ENGINEERING GUIDE
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 800,
          color: '#0F172A',
          lineHeight: 1.15,
          marginBottom: 20,
        }}>
          Autonomous AI Agents vs Traditional Chatbots: What Businesses Need to Know
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#64748B', marginBottom: 40, borderBottom: '1px solid #E2E8F0', paddingBottom: 20 }}>
          <span>By Zovance Engineering Team</span>
          <span>•</span>
          <span>Sep 02, 2026</span>
          <span>•</span>
          <span>5 min read</span>
        </div>

        <div style={{ fontSize: 16, color: '#334155', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p>
            The artificial intelligence landscape has undergone a paradigm shift over the past 12 months. While rule-based chatbots dominated the early 2020s, <strong>Autonomous AI Agents</strong> are now replacing manual operations across forward-thinking enterprises.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginTop: 12 }}>
            1. Rule-Based Chatbots vs Autonomous Reasoning
          </h2>

          <p>
            Traditional chatbots follow strict decision trees. If a customer query deviates by a single phrase, the bot fails and triggers an annoying generic response.
          </p>

          <p>
            In contrast, autonomous AI agents leverage Large Language Models (LLMs) paired with vector search (RAG) and API tools to understand intent, query databases live, and resolve requests independently.
          </p>

          <div style={{ background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 20, padding: 28, margin: '16px 0' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>
              Key Differences at a Glance:
            </h3>
            <ul style={{ listStyle: 'disc', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><strong>Scripted Chatbots:</strong> Static decision trees, no memory across sessions, manual template updates.</li>
              <li><strong>AI Agents:</strong> Real-time API execution, multi-modal voice & text, autonomous error recovery.</li>
            </ul>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', marginTop: 12 }}>
            2. How Businesses Are Achieving 5x ROI
          </h2>

          <p>
            By integrating AI agents into WhatsApp, web portals, and voice phone lines, businesses eliminate repetitive qualification tasks while operating 24/7 with zero downtime.
          </p>
        </div>

        {/* Bottom CTA Banner */}
        <div style={{ background: '#0F172A', color: '#ffffff', borderRadius: 24, padding: 36, marginTop: 56, textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Ready to Deploy AI Agents in Your Business?</h3>
          <p style={{ fontSize: 14, color: '#94A3B8', maxWidth: 480, margin: '0 auto 24px' }}>
            Book a 30-min discovery call to see how custom AI workflows can scale your ops.
          </p>
          <button className="btn-dark-pill" onClick={() => setBookingOpen(true)} style={{ background: '#ffffff', color: '#0F172A' }}>
            <span>Book Free Strategy Call</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
