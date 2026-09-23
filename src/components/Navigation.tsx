import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, useScrollProgress } from '../lib/context';
import { Search, X, ArrowRight, Globe, Sun, Moon } from 'lucide-react';

export function ScrollProgress() {
  const progress = useScrollProgress();
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

export function Navbar() {
  const { t, lang, setLang, theme, setTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const navLinks = [
    { label: t.nav.work, href: '#work' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.lab, href: '#lab' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className={`max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between ${
          scrolled
            ? 'bg-[var(--color-bg)]/80 backdrop-blur-xl border border-[var(--color-border)] rounded-full mx-4 md:mx-8 px-5 py-2.5'
            : ''
        }`}>
          {/* Logo */}
          <a href="#" className="font-mono text-xs tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
            EM
          </a>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors link-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-1 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors px-2 py-1 rounded-md border border-transparent hover:border-[var(--color-border)]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </button>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
              className="flex items-center gap-1 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors px-2 py-1 rounded-md border border-transparent hover:border-[var(--color-border)]"
              aria-label="Switch language"
            >
              <Globe className="w-3 h-3" />
              {lang.toUpperCase()}
            </button>

            {/* Command palette trigger */}
            <button
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors px-2.5 py-1.5 rounded-md border border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
              aria-label="Open command palette"
            >
              <Search className="w-3 h-3" />
              <span className="hidden sm:inline">⌘K</span>
            </button>

            {/* CV link */}
            <a
              href="/cv.pdf"
              className="hidden md:inline-flex text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              {t.nav.cv}
            </a>
          </div>
        </div>
      </motion.nav>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-4 left-4 right-4 z-[999] md:hidden" aria-label="Mobile navigation">
        <div className="flex items-center justify-around bg-[var(--color-bg)]/90 backdrop-blur-xl border border-[var(--color-border)] rounded-full px-4 py-2.5">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors py-2 px-3"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang, setLang } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = [
    ...t.commandPalette.actions,
    { label: lang === 'en' ? 'Switch to Russian' : 'Switch to English', action: 'lang' },
  ];

  const filtered = actions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const executeAction = useCallback((action: string) => {
    onClose();
    switch (action) {
      case 'work': document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); break;
      case 'about': document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); break;
      case 'lab': document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' }); break;
      case 'contact': document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); break;
      case 'cv': window.open('/cv.pdf', '_blank'); break;
      case 'github': window.open('https://github.com', '_blank'); break;
      case 'lang': setLang(lang === 'en' ? 'ru' : 'en'); break;
      default:
        if (action === 'build') {
          // Easter egg
          alert('Turning ambiguity into something useful...');
        }
    }
  }, [onClose, lang, setLang]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (filtered[selectedIndex]) executeAction(filtered[selectedIndex].action);
    }
  };

  // Easter egg: typing "build"
  useEffect(() => {
    if (query.toLowerCase() === 'build') {
      // Show easter egg after a delay
    }
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[10000] flex items-start justify-center pt-[20vh]"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-label="Command palette"
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)]">
              <Search className="w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder={t.commandPalette.placeholder}
                className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none"
              />
              <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[300px] overflow-y-auto py-2">
              {filtered.map((action, i) => (
                <button
                  key={action.action}
                  onClick={() => executeAction(action.action)}
                  className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                    i === selectedIndex
                      ? 'bg-[var(--color-accent)]/10 text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]'
                  }`}
                >
                  <span>{action.label}</span>
                  {i === selectedIndex && <ArrowRight className="w-3.5 h-3.5 text-[var(--color-accent)]" />}
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-5 py-8 text-center text-sm text-[var(--color-text-muted)]">
                  {query.toLowerCase() === 'build' ? (
                    <span className="text-[var(--color-accent)]">Turning ambiguity into something useful...</span>
                  ) : (
                    'No results'
                  )}
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 border-t border-[var(--color-border)] flex items-center gap-4 text-xs text-[var(--color-text-muted)] font-mono">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
