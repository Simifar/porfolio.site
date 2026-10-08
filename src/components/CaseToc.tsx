import { useEffect, useState } from 'react';
import { useApp } from '../lib/context';
import { prefersReducedMotion } from '../lib/motion';

interface TocItem {
  id: string;
  label: string;
}

// Wide screens only: a contents rail in the left margin that follows the
// reader through the case. It appears after the case header and steps aside
// before the closing call to action.
export default function CaseToc({ watchKey }: { watchKey: string }) {
  const { t } = useApp();
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [pastHero, setPastHero] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('#case-main [data-toc]'));
    setItems(sections.map(section => ({ id: section.id, label: section.querySelector('h2')?.textContent ?? '' })));
    setActive(null);

    const spy = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-30% 0px -65% 0px' });
    sections.forEach(section => spy.observe(section));

    const bounds = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const passed = entry.isIntersecting || entry.boundingClientRect.top < 0;
        if (entry.target.classList.contains('case-hero')) setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        else setAtEnd(passed);
      }
    });
    const hero = document.querySelector('.case-hero');
    const end = document.querySelector('.case-cta');
    if (hero) bounds.observe(hero);
    if (end) bounds.observe(end);

    return () => {
      spy.disconnect();
      bounds.disconnect();
    };
  }, [watchKey]);

  if (items.length < 3) return null;
  const visible = pastHero && !atEnd;

  return (
    <nav className={`case-toc${visible ? ' case-toc--visible' : ''}`} aria-label={t.toc.label}>
      <p className="case-toc__label">{t.toc.label}</p>
      <ol className="case-toc__list">
        {items.map(item => (
          <li key={item.id}>
            <button
              type="button"
              className="case-toc__link"
              aria-current={active === item.id ? 'true' : undefined}
              onClick={() => {
                const section = document.getElementById(item.id);
                const heading = section?.querySelector<HTMLElement>('h2');
                section?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
                if (heading) {
                  heading.tabIndex = -1;
                  heading.focus({ preventScroll: true });
                }
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
