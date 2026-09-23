import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../content/projects';
import { useApp, useInView } from '../lib/context';
import { ArrowUpRight, ArrowLeft, ExternalLink, Circle } from 'lucide-react';
import { Footer } from './Sections';

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

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-[var(--color-text-secondary)] mb-8">Project not found.</p>
          <Link to="/" className="text-[var(--color-accent)] hover:underline">Back to portfolio</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen">
      {/* Back nav */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Hero */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider uppercase">
                {project.category}
              </span>
              {project.status && (
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-accent)]">
                  <Circle className="w-2 h-2 fill-current" />
                  {project.status}
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] mb-6">
              {project.name}
            </h1>

            <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-2xl mb-12">
              {project.description}
            </p>

            {/* Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-[var(--color-border)]">
              {project.role && (
                <div>
                  <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Role</p>
                  <p className="text-sm text-[var(--color-text-primary)]">{project.role}</p>
                </div>
              )}
              {project.year && (
                <div>
                  <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Year</p>
                  <p className="text-sm text-[var(--color-text-primary)]">{project.year}</p>
                </div>
              )}
              <div>
                <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Scope</p>
                <p className="text-sm text-[var(--color-text-primary)]">{project.tags.join(', ')}</p>
              </div>
              {(project.github || project.live) && (
                <div>
                  <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Links</p>
                  <div className="flex gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1">
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Visual placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 aspect-[16/9] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] flex items-center justify-center overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent" />
            <span className="font-mono text-sm text-[var(--color-text-muted)]">{project.name} — Visual</span>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      {project.problem && (
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
            <FadeIn>
              <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider">
                01 / Problem
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] leading-relaxed">
                {project.problem}
              </p>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Product Decisions */}
      {project.decisions && project.decisions.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32 border-t border-[var(--color-border)]">
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider">
                04 / Product decisions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mt-4 mb-12">
                Key decisions
              </h2>
            </FadeIn>

            <div className="space-y-8">
              {project.decisions.map((d, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                    <div>
                      <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Problem</p>
                      <p className="text-sm text-[var(--color-text-primary)]">{d.problem}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-wider mb-2">Decision</p>
                      <p className="text-sm text-[var(--color-text-primary)]">{d.decision}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Why</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{d.why}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Building */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <FadeIn>
            <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider">
              05 / Building
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-4">
              <p className="text-lg text-[var(--color-text-secondary)]">
                Product specification → Information architecture → UX design → Development → Testing → Iteration
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 text-xs font-mono text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Result */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
          <FadeIn>
            <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider">
              06 / Result
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-3">
              <p className="text-lg text-[var(--color-text-primary)]">✓ MVP built and functional</p>
              <p className="text-lg text-[var(--color-text-secondary)]">Core workflow implemented</p>
              <p className="text-lg text-[var(--color-text-secondary)]">Interface designed and iterated</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Reflection */}
      {project.reflection && project.reflection.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 py-20 md:py-32 border-t border-[var(--color-border)]">
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-12">
                What I'd improve next
              </h2>
            </FadeIn>

            <div className="space-y-6">
              {project.reflection.map((r, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                    <div>
                      <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Current limitation</p>
                      <p className="text-sm text-[var(--color-text-primary)]">{r.limitation}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-[var(--color-accent)] uppercase tracking-wider mb-2">Next hypothesis</p>
                      <p className="text-sm text-[var(--color-text-primary)]">{r.hypothesis}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Next experiment</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{r.experiment}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next project */}
      <section className="px-6 md:px-12 lg:px-20 py-32 md:py-40 border-t border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <Link
              to={`/work/${nextProject.slug}`}
              className="group block"
            >
              <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-wider uppercase mb-4 block">
                Next project
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] group-hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-4">
                {nextProject.name}
                <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 opacity-0 group-hover:opacity-100 -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                {nextProject.subtitle}
              </p>
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </article>
  );
}
