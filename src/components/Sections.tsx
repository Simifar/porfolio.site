import { useState, useRef } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { useApp, useInView } from '../lib/context';
import { projects, labProjects } from '../content/projects';
import { ArrowUpRight, ExternalLink, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fade-in wrapper
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// =================== SELECTED WORK ===================
export function SelectedWork() {
  const { t } = useApp();

  return (
    <section id="work" className="relative px-6 md:px-12 lg:px-20 py-32 md:py-40">
      <div className="max-w-[1600px] mx-auto">
        <FadeIn>
          <p className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider uppercase mb-4">
            {t.work.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-16">
            {t.work.title}
          </h2>
        </FadeIn>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* TaskFocus - large */}
          <FadeIn delay={0.1} className="md:col-span-12">
            <ProjectCard project={projects[0]} variant="large" />
          </FadeIn>

          {/* CortexMap + Mindtrack */}
          <FadeIn delay={0.2} className="md:col-span-7">
            <ProjectCard project={projects[1]} variant="medium" />
          </FadeIn>
          <FadeIn delay={0.3} className="md:col-span-5">
            <ProjectCard project={projects[2]} variant="small" />
          </FadeIn>

          {/* EnglishPath + Growth Analytics */}
          <FadeIn delay={0.2} className="md:col-span-5">
            <ProjectCard project={projects[3]} variant="medium" />
          </FadeIn>
          <FadeIn delay={0.3} className="md:col-span-7">
            <ProjectCard project={projects[4]} variant="medium" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, variant }: { project: typeof projects[0]; variant: 'large' | 'medium' | 'small' }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const heights = {
    large: 'h-[350px] md:h-[450px]',
    medium: 'h-[280px] md:h-[350px]',
    small: 'h-[280px] md:h-[350px]',
  };

  return (
    <Link
      to={`/work/${project.slug}`}
      onMouseMove={handleMouseMove}
      className={`card-spotlight border-light group relative block ${heights[variant]} rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden transition-all duration-300 hover:border-[var(--color-border-hover)]`}
      style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` } as React.CSSProperties}
    >
      {/* Background gradient based on project */}
      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(124, 140, 255, 0.08) 0%, transparent 50%)`
        }}
      />

      {/* Abstract visual element */}
      <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          {variant === 'large' ? (
            <>
              <circle cx="40" cy="40" r="30" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.5" />
              <circle cx="40" cy="40" r="20" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.3" />
              <circle cx="40" cy="40" r="10" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.2" />
              <circle cx="40" cy="25" r="3" fill="var(--color-accent)" opacity="0.4" />
              <circle cx="55" cy="40" r="2" fill="var(--color-accent)" opacity="0.3" />
              <circle cx="30" cy="50" r="2.5" fill="var(--color-accent)" opacity="0.35" />
              <line x1="40" y1="25" x2="55" y2="40" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.3" />
              <line x1="55" y1="40" x2="30" y2="50" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.3" />
            </>
          ) : (
            <>
              <circle cx="40" cy="40" r="25" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.4" />
              <circle cx="30" cy="30" r="3" fill="var(--color-accent)" opacity="0.3" />
              <circle cx="50" cy="45" r="2" fill="var(--color-accent)" opacity="0.25" />
              <line x1="30" y1="30" x2="50" y2="45" stroke="var(--color-accent)" strokeWidth="0.3" opacity="0.2" />
            </>
          )}
        </svg>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
        {/* Top */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase">
              {project.category}
            </span>
            {project.status && (
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-accent)]">
                <Circle className="w-2 h-2 fill-current" />
                {project.status}
              </span>
            )}
          </div>
          <h3 className={`font-bold tracking-[-0.01em] ${variant === 'large' ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)] max-w-md">
            {project.subtitle}
          </p>
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, variant === 'large' ? 4 : 3).map(tag => (
              <span key={tag} className="px-2.5 py-1 text-[10px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* View case link */}
          <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            View case <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// =================== STATEMENT ===================
export function Statement() {
  const { t } = useApp();
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-32 md:py-48">
      <div className="max-w-[1000px] mx-auto text-center">
        <FadeIn>
          <p className="text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-[-0.02em] text-[var(--color-text-primary)]">
            {t.statement.line1}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 text-xl md:text-2xl lg:text-3xl font-light leading-[1.3] tracking-[-0.01em] text-[var(--color-text-secondary)]">
            {t.statement.line2}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// =================== HOW I WORK ===================
export function HowIWork() {
  const { t } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="how-i-work" className="relative px-6 md:px-12 lg:px-20 py-32 md:py-40" ref={sectionRef}>
      <div className="max-w-[1600px] mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4">
            {t.howIWork.title}
          </h2>
        </FadeIn>

        {/* Pipeline */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.howIWork.steps.map((step, i) => (
            <FadeIn key={step.name} delay={i * 0.1}>
              <div className="group relative p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-hover)] transition-all duration-300">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-[var(--color-accent)]">
                    0{i + 1}
                  </span>
                  <div className="h-px flex-1 bg-[var(--color-border)]" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.name}</h3>

                <ul className="space-y-2">
                  {step.items.map(item => (
                    <li key={item} className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]/50" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Connection line to next */}
                {i < t.howIWork.steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-[var(--color-border)]" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Visual pipeline */}
        <FadeIn delay={0.3}>
          <div className="mt-16 flex items-center justify-center gap-2 flex-wrap">
            {t.howIWork.steps.map((step, i) => (
              <div key={step.name} className="flex items-center gap-2">
                <span className="px-3 py-1.5 text-xs font-mono text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-full">
                  {step.name}
                </span>
                {i < t.howIWork.steps.length - 1 && (
                  <span className="text-[var(--color-text-muted)]">→</span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// =================== CAPABILITIES ===================
export function Capabilities() {
  const { t } = useApp();

  return (
    <section id="capabilities" className="relative px-6 md:px-12 lg:px-20 py-32 md:py-40">
      <div className="max-w-[1600px] mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-16">
            {t.capabilities.title}
          </h2>
        </FadeIn>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.capabilities.categories.map((cat, i) => (
            <FadeIn key={cat.name} delay={i * 0.1}>
              <div className={`card-spotlight group relative p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-hover)] transition-all duration-300 ${
                i === 0 ? 'lg:row-span-2 lg:col-span-1' : ''
              }`}
              style={{ '--mouse-x': '50%', '--mouse-y': '50%' } as React.CSSProperties}
              >
                {/* Category icon/visual */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  {i === 0 && (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="4" y="4" width="10" height="10" rx="2" stroke="var(--color-accent)" strokeWidth="1" />
                      <rect x="18" y="4" width="10" height="10" rx="2" stroke="var(--color-accent)" strokeWidth="1" />
                      <rect x="4" y="18" width="10" height="10" rx="2" stroke="var(--color-accent)" strokeWidth="1" />
                      <rect x="18" y="18" width="10" height="10" rx="2" stroke="var(--color-accent)" strokeWidth="1" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M4 28 L16 4 L28 28" stroke="var(--color-accent)" strokeWidth="1" fill="none" />
                      <line x1="8" y1="20" x2="24" y2="20" stroke="var(--color-accent)" strokeWidth="1" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M4 8 L28 8 L22 16 L28 24 L4 24 L10 16 Z" stroke="var(--color-accent)" strokeWidth="1" fill="none" />
                    </svg>
                  )}
                  {i === 3 && (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="12" stroke="var(--color-accent)" strokeWidth="1" />
                      <path d="M16 8 L16 16 L22 16" stroke="var(--color-accent)" strokeWidth="1" />
                    </svg>
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                  {cat.name}
                </h3>
                <div className="space-y-2.5 stagger-children">
                  {cat.items.map(item => (
                    <div key={item} className="text-sm text-[var(--color-text-secondary)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Tools */}
        <FadeIn delay={0.3}>
          <div className="mt-16 pt-16 border-t border-[var(--color-border)]">
            <p className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider uppercase mb-6">
              Tools
            </p>
            <div className="flex flex-wrap gap-3">
              {t.tools.map(tool => (
                <span key={tool} className="px-3 py-1.5 text-xs font-mono text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-secondary)] transition-all">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// =================== AI WORKFLOW ===================
export function AIWorkflow() {
  const { t } = useApp();

  return (
    <section id="ai-workflow" className="relative px-6 md:px-12 lg:px-20 py-32 md:py-40">
      {/* Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,140,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4">
            {t.aiWorkflow.title}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mb-16">
            {t.aiWorkflow.subtitle}
          </p>
        </FadeIn>

        {/* Workflow visualization */}
        <FadeIn delay={0.2}>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)]/30 via-[var(--color-border)] to-[var(--color-accent)]/30" />

            <div className="space-y-6">
              {t.aiWorkflow.steps.map((step, i) => (
                <FadeIn key={step} delay={i * 0.05}>
                  <div className={`relative flex items-center gap-6 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Node */}
                    <div className="absolute left-[20px] md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)] z-10 group-hover:scale-125 transition-transform" />

                    {/* Glow on node */}
                    <div className="absolute left-[20px] md:left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 top-1/2 rounded-full bg-[var(--color-accent)]/10 pointer-events-none" />

                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${
                      i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'
                    }`}>
                      <div className="inline-flex items-center gap-3">
                        <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="inline-block px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent)]/30 transition-colors">
                          {step}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// =================== EXPERIENCE ===================
export function Experience() {
  const { t } = useApp();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="experience" className="relative px-6 md:px-12 lg:px-20 py-32 md:py-40">
      <div className="max-w-[1000px] mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-16">
            {t.experience.title}
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {t.experience.items.map((exp, i) => (
            <FadeIn key={exp.company} delay={i * 0.1}>
              <div className="border-t border-[var(--color-border)] last:border-b">
                <button
                  onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                  aria-expanded={expandedIdx === i}
                >
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      {exp.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[var(--color-text-muted)]">
                      {exp.period}
                    </span>
                    <motion.span
                      animate={{ rotate: expandedIdx === i ? 45 : 0 }}
                      className="text-[var(--color-text-muted)] text-xl"
                    >
                      +
                    </motion.span>
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIdx === i ? 'auto' : 0,
                    opacity: expandedIdx === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="pb-6 space-y-2">
                    {exp.highlights.map(h => (
                      <li key={h} className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]/50" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== LAB ===================
export function Lab() {
  const { t } = useApp();

  return (
    <section id="lab" className="relative px-6 md:px-12 lg:px-20 py-32 md:py-40">
      <div className="max-w-[1600px] mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-4">
            {t.lab.title}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-16">
            {t.lab.subtitle}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labProjects.map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.05}>
              <div className="group p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-hover)] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                    item.status === 'Active'
                      ? 'text-green-400 bg-green-400/10'
                      : 'text-yellow-400 bg-yellow-400/10'
                  }`}>
                    {item.status}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                    #{String(i + 1).padStart(3, '0')}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== ABOUT ===================
export function About() {
  const { t } = useApp();

  return (
    <section id="about" className="relative px-6 md:px-12 lg:px-20 py-32 md:py-40">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em]">
              {t.about.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              {t.about.text.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// =================== CONTACT ===================
export function Contact() {
  const { t } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Matafonovegor2@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative px-6 md:px-12 lg:px-20 py-32 md:py-48">
      <div className="aura-footer" />
      <div className="max-w-[1000px] mx-auto text-center relative">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-[-0.02em] mb-4">
            {t.contact.title}
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-12">
            {t.contact.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleCopyEmail}
              className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full text-sm font-medium hover:bg-[var(--color-accent)]/90 transition-colors"
            >
              {copied ? 'Copied!' : t.contact.emailBtn}
            </button>
            <a
              href="https://t.me/legionanstek"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] rounded-full text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] transition-all"
            >
              {t.contact.telegramBtn}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
            <a href="mailto:Matafonovegor2@gmail.com" className="link-underline hover:text-[var(--color-text-secondary)] transition-colors">
              Matafonovegor2@gmail.com
            </a>
            <span className="text-[var(--color-border)]">·</span>
            <a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer" className="link-underline hover:text-[var(--color-text-secondary)] transition-colors">
              @legionanstek
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// =================== FOOTER ===================
export function Footer() {
  const { t } = useApp();

  return (
    <footer className="relative px-6 md:px-12 lg:px-20 py-12 pb-24 md:pb-12 border-t border-[var(--color-border)]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="text-sm text-[var(--color-text-muted)]">
            {t.footer.copyright}
          </span>
          <span className="text-sm text-[var(--color-text-muted)] hidden md:inline">
            {t.footer.built}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors link-underline">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors link-underline">
            LinkedIn
          </a>
          <a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors link-underline">
            Telegram
          </a>
        </div>

        {/* Signature graph line */}
        <svg width="120" height="20" viewBox="0 0 120 20" className="hidden md:block opacity-30">
          <circle cx="10" cy="10" r="2" fill="var(--color-accent)" opacity="0.5" />
          <line x1="12" y1="10" x2="38" y2="10" stroke="var(--color-border)" strokeWidth="0.5" />
          <circle cx="40" cy="10" r="2" fill="var(--color-accent)" opacity="0.5" />
          <line x1="42" y1="10" x2="68" y2="10" stroke="var(--color-border)" strokeWidth="0.5" />
          <circle cx="70" cy="10" r="2" fill="var(--color-accent)" opacity="0.5" />
          <line x1="72" y1="10" x2="98" y2="10" stroke="var(--color-border)" strokeWidth="0.5" />
          <circle cx="100" cy="10" r="2" fill="var(--color-accent)" opacity="0.5" />
          <line x1="102" y1="10" x2="118" y2="10" stroke="var(--color-border)" strokeWidth="0.5" />
        </svg>
      </div>
    </footer>
  );
}
