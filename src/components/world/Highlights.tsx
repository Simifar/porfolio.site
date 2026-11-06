import { Link } from 'react-router';
import { useApp } from '../../lib/context';
import { worldCopy } from '../../content/world';
import PixelIcon from './PixelIcon';
export default function Highlights() {
  const { lang } = useApp();
  const w = worldCopy[lang];
  return (
    <section
      id="highlights"
      className="world-section highlights-section"
      aria-labelledby="highlights-title"
    >
      <div className="site-shell">
        <div className="section-heading" data-reveal="">
          <p className="section-eyebrow">06 / {w.highlights}</p>
          <h2 id="highlights-title" className="section-title">
            {w.highlightsTitle}
          </h2>
        </div>
        <div className="milestone-grid">
          {w.milestones.map((milestone, i) => (
            <Link
              to={`/?section=${i === 2 ? 'work' : 'experience'}`}
              key={milestone.value}
              className="milestone"
              data-reveal=""
            >
              <PixelIcon kind={i === 0 ? 'pc' : i === 1 ? 'docs' : 'gem'} />
              <strong>{milestone.value}</strong>
              <h3>{milestone.title}</h3>
              <p>{milestone.note}</p>
              <span className="milestone-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
