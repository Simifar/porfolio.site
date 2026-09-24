import { motion } from 'framer-motion';
import { ArrowUpRight, Circle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../content/projects';
import { useApp, useInView } from '../lib/context';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function SelectedWork() {
  const { t, lang } = useApp();

  return (
    <section id="work" className="relative scroll-mt-24 px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t.work.subtitle}</p>
          <h2 className="mb-12 text-4xl font-bold tracking-[-0.02em] md:mb-16 md:text-5xl lg:text-6xl">{t.work.title}</h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.06} className={index === 0 ? 'md:col-span-2' : ''}>
              <Link
                to={`/work/${project.slug}`}
                className="card-spotlight border-light group relative flex min-h-[290px] h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-colors hover:border-[var(--color-border-hover)] md:min-h-[320px] md:p-8"
                aria-label={`${t.work.viewCase}: ${project.name}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(124,140,255,0.10),transparent_38%)] opacity-70 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{project.category[lang]}</span>
                    {project.status && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-accent)]">
                        <Circle className="h-2 w-2 fill-current" aria-hidden="true" />
                        {project.status[lang]}
                      </span>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">{project.name}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">{project.subtitle[lang]}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--color-text-muted)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                </div>
                <div className="relative mt-10 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[10px] font-mono text-[var(--color-text-muted)]">{tag}</span>
                  ))}
                  {project.live && (
                    <span className="ml-auto inline-flex items-center gap-1.5 self-center text-xs text-[var(--color-accent)]">
                      {lang === 'en' ? 'Open site' : 'Открыть сайт'}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  )}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Statement() {
  const { t } = useApp();

  return (
    <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <FadeIn className="mx-auto max-w-[1100px] border-y border-[var(--color-border)] py-10 md:py-14">
        <p className="max-w-4xl text-2xl font-semibold leading-snug tracking-[-0.025em] md:text-4xl">{t.statement.line1}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">{t.statement.line2}</p>
      </FadeIn>
    </section>
  );
}

export function About() {
  const { t } = useApp();

  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <FadeIn><h2 className="text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{t.about.title}</h2></FadeIn>
        <FadeIn delay={0.08}>
          <div className="space-y-5">
            {t.about.text.map(paragraph => <p key={paragraph} className="text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">{paragraph}</p>)}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useApp();

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-24 md:px-12 md:py-36 lg:px-20">
      <div className="aura-footer" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1000px] text-center">
        <FadeIn>
          <h2 className="text-4xl font-bold tracking-[-0.03em] md:text-5xl lg:text-7xl">{t.contact.title}</h2>
          <p className="mb-10 mt-5 text-lg text-[var(--color-text-secondary)] md:text-xl">{t.contact.subtitle}</p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:Matafonovegor2@gmail.com" className="magnetic-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-on-accent)] transition-colors hover:opacity-90">
              {t.contact.emailBtn}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer" className="magnetic-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]">
              {t.contact.telegramBtn}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="mt-8 break-all text-sm text-[var(--color-text-muted)]">
            <a href="mailto:Matafonovegor2@gmail.com" className="link-underline hover:text-[var(--color-text-secondary)]">Matafonovegor2@gmail.com</a>
            <span className="px-3" aria-hidden="true">·</span>
            <a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer" className="link-underline hover:text-[var(--color-text-secondary)]">@legionanstek</a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useApp();

  return (
    <footer className="border-t border-[var(--color-border)] px-6 py-8 pb-28 md:px-12 md:py-10 md:pb-10 lg:px-20">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <div>
          <p className="text-sm text-[var(--color-text-muted)]">{t.footer.copyright.replace('{year}', String(new Date().getFullYear()))}</p>
          <p className="mt-1 hidden text-xs text-[var(--color-text-muted)] md:block">{t.footer.built}</p>
        </div>
        <nav aria-label="Social links" className="flex flex-wrap items-center justify-center gap-5">
          <a href="https://github.com/Simifar" target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">GitHub</a>
          <a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">Telegram</a>
          <a href="mailto:Matafonovegor2@gmail.com" className="link-underline text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">Email</a>
        </nav>
      </div>
    </footer>
  );
}
