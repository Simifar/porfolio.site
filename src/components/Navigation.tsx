import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { rememberLang, rememberTheme, useApp } from '../lib/context';
import { runViewTransition } from '../lib/motion';

type SectionName = 'experience' | 'work' | 'about' | 'contact';

export function ScrollProgress() {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Browsers with scroll-driven animations draw the bar in CSS.
    if (CSS.supports('animation-timeline: scroll()')) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={progress} className="scroll-progress" aria-hidden="true" />;
}

export function LanguageToggle() {
  const { t, lang, setLang } = useApp();

  return (
    <div role="group" aria-label={t.nav.language} className="language-toggle">
      {(['en', 'ru'] as const).map(language => (
        <button
          key={language}
          type="button"
          onClick={() => {
            if (language === lang) return;
            rememberLang(language);
            runViewTransition(() => setLang(language), 'lang');
          }}
          aria-label={language === 'en' ? t.nav.english : t.nav.russian}
          aria-pressed={lang === language}
          className="language-toggle__button"
        >
          <span className="language-toggle__full">{language === 'en' ? 'English' : 'Русский'}</span>
          <span className="language-toggle__short" aria-hidden="true">{language === 'en' ? 'EN' : 'RU'}</span>
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
      onClick={event => {
        const button = event.currentTarget.getBoundingClientRect();
        const x = button.left + button.width / 2;
        const y = button.top + button.height / 2;
        rememberTheme(nextTheme);
        const transition = runViewTransition(() => setTheme(nextTheme), 'theme');
        // The new theme spreads as a circle from the toggle.
        transition?.ready.then(() => {
          const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 620, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
          );
        }).catch(() => {});
      }}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsidePress);
    };
  }, [menuOpen]);

  const navLinks: { label: string; target: SectionName }[] = [
    { label: t.nav.experience, target: 'experience' },
    { label: t.nav.work, target: 'work' },
    { label: t.nav.about, target: 'about' },
    { label: t.nav.contact, target: 'contact' },
  ];

  return (
    <header ref={header} className="site-header">
      <div className="site-header__inner">
        <Link to="/" aria-label={t.nav.siteHome} className="site-brand">{t.nav.brand}</Link>
        <button
          ref={menuButton}
          type="button"
          className="site-menu-button"
          aria-label={t.nav.menu}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen(open => !open)}
        >
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
        <nav id="site-nav" aria-label={t.nav.mainNavigation} className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.target}
              to={`/?section=${link.target}`}
              className="site-nav__link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
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
