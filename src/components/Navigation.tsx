import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Globe, Moon, Search, Sun, X } from 'lucide-react';
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

export function Navbar() {
  const { t, lang, setLang, theme, setTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
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

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCmdOpen(open => !open);
      }
      if (event.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const navigation = (mobile = false) => (
    <nav aria-label={mobile ? 'Mobile navigation' : 'Main navigation'} className={mobile ? 'flex items-center justify-around' : 'hidden items-center gap-7 md:flex'}>
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
          <Link to="/" aria-label="Egor Matafonov — home" className="shrink-0 rounded px-2 py-2 font-mono text-xs tracking-wider text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]">EM</Link>
          {navigation()}
          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
              aria-label={t.nav.theme}
              aria-pressed={theme === 'light'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-2 text-xs font-mono text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] sm:px-3"
              aria-label={`${t.nav.language} (${lang.toUpperCase()})`}
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              {lang.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-3 text-xs font-mono text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
              aria-label={t.nav.palette}
            >
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Ctrl K</span>
            </button>
          </div>
        </div>
      </motion.header>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      <div className="mobile-navigation-bar fixed left-3 right-3 z-[999] rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/95 px-2 py-1 shadow-xl shadow-black/10 backdrop-blur-xl md:hidden">
        {navigation(true)}
      </div>
    </>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang, setLang, theme, setTheme } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const actions = [
    ...t.commandPalette.actions,
    { label: lang === 'en' ? 'Switch to Russian' : 'Switch to English', action: 'language' },
  ];
  const filtered = actions.filter(action => action.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = oldOverflow;
      previousFocus.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    setSelectedIndex(index => Math.min(index, Math.max(filtered.length - 1, 0)));
  }, [filtered.length]);

  const executeAction = useCallback((action: string) => {
    onClose();
    switch (action) {
      case 'work': scrollToSection('work'); break;
      case 'about': scrollToSection('about'); break;
      case 'contact': scrollToSection('contact'); break;
      case 'github': window.open('https://github.com/Simifar', '_blank', 'noopener,noreferrer'); break;
      case 'theme': setTheme(theme === 'dark' ? 'light' : 'dark'); break;
      case 'language': setLang(lang === 'en' ? 'ru' : 'en'); break;
    }
  }, [lang, onClose, setLang, setTheme, theme]);

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab' && dialogRef.current) {
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('input:not([disabled]), button:not([disabled])'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex(index => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex(index => Math.max(index - 1, 0));
    } else if (event.key === 'Enter' && filtered[selectedIndex]) {
      event.preventDefault();
      executeAction(filtered[selectedIndex].action);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
          className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto px-4 pt-[12vh] sm:pt-[18vh]"
          onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}
        >
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" aria-hidden="true" />
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.97, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.16 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-2xl"
            onKeyDown={handleDialogKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-palette-title"
          >
            <h2 id="command-palette-title" className="sr-only">{t.commandPalette.title}</h2>
            <div className="flex min-h-14 items-center gap-3 border-b border-[var(--color-border)] px-4 sm:px-5">
              <Search className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={event => { setQuery(event.target.value); setSelectedIndex(0); }}
                placeholder={t.commandPalette.placeholder}
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-options"
                aria-activedescendant={filtered[selectedIndex] ? `command-option-${filtered[selectedIndex].action}` : undefined}
                autoComplete="off"
              />
              <button type="button" onClick={onClose} aria-label={t.commandPalette.closeHint} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div id="command-palette-options" role="listbox" className="max-h-[min(50vh,320px)] overflow-y-auto py-2">
              {filtered.map((action, index) => (
                <button
                  id={`command-option-${action.action}`}
                  key={action.action}
                  type="button"
                  role="option"
                  aria-selected={index === selectedIndex}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => executeAction(action.action)}
                  className={`flex min-h-11 w-full items-center justify-between px-5 py-3 text-left text-sm transition-colors ${index === selectedIndex ? 'bg-[var(--color-accent)]/10 text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]'}`}
                >
                  <span>{action.label}</span>
                  {index === selectedIndex && <ArrowRight className="h-3.5 w-3.5 text-[var(--color-accent)]" aria-hidden="true" />}
                </button>
              ))}
              {filtered.length === 0 && <p className="px-5 py-8 text-center text-sm text-[var(--color-text-muted)]">{t.commandPalette.empty}</p>}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-[var(--color-border)] px-5 py-3 font-mono text-[10px] text-[var(--color-text-muted)]">
              <span>↑↓ {t.commandPalette.navigationHint}</span>
              <span>↵ {t.commandPalette.selectHint}</span>
              <span>Esc {t.commandPalette.closeHint}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
