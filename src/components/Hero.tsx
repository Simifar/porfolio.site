import { ArrowDown, ArrowRight, ArrowUpRight, CircuitBoard, FileText, Gamepad2, GraduationCap, Monitor, Server, Wrench } from 'lucide-react';
import { Link } from 'react-router';
import { useApp } from '../lib/context';
import { worldCopy } from '../content/world';
import RelayTurntable from './arena/RelayTurntable';

const proofIcons = [Monitor, GraduationCap, Server];
const lobby = {
  en: { title: 'Player lobby', guide: 'Brawl Stars brawlers', guideDetail: 'Characters & game modes', lab: 'The workshop', labDetail: 'Explore the equipment' },
  ru: { title: 'Лобби игрока', guide: 'Бойцы Brawl Stars', guideDetail: 'Персонажи и режимы', lab: 'Мастерская', labDetail: 'Оборудование и инструменты' },
};

export default function Hero() {
  const { t, lang } = useApp();
  const w = worldCopy[lang];
  const copy = lobby[lang];
  return (
    <section id="hero" className="lobby" aria-labelledby="hero-title">
      <div className="lobby-topline">
        <span><Gamepad2 size={19} aria-hidden="true" /> {copy.title}</span>
        <span className="lobby-available"><i aria-hidden="true" />{w.available}</span>
      </div>
      <div className="lobby-banner" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}figures/relay/relay-yard.svg)` }}>
        <div className="lobby-heading">
          <p className="hero-identity"><strong>{w.name}</strong><span>{w.role}</span></p>
          <h1 id="hero-title" className="lobby-title" lang="en" aria-label="Build. Fix. Repeat."><span>BUILD.</span><span>FIX.</span><span>REPEAT.</span></h1>
        </div>
        <RelayTurntable />
        <div className="lobby-copy hero__copy">
          <p className="lobby-deck">{t.hero.supporting}</p>
          <div className="lobby-actions">
            <Link to="/?section=experience" className="button-primary">{w.explore}<ArrowDown size={16} aria-hidden="true" /></Link>
            <a href={`${import.meta.env.BASE_URL}resume/egor-matafonov-${lang}.pdf`} className="button-secondary" download><FileText size={16} aria-hidden="true" />{w.resume}</a>
            <Link to="/?section=contact" className="lobby-contact">{t.hero.contactLink}<ArrowUpRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
      <ul className="hero__proofs lobby-facts" aria-label={t.hero.proofsLabel}>
        {t.hero.proofs.map((proof, index) => {
          const Icon = proofIcons[index] ?? CircuitBoard;
          return <li key={proof.value}><Icon size={25} aria-hidden="true" /><div><strong>{proof.value}</strong><span>{proof.label}</span></div></li>;
        })}
      </ul>
      <nav className="lobby-dock" aria-label={lang === 'en' ? 'Explore the lobby' : 'Разделы лобби'}>
        <Link to="/?section=brawlers" className="lobby-portal lobby-portal--game">
          <span className="portal-icon"><Gamepad2 aria-hidden="true" /></span>
          <span><strong>{copy.guide}</strong><small>{copy.guideDetail}</small></span><ArrowRight className="portal-arrow" aria-hidden="true" />
        </Link>
        <Link to="/?section=workstation" className="lobby-portal lobby-portal--lab">
          <span className="portal-icon"><Wrench aria-hidden="true" /></span>
          <span><strong>{copy.lab}</strong><small>{copy.labDetail}</small></span><ArrowRight className="portal-arrow" aria-hidden="true" />
        </Link>
      </nav>
    </section>
  );
}
