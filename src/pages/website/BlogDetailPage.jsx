import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ArrowRight, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import WebsiteNav from '../../components/WebsiteNav';
import WebsiteFooter from '../../components/WebsiteFooter';
import BookingModal from '../../components/BookingModal';
import ClosingCtaBanner from '../../components/ClosingCtaBanner';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: '#FFFFFF', color: '#102C42', minHeight: '100vh', overflowX: 'hidden' }}>
      <WebsiteNav />

      <section style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 32px)',
      }}>
        <Link
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            fontWeight: 700,
            color: '#526673',
            textDecoration: 'none',
            marginBottom: 32,
            background: '#F2FAFD',
            border: '1px solid #DCE9EE',
            padding: '6px 16px',
            borderRadius: 999,
          }}
        >
          <ArrowLeft size={15} />
          <span>Back to all articles</span>
        </Link>

        <div style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '0.12em',
          color: '#38A85B',
          textTransform: 'uppercase',
          marginBottom: 12
        }}>
          AI ENGINEERING ARCHITECTURE GUIDE
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 46px)',
          fontWeight: 800,
          color: '#102C42',
          lineHeight: 1.15,
          marginBottom: 20,
          letterSpacing: '-0.025em'
        }}>
          Autonomous AI Agents vs Traditional Chatbots: What Businesses Need to Know
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize: 13,
          color: '#526673',
          marginBottom: 40,
          borderBottom: '1px solid #DCE9EE',
          paddingBottom: 20,
          flexWrap: 'wrap'
        }}>
          <span style={{ fontWeight: 700, color: '#102C42' }}>By Zovance Engineering Team</span>
          <span>•</span>
          <span>Sep 02, 2026</span>
          <span>•</span>
          <span>5 min read</span>
        </div>

        <div style={{ fontSize: 16, color: '#526673', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p style={{ fontSize: 18, color: '#102C42', fontWeight: 500, lineHeight: 1.6 }}>
            The artificial intelligence landscape has undergone a paradigm shift. While rule-based chatbots dominated earlier customer service solutions, <strong>Autonomous AI Agents</strong> are now replacing entire manual workflows across forward-thinking enterprises.
          </p>

          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', marginTop: 16 }}>
            1. Rule-Based Chatbots vs Autonomous Reasoning
          </h2>

          <p>
            Traditional chatbots follow strict, predetermined decision trees. If a customer query deviates by a single word or asks a question not in the predefined script, the bot fails, loops, or triggers an unhelpful fallback message.
          </p>

          <p>
            In contrast, autonomous AI agents leverage Large Language Models (LLMs) paired with vector search (RAG) and live API tool execution to understand intent, query your databases in real-time, and resolve requests independently without human intervention.
          </p>

          <div style={{
            background: '#F2FAFD',
            border: '1px solid #DCE9EE',
            borderRadius: 24,
            padding: '28px 32px',
            margin: '16px 0',
            boxShadow: '0 4px 16px rgba(16, 44, 66, 0.03)'
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#102C42', marginBottom: 14 }}>
              Key Differences at a Glance:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <CheckCircle2 size={18} color="#38A85B" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, color: '#102C42' }}>
                  <strong>Scripted Chatbots:</strong> Static decision trees, no memory across sessions, inflexible syntax, high maintenance burden.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <CheckCircle2 size={18} color="#38A85B" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, color: '#102C42' }}>
                  <strong>Autonomous AI Agents:</strong> Real-time API execution, multi-modal voice & text, autonomous error handling, self-improving prompt loops.
                </span>
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#102C42', marginTop: 16 }}>
            2. How Businesses Are Achieving 5x ROI
          </h2>

          <p>
            Enterprises deploying custom AI agents report substantial reductions in operational response latency and labor costs. By offloading Tier-1 inquiries, schedule bookings, and data entry onto autonomous pipelines, team members can focus on closing deals and serving high-value clients.
          </p>

          <div style={{
            marginTop: 24,
            padding: 28,
            background: '#FFFFFF',
            border: '2px solid #102C42',
            borderRadius: 24,
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#102C42', marginBottom: 10 }}>
              Ready to Upgrade Your Operations to Autonomous AI?
            </h3>
            <p style={{ fontSize: 14, color: '#526673', marginBottom: 20, maxWidth: 500, margin: '0 auto 20px' }}>
              Speak directly with a Zovance solutions architect to design a bespoke automation roadmap for your company.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="btn-zovance-primary"
              style={{
                padding: '12px 28px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
            >
              <span>Book System Discovery Call</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <ClosingCtaBanner onBookCall={() => setBookingOpen(true)} />
      <WebsiteFooter />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
