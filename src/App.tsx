import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './lib/context';
import { Navbar, ScrollProgress } from './components/Navigation';
import Hero from './components/Hero';
import { SelectedWork, Statement, HowIWork, Capabilities, AIWorkflow, Experience, Lab, About, Contact, Footer } from './components/Sections';
import CaseStudy from './components/CaseStudy';
import NotFound from './components/NotFound';

function Divider() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <SelectedWork />
        <Statement />
        <Divider />
        <HowIWork />
        <Divider />
        <Capabilities />
        <Divider />
        <AIWorkflow />
        <Divider />
        <Experience />
        <Divider />
        <Lab />
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
      <Navbar />
      <NotFound />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <div className="noise-overlay" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
