import { useRef, useState } from 'react';
import { useApp } from '../../lib/context';
import { skills, statusLabels, worldCopy } from '../../content/world';
import PixelIcon from './PixelIcon';

export default function Inventory() {
  const { lang } = useApp();
  const w = worldCopy[lang];
  const [selected, setSelected] = useState(0);
  const item = skills[selected];
  const detail = useRef<HTMLDivElement>(null);
  return (
    <section
      id="inventory"
      className="world-section inventory-section"
      aria-labelledby="inventory-title"
    >
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
              {lang === 'en' ? 'EQUIPMENT & KNOWLEDGE' : 'ИНСТРУМЕНТЫ И ЗНАНИЯ'}
            </span>
            <span>08 {lang === 'en' ? 'ITEMS' : 'ПРЕДМЕТОВ'}</span>
          </div>
          <div className="inventory-layout">
            <div className="inventory-items">
              <p className="inventory-hint">{w.inventoryHint}</p>
              <div
                className="inventory-grid"
                role="group"
                aria-label={w.inventoryTitle}
              >
                {skills.map((skill, i) => (
                  <button
                    type="button"
                    key={skill.id}
                    className="inventory-slot"
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
                    <span className="slot-number" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <PixelIcon kind={skill.id} />
                    <span>{skill.name[lang]}</span>
                    <span
                      className={`slot-dot slot-dot--${skill.status}`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
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
              <span className="section-eyebrow">
                {w.selected} / 0{selected + 1}
              </span>
              <div className="item-pedestal">
                <PixelIcon kind={item.id} />
              </div>
              <span className={`skill-status skill-status--${item.status}`}>
                {statusLabels[item.status][lang]}
              </span>
              <h3>{item.name[lang]}</h3>
              <p>{item.detail[lang]}</p>
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
