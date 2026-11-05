import { ArrowDown, Mail } from 'lucide-react';
import { Fragment, useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { useApp } from '../lib/context';
import { prefersReducedMotion } from '../lib/motion';

// The intro plays once per visit, not on every return to the home page.
let introPlayed = false;

function useIntro() {
  const [playing, setPlaying] = useState(() => !introPlayed && !prefersReducedMotion());

  useEffect(() => {
    introPlayed = true;
    if (!playing) return;
    const timer = window.setTimeout(() => setPlaying(false), 2600);
    return () => window.clearTimeout(timer);
  }, [playing]);

  return playing;
}

export default function Hero() {
  const { t } = useApp();
  const intro = useIntro();
  const words = t.hero.headline.split(' ');

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title" data-intro={intro ? '' : undefined}>
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__headline">
            {words.map((word, index) => (
              <Fragment key={`${index}-${word}`}>
                {index > 0 && ' '}
                <span className="hero__word">
                  <span className="hero__word-inner" style={{ '--word-index': index } as CSSProperties}>{word}</span>
                </span>
              </Fragment>
            ))}
          </h1>
          <p className="hero__deck">{t.hero.supporting}</p>
          <ul className="hero__proofs" aria-label={t.hero.proofsLabel}>
            {t.hero.proofs.map(proof => (
              <li key={proof.value} className="hero__proof">
                <span className="hero__proof-value">{proof.value}</span>
                <span className="hero__proof-label">{proof.label}</span>
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <Link to="/?section=experience" className="button-primary">
              {t.hero.cta}
              <ArrowDown size={16} aria-hidden="true" />
            </Link>
            <Link to="/?section=contact" className="button-text">
              <Mail size={16} aria-hidden="true" />
              {t.hero.contactLink}
            </Link>
          </div>
        </div>

        <aside className="hero-practice" aria-labelledby="hero-practice-title">
          <p className="section-eyebrow">{t.hero.visualTitle}</p>
          <h2 id="hero-practice-title">{t.hero.practiceTitle}</h2>
          <ul>
            {t.hero.practicePoints.map(point => <li key={point}>{point}</li>)}
          </ul>
          <p className="hero-practice__format">{t.contact.workFormat}</p>
        </aside>
      </div>
    </section>
  );
}
