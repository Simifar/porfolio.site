import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowUpRight, Copy, ExternalLink, Linkedin, Mail } from 'lucide-react';
import { projects } from '../content/projects';
import { useApp } from '../lib/context';
import { Footer } from './Sections';
import { LanguageToggle, ThemeToggle } from './Navigation';
import { CommandMenuTrigger } from './CommandMenuTrigger';
import TransitionLink from './TransitionLink';
import CaseToc from './CaseToc';
import TodayLimitDemo from './TodayLimitDemo';
import { copyEmail } from './Toast';

// A section either reveals as one block, or (revealItems) lets its rows
// reveal one by one while only the heading moves with the section.
function CaseSection({ id, title, revealItems = false, children }: { id: string; title: string; revealItems?: boolean; children: React.ReactNode }) {
  return (
    <section id={`case-${id}`} className="case-section" data-reveal={revealItems ? undefined : ''} data-toc="">
      <h2 className="case-section__title" data-reveal={revealItems ? '' : undefined}>{title}</h2>
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
    <article className="case-page" data-morph-scope="case">
      <SkipToCaseContent label={t.nav.skipToContent} />
      <div className="case-toolbar">
        <TransitionLink to="/?section=work" className="back-link" aria-label={t.caseStudy.back}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span className="back-link__long">{t.caseStudy.back}</span>
          <span className="back-link__short" aria-hidden="true">{lang === 'en' ? 'Back' : 'Назад'}</span>
        </TransitionLink>
        <div className="case-toolbar__controls">
          <CommandMenuTrigger />
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>

      <main id="case-main" className="case-content" tabIndex={-1}>
        <section className="case-hero" aria-labelledby="case-title">
          <div className={`case-hero__layout${project.visual?.kind === 'cover' ? ' case-hero__layout--cover' : ''}`}>
            <div className="case-hero__copy">
              <p className="case-kicker">
                <span>{project.caseStudy ? t.caseStudy.caseLabel : t.caseStudy.overviewLabel}</span>
                <span>{project.category[lang]}</span>
                {project.status && <span className="case-kicker__status">{project.status[lang]}</span>}
              </p>
              <h1 id="case-title" className="case-title" data-morph="title">{project.name}</h1>
              <p className="case-description">{project.description[lang]}</p>
              {!project.caseStudy && (
                <div className="case-tags" aria-label={t.caseStudy.projectDetails}>
                  {project.tags.map(tag => <span key={tag} className="case-tag">{tag}</span>)}
                </div>
              )}
              <div className="case-actions">
                <a href={`${import.meta.env.BASE_URL}${lang === 'ru' ? 'ru/' : ''}work/${project.slug}/`} className="case-action">
                  {t.caseStudy.shareLink}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
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

            {project.visual && (
              <figure className="case-visual">
                {project.visual.kind === 'concept' && (
                  <p className="case-visual__disclosure">{project.visual.caption[lang]}</p>
                )}
                <a
                  href={import.meta.env.BASE_URL + project.visual.src.replace(/^\/+/, '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`case-visual__frame case-image-link${project.visual.kind === 'cover' ? ' portfolio-cover' : ''}`}
                  aria-label={`${t.caseStudy.fullImage}: ${project.name}`}
                >
                  <img
                    src={import.meta.env.BASE_URL + project.visual.src.replace(/^\/+/, '')}
                    alt={project.visual.alt[lang]}
                    width={project.visual.width}
                    height={project.visual.height}
                    loading="eager"
                    decoding="async"
                    className="case-visual__image"
                    data-morph="image"
                  />
                </a>
                <figcaption className="case-visual__caption">
                  <p className="case-visual__focus">{project.cardFocus[lang]}</p>
                  {project.visual.kind !== 'concept' && <p className="case-visual__note">{project.visual.caption[lang]}</p>}
                </figcaption>
              </figure>
            )}
          </div>
        </section>

        {project.caseStudy ? (
          <div className="case-body">
            <div className="case-body__inner">
                <CaseSection id="problem" title={t.caseStudy.problemTitle}>
                  {project.caseStudy.problem && <p className="case-copy">{project.caseStudy.problem[lang]}</p>}
                  <p className="case-copy">{project.caseStudy.context[lang]}</p>
                </CaseSection>

                {project.caseStudy.alternatives && (
                  <CaseSection id="alternatives" title={t.caseStudy.alternativesTitle}>
                    <p className="case-copy">{project.caseStudy.alternatives[lang]}</p>
                  </CaseSection>
                )}

                <CaseSection id="role" title={t.caseStudy.roleTitle}>
                  <p className="case-copy">{project.caseStudy.role[lang]}</p>
                  <h3 className="case-subheading">{t.caseStudy.constraintsTitle}</h3>
                  <ul className="case-list">
                    {project.caseStudy.constraints.map(item => <li key={item.en}>{item[lang]}</li>)}
                  </ul>
                </CaseSection>

                {project.caseStudy.scope && (
                  <CaseSection id="scope" title={t.caseStudy.scopeTitle}>
                    <h3 className="case-subheading">{t.caseStudy.scopeIncluded}</h3>
                    <ul className="case-list">
                      {project.caseStudy.scope.included.map(item => <li key={item.en}>{item[lang]}</li>)}
                    </ul>
                    {project.caseStudy.scope.cut && (
                      <>
                        <h3 className="case-subheading">{t.caseStudy.scopeCut}</h3>
                        <ul className="case-list">
                          {project.caseStudy.scope.cut.map(item => <li key={item.en}>{item[lang]}</li>)}
                        </ul>
                      </>
                    )}
                  </CaseSection>
                )}

                <CaseSection id="decisions" title={t.caseStudy.decisionsTitle} revealItems>
                  <ol className="decision-list">
                    {project.caseStudy.decisions.map(decision => {
                      const structured = Boolean(decision.problem || decision.alternative);
                      const choice = (
                        <h3 className="decision-item__title">
                          <span className="decision-item__label">{t.caseStudy.decisionChoice}</span>
                          {decision.title[lang]}
                        </h3>
                      );
                      const reasons = (
                        <dl className="decision-item__details">
                          <div className="decision-item__detail">
                            <dt>{t.caseStudy.decisionReason}</dt>
                            <dd>{decision.rationale[lang]}</dd>
                          </div>
                          {decision.tradeoff && (
                            <div className="decision-item__detail">
                              <dt>{t.caseStudy.tradeoffLabel}:</dt>
                              <dd>{decision.tradeoff[lang]}</dd>
                            </div>
                          )}
                        </dl>
                      );
                      return (
                        <li key={decision.title.en} className={`decision-item${structured ? ' decision-item--structured' : ' decision-item--compact'}`} data-reveal="">
                          {structured && (
                            <dl className="decision-item__comparison">
                              {decision.problem && (
                                <div className="decision-item__detail">
                                  <dt>{t.caseStudy.decisionProblem}</dt>
                                  <dd>{decision.problem[lang]}</dd>
                                </div>
                              )}
                              {decision.alternative && (
                                <div className="decision-item__detail decision-item__detail--rejected">
                                  <dt>{t.caseStudy.decisionAlternative}</dt>
                                  <dd><span className="decision-item__rejected">{decision.alternative[lang]}</span></dd>
                                </div>
                              )}
                            </dl>
                          )}
                          {structured ? <div className="decision-item__choice">{choice}{reasons}</div> : <>{choice}{reasons}</>}
                        </li>
                      );
                    })}
                  </ol>
                  {project.interactiveDemo === 'today-limit' && <TodayLimitDemo />}
                </CaseSection>

                {project.gallery && (
                  <section id="case-gallery" className="case-gallery case-gallery--embedded" aria-labelledby="case-gallery-title" data-toc="">
                    <div className="case-gallery__inner">
                      <h2 id="case-gallery-title" className="case-gallery__title">{t.caseStudy.galleryTitle}</h2>
                      <div className="case-gallery__grid">
                        {project.gallery.map(image => (
                          <figure key={image.src} className="case-gallery__item" data-reveal="">
                            <a
                              href={import.meta.env.BASE_URL + image.src.replace(/^\/+/, '')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="case-image-link"
                              aria-label={`${t.caseStudy.fullImage}: ${image.caption[lang]}`}
                            >
                              <img
                                src={import.meta.env.BASE_URL + image.src.replace(/^\/+/, '')}
                                alt={image.alt[lang]}
                                width={image.width}
                                height={image.height}
                                loading="lazy"
                                decoding="async"
                              />
                            </a>
                            <figcaption>{image.caption[lang]}</figcaption>
                          </figure>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                <CaseSection id="delivered" title={t.caseStudy.deliveredTitle}>
                  <ul className="delivered-list">
                    {project.caseStudy.delivered.map(item => <li key={item.en}>{item[lang]}</li>)}
                  </ul>
                </CaseSection>

                <CaseSection id="status" title={t.caseStudy.statusTitle}>
                  {project.caseStudy.validation && (
                    <>
                      <h3 className="case-subheading">{t.caseStudy.validationTitle}</h3>
                      <p className="case-copy">{project.caseStudy.validation[lang]}</p>
                    </>
                  )}
                  <p className="case-copy">{project.caseStudy.status[lang]}</p>
                </CaseSection>

                <CaseSection id="criteria" title={project.caseStudy.successCriteria ? t.caseStudy.successCriteriaTitle : t.caseStudy.nextValidationTitle}>
                  {project.caseStudy.successCriteria && (
                    <ul className="case-list">
                      {project.caseStudy.successCriteria.map(item => <li key={item.en}>{item[lang]}</li>)}
                    </ul>
                  )}
                  <div className="validation-note">
                    {project.caseStudy.successCriteria && <h3 className="validation-note__title">{t.caseStudy.nextValidationTitle}</h3>}
                    <p className="validation-note__text">{project.caseStudy.nextValidation[lang]}</p>
                  </div>
                </CaseSection>

                {project.caseStudy.lessons && (
                  <CaseSection id="lessons" title={t.caseStudy.lessonsTitle}>
                    <ul className="case-list">
                      {project.caseStudy.lessons.map(item => <li key={item.en}>{item[lang]}</li>)}
                    </ul>
                  </CaseSection>
                )}

                {project.caseStudy.materials.length > 0 && (
                  <CaseSection id="materials" title={t.caseStudy.materialsTitle}>
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
                  </CaseSection>
                )}
            </div>
          </div>
        ) : (
          <section className="project-details" aria-labelledby="project-details-title">
            <div className="project-details__inner">
              <p className="project-details__label">{t.caseStudy.projectDetails}</p>
              <div>
                <h2 id="project-details-title" className="project-details__title">{t.caseStudy.whatItDoes}</h2>
                <ul className="feature-list">
                  {project.features.map(feature => <li key={feature.en}>{feature[lang]}</li>)}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="case-cta" aria-labelledby="case-cta-title">
          <div className="case-cta__inner" data-reveal="">
            <h2 id="case-cta-title" className="case-cta__title">{t.caseStudy.ctaTitle}</h2>
            <div>
              <p className="contact-copy">{t.caseStudy.ctaText}</p>
              <div className="contact-actions">
                <span className="contact-email-group">
                  <a href="mailto:Matafonovegor2@gmail.com" className="contact-email">
                    <Mail size={17} aria-hidden="true" />
                    <span>Matafonovegor2@<wbr />gmail.com</span>
                    <ArrowUpRight className="contact-action__arrow" size={15} aria-hidden="true" />
                  </a>
                  <button type="button" className="contact-copy-button" onClick={() => { void copyEmail(t); }} aria-label={t.contact.copyEmail} title={t.contact.copyEmail}>
                    <Copy size={16} aria-hidden="true" />
                  </button>
                </span>
                <a href="https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Linkedin size={17} aria-hidden="true" />
                  <span>{t.contact.linkedinBtn}</span>
                  <ArrowUpRight className="contact-action__arrow" size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="next-project">
          <TransitionLink to={`/work/${nextProject.slug}`} className="next-project__link" data-morph-scope="next">
            <span className="next-project__label">{t.caseStudy.nextProject}</span>
            <span className="next-project__name" data-morph="title">{nextProject.name}</span>
            <ArrowUpRight size={22} aria-hidden="true" />
            <span className="case-copy">{nextProject.subtitle[lang]}</span>
          </TransitionLink>
        </section>
      </main>
      {project.caseStudy && <CaseToc watchKey={`${project.slug}-${lang}`} />}
      <Footer />
    </article>
  );
}
