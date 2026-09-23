import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ExternalLink, Globe, Moon, Sun } from 'lucide-react';
import { projects } from '../content/projects';
import { useApp, useInView } from '../lib/context';
import { Footer } from './Sections';

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

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, setLang, theme, setTheme, t } = useApp();
  const project = projects.find(item => item.slug === slug);
  const currentIndex = projects.findIndex(item => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  useEffect(() => {
    if (!project) return;
    const previousTitle = document.title;
    document.title = `${project.name} — Egor Matafonov`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    if (description) description.content = project.description[lang];
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, [lang, project]);

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
          <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={t.nav.theme} aria-pressed={theme === 'light'} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]">
            {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => setLang(lang === 'en' ? 'ru' : 'en')} aria-label={`${t.nav.language} (${lang.toUpperCase()})`} className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-xs font-mono text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]">
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />{lang.toUpperCase()}
          </button>
        </div>
      </div>

      <main>
        <section className="relative px-6 pb-16 pt-32 md:px-12 md:pb-24 lg:px-20">
          <div className="mx-auto max-w-[1200px]">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{project.category[lang]}</span>
                {project.status && <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-accent)]">{project.status[lang]}</span>}
              </div>
              <h1 className="max-w-5xl text-5xl font-bold tracking-[-0.04em] md:text-7xl lg:text-8xl">{project.name}</h1>
              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[var(--color-text-secondary)] md:text-2xl">{project.description[lang]}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map(tag => <span key={tag} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 font-mono text-[10px] text-[var(--color-text-muted)]">{tag}</span>)}
              </div>
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
              <motion.figure initial={false} animate={{ opacity: 1, y: 0 }} className="mt-12 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                <img src={`${import.meta.env.BASE_URL}${project.screenshot.src.replace(/^\//, '')}`} alt={project.screenshot.alt[lang]} className="block max-h-[680px] w-full object-contain object-top" width={project.screenshot.width} height={project.screenshot.height} fetchPriority="high" />
              </motion.figure>
            )}
          </div>
        </section>

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
