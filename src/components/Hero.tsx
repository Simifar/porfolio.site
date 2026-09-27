import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { useApp } from '../lib/context';

export default function Hero() {
  const { t } = useApp();

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__headline">{t.hero.headline}</h1>
          <p className="hero__deck">{t.hero.headlineAccent} {t.hero.supporting}</p>

          <div className="hero__actions">
            <Link to="/?section=work" className="button-primary">
              {t.hero.cta}
              <ArrowDown size={16} aria-hidden="true" />
            </Link>
            <Link to="/?section=contact" className="button-text">
              <Mail size={16} aria-hidden="true" />
              {t.hero.contactLink}
            </Link>
          </div>
        </div>

        <figure className="hero__visual">
          <div className="hero__image-frame">
            <img
              src={import.meta.env.BASE_URL + 'projects/mindtrack-home.png'}
              alt={t.hero.visualAlt}
              width={1280}
              height={1306}
              loading="eager"
              decoding="async"
              {...{ fetchpriority: 'high' }}
              className="hero__image"
            />
          </div>
          <figcaption className="hero__caption">
            <span className="hero__caption-copy">
              <span className="hero__caption-title">{t.hero.visualTitle}</span>
              <span className="hero__caption-detail">{t.hero.visualSubtitle}</span>
            </span>
            <Link to="/work/mindtrack" className="hero__case-link">
              {t.work.viewCase}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
