import { useState } from 'react';
import { ArrowUpRight, Check, Crosshair, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { useApp } from '../../lib/context';
import { skills, statusLabels, worldCopy } from '../../content/world';
import ArenaScene, {
  arenaStations,
  type StationObject,
  WorkshopGear,
  WorkshopSymbols,
} from '../arena/ArenaScene';
import '../../styles/arena-floor.css';

const stationKinds = arenaStations.map((station) => station.kind);

export default function Workstation() {
  const { lang } = useApp();
  const w = worldCopy[lang];
  const [selected, setSelected] = useState<StationObject>('pc');
  const index = arenaStations.findIndex((station) => station.id === selected);
  const station = arenaStations[index];
  const skill = skills.find((entry) => entry.id === station.kind);
  const projectStatus = lang === 'en' ? 'Published projects' : 'Опубликованные проекты';
  const projectDetail = lang === 'en'
    ? 'My software projects: TaskFocus, MindTrack and CortexMap. I used AI assistance to build these applications. Their source code is on GitHub.'
    : 'Мои программные проекты: TaskFocus, MindTrack и CortexMap. При разработке этих приложений я использовал ИИ. Исходный код доступен на GitHub.';

  return (
    <section
      id="workstation"
      className="world-section lab-section"
      aria-labelledby="lab-title"
    >
      <WorkshopSymbols library="lab" kinds={stationKinds} />
      <div className="site-shell">
        <div className="section-heading" data-reveal="">
          <p className="section-eyebrow">05 / {w.lab}</p>
          <h2 id="lab-title" className="section-title">
            {w.labTitle}
          </h2>
          <p className="section-subtitle">{w.labSubtitle}</p>
        </div>
        <div className="lab-layout world-window">
          <div className="lab-stage">
            <div className="window-bar">
              <span><Crosshair size={16} aria-hidden="true" />TECH ARENA</span>
              <span>{lang === 'en' ? 'INTERACTIVE' : 'ИНТЕРАКТИВНО'}</span>
            </div>
            <div className="lab-scene-wrap">
              <ArenaScene label={w.scene} selected={selected} />
              {arenaStations.map((entry, i) => (
                <button
                  key={entry.id}
                  className={`scene-hotspot scene-hotspot--${entry.id}`}
                  style={{ left: `${(entry.x / 720) * 100}%`, top: `${(entry.y / 480) * 100}%` }}
                  type="button"
                  aria-label={`${lang === 'en' ? 'Inspect' : 'Осмотреть'}: ${w.objects[i]}`}
                  aria-controls="lab-detail"
                  aria-current={selected === entry.id ? 'true' : undefined}
                  onClick={() => setSelected(entry.id)}
                >
                  <span className="station-marker" aria-hidden="true">
                    {selected === entry.id ? <Check /> : <Plus />}
                  </span>
                </button>
              ))}
            </div>
            <p className="lab-hint">{w.labHint}</p>
          </div>
          <div
            className="lab-detail"
            id="lab-detail"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="gear-display">
              <span className="gear-display-label">
                <Crosshair size={14} aria-hidden="true" />{w.selected}
              </span>
              <div className="item-pedestal">
                <WorkshopGear kind={station.kind} library="lab" />
              </div>
            </div>
            <div className="gear-description">
              <span className={`skill-status skill-status--${skill?.status ?? 'projects'}`}>
                {skill ? statusLabels[skill.status][lang] : projectStatus}
              </span>
              <h3>{w.objects[index]}</h3>
              <p>{skill ? skill.detail[lang] : projectDetail}</p>
              {selected === 'terminal' ? (
                <a href="https://github.com/Simifar" target="_blank" rel="noopener noreferrer">
                  {w.github}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ) : (
                <Link to={`/?section=${selected === 'monitor' ? 'about' : 'experience'}`}>
                  {w.labAction}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
          <div className="lab-controls" role="group" aria-label={w.labTitle}>
            {arenaStations.map((entry, i) => (
              <button
                type="button"
                key={entry.id}
                aria-pressed={selected === entry.id}
                aria-controls="lab-detail"
                onClick={() => setSelected(entry.id)}
              >
                <WorkshopGear kind={entry.kind} library="lab" />
                <span>{w.objects[i]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
