import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { AppProvider, useApp } from './lib/context';
import { projects } from './content/projects';
import { Navbar, ScrollProgress } from './components/Navigation';
import Hero from './components/Hero';
import { SelectedWork, About, Contact, Footer } from './components/Sections';
import CaseStudy from './components/CaseStudy';
import NotFound from './components/NotFound';

function PageMetadata() {
  const { pathname } = useLocation();
  const { lang, t } = useApp();

  useEffect(() => {
    const slug = pathname.startsWith('/work/') ? pathname.slice('/work/'.length) : '';
    const project = projects.find(item => item.slug === slug);
    const isHome = pathname === '/';
    const title = project
      ? `${project.name} · ${t.metadata.projectTitleSuffix}`
      : isHome ? t.metadata.title : `${t.notFound.title} · ${t.metadata.title}`;
    const description = project
      ? project.description[lang]
      : isHome ? t.metadata.description : t.notFound.text;

    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:image:alt"]')?.setAttribute('content', t.metadata.socialImageAlt);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:image:alt"]')?.setAttribute('content', t.metadata.socialImageAlt);
  }, [lang, pathname, t]);

  return null;
}

function ScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

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
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <MotionConfig reducedMotion="user">
          <ScrollReset />
          <PageMetadata />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MotionConfig>
      </HashRouter>
    </AppProvider>
  );
}
