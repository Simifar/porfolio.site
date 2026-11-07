import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useApp } from '../../lib/context';
import {
  skills,
  statusLabels,
  worldCopy,
  type ItemKind,
} from '../../content/world';
import ArenaScene, {
  arenaStations,
  type StationObject,
} from '../arena/ArenaScene';
import EquipmentIcon from '../arena/EquipmentIcon';
const objects: { id: StationObject; icon: ItemKind; skill: number }[] = [
  { id: 'pc', icon: 'pc', skill: 0 },
  { id: 'monitor', icon: 'windows', skill: 2 },
  { id: 'server', icon: 'server', skill: 4 },
  { id: 'toolkit', icon: 'tool', skill: 1 },
  { id: 'terminal', icon: 'terminal', skill: 7 },
];
export default function Workstation() {
  const { lang } = useApp();
  const w = worldCopy[lang];
  const [selected, setSelected] = useState<StationObject>('pc');
  const index = objects.findIndex((object) => object.id === selected);
  const object = objects[index];
  const skill = skills[object.skill];
  const terminal = selected === 'terminal';
  return (
    <section
      id="workstation"
      className="world-section lab-section"
      aria-labelledby="lab-title"
    >
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
              <span>TECH ARENA</span>
              <span>{lang === 'en' ? 'INTERACTIVE' : 'ИНТЕРАКТИВНО'}</span>
            </div>
            <div className="lab-scene-wrap">
              <ArenaScene
                label={w.scene}
                selected={selected}
                onSelect={setSelected}
              />
              {objects.map((entry, i) => (
                <button
                  key={entry.id}
                  className={`scene-hotspot scene-hotspot--${entry.id}`}
                  style={{
                    left: `${arenaStations[i].x / 7.2}%`,
                    top: `${(arenaStations[i].y + 64) / 4.8}%`,
                  }}
                  type="button"
                  aria-label={`${lang === 'en' ? 'Inspect' : 'Осмотреть'}: ${w.objects[i]}`}
                  aria-controls="lab-detail"
                  onClick={() => setSelected(entry.id)}
                >
                  <span aria-hidden="true">{i + 1}</span>
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
            <span className="section-eyebrow">
              {w.selected} / 0{index + 1}
            </span>
            <EquipmentIcon kind={object.icon} />
            <h3>{w.objects[index]}</h3>
            <span className={`skill-status skill-status--${skill.status}`}>
              {statusLabels[skill.status][lang]}
            </span>
            <p>
              {terminal
                ? lang === 'en'
                  ? 'My software projects: TaskFocus, MindTrack and CortexMap. A separate space for building applications and working with source code, with AI assistance.'
                  : 'Мои программные проекты: TaskFocus, MindTrack и CortexMap. Отдельное направление — приложения и работа с исходным кодом, с помощью AI.'
                : skill.detail[lang]}
            </p>
            {terminal ? (
              <a
                href="https://github.com/Simifar"
                target="_blank"
                rel="noopener noreferrer"
              >
                {w.github}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : (
              <Link
                to={`/?section=${selected === 'monitor' ? 'about' : 'experience'}`}
              >
                {w.labAction}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
          <div className="lab-controls" role="group" aria-label={w.labTitle}>
            {objects.map((entry, i) => (
              <button
                type="button"
                key={entry.id}
                aria-pressed={selected === entry.id}
                aria-controls="lab-detail"
                onClick={() => setSelected(entry.id)}
              >
                <EquipmentIcon kind={entry.icon} />
                <span>{w.objects[i]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
