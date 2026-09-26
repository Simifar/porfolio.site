import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '../content/projects';
import { useApp, useInView } from '../lib/context';
import { Footer } from './Sections';
import { LanguageToggle, ThemeToggle } from './Navigation';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.08);
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="case-section">
      <h2 className="case-section__title">{title}</h2>
      <div className="case-section__content">{children}</div>
    </section>
  );
}

function SkipToCaseContent({ label }: { label: string }) {
  return (
    <a
      href="#case-main"
      className="skip-link"
      onClick={event => {
        event.preventDefault();
        const main = document.getElementById('case-main');
        main?.focus({ preventScroll: true });
        main?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }}
    >
      {label}
    </a>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useApp();
  const project = projects.find(item => item.slug === slug);
  const currentIndex = projects.findIndex(item => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <main className="not-found">
        <div className="not-found__content">
          <h1 className="not-found__code">{t.notFound.title}</h1>
          <p className="not-found__text">{t.notFound.text}</p>
          <Link to="/" className="button-primary">
            <ArrowLeft size={16} aria-hidden="true" />
            {t.notFound.btn}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <article className="case-page">
      <SkipToCaseContent label={t.nav.skipToContent} />
      <div className="case-toolbar">
        <Link to="/" className="back-link" aria-label={t.caseStudy.back}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span className="back-link__long">{t.caseStudy.back}</span>
          <span className="back-link__short" aria-hidden="true">{lang === 'en' ? 'Back' : 'Назад'}</span>
        </Link>
        <div className="case-toolbar__controls">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>

      <main id="case-main" className="case-content" tabIndex={-1}>
        <section className="case-hero" aria-labelledby="case-title">
          <div className="case-hero__layout">
            <div className="case-hero__copy">
              <p className="case-kicker">
                <span>{t.caseStudy.caseLabel}</span>
                <span>{project.category[lang]}</span>
                {project.status && <span className="case-kicker__status">{project.status[lang]}</span>}
              </p>
              <h1 id="case-title" className="case-title">{project.name}</h1>
              <p className="case-description">{project.description[lang]}</p>
              {!project.caseStudy && (
                <div className="case-tags" aria-label={t.caseStudy.projectDetails}>
                  {project.tags.map(tag => <span key={tag} className="case-tag">{tag}</span>)}
                </div>
              )}
              <div className="case-actions">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="case-action">
                  {t.caseStudy.repository}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="case-action">
                    {t.caseStudy.liveSite}
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            {project.screenshot && (
              <figure className="case-visual">
                <div className="case-visual__frame">
                  <img
                    src={import.meta.env.BASE_URL + project.screenshot.src.replace(/^\/+/, '')}
                    alt={project.screenshot.alt[lang]}
                    width={project.screenshot.width}
                    height={project.screenshot.height}
                    loading="eager"
                    decoding="async"
                    className="case-visual__image"
                  />
                </div>
                <figcaption className="case-visual__caption">
                  <p className="case-visual__focus">{project.cardFocus[lang]}</p>
                  <p className="case-visual__note">{project.screenshot.caption[lang]}</p>
                </figcaption>
              </figure>
            )}
          </div>
        </section>

        {project.caseStudy ? (
          <div className="case-body">
            <div className="case-body__inner">
              <FadeIn>
                <CaseSection title={t.caseStudy.contextTitle}>
                  <p className="case-copy">{project.caseStudy.context[lang]}</p>
                </CaseSection>
              </FadeIn>

              <FadeIn delay={0.03}>
                <CaseSection title={t.caseStudy.roleTitle}>
                  <p className="case-copy">{project.caseStudy.role[lang]}</p>
                  <h3 className="case-subheading">{t.caseStudy.constraintsTitle}</h3>
                  <ul className="case-list">
                    {project.caseStudy.constraints.map(item => <li key={item.en}>{item[lang]}</li>)}
                  </ul>
                </CaseSection>
              </FadeIn>

              <FadeIn delay={0.03}>
                <CaseSection title={t.caseStudy.decisionsTitle}>
                  <ol className="decision-list">
                    {project.caseStudy.decisions.map(decision => (
                      <li key={decision.title.en} className="decision-item">
                        <h3 className="decision-item__title">{decision.title[lang]}</h3>
                        <p className="decision-item__rationale">{decision.rationale[lang]}</p>
                      </li>
                    ))}
                  </ol>
                </CaseSection>
              </FadeIn>

              <FadeIn delay={0.03}>
                <CaseSection title={t.caseStudy.deliveredTitle}>
                  <ul className="delivered-list">
                    {project.caseStudy.delivered.map(item => <li key={item.en}>{item[lang]}</li>)}
                  </ul>
                </CaseSection>
              </FadeIn>

              <FadeIn delay={0.03}>
                <CaseSection title={t.caseStudy.statusTitle}>
                  <p className="case-copy">{project.caseStudy.status[lang]}</p>
                  <div className="validation-note">
                    <h3 className="validation-note__title">{t.caseStudy.nextValidationTitle}</h3>
                    <p className="validation-note__text">{project.caseStudy.nextValidation[lang]}</p>
                  </div>
                  {project.caseStudy.materials.length > 0 && (
                    <div className="materials">
                      <h3 className="materials__title">{t.caseStudy.materialsTitle}</h3>
                      <ul className="materials__list">
                        {project.caseStudy.materials.map(material => (
                          <li key={material.href}>
                            <a href={material.href} target="_blank" rel="noopener noreferrer" className="materials__link">
                              {material.label[lang]}
                              <ExternalLink size={14} aria-hidden="true" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CaseSection>
              </FadeIn>
            </div>
          </div>
        ) : (
          <section className="project-details" aria-labelledby="project-details-title">
            <div className="project-details__inner">
              <p className="project-details__label">{t.caseStudy.projectDetails}</p>
              <div>
                <FadeIn><h2 id="project-details-title" className="project-details__title">{t.caseStudy.whatItDoes}</h2></FadeIn>
                <ul className="feature-list">
                  {project.features.map(feature => <li key={feature.en}>{feature[lang]}</li>)}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="next-project">
          <Link to={`/work/${nextProject.slug}`} className="next-project__link">
            <span className="next-project__label">{t.caseStudy.nextProject}</span>
            <span className="next-project__name">{nextProject.name}</span>
            <ArrowUpRight size={22} aria-hidden="true" />
            <span className="case-copy">{nextProject.subtitle[lang]}</span>
          </Link>
        </section>
      </main>
      <Footer />
    </article>
  );
}
