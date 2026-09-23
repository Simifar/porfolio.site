import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { AppProvider } from './lib/context';
import { Navbar, ScrollProgress } from './components/Navigation';
import Hero from './components/Hero';
import { SelectedWork, Statement, About, Contact, Footer } from './components/Sections';
import CaseStudy from './components/CaseStudy';
import NotFound from './components/NotFound';

function Divider() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
    </div>
  );
}

function ScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <a
        href="#main-content"
        className="skip-link"
        onClick={event => {
          event.preventDefault();
          const main = document.getElementById('main-content');
          main?.focus({ preventScroll: true });
          main?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Skip to content
      </a>
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <SelectedWork />
        <Statement />
        <Divider />
        <About />
        <Divider />
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
  return (
    <>
      <NotFound />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <MotionConfig reducedMotion="user">
          <ScrollReset />
          <div className="noise-overlay" aria-hidden="true" />
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
