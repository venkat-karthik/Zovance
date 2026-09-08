import React, { useEffect, useRef, useState } from 'react';

export default function SystemArchitectureVisualizer() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const mousePosRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Define Node Structure (Relative 0 to 1 coordinates)
    const rawNodes = [
      // Central Intelligence Core (Index 0)
      { id: 0, label: 'Central Core', type: 'core', rx: 0.36, ry: 0.50, radius: 32, depth: 1.0 },

      // Primary Cluster Hubs
      { id: 1, label: 'AI Reasoning Core', type: 'hub', rx: 0.18, ry: 0.28, radius: 18, depth: 1.2, tag: 'GPT-4o / Claude' },
      { id: 2, label: 'Voice Intelligence', type: 'hub', rx: 0.62, ry: 0.24, radius: 19, depth: 1.1, tag: 'Sub-second Latency' },
      { id: 3, label: 'Autonomous Workflows', type: 'hub', rx: 0.76, ry: 0.52, radius: 20, depth: 1.3, tag: 'N8N / Custom Engine' },
      { id: 4, label: 'Enterprise Systems', type: 'hub', rx: 0.62, ry: 0.78, radius: 18, depth: 0.9, tag: 'CRM / ERP / Databases' },
      { id: 5, label: 'API Gateway', type: 'hub', rx: 0.22, ry: 0.74, radius: 17, depth: 0.85, tag: 'REST / GraphQL / Webhooks' },

      // Sub-Nodes / Endpoints (AI Agents, Data Streams, Actions)
      { id: 6, label: 'Lead Inbound Stream', type: 'leaf', rx: 0.08, ry: 0.16, radius: 7, depth: 0.7, parent: 1 },
      { id: 7, label: 'Context Memory Vault', type: 'leaf', rx: 0.26, ry: 0.14, radius: 8, depth: 0.8, parent: 1 },
      { id: 8, label: 'Multi-Modal Reasoning', type: 'leaf', rx: 0.07, ry: 0.38, radius: 7, depth: 0.75, parent: 1 },

      { id: 9, label: 'Telephony Pipeline', type: 'leaf', rx: 0.52, ry: 0.12, radius: 8, depth: 0.8, parent: 2 },
      { id: 10, label: 'Real-time Audio Stream', type: 'leaf', rx: 0.76, ry: 0.14, radius: 7, depth: 0.95, parent: 2 },
      { id: 11, label: 'Speech-to-Text Synthesizer', type: 'leaf', rx: 0.86, ry: 0.26, radius: 8, depth: 1.0, parent: 2 },

      { id: 12, label: 'WhatsApp Bot Execution', type: 'leaf', rx: 0.90, ry: 0.44, radius: 8, depth: 1.1, parent: 3 },
      { id: 13, label: 'Stripe Billing Trigger', type: 'leaf', rx: 0.91, ry: 0.62, radius: 7, depth: 0.9, parent: 3 },
      { id: 14, label: 'Google Calendar Scheduler', type: 'leaf', rx: 0.78, ry: 0.68, radius: 8, depth: 0.85, parent: 3 },

      { id: 15, label: 'PostgreSQL DB Cluster', type: 'leaf', rx: 0.72, ry: 0.88, radius: 8, depth: 0.75, parent: 4 },
      { id: 16, label: 'Salesforce / HubSpot Sync', type: 'leaf', rx: 0.50, ry: 0.89, radius: 7, depth: 0.8, parent: 4 },
      { id: 17, label: 'Audit Telemetry Logs', type: 'leaf', rx: 0.38, ry: 0.86, radius: 7, depth: 0.7, parent: 4 },

      { id: 18, label: 'Webhook Event Listener', type: 'leaf', rx: 0.10, ry: 0.82, radius: 7, depth: 0.65, parent: 5 },
      { id: 19, label: 'Auth & Encryption Mesh', type: 'leaf', rx: 0.12, ry: 0.62, radius: 8, depth: 0.75, parent: 5 },
    ];

    // Define Connections (Source -> Target with curvature)
    const connections = [
      // Central Core -> Primary Hubs
      { from: 0, to: 1, curve: -0.15 },
      { from: 0, to: 2, curve: 0.12 },
      { from: 0, to: 3, curve: 0.05 },
      { from: 0, to: 4, curve: -0.08 },
      { from: 0, to: 5, curve: 0.15 },

      // Inter-hub mesh bridges
      { from: 1, to: 2, curve: 0.1 },
      { from: 2, to: 3, curve: -0.1 },
      { from: 3, to: 4, curve: 0.1 },
      { from: 4, to: 5, curve: -0.1 },
      { from: 5, to: 1, curve: 0.12 },

      // Hub -> Sub-nodes
      { from: 1, to: 6, curve: 0.05 },
      { from: 1, to: 7, curve: -0.08 },
      { from: 1, to: 8, curve: 0.1 },
      { from: 2, to: 9, curve: -0.1 },
      { from: 2, to: 10, curve: 0.08 },
      { from: 2, to: 11, curve: -0.05 },
      { from: 3, to: 12, curve: 0.05 },
      { from: 3, to: 13, curve: -0.08 },
      { from: 3, to: 14, curve: 0.1 },
      { from: 4, to: 15, curve: -0.05 },
      { from: 4, to: 16, curve: 0.08 },
      { from: 4, to: 17, curve: -0.1 },
      { from: 5, to: 18, curve: 0.08 },
      { from: 5, to: 19, curve: -0.08 },
    ];

    // Data Stream Traveling Light Pulses
    const pulses = connections.map((conn, idx) => ({
      connectionIdx: idx,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      size: 3.5 + Math.random() * 2,
    }));

    // Ambient Micro Dust Particles
    const dustParticles = Array.from({ length: 45 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      size: 1 + Math.random() * 2,
      alpha: 0.1 + Math.random() * 0.35,
    }));

    // Node Ripple Animations
    let nodeRipples = [];

    // Helper: Compute Bezier Point
    const getBezierPoint = (p0, p1, p2, t) => {
      const invT = 1 - t;
      return {
        x: invT * invT * p0.x + 2 * invT * t * p1.x + t * t * p2.x,
        y: invT * invT * p0.y + 2 * invT * t * p1.y + t * t * p2.y,
      };
    };

    // Main Render Loop
    let startTime = performance.now();

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      // Handle High DPI Canvas Sizing
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Clear & Render Deep Obsidian Environment
      const bgGradient = ctx.createRadialGradient(
        width * 0.36, height * 0.5, 20,
        width * 0.5, height * 0.5, width * 0.8
      );
      bgGradient.addColorStop(0, '#0F172A');
      bgGradient.addColorStop(0.4, '#090D16');
      bgGradient.addColorStop(1, '#05070B');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Smooth Mouse Interactivity Interpolation
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.08;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.08;
      const mouse = mousePosRef.current;

      // Compute Pixel Positions for Nodes with subtle parallax & float
      const nodes = rawNodes.map((n) => {
        const floatX = Math.sin(elapsed * 0.8 + n.id * 1.5) * 4 * n.depth;
        const floatY = Math.cos(elapsed * 0.9 + n.id * 1.2) * 5 * n.depth;
        
        let baseX = n.rx * width + floatX;
        let baseY = n.ry * height + floatY;

        // Mouse Parallax pull
        if (mouse.x > 0) {
          const distToMouse = Math.hypot(mouse.x - baseX, mouse.y - baseY);
          if (distToMouse < 220) {
            const force = (1 - distToMouse / 220) * 12 * n.depth;
            const angle = Math.atan2(mouse.y - baseY, mouse.x - baseX);
            baseX += Math.cos(angle) * force;
            baseY += Math.sin(angle) * force;
          }
        }

        return { ...n, x: baseX, y: baseY };
      });

      // Check Hovered Node for Tooltip
      let hoveredNode = null;
      if (mouse.x > 0) {
        for (const node of nodes) {
          const dist = Math.hypot(mouse.x - node.x, mouse.y - node.y);
          if (dist < node.radius + 8) {
            hoveredNode = node;
            break;
          }
        }
      }

      if (hoveredNode !== activeTooltip) {
        setActiveTooltip(hoveredNode);
      }

      // 2. Render Ambient Background Floating Micro-Particles
      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha * (0.6 + Math.sin(elapsed + p.x * 10) * 0.4)})`;
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Render Precise Connection Lines & Curved Data Pathways
      const connectionPaths = connections.map((conn) => {
        const source = nodes[conn.from];
        const target = nodes[conn.to];

        const midX = (source.x + target.x) / 2;
        const midY = (source.y + target.y) / 2;
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const normalX = -dy * conn.curve;
        const normalY = dx * conn.curve;

        const ctrlX = midX + normalX;
        const ctrlY = midY + normalY;

        const isHovered = hoveredNode && (hoveredNode.id === conn.from || hoveredNode.id === conn.to);

        // Draw Line
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.quadraticCurveTo(ctrlX, ctrlY, target.x, target.y);

        ctx.strokeStyle = isHovered
          ? 'rgba(96, 165, 250, 0.75)'
          : conn.from === 0
          ? 'rgba(59, 130, 246, 0.32)'
          : 'rgba(148, 163, 184, 0.16)';
        ctx.lineWidth = isHovered ? 2 : (conn.from === 0 ? 1.5 : 1);
        ctx.stroke();

        return { source, target, ctrl: { x: ctrlX, y: ctrlY } };
      });

      // 4. Render Traveling Light Pulses (Data Packets)
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          const conn = connections[pulse.connectionIdx];
          const targetNode = nodes[conn.to];
          // Trigger Ripple on arrival
          nodeRipples.push({
            x: targetNode.x,
            y: targetNode.y,
            radius: targetNode.radius,
            maxRadius: targetNode.radius + 22,
            alpha: 0.75,
            color: conn.from === 0 ? '#38BDF8' : '#818CF8',
          });
        }

        const path = connectionPaths[pulse.connectionIdx];
        if (!path) return;

        const pos = getBezierPoint(path.source, path.ctrl, path.target, pulse.progress);
        const prevPos = getBezierPoint(path.source, path.ctrl, path.target, Math.max(0, pulse.progress - 0.05));

        // Light Pulse Trail Gradient
        const trailGrad = ctx.createLinearGradient(prevPos.x, prevPos.y, pos.x, pos.y);
        trailGrad.addColorStop(0, 'rgba(59, 130, 246, 0)');
        trailGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.6)');
        trailGrad.addColorStop(1, '#FFFFFF');

        ctx.beginPath();
        ctx.moveTo(prevPos.x, prevPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = pulse.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glowing Photon Head
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulse.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      });

      // 5. Render Node Arrival Ripples
      nodeRipples = nodeRipples.filter((r) => r.alpha > 0.02);
      nodeRipples.forEach((r) => {
        r.radius += 0.8;
        r.alpha *= 0.94;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.alpha;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      // 6. Render Intelligent Nodes (Core, Hubs, Leaves)
      nodes.forEach((node) => {
        const isHovered = hoveredNode && hoveredNode.id === node.id;

        if (node.type === 'core') {
          // ================= CENTRAL INTELLIGENCE CORE =================
          const pulseScale = 1 + Math.sin(elapsed * 2) * 0.05;
          const r = node.radius * pulseScale;

          // Outer Volumetric Ambient Aura
          const auraGrad = ctx.createRadialGradient(node.x, node.y, 5, node.x, node.y, r * 2.8);
          auraGrad.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
          auraGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.18)');
          auraGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 2.8, 0, Math.PI * 2);
          ctx.fill();

          // Orbiting Dashed Ring 1 (Clockwise)
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(elapsed * 0.4);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([8, 12, 4, 12]);
          ctx.beginPath();
          ctx.arc(0, 0, r * 1.75, 0, Math.PI * 2);
          ctx.stroke();

          // Orbiting Ticks Ring 2 (Counter-Clockwise)
          ctx.rotate(-elapsed * 0.7);
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 15]);
          ctx.beginPath();
          ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Solid Core Sphere
          const coreGrad = ctx.createRadialGradient(
            node.x - r * 0.3, node.y - r * 0.3, 2,
            node.x, node.y, r
          );
          coreGrad.addColorStop(0, '#FFFFFF');
          coreGrad.addColorStop(0.35, '#60A5FA');
          coreGrad.addColorStop(0.75, '#2563EB');
          coreGrad.addColorStop(1, '#1E3A8A');

          ctx.fillStyle = coreGrad;
          ctx.shadowColor = '#3B82F6';
          ctx.shadowBlur = 24;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner Core Pulse Dot
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
          ctx.fill();

        } else if (node.type === 'hub') {
          // ================= PRIMARY CLUSTER HUB =================
          const hubGrad = ctx.createRadialGradient(
            node.x - 3, node.y - 3, 1,
            node.x, node.y, node.radius
          );
          hubGrad.addColorStop(0, '#F0F9FF');
          hubGrad.addColorStop(0.5, isHovered ? '#60A5FA' : '#3B82F6');
          hubGrad.addColorStop(1, '#1E293B');

          ctx.fillStyle = hubGrad;
          ctx.shadowColor = isHovered ? '#60A5FA' : '#3B82F6';
          ctx.shadowBlur = isHovered ? 18 : 8;
          ctx.beginPath();
          ctx.arc(node.x, node.y, isHovered ? node.radius * 1.2 : node.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Outer Ring Border
          ctx.strokeStyle = isHovered ? '#93C5FD' : 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Hub Label underneath
          ctx.fillStyle = isHovered ? '#F8FAFC' : '#CBD5E1';
          ctx.font = `600 ${isHovered ? 12 : 11}px Inter, system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + node.radius + 16);

        } else {
          // ================= PERIPHERAL LEAF NODE =================
          ctx.fillStyle = isHovered ? '#38BDF8' : '#64748B';
          ctx.shadowColor = '#38BDF8';
          ctx.shadowBlur = isHovered ? 12 : 0;
          ctx.beginPath();
          ctx.arc(node.x, node.y, isHovered ? node.radius * 1.3 : node.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.strokeStyle = isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse Tracking Event Listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current.targetX = e.clientX - rect.left;
      mousePosRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mousePosRef.current.targetX = -1000;
      mousePosRef.current.targetY = -1000;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(360px, 42vw, 440px)',
        borderRadius: 24,
        overflow: 'hidden',
        background: '#070A11',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        userSelect: 'none',
      }}
    >
      {/* Top Engineering Status Chrome Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '12px 18px',
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#F59E0B' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#10B981' }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#94A3B8', fontFamily: 'monospace' }}>
            ZOVANCE CORE ARCHITECTURE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: '#34D399', textTransform: 'uppercase' }}>
            SYSTEM ACTIVE
          </span>
        </div>
      </div>

      {/* Main Interactive Ecosystem Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Active Node Floating Tooltip Badge */}
      {activeTooltip && (
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 18,
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          borderRadius: 12,
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          pointerEvents: 'none',
          animation: 'fadeInScale 0.2s ease-out',
          zIndex: 10,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 10px #38BDF8' }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#F8FAFC' }}>{activeTooltip.label}</div>
            <div style={{ fontSize: 10, color: '#94A3B8' }}>{activeTooltip.tag || 'Orchestrated Node Stream'}</div>
          </div>
        </div>
      )}

      {/* Dynamic Bottom Corner Orchestration Tag */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        right: 18,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: '4px 10px',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.06em',
        color: '#64748B',
        pointerEvents: 'none',
        zIndex: 10,
      }}>
        INTELLIGENT ECOSYSTEM VISUALIZER
      </div>
    </div>
  );
}
