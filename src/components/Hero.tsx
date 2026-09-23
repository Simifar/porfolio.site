import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../lib/context';
import { ArrowDown, Mail } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
  subNodes?: { label: string; x: number; y: number }[];
}

const graphNodes: GraphNode[] = [
  { id: 'idea', label: 'Idea', x: 50, y: 30, connections: ['research', 'define'], subNodes: [{ label: 'Problem', x: 20, y: 15 }, { label: 'Vision', x: 80, y: 20 }] },
  { id: 'research', label: 'Research', x: 20, y: 50, connections: ['define', 'idea'], subNodes: [{ label: 'CustDev', x: 5, y: 40 }, { label: 'Market', x: 10, y: 65 }, { label: 'Data', x: 30, y: 70 }] },
  { id: 'define', label: 'Define', x: 45, y: 55, connections: ['build', 'research'], subNodes: [{ label: 'Specs', x: 35, y: 45 }, { label: 'Flows', x: 55, y: 45 }] },
  { id: 'build', label: 'Build', x: 70, y: 45, connections: ['ship', 'define'], subNodes: [{ label: 'UX', x: 80, y: 30 }, { label: 'AI', x: 85, y: 50 }, { label: 'Code', x: 75, y: 60 }] },
  { id: 'ship', label: 'Ship', x: 80, y: 70, connections: ['measure', 'build'], subNodes: [{ label: 'QA', x: 90, y: 65 }, { label: 'Launch', x: 85, y: 80 }] },
  { id: 'measure', label: 'Measure', x: 55, y: 80, connections: ['iterate', 'ship'], subNodes: [{ label: 'Metrics', x: 45, y: 90 }, { label: 'Funnel', x: 60, y: 92 }, { label: 'Feedback', x: 70, y: 88 }] },
  { id: 'iterate', label: 'Iterate', x: 30, y: 78, connections: ['idea', 'measure'], subNodes: [{ label: 'Hypotheses', x: 15, y: 85 }, { label: 'Experiments', x: 35, y: 90 }] },
];

function ProductGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMouseOffset({ x, y });
  }, []);

  const getConnectedNodes = (nodeId: string): string[] => {
    const node = graphNodes.find(n => n.id === nodeId);
    if (!node) return [];
    return node.connections;
  };

  const isHighlighted = (nodeId: string): boolean => {
    if (!hoveredNode) return true;
    if (nodeId === hoveredNode) return true;
    return getConnectedNodes(hoveredNode).includes(nodeId);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[400px] md:h-[500px] lg:h-[550px]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ transform: `translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px)` }}
      >
        {/* Connections */}
        {graphNodes.map(node =>
          node.connections.map(connId => {
            const target = graphNodes.find(n => n.id === connId);
            if (!target) return null;
            const highlighted = hoveredNode
              ? (node.id === hoveredNode || connId === hoveredNode)
              : true;
            return (
              <line
                key={`${node.id}-${connId}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke={highlighted ? 'rgba(124, 140, 255, 0.3)' : 'rgba(124, 140, 255, 0.05)'}
                strokeWidth="0.2"
                className="transition-all duration-500"
              />
            );
          })
        )}

        {/* Nodes */}
        {graphNodes.map(node => {
          const highlighted = isHighlighted(node.id);
          const isHovered = hoveredNode === node.id;
          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
              style={{
                transform: `translate(${mouseOffset.x * 0.1}px, ${mouseOffset.y * 0.1}px)`,
              }}
            >
              {/* Glow */}
              {isHovered && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="4"
                  fill="rgba(124, 140, 255, 0.1)"
                  className="animate-pulse"
                />
              )}
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? 2.2 : 1.8}
                fill={highlighted ? 'rgba(124, 140, 255, 0.8)' : 'rgba(124, 140, 255, 0.2)'}
                stroke={highlighted ? 'rgba(124, 140, 255, 0.6)' : 'rgba(124, 140, 255, 0.1)'}
                strokeWidth="0.3"
                className="transition-all duration-300"
              />
              {/* Label */}
              <text
                x={node.x}
                y={node.y + (node.y > 60 ? 5 : -4)}
                textAnchor="middle"
                  fill={highlighted ? 'var(--color-text-primary)' : 'var(--color-text-muted)'}
                fontSize="2.2"
                fontFamily="Inter, sans-serif"
                fontWeight={isHovered ? 500 : 400}
                className="transition-all duration-300 select-none"
              >
                {node.label}
              </text>

              {/* Sub-nodes on hover */}
              <AnimatePresence>
                {isHovered && node.subNodes && node.subNodes.map((sub, i) => (
                  <g key={i}>
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={sub.x}
                      y2={sub.y}
                      stroke="rgba(124, 140, 255, 0.2)"
                      strokeWidth="0.15"
                      strokeDasharray="0.5 0.5"
                    />
                    <circle
                      cx={sub.x}
                      cy={sub.y}
                      r="0.8"
                      fill="rgba(124, 140, 255, 0.4)"
                    />
                    <text
                      x={sub.x}
                      y={sub.y + 2.5}
                      textAnchor="middle"
                      fill="var(--color-text-secondary)"
                      fontSize="1.5"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {sub.label}
                    </text>
                  </g>
                ))}
              </AnimatePresence>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Hero() {
  const { t } = useApp();

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden" id="hero">
      {/* Auras */}
      <div className="aura-hero" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(124,140,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-24 pb-40 lg:py-0">
        {/* Left: Text */}
        <div className="relative z-10">
          {/* System label */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider uppercase mb-8"
          >
            Egor Matafonov
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] xl:text-[110px] font-bold leading-[0.9] tracking-[-0.03em]"
            >
              {t.hero.headline}
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-2">
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] xl:text-[110px] font-bold leading-[0.9] tracking-[-0.03em] text-[var(--color-accent)]"
            >
              {t.hero.headlineAccent}
            </motion.p>
          </div>

          {/* Supporting text */}
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-base md:text-lg text-[var(--color-text-secondary)] max-w-lg leading-relaxed whitespace-pre-line"
          >
            {t.hero.supporting}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
              className="magnetic-btn inline-flex items-center gap-2 min-h-11 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-on-accent)] rounded-full text-sm font-medium hover:opacity-90 transition-colors"
            >
              {t.hero.cta}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
              className="link-underline inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {t.hero.contactLink}
            </button>
          </motion.div>
        </div>

        {/* Right: Product Graph */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:block hidden"
        >
          <ProductGraph />
        </motion.div>

        {/* Mobile: Simplified graph */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 hidden min-[430px]:block lg:hidden"
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {['Idea', 'Research', 'Build', 'Ship', 'Measure', 'Iterate'].map((node, i) => (
              <motion.div
                key={node}
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]/40 border border-[var(--color-accent)]/60" />
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{node}</span>
                {i < 5 && <span className="text-[var(--color-text-muted)]/30">—</span>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-[var(--color-border)] rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-[var(--color-text-muted)] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
