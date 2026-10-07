import { ArrowUpRight, ExternalLink, Github, Linkedin, Mail, Send } from 'lucide-react';
import { Link } from 'react-router';
import { projects } from '../content/projects';
import { experience } from '../content/experience';
import { useApp } from '../lib/context';
import TransitionLink from './TransitionLink';

function ProjectActions({ project }: { project: (typeof projects)[number] }) {
  const { t } = useApp();

  return (
    <div className="project-actions">
      <TransitionLink to={`/work/${project.slug}`} className="project-action project-action--primary">
        {project.caseStudy ? t.work.viewCase : t.work.viewOverview}
        <ArrowUpRight size={16} aria-hidden="true" />
      </TransitionLink>
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-action">
          {t.work.openProduct}
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      )}
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-action project-action--quiet">
        {t.work.repository}
        <ExternalLink size={12} aria-hidden="true" />
      </a>
    </div>
  );
}

export function Experience() {
  const { t, lang } = useApp();

  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <div className="site-shell">
        <div className="section-heading" data-reveal="">
          <h2 id="experience-title" className="section-title">{t.experience.title}</h2>
          <p className="section-subtitle">{t.experience.subtitle}</p>
        </div>
        <div className="experience-list">
          {experience.map(entry => (
            <article key={entry.company} className={`experience-entry${entry.compact ? ' experience-entry--compact' : ''}`} data-reveal="">
              <div className="experience-entry__meta">
                <span>{entry.period[lang]}</span>
                <span>{entry.context[lang]}</span>
              </div>
              <div className="experience-entry__body">
                <h3 className="experience-entry__company">{entry.company}</h3>
                <p className="experience-entry__role">{entry.role[lang]}</p>
                <p className="experience-entry__work">{entry.work[lang]}</p>
                <ul className="experience-entry__outcomes">
                  {entry.outcomes.map(outcome => <li key={outcome.en}>{outcome[lang]}</li>)}
                </ul>
              </div>
            </article>
          ))}
          <article className="experience-entry experience-entry--compact" aria-labelledby="education-title" data-reveal="">
            <div className="experience-entry__meta">
              <span>{t.experience.educationLabel}</span>
            </div>
            <div className="experience-entry__body">
              <h3 id="education-title" className="experience-entry__company">{t.experience.education}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function SelectedWork() {
  const { t, lang } = useApp();
  const featured = projects.filter(project => project.presentation === 'featured');
  const additional = projects.filter(project => project.presentation === 'additional');

  return (
    <section id="work" className="work-section" aria-labelledby="work-title">
      <div className="site-shell">
        <div className="section-heading" data-reveal="">
          <h2 id="work-title" className="section-title">{t.work.title}</h2>
          <p className="section-subtitle">{t.work.subtitle}</p>
        </div>

        <div className="featured-list">
          {featured.map((project, index) => (
            <div key={project.slug}>
              <article
                aria-labelledby={`project-${project.slug}`}
                className={`feature-project${index % 2 === 1 ? ' feature-project--reverse' : ''}`}
                data-morph-scope={`project-${project.slug}`}
              >
                {project.screenshot && (
                  <figure className="feature-project__figure">
                    <div className="project-image-frame" data-reveal="media">
                      <img
                        src={import.meta.env.BASE_URL + project.screenshot.src.replace(/^\/+/, '')}
                        alt={project.screenshot.alt[lang]}
                        width={project.screenshot.width}
                        height={project.screenshot.height}
                        loading="lazy"
                        decoding="async"
                        className="project-image"
                        data-morph="image"
                      />
                    </div>
                    <figcaption className="project-image-caption">{project.screenshot.caption[lang]}</figcaption>
                  </figure>
                )}
                <div className="feature-project__copy" data-reveal="">
                  <div className="project-meta">
                    <span>{project.category[lang]}</span>
                    {project.status && <span className="project-meta__status">{project.status[lang]}</span>}
                  </div>
                  <h3 id={`project-${project.slug}`} className="feature-project__title" data-morph="title">{project.name}</h3>
                  <p className="feature-project__subtitle">{project.subtitle[lang]}</p>
                  <p className="project-focus">{project.cardFocus[lang]}</p>
                  {project.cardRole && <p className="project-role">{project.cardRole[lang]}</p>}
                  <ProjectActions project={project} />
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="additional-work">
          <h3 className="additional-work__title" data-reveal="">{t.work.additionalTitle}</h3>
          <div className="additional-grid">
            {additional.map(project => (
              <article key={project.slug} className="additional-project" aria-labelledby={`project-${project.slug}`} data-reveal="" data-morph-scope={`project-${project.slug}`}>
                {project.screenshot ? (
                  <figure className="additional-project__visual">
                    {project.screenshot.kind === 'concept' && (
                      <figcaption className="additional-project__disclosure">{project.screenshot.caption[lang]}</figcaption>
                    )}
                    <img
                      src={import.meta.env.BASE_URL + project.screenshot.src.replace(/^\/+/, '')}
                      alt={project.screenshot.alt[lang]}
                      width={project.screenshot.width}
                      height={project.screenshot.height}
                      loading="lazy"
                      decoding="async"
                      data-morph="image"
                    />
                    {project.screenshot.kind !== 'concept' && (
                      <figcaption className="additional-project__caption">{project.screenshot.caption[lang]}</figcaption>
                    )}
                  </figure>
                ) : (
                  <div className="additional-project__text-visual">{(project.cardRole ?? project.category)[lang]}</div>
                )}
                <div className="project-meta">
                  <span>{project.category[lang]}</span>
                  {project.status && <span className="project-meta__status">{project.status[lang]}</span>}
                </div>
                <h4 id={`project-${project.slug}`} className="additional-project__title" data-morph="title">{project.name}</h4>
                <p className="additional-project__subtitle">{project.subtitle[lang]}</p>
                <p className="additional-project__focus">{project.cardFocus[lang]}</p>
                <ProjectActions project={project} />
              </article>
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
    <section id="about" className="practice-section" aria-labelledby="about-title">
      <div className="site-shell practice-layout">
        <div className="practice-intro" data-reveal="">
          <h2 id="about-title" className="section-title">{t.about.title}</h2>
        </div>

        <div>
          <ul className="practice-list">
            {t.about.practices.map(practice => (
              <li key={practice.title} className="practice-item" data-reveal="">
                <h3 className="practice-item__title">{practice.title}</h3>
                <p className="practice-item__detail">{practice.detail}</p>
                <div className="practice-item__links">
                  {practice.links.map(link => {
                    const LinkComponent = link.to.startsWith('/work/') ? TransitionLink : Link;
                    return (
                      <LinkComponent key={link.to} to={link.to} className="practice-item__link">
                        {link.label}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </LinkComponent>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useApp();

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="site-shell contact-layout">
        <div data-reveal="">
          <h2 id="contact-title" className="contact-title">{t.contact.title}</h2>
        </div>
        <div data-reveal="">
          <p className="contact-copy">{t.contact.subtitle}</p>
          <div className="contact-actions">
            <a href="mailto:Matafonovegor2@gmail.com" className="contact-email" aria-label={t.contact.emailBtn}>
              <Mail size={17} aria-hidden="true" />
              <span>Matafonovegor2@gmail.com</span>
              <ArrowUpRight className="contact-action__arrow" size={15} aria-hidden="true" />
            </a>
            <a href="https://github.com/Simifar" target="_blank" rel="noopener noreferrer" className="contact-link">
              <Github size={17} aria-hidden="true" />
              <span>{t.footer.github}</span>
              <ArrowUpRight className="contact-action__arrow" size={14} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US" target="_blank" rel="noopener noreferrer" className="contact-link">
              <Linkedin size={17} aria-hidden="true" />
              <span>{t.contact.linkedinBtn}</span>
              <ArrowUpRight className="contact-action__arrow" size={14} aria-hidden="true" />
            </a>
            <a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer" className="contact-link">
              <Send size={16} aria-hidden="true" />
              <span>{t.contact.telegramBtn}</span>
              <ArrowUpRight className="contact-action__arrow" size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__copyright">{t.footer.copyright.replace('{year}', String(year))}</p>
          <p className="site-footer__built">{t.footer.built}</p>
        </div>
        <nav aria-label={t.nav.socialLinks} className="site-footer__links">
          <a href="https://github.com/Simifar" target="_blank" rel="noopener noreferrer" className="site-footer__link"><Github size={15} aria-hidden="true" />{t.footer.github}</a>
          <a href="https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US" target="_blank" rel="noopener noreferrer" className="site-footer__link"><Linkedin size={15} aria-hidden="true" />{t.footer.linkedin}</a>
          <a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer" className="site-footer__link"><Send size={14} aria-hidden="true" />{t.footer.telegram}</a>
          <a href="mailto:Matafonovegor2@gmail.com" className="site-footer__link"><Mail size={15} aria-hidden="true" />{t.footer.email}</a>
        </nav>
      </div>
    </footer>
  );
}
