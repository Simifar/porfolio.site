import { Globe, Moon, Sun } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../lib/context';

type SectionName = 'work' | 'about' | 'contact';

function scrollToSection(id: SectionName) {
  const target = document.getElementById(id);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

export function LanguageToggle() {
  const { t, lang, setLang } = useApp();

  return (
    <div role="group" aria-label={t.nav.language} className="language-toggle">
      <Globe className="language-toggle__globe" size={15} aria-hidden="true" />
      {(['en', 'ru'] as const).map(language => (
        <button
          key={language}
          type="button"
          onClick={() => setLang(language)}
          aria-label={language === 'en' ? t.nav.english : t.nav.russian}
          aria-pressed={lang === language}
          className="language-toggle__button"
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle() {
  const { t, theme, setTheme } = useApp();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="theme-toggle"
      aria-label={theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark}
      title={theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark}
      aria-pressed={theme === 'light'}
    >
      {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}

export function Navbar() {
  const { t } = useApp();
  const navLinks: { label: string; target: SectionName }[] = [
    { label: t.nav.work, target: 'work' },
    { label: t.nav.about, target: 'about' },
    { label: t.nav.contact, target: 'contact' },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" aria-label={t.nav.siteHome} className="site-brand">{t.nav.brand}</Link>
        <nav aria-label={t.nav.mainNavigation} className="site-nav">
          {navLinks.map(link => (
            <button
              key={link.target}
              type="button"
              onClick={() => scrollToSection(link.target)}
              className="site-nav__link"
              aria-controls={link.target}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="site-actions">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
