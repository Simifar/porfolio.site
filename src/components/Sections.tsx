import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../content/projects';
import { useApp, useInView } from '../lib/context';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.08);

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.32, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function ProjectActions({ project }: { project: (typeof projects)[number] }) {
  const { t } = useApp();

  return (
    <div className="project-actions">
      <Link to={`/work/${project.slug}`} className="project-action project-action--primary">
        {t.work.viewCase}
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-action">
        {t.work.repository}
        <ExternalLink size={14} aria-hidden="true" />
      </a>
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-action">
          {t.work.openProduct}
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function SelectedWork() {
  const { t, lang } = useApp();
  const featured = projects.filter(project => project.presentation === 'featured');
  const additional = projects.filter(project => project.presentation === 'additional');

  return (
    <section id="work" className="work-section" aria-labelledby="work-title">
      <div className="site-shell">
        <FadeIn className="section-heading">
          <h2 id="work-title" className="section-title">{t.work.title}</h2>
          <p className="section-subtitle">{t.work.subtitle}</p>
        </FadeIn>

        <div className="featured-list">
          {featured.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.04}>
              <article
                aria-labelledby={`project-${project.slug}`}
                className={`feature-project${index % 2 === 1 ? ' feature-project--reverse' : ''}`}
              >
                {project.screenshot && (
                  <figure className="feature-project__figure">
                    <div className="project-image-frame">
                      <img
                        src={import.meta.env.BASE_URL + project.screenshot.src.replace(/^\/+/, '')}
                        alt={project.screenshot.alt[lang]}
                        width={project.screenshot.width}
                        height={project.screenshot.height}
                        loading="lazy"
                        decoding="async"
                        className="project-image"
                      />
                    </div>
                    <figcaption className="project-image-caption">{project.screenshot.caption[lang]}</figcaption>
                  </figure>
                )}
                <div className="feature-project__copy">
                  <div className="project-meta">
                    <span>{project.category[lang]}</span>
                    {project.status && <span className="project-meta__status">{project.status[lang]}</span>}
                  </div>
                  <h3 id={`project-${project.slug}`} className="feature-project__title">{project.name}</h3>
                  <p className="feature-project__subtitle">{project.subtitle[lang]}</p>
                  <p className="project-focus">{project.cardFocus[lang]}</p>
                  <p className="project-role">{project.cardRole[lang]}</p>
                  <ProjectActions project={project} />
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <div className="additional-work">
          <h3 className="additional-work__title">{t.work.additionalTitle}</h3>
          <div className="additional-grid">
            {additional.map(project => (
              <article key={project.slug} className="additional-project" aria-labelledby={`project-${project.slug}`}>
                {project.screenshot ? (
                  <figure className="additional-project__visual">
                    <img
                      src={import.meta.env.BASE_URL + project.screenshot.src.replace(/^\/+/, '')}
                      alt={project.screenshot.alt[lang]}
                      width={project.screenshot.width}
                      height={project.screenshot.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                ) : (
                  <div className="additional-project__text-visual">{project.cardRole[lang]}</div>
                )}
                <div className="project-meta">
                  <span>{project.category[lang]}</span>
                  {project.status && <span className="project-meta__status">{project.status[lang]}</span>}
                </div>
                <h4 id={`project-${project.slug}`} className="additional-project__title">{project.name}</h4>
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
        <FadeIn className="practice-intro">
          <h2 id="about-title" className="section-title">{t.about.title}</h2>
          <p className="practice-intro__text">{t.about.intro}</p>
        </FadeIn>

        <div>
          <ul className="practice-list">
            {t.about.practices.map(practice => (
              <li key={practice.title} className="practice-item">
                <h3 className="practice-item__title">{practice.title}</h3>
                <p className="practice-item__detail">{practice.detail}</p>
                <div className="practice-item__links">
                  {practice.projects.map(project => (
                    <Link key={project.slug} to={`/work/${project.slug}`} className="practice-item__link">
                      {project.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  ))}
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
        <FadeIn>
          <h2 id="contact-title" className="contact-title">{t.contact.title}</h2>
        </FadeIn>
        <FadeIn delay={0.04}>
          <p className="contact-copy">{t.contact.subtitle}</p>
          <div className="contact-actions">
            <a href="mailto:Matafonovegor2@gmail.com" className="contact-email" aria-label={t.contact.emailBtn}>
              <span>Matafonovegor2@gmail.com</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US" target="_blank" rel="noopener noreferrer" className="contact-link">
              {t.contact.linkedinBtn}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer" className="contact-link">
              {t.contact.telegramBtn}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </FadeIn>
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
          <a href="https://github.com/Simifar" target="_blank" rel="noopener noreferrer" className="site-footer__link">{t.footer.github}</a>
          <a href="https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US" target="_blank" rel="noopener noreferrer" className="site-footer__link">{t.footer.linkedin}</a>
          <a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer" className="site-footer__link">{t.footer.telegram}</a>
          <a href="mailto:Matafonovegor2@gmail.com" className="site-footer__link">{t.footer.email}</a>
        </nav>
      </div>
    </footer>
  );
}
