import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react';
import { Fragment, useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { useApp } from '../lib/context';
import { prefersReducedMotion } from '../lib/motion';
import TransitionLink from './TransitionLink';

// The intro plays once per visit, not on every return to the home page.
let introPlayed = false;

// Areas of taskfocus-today.png (1919 × 1079) that show the five-task limit:
// the "5 of 5 slots" summary and the 5/5 counter.
const LIMIT_MARKS = [
  { x: 468, y: 150, width: 352, height: 40 },
  { x: 1706, y: 766, width: 64, height: 46 },
];

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

        <figure className="hero__visual" data-morph-scope="hero">
          <div className="hero__image-frame">
            <img
              src={import.meta.env.BASE_URL + 'projects/taskfocus-today.png'}
              alt={t.hero.visualAlt}
              width={1919}
              height={1079}
              loading="eager"
              decoding="async"
              {...{ fetchpriority: 'high' }}
              className="hero__image"
              data-morph="image"
            />
            <svg className="hero__annotation" viewBox="0 0 1919 1079" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <defs>
                <mask id="hero-spotlight">
                  <rect width="1919" height="1079" fill="white" />
                  {LIMIT_MARKS.map(mark => <rect key={mark.x} {...mark} rx="10" fill="black" />)}
                </mask>
              </defs>
              <rect className="hero__annotation-dim" width="1919" height="1079" mask="url(#hero-spotlight)" />
              {LIMIT_MARKS.map((mark, index) => (
                <rect
                  key={mark.x}
                  {...mark}
                  rx="10"
                  pathLength={1}
                  className="hero__annotation-mark"
                  style={{ '--mark-index': index } as CSSProperties}
                />
              ))}
            </svg>
          </div>
          <figcaption className="hero__caption">
            <span className="hero__caption-copy">
              <span className="hero__caption-title">{t.hero.visualTitle}</span>
              <span className="hero__caption-detail">{t.hero.visualSubtitle}</span>
            </span>
            <TransitionLink to="/work/taskfocus" className="hero__case-link">
              {t.work.viewCase}
              <ArrowUpRight size={15} aria-hidden="true" />
            </TransitionLink>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
