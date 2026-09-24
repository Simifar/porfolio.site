import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp, useScrollProgress } from '../lib/context';

type SectionName = 'work' | 'about' | 'contact';

function scrollToSection(id: SectionName) {
  const target = document.getElementById(id);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

export function ScrollProgress() {
  const progress = useScrollProgress();
  return <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />;
}

export function LanguageToggle() {
  const { t, lang, setLang } = useApp();

  return (
    <div role="group" aria-label={t.nav.language} className="inline-flex min-h-11 items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-1">
      <Globe className="ml-1.5 h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)]" aria-hidden="true" />
      {(['en', 'ru'] as const).map(language => (
        <button
          key={language}
          type="button"
          onClick={() => setLang(language)}
          aria-label={language === 'en' ? t.nav.english : t.nav.russian}
          aria-pressed={lang === language}
          className={`min-h-9 min-w-9 rounded-full px-2 font-mono text-[11px] transition-colors ${lang === language ? 'bg-[var(--color-accent)] text-[var(--color-on-accent)]' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]'}`}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t, theme, setTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const navLinks: { label: string; target: SectionName }[] = [
    { label: t.nav.work, target: 'work' },
    { label: t.nav.about, target: 'about' },
    { label: t.nav.contact, target: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = (mobile = false) => (
    <nav aria-label={mobile ? t.nav.mobileNavigation : t.nav.mainNavigation} className={mobile ? 'flex items-center justify-around' : 'hidden items-center gap-7 md:flex'}>
      {navLinks.map(link => (
        <button
          key={link.target}
          type="button"
          onClick={() => scrollToSection(link.target)}
          className={`${mobile ? 'min-h-11 px-3 text-xs' : 'px-1 py-2 text-sm'} whitespace-nowrap text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]`}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed left-0 right-0 top-0 z-[1000] px-3 pt-3 transition-all duration-300 md:px-8 md:pt-5 ${scrolled ? 'md:pt-3' : ''}`}
      >
        <div className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2.5 md:px-5 ${scrolled ? 'rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/85 shadow-lg shadow-black/5 backdrop-blur-xl' : ''}`}>
          <Link to="/" aria-label={t.nav.siteHome} className="shrink-0 rounded px-2 py-2 font-mono text-xs tracking-wider text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]">EM</Link>
          {navigation()}
          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
              aria-label={theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
            <LanguageToggle />
          </div>
        </div>
      </motion.header>

      <div className="mobile-navigation-bar fixed left-3 right-3 z-[999] rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/95 px-2 py-1 shadow-xl shadow-black/10 backdrop-blur-xl md:hidden">
        {navigation(true)}
      </div>
    </>
  );
}
