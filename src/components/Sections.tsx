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
  const featured = projects.filter(project => project.presentation === 'featured');
  const additional = projects.filter(project => project.presentation === 'additional');

  const renderActions = (project: (typeof projects)[number]) => (
    <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-6">
      <Link
        to={`/work/${project.slug}`}
        aria-label={`${t.work.viewCase}: ${project.name}`}
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-text-primary)]"
      >
        {t.work.viewCase}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center gap-1.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
      >
        {t.work.repository}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          {t.work.openProduct}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
    </div>
  );

  return (
    <section id="work" className="relative scroll-mt-24 px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t.work.subtitle}</p>
          <h2 className="mb-12 text-4xl font-bold tracking-[-0.02em] md:mb-16 md:text-5xl lg:text-6xl">{t.work.title}</h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {featured.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.06}>
              <article aria-labelledby={`project-${project.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition-colors hover:border-[var(--color-border-hover)]">
                {project.screenshot && (
                  <figure className="relative aspect-[1.25] overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] md:aspect-[1.4]">
                    <img
                      src={import.meta.env.BASE_URL + project.screenshot.src.replace(/^\/+/, '')}
                      alt={project.screenshot.alt[lang]}
                      width={project.screenshot.width}
                      height={project.screenshot.height}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-cover ${project.screenshot.objectPosition === 'left' ? 'object-left' : 'object-top'} transition-transform duration-500 group-hover:scale-[1.025]`}
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pb-3 pt-10 text-xs leading-relaxed text-white sm:px-5 sm:pb-4 sm:text-sm">
                      {project.screenshot.caption[lang]}
                    </figcaption>
                  </figure>
                )}
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-xs font-medium text-[var(--color-text-muted)]">{project.category[lang]}</span>
                    {project.status && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent)]">
                        <Circle className="h-2 w-2 fill-current" aria-hidden="true" />
                        {project.status[lang]}
                      </span>
                    )}
                  </div>
                  <h3 id={`project-${project.slug}`} className="text-2xl font-semibold tracking-[-0.025em] md:text-3xl">{project.name}</h3>
                  <p className="mt-2 text-base leading-relaxed text-[var(--color-text-secondary)]">{project.subtitle[lang]}</p>
                  <div className="mt-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]">{t.work.focusLabel}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-primary)]">{project.cardFocus[lang]}</p>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">{project.cardRole[lang]}</p>
                  {renderActions(project)}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <div data-project-group="additional" className="mt-16 md:mt-20">
          <h3 className="mb-6 text-xl font-semibold tracking-[-0.02em] md:text-2xl">{t.work.additionalTitle}</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {additional.map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.05}>
                <article aria-labelledby={`project-${project.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition-colors hover:border-[var(--color-border-hover)]">
                  {project.screenshot ? (
                    <figure className="relative aspect-[1.9] overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                      <img
                        src={import.meta.env.BASE_URL + project.screenshot.src.replace(/^\/+/, '')}
                        alt={project.screenshot.alt[lang]}
                        width={project.screenshot.width}
                        height={project.screenshot.height}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pb-3 pt-10 text-xs leading-relaxed text-white sm:px-5 sm:pb-4 sm:text-sm">
                        {project.screenshot.caption[lang]}
                      </figcaption>
                    </figure>
                  ) : (
                    <div className="flex aspect-[1.9] items-end border-b border-[var(--color-border)] bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg-secondary)] p-5 sm:p-6">
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                        {project.cardRole[lang]}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="text-xs font-medium text-[var(--color-text-muted)]">{project.category[lang]}</span>
                      {project.status && <span className="text-xs text-[var(--color-accent)]">{project.status[lang]}</span>}
                    </div>
                    <h3 id={`project-${project.slug}`} className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">{project.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{project.subtitle[lang]}</p>
                    <p className="mt-4 border-l-2 border-[var(--color-accent)] pl-3 text-sm leading-relaxed text-[var(--color-text-primary)]">{project.cardFocus[lang]}</p>
                    {renderActions(project)}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
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
            <a href="https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US" target="_blank" rel="noopener noreferrer" className="magnetic-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]">
              {t.contact.linkedinBtn}
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
            <a href="https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US" target="_blank" rel="noopener noreferrer" className="link-underline hover:text-[var(--color-text-secondary)]">LinkedIn</a>
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
        <nav aria-label={t.nav.socialLinks} className="flex flex-wrap items-center justify-center gap-5">
          <a href="https://github.com/Simifar" target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">{t.footer.github}</a>
          <a href="https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US" target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">{t.footer.linkedin}</a>
          <a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">{t.footer.telegram}</a>
          <a href="mailto:Matafonovegor2@gmail.com" className="link-underline text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">{t.footer.email}</a>
        </nav>
      </div>
    </footer>
  );
}
