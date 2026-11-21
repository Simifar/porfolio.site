import { ArrowDown, ArrowRight, ArrowUpRight, Briefcase, CircuitBoard, FileText, GraduationCap, Monitor, Server, Wrench } from 'lucide-react';
import { Link } from 'react-router';
import { useApp } from '../lib/context';
import { worldCopy } from '../content/world';
import RelayTurntable from './arena/RelayTurntable';

const proofIcons = [Monitor, GraduationCap, Server];
const lobby = {
  en: { title: 'Portfolio', lab: 'Workshop', labDetail: 'PCs, systems and tools' },
  ru: { title: 'Портфолио', lab: 'Мастерская', labDetail: 'Компьютеры, системы и инструменты' },
};

export default function Hero() {
  const { t, lang } = useApp();
  const w = worldCopy[lang];
  const copy = lobby[lang];
  const [firstName, ...surname] = w.name.split(' ');
  return (
    <section id="hero" className="lobby" aria-labelledby="hero-title">
      <div className="lobby-topline">
        <span>{copy.title}</span>
        <span className="lobby-available"><i aria-hidden="true" />{w.available}</span>
      </div>
      <div className="lobby-banner" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}figures/relay/relay-yard.svg)` }}>
        <div className="lobby-heading hero-identity">
          <h1 id="hero-title" className="lobby-title"><span>{firstName}</span>{' '}<span>{surname.join(' ')}</span></h1>
          <p className="lobby-role">{w.role}</p>
        </div>
        <RelayTurntable />
        <div className="lobby-copy hero__copy">
          <p className="lobby-deck">{t.hero.supporting}</p>
          <div className="lobby-actions">
            <Link to="/?section=experience" className="button-primary">{t.hero.cta}<ArrowDown size={16} aria-hidden="true" /></Link>
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
      <nav className="lobby-dock" aria-label={lang === 'en' ? 'Portfolio sections' : 'Разделы портфолио'}>
        <Link to="/?section=work" className="lobby-portal lobby-portal--projects">
          <span className="portal-icon"><Briefcase aria-hidden="true" /></span>
          <span><strong>{t.nav.work}</strong><small>TaskFocus, MindTrack, CortexMap</small></span><ArrowRight className="portal-arrow" aria-hidden="true" />
        </Link>
        <Link to="/?section=workstation" className="lobby-portal lobby-portal--lab">
          <span className="portal-icon"><Wrench aria-hidden="true" /></span>
          <span><strong>{copy.lab}</strong><small>{copy.labDetail}</small></span><ArrowRight className="portal-arrow" aria-hidden="true" />
        </Link>
      </nav>
    </section>
  );
}
