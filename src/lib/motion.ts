import { useLayoutEffect } from 'react';
import { flushSync } from 'react-dom';

type TransitionKind = 'route' | 'theme' | 'lang';

const MORPH_NAMES = ['case-image', 'case-title'] as const;
type MorphName = (typeof MORPH_NAMES)[number];

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function canUseViewTransition() {
  return typeof document.startViewTransition === 'function' && !prefersReducedMotion();
}

// Wraps a React state update in a View Transition. Browsers without the API,
// and readers who ask for reduced motion, get the plain update.
export function runViewTransition(update: () => void, kind: TransitionKind) {
  if (!canUseViewTransition()) {
    update();
    return null;
  }
  const root = document.documentElement;
  root.dataset.vt = kind;
  const transition = document.startViewTransition(() => {
    flushSync(update);
  });
  transition.ready.catch(() => {});
  transition.finished.finally(() => {
    if (root.dataset.vt === kind) delete root.dataset.vt;
  });
  return transition;
}

// The new theme spreads as a circle from (x, y), usually the control's centre.
export function animateThemeChange(apply: () => void, x: number, y: number) {
  const transition = runViewTransition(apply, 'theme');
  transition?.ready.then(() => {
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 620, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
    );
  }).catch(() => {});
}

function isInViewport(element: Element | null): element is HTMLElement {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
}

function setMorph(element: HTMLElement, name: MorphName | '') {
  if (name) element.style.setProperty('view-transition-name', name);
  else element.style.removeProperty('view-transition-name');
}

function findMorphs(scope: Element | null) {
  return {
    'case-image': scope?.querySelector('[data-morph="image"]') ?? null,
    'case-title': scope?.querySelector('[data-morph="title"]') ?? null,
  } satisfies Record<MorphName, Element | null>;
}

// After the route renders, find where the shared image and title land.
function findTargets(to: string, fromSlug: string | null) {
  if (to.startsWith('/work/')) return findMorphs(document.querySelector('[data-morph-scope="case"]'));
  if (fromSlug && new URLSearchParams(to.split('?')[1]).get('section') === 'work') {
    return findMorphs(document.querySelector(`[data-morph-scope="project-${fromSlug}"]`));
  }
  return findMorphs(null);
}

function scrollForRoute(to: string) {
  const section = new URLSearchParams(to.split('?')[1] ?? '').get('section');
  const target = section ? document.getElementById(section) : null;
  if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

// Route change with a shared-element morph: the screenshot and project name
// the reader clicked travel to their place on the next page.
export function navigateWithTransition(navigate: () => void, link: HTMLElement | null, to: string) {
  const fromSlug = window.location.hash.match(/^#\/work\/([^/?]+)/)?.[1] ?? null;
  const sources = findMorphs(link?.closest('[data-morph-scope]') ?? null);
  const morphing = canUseViewTransition() ? MORPH_NAMES.filter(name => isInViewport(sources[name])) : [];
  const tagged: HTMLElement[] = [];

  for (const name of morphing) {
    const source = sources[name] as HTMLElement;
    setMorph(source, name);
    tagged.push(source);
  }

  const transition = runViewTransition(() => {
    navigate();
    // Names must be unique in the new state, so the sources give them up first.
    for (const element of tagged.splice(0)) setMorph(element, '');
    document.querySelector('[data-morph-scope="case"]')?.setAttribute('data-arrived', '');
    scrollForRoute(to);
    showRevealsInViewport();
    const targets = findTargets(to, fromSlug);
    for (const name of morphing) {
      const target = targets[name];
      if (isInViewport(target)) {
        setMorph(target, name);
        tagged.push(target);
      }
    }
  }, 'route');

  const cleanup = () => {
    for (const element of tagged.splice(0)) setMorph(element, '');
  };
  if (transition) transition.finished.finally(cleanup);
  else cleanup();
}

function showRevealsInViewport() {
  for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])')) {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) element.dataset.revealed = 'instant';
  }
}

// Reveals content as it scrolls into view. Anything already on screen when a
// page mounts is shown immediately, so nothing visible ever blinks out.
export function useScrollReveal(key: string) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const animate = !prefersReducedMotion() && 'IntersectionObserver' in window;

    const observer = animate ? new IntersectionObserver((entries, io) => {
      const entering = entries.filter(entry => entry.isIntersecting);
      for (const entry of entering) io.unobserve(entry.target);
      entering.filter(entry => (entry.target as HTMLElement).dataset.revealed === undefined).forEach((entry, index) => {
        const element = entry.target as HTMLElement;
        element.style.setProperty('--reveal-delay', `${Math.min(index * 90, 360)}ms`);
        element.dataset.revealed = '';
      });
    }, { rootMargin: '0px 0px -10% 0px' }) : null;

    const register = (elements: Iterable<HTMLElement>) => {
      for (const element of elements) {
        if (element.dataset.revealed !== undefined) continue;
        if (!observer || element.getBoundingClientRect().top < window.innerHeight) element.dataset.revealed = 'instant';
        else observer.observe(element);
      }
    };

    register(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (observer) root.classList.add('reveal-ready');

    // Content can mount after the page does, for example a list re-rendered in
    // another language. New nodes join here, in a microtask before the next
    // paint, so nothing on screen is ever left hidden.
    const mutations = new MutationObserver(records => {
      const added: HTMLElement[] = [];
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches('[data-reveal]')) added.push(node);
          added.push(...node.querySelectorAll<HTMLElement>('[data-reveal]'));
        }
      }
      register(added);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutations.disconnect();
    };
  }, [key]);
}
