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
    <div role="group" aria-label={t.nav.language} className="inline-flex min-h-11 items-center gap-1 rounded-full border border-[var(--color-border-hover)] bg-[var(--color-bg-secondary)] p-1 shadow-sm">
      <Globe className="ml-1.5 h-3.5 w-3.5 shrink-0 text-[var(--color-text-secondary)]" aria-hidden="true" />
      {(['en', 'ru'] as const).map(language => (
        <button
          key={language}
          type="button"
          onClick={() => setLang(language)}
          aria-label={language === 'en' ? t.nav.english : t.nav.russian}
          aria-pressed={lang === language}
          className={`min-h-9 min-w-9 rounded-full px-2 font-mono text-[11px] font-semibold transition-colors ${lang === language ? 'bg-[var(--color-accent)] text-[var(--color-on-accent)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)]'}`}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t, theme, setTheme } = useApp();
  const navLinks: { label: string; target: SectionName }[] = [
    { label: t.nav.work, target: 'work' },
    { label: t.nav.about, target: 'about' },
    { label: t.nav.contact, target: 'contact' },
  ];

  const navigation = (mobile = false) => (
    <nav aria-label={mobile ? t.nav.mobileNavigation : t.nav.mainNavigation} className={mobile ? 'flex items-center justify-around' : 'hidden items-center gap-1 md:flex'}>
      {navLinks.map(link => (
        <button
          key={link.target}
          type="button"
          onClick={() => scrollToSection(link.target)}
          className={`${mobile ? 'min-h-11 px-3 text-xs' : 'min-h-11 rounded-lg px-3 text-sm'} whitespace-nowrap font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg)] hover:text-[var(--color-text-primary)]`}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[1000] border-b-2 border-[var(--color-border-hover)] bg-[var(--color-bg-elevated)] px-3 shadow-[0_6px_24px_rgba(0,0,0,0.14)] sm:px-5 md:px-8">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
          <Link to="/" aria-label={t.nav.siteHome} className="shrink-0 rounded-md px-1 py-2 text-sm font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] sm:text-base">{t.nav.brand}</Link>
          {navigation()}
          <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0 md:justify-self-end">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-border-hover)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] shadow-sm transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-bg)]"
              aria-label={theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark}
              title={theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark}
              aria-pressed={theme === 'light'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="mobile-navigation-bar fixed left-3 right-3 z-[999] rounded-full border border-[var(--color-border-hover)] bg-[var(--color-bg-elevated)] px-2 py-1 shadow-xl shadow-black/20 backdrop-blur-xl md:hidden">
        {navigation(true)}
      </div>
    </>
  );
}
