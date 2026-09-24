import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ExternalLink, Moon, Sun } from 'lucide-react';
import { projects } from '../content/projects';
import { useApp, useInView } from '../lib/context';
import { Footer } from './Sections';
import { LanguageToggle } from './Navigation';

// Preserve the native fetchpriority hint without React 18's camel-case warning.
const highFetchPriority = { fetchpriority: 'high' } as const;

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={className}>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay }}>
        {children}
      </motion.div>
    </div>
  );
}

function CaseSection({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-[var(--color-border)] py-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12 md:py-14">
      <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{String(number).padStart(2, '0')}</p>
      <div>
        <h2 className="mb-6 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, theme, setTheme, t } = useApp();
  const project = projects.find(item => item.slug === slug);
  const currentIndex = projects.findIndex(item => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="mb-4 text-6xl font-bold">404</h1>
          <p className="mb-8 text-[var(--color-text-secondary)]">{t.notFound.text}</p>
          <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-[var(--color-on-accent)] hover:opacity-90">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />{t.notFound.btn}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <article className="min-h-screen">
      <div className="fixed left-3 right-3 top-3 z-50 flex items-center justify-between gap-3 md:left-8 md:right-8 md:top-6">
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/85 px-4 text-sm text-[var(--color-text-secondary)] backdrop-blur-xl transition-colors hover:text-[var(--color-text-primary)]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">{t.caseStudy.back}</span><span className="sm:hidden">{lang === 'en' ? 'Back' : 'Назад'}</span>
        </Link>
        <div className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/85 p-1 backdrop-blur-xl">
          <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]">
            {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>
          <LanguageToggle />
        </div>
      </div>

      <main>
        <section className="relative px-6 pb-16 pt-32 md:px-12 md:pb-24 lg:px-20">
          <div className="mx-auto max-w-[1200px]">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
              {project.caseStudy && <p className="mb-5 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t.caseStudy.caseLabel}</p>}
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{project.category[lang]}</span>
                {project.status && <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-accent)]">{project.status[lang]}</span>}
              </div>
              <h1 className="max-w-5xl text-5xl font-bold tracking-[-0.04em] md:text-7xl lg:text-8xl">{project.name}</h1>
              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[var(--color-text-secondary)] md:text-2xl">{project.description[lang]}</p>
              {!project.caseStudy && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map(tag => <span key={tag} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 font-mono text-[10px] text-[var(--color-text-muted)]">{tag}</span>)}
                </div>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-[var(--color-on-accent)] transition-opacity hover:opacity-90">
                  {t.caseStudy.repository}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-3 text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]">
                  {t.caseStudy.liveSite}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>}
              </div>
            </motion.div>

            {project.screenshot && (
              <motion.figure initial={false} animate={{ opacity: 1, y: 0 }} className="mt-10 grid aspect-[1.55] grid-cols-2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] md:mt-12 md:aspect-[2.1]">
                <div className="min-h-0 overflow-hidden">
                  <img
                    {...highFetchPriority}
                    src={import.meta.env.BASE_URL + project.screenshot.src.replace(/^\/+/, '')}
                    alt={project.screenshot.alt[lang]}
                    width={project.screenshot.width}
                    height={project.screenshot.height}
                    className={`h-full w-full object-cover ${project.screenshot.objectPosition === 'left' ? 'object-left' : 'object-center'} max-sm:scale-[1.3]`}
                  />
                </div>
                <figcaption className="flex flex-col justify-between gap-4 border-l border-[var(--color-border)] p-3 sm:p-5 md:p-8">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] md:text-xs">{t.work.focusLabel}</p>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-primary)] sm:text-sm md:mt-4 md:text-lg">{project.cardFocus[lang]}</p>
                  </div>
                  <p className="text-[10px] leading-relaxed text-[var(--color-text-muted)] sm:text-xs">{project.screenshot.caption[lang]}</p>
                </figcaption>
              </motion.figure>
            )}
          </div>
        </section>

        {project.caseStudy ? (
          <section className="px-6 pb-12 md:px-12 md:pb-16 lg:px-20">
            <div className="mx-auto max-w-[1100px]">
              <CaseSection number={1} title={t.caseStudy.contextTitle}>
                <p className="max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">{project.caseStudy.context[lang]}</p>
              </CaseSection>

              <CaseSection number={2} title={t.caseStudy.roleTitle}>
                <p className="max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">{project.caseStudy.role[lang]}</p>
                <div className="mt-8">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-primary)]">{t.caseStudy.constraintsTitle}</h3>
                  <ul className="space-y-3">
                    {project.caseStudy.constraints.map(item => (
                      <li key={item.en} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                        <span>{item[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CaseSection>

              <CaseSection number={3} title={t.caseStudy.decisionsTitle}>
                <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                  {project.caseStudy.decisions.map((decision, index) => (
                    <li key={decision.title.en} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 md:p-6">
                      <p className="mb-4 font-mono text-[10px] text-[var(--color-accent)]">{String(index + 1).padStart(2, '0')}</p>
                      <h3 className="text-base font-semibold leading-snug text-[var(--color-text-primary)] md:text-lg">{decision.title[lang]}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{decision.rationale[lang]}</p>
                    </li>
                  ))}
                </ol>
              </CaseSection>

              <CaseSection number={4} title={t.caseStudy.deliveredTitle}>
                <ul className="space-y-4">
                  {project.caseStudy.delivered.map((item, index) => (
                    <li key={item.en} className="flex gap-4 border-b border-[var(--color-border)] pb-4 text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
                      <span className="font-mono text-xs text-[var(--color-accent)]">{String(index + 1).padStart(2, '0')}</span>
                      <span>{item[lang]}</span>
                    </li>
                  ))}
                </ul>
              </CaseSection>

              <CaseSection number={5} title={t.caseStudy.statusTitle}>
                <p className="max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">{project.caseStudy.status[lang]}</p>
                <div className="mt-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 md:p-6">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{t.caseStudy.nextValidationTitle}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">{project.caseStudy.nextValidation[lang]}</p>
                </div>
                {project.caseStudy.materials.length > 0 && (
                  <div className="mt-8">
                    <h3 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">{t.caseStudy.materialsTitle}</h3>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                      {project.caseStudy.materials.map(material => (
                        <li key={material.href}>
                          <a href={material.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-[var(--color-accent)] transition-colors hover:text-[var(--color-text-primary)]">
                            {material.label[lang]}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CaseSection>
            </div>
          </section>
        ) : (
          <section className="border-t border-[var(--color-border)] px-6 py-16 md:px-12 md:py-24 lg:px-20">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-[220px_1fr] md:gap-16">
              <FadeIn><p className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t.caseStudy.projectDetails}</p></FadeIn>
              <div>
                <FadeIn delay={0.05}><h2 className="mb-8 text-3xl font-bold tracking-[-0.02em] md:text-4xl">{t.caseStudy.whatItDoes}</h2></FadeIn>
                <ul className="space-y-4">
                  {project.features.map((feature, index) => (
                    <FadeIn key={feature.en} delay={index * 0.04}>
                      <li className="flex gap-4 border-b border-[var(--color-border)] pb-4 text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
                        <span className="mt-1 font-mono text-xs text-[var(--color-accent)]">{String(index + 1).padStart(2, '0')}</span>
                        <span>{feature[lang]}</span>
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-[var(--color-border)] px-6 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-[1200px]">
            <FadeIn>
              <Link to={`/work/${nextProject.slug}`} className="group block rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 transition-colors hover:border-[var(--color-border-hover)] md:p-10">
                <span className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{t.caseStudy.nextProject}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
                <span className="block text-3xl font-bold tracking-[-0.03em] transition-colors group-hover:text-[var(--color-accent)] md:text-5xl">{nextProject.name}</span>
                <span className="mt-3 block text-[var(--color-text-secondary)]">{nextProject.subtitle[lang]}</span>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </article>
  );
}
