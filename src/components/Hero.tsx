import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react';
import { Link } from 'react-router';
import { useApp } from '../lib/context';
import { worldCopy } from '../content/world';
import TechMascot from './arena/TechMascot';

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
        <span>EGOR.EXE / TECH ARENA</span>
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
        <aside
          className="hero-practice arena-hero-visual"
          aria-label={w.sceneLabel}
        >
          <div className="character-nameplate">
            <span>{w.characterType}</span>
            <span aria-hidden="true">#01</span>
          </div>
          <div className="hero-scene">
            <TechMascot label={w.mascotLabel} />
            <span className="character-sticker" aria-hidden="true">
              IT
              <br />
              CREW
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
        <span>
          {lang === 'en' ? '↓ YOUR NEXT TEAMMATE' : '↓ ВАШ БУДУЩИЙ КОЛЛЕГА'}
        </span>
        <span>HARDWARE · SYSTEMS · SOFTWARE</span>
      </div>
    </section>
  );
}
