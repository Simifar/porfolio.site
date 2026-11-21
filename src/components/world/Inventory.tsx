import { useRef, useState } from 'react';
import { Check, Crosshair, Layers } from 'lucide-react';
import { useApp } from '../../lib/context';
import {
  skills,
  statusLabels,
  worldCopy,
  type SkillStatus,
} from '../../content/world';
import { WorkshopGear, WorkshopSymbols } from '../arena/ArenaScene';
import '../../styles/arena-floor.css';

const inventoryKinds = skills.map((skill) => skill.id);
const russianPlurals = new Intl.PluralRules('ru');
const itemForms: Partial<Record<Intl.LDMLPluralRule, string>> = {
  one: 'ПРЕДМЕТ',
  few: 'ПРЕДМЕТА',
};

export default function Inventory() {
  const { lang } = useApp();
  const w = worldCopy[lang];
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState<SkillStatus | 'all'>('all');
  const visibleSkills = skills
    .map((skill, index) => ({ ...skill, index }))
    .filter((skill) => filter === 'all' || skill.status === filter);
  const item = skills[selected];
  const detail = useRef<HTMLDivElement>(null);
  const count = visibleSkills.length;
  const countLabel = lang === 'ru'
    ? itemForms[russianPlurals.select(count)] ?? 'ПРЕДМЕТОВ'
    : count === 1 ? 'ITEM' : 'ITEMS';
  return (
    <section
      id="inventory"
      className="world-section inventory-section"
      aria-labelledby="inventory-title"
    >
      <WorkshopSymbols library="loadout" kinds={inventoryKinds} />
      <div className="site-shell">
        <div className="section-heading" data-reveal="">
          <p className="section-eyebrow">02 / {w.inventory}</p>
          <h2 id="inventory-title" className="section-title">
            {w.inventoryTitle}
          </h2>
          <p className="section-subtitle">{w.inventorySubtitle}</p>
        </div>
        <div className="inventory-panel world-window">
          <div className="window-bar">
            <span>
              <Layers size={16} aria-hidden="true" />
              {lang === 'en' ? 'EQUIPMENT & KNOWLEDGE' : 'ИНСТРУМЕНТЫ И ЗНАНИЯ'}
            </span>
            <span>{count} {countLabel}</span>
          </div>
          <div className="inventory-layout">
            <div className="inventory-items">
              <p className="inventory-hint">{w.inventoryHint}</p>
              <fieldset className="loadout-filters">
                <legend className="sr-only">{w.filtersLabel}</legend>
                {(['all', 'hands', 'exposure', 'learning'] as const).map(
                  (value) => (
                    <label key={value} className="loadout-filter">
                      <input
                        type="radio"
                        name="loadout-status"
                        value={value}
                        checked={filter === value}
                        onChange={() => {
                          setFilter(value);
                          const first = skills.findIndex(
                            (skill) =>
                              value === 'all' || skill.status === value,
                          );
                          setSelected(first);
                        }}
                      />
                      <span>
                        {value === 'all'
                          ? w.allFilter
                          : statusLabels[value][lang]}
                      </span>
                    </label>
                  ),
                )}
              </fieldset>
              <div
                className="inventory-grid"
                role="group"
                aria-label={w.inventoryTitle}
              >
                {visibleSkills.map((skill) => {
                  const i = skill.index;
                  return (
                    <button
                      type="button"
                      key={skill.id}
                      className="inventory-slot"
                      data-status={skill.status}
                      aria-label={skill.name[lang]}
                      aria-pressed={selected === i}
                      aria-controls="inventory-detail"
                      onClick={(event) => {
                        setSelected(i);
                        // On a phone, the selected explanation can be below the eight slots.
                        // Pointer/touch selection reveals it; keyboard focus stays on the item.
                        if (
                          event.detail > 0 &&
                          window.matchMedia('(max-width: 767px)').matches
                        ) {
                          requestAnimationFrame(() =>
                            detail.current?.scrollIntoView({
                              block: 'nearest',
                              behavior: window.matchMedia(
                                '(prefers-reduced-motion: reduce)',
                              ).matches
                                ? 'auto'
                                : 'smooth',
                            }),
                          );
                        }
                      }}
                    >
                      <span className="slot-art">
                        <WorkshopGear kind={skill.id} library="loadout" />
                      </span>
                      <span className="slot-title">{skill.name[lang]}</span>
                      <span
                        className={`slot-dot slot-dot--${skill.status}`}
                        aria-hidden="true"
                      />
                      {selected === i && <Check className="slot-check" size={17} aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
              <div className="inventory-legend">
                {(['hands', 'exposure', 'learning'] as const).map((status) => (
                  <span key={status}>
                    <i className={`slot-dot slot-dot--${status}`} />
                    {statusLabels[status][lang]}
                  </span>
                ))}
              </div>
            </div>
            <div
              ref={detail}
              id="inventory-detail"
              className="inventory-detail"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="gear-display">
                <span className="gear-display-label">
                  <Crosshair size={14} aria-hidden="true" />{w.selected}
                </span>
                <div key={item.id} className="item-pedestal">
                  <WorkshopGear kind={item.id} library="loadout" />
                </div>
              </div>
              <div className="gear-description">
                <span className={`skill-status skill-status--${item.status}`}>
                  {statusLabels[item.status][lang]}
                </span>
                <h3>{item.name[lang]}</h3>
                <p>{item.detail[lang]}</p>
              </div>
            </div>
          </div>
        </div>
        <details className="inventory-text">
          <summary>{w.allSkills}</summary>
          <div>
            {skills.map((skill) => (
              <article key={skill.id}>
                <h3>{skill.name[lang]}</h3>
                <span className={`skill-status skill-status--${skill.status}`}>
                  {statusLabels[skill.status][lang]}
                </span>
                <p>{skill.detail[lang]}</p>
              </article>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
