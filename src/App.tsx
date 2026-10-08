import { HashRouter, Routes, Route, useLocation } from 'react-router';
import { lazy, Suspense, useEffect } from 'react';
import { AppProvider, useApp } from './lib/context';
import { useScrollReveal } from './lib/motion';
import { projects } from './content/projects';
import { Navbar, ScrollProgress } from './components/Navigation';
import Hero from './components/Hero';
import { Experience, SelectedWork, About, Contact, Footer } from './components/Sections';
import CaseStudy from './components/CaseStudy';
import NotFound from './components/NotFound';
import { ToastRegion } from './components/Toast';

function PageMetadata() {
  const { pathname } = useLocation();
  const { lang, t } = useApp();

  useEffect(() => {
    const slug = pathname.startsWith('/work/') ? pathname.slice('/work/'.length) : '';
    const project = projects.find(item => item.slug === slug);
    const socialVisual = project?.visual?.kind === 'concept' ? undefined : project?.visual;
    const isHome = pathname === '/';
    const title = project
      ? `${project.name} · ${project.caseStudy ? t.metadata.projectTitleSuffix : t.metadata.projectOverviewSuffix}`
      : isHome ? t.metadata.title : `${t.notFound.title} · ${t.metadata.title}`;
    const description = project
      ? project.description[lang]
      : isHome ? t.metadata.description : t.notFound.text;
    const canonicalUrl = project
      ? `https://simifar.github.io/porfolio.site/${lang === 'ru' ? 'ru/' : ''}work/${project.slug}/`
      : `https://simifar.github.io/porfolio.site/${isHome && lang === 'ru' ? '?lang=ru' : ''}`;

    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:image:alt"]')?.setAttribute('content', socialVisual?.alt[lang] ?? t.metadata.socialImageAlt);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.setAttribute('content', socialVisual
      ? `https://simifar.github.io/porfolio.site/${(socialVisual.socialSrc ?? socialVisual.src).replace(/^\/+/, '')}`
      : 'https://simifar.github.io/porfolio.site/og-image.png');
    document.querySelector<HTMLMetaElement>('meta[property="og:image:width"]')?.setAttribute('content', String(socialVisual?.width ?? 1200));
    document.querySelector<HTMLMetaElement>('meta[property="og:image:height"]')?.setAttribute('content', String(socialVisual?.height ?? 630));
    document.querySelector<HTMLMetaElement>('meta[property="og:type"]')?.setAttribute('content', project ? 'article' : 'website');
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:image:alt"]')?.setAttribute('content', socialVisual?.alt[lang] ?? t.metadata.socialImageAlt);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.setAttribute('content', socialVisual
      ? `https://simifar.github.io/porfolio.site/${(socialVisual.socialSrc ?? socialVisual.src).replace(/^\/+/, '')}`
      : 'https://simifar.github.io/porfolio.site/og-image.png');
  }, [lang, pathname, t]);

  return null;
}

function ScrollReset() {
  const { pathname, search, key } = useLocation();

  useEffect(() => {
    const section = pathname === '/' ? new URLSearchParams(search).get('section') : null;
    const frame = window.requestAnimationFrame(() => {
      if (section && ['experience', 'work', 'about', 'contact'].includes(section)) {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        document.getElementById(section)?.scrollIntoView({ behavior, block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, search, key]);

  return null;
}

// Not needed for the first screen, so it loads in its own chunk after render.
const CommandMenu = lazy(() => import('./components/CommandMenu'));

// Runs after the route's own effects, once its content is in the DOM.
function RevealController() {
  const { pathname } = useLocation();
  useScrollReveal(pathname);
  return null;
}

function HomePage() {
  const { t } = useApp();

  return (
    <>
      <ScrollProgress />
      <a
        href="#main-content"
        className="skip-link"
        onClick={event => {
          event.preventDefault();
          const main = document.getElementById('main-content');
          main?.focus({ preventScroll: true });
          main?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        }}
      >
        {t.nav.skipToContent}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Experience />
        <SelectedWork />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function CaseStudyPage() {
  return (
    <>
      <ScrollProgress />
      <CaseStudy />
    </>
  );
}

function NotFoundPage() {
  return <NotFound />;
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollReset />
        <PageMetadata />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <RevealController />
        <Suspense fallback={null}>
          <CommandMenu />
        </Suspense>
        <ToastRegion />
      </HashRouter>
    </AppProvider>
  );
}
