import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react';
import { Link } from 'react-router';
import { useApp } from '../lib/context';
import { worldCopy } from '../content/world';
import WorkshopScene from './world/WorkshopScene';

export default function Hero() {
  const { t, lang } = useApp();
  const w = worldCopy[lang];
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span>
          <i className="status-dot" />
          {w.available}
        </span>
        <span>PORTFOLIO / 2026</span>
      </div>
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            {w.world} <span aria-hidden="true">↘</span>
          </p>
          <h1 id="hero-title" className="hero__headline">
            <span>BUILD.</span>
            <span>FIX.</span>
            <span className="hero__headline-accent">
              REPEAT<span className="pixel-period">.</span>
            </span>
          </h1>
          <p className="hero-identity">
            <strong>{w.name}</strong>
            <span>{w.role}</span>
          </p>
          <p className="hero__deck">{t.hero.supporting}</p>
          <div className="hero__actions">
            <Link to="/?section=experience" className="button-primary">
              {w.explore}
              <ArrowDown size={17} aria-hidden="true" />
            </Link>
            <a
              href={`${import.meta.env.BASE_URL}resume/egor-matafonov-${lang}.pdf`}
              className="button-secondary"
              download
            >
              <FileText size={16} aria-hidden="true" />
              {w.resume}
            </a>
            <Link to="/?section=contact" className="button-text">
              {t.hero.contactLink}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <aside className="hero-practice world-window" aria-label={w.sceneLabel}>
          <div className="window-bar">
            <span>
              <i className="tiny-square" />
              {w.sceneLabel}
            </span>
            <span aria-hidden="true">− □ ×</span>
          </div>
          <div className="hero-scene">
            <span className="scene-coordinate" aria-hidden="true">
              WORLD_01 / HOME BASE
            </span>
            <WorkshopScene label={w.scene} />
            <span className="scene-badge">
              <i className="status-dot" />
              {lang === 'en' ? 'HANDS-ON MODE' : 'ПРАКТИКА'}
            </span>
          </div>
          <div className="scene-caption">
            <p>{w.sceneHint}</p>
            <Link to="/?section=workstation">
              {w.labLink}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
      <ul className="hero__proofs" aria-label={t.hero.proofsLabel}>
        {t.hero.proofs.map((proof, i) => (
          <li className="hero__proof" key={proof.value}>
            <span className="proof-index" aria-hidden="true">
              0{i + 1}
            </span>
            <div>
              <span className="hero__proof-value">{proof.value}</span>
              <span className="hero__proof-label">{proof.label}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="world-divider" aria-hidden="true">
        <span>↓ SCROLL TO EXPLORE</span>
        <span>HARDWARE · SYSTEMS · SOFTWARE</span>
      </div>
    </section>
  );
}
