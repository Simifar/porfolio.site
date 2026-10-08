import { ArrowUpRight, Copy, CornerDownLeft, FileText, Github, Home, Languages, Linkedin, Mail, Search, Send, SunMoon, type LucideIcon } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { projects } from '../content/projects';
import { rememberLang, rememberTheme, useApp } from '../lib/context';
import { animateThemeChange, navigateWithTransition, runViewTransition } from '../lib/motion';
import { EMAIL, copyEmail } from './Toast';
import { OPEN_EVENT, takePendingOpen } from './CommandMenuTrigger';

interface Command {
  id: string;
  group: 'navigate' | 'cases' | 'actions';
  label: string;
  detail?: string;
  icon: LucideIcon;
  keywords?: string;
  run: () => void;
}

function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
}

// Keyboard-first navigation: Ctrl/⌘+K or "/" opens a searchable list of
// sections, cases and contact actions.
export default function CommandMenu() {
  const { t, lang, setLang, theme, setTheme } = useApp();
  const navigate = useNavigate();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listId = useId();

  const commands = useMemo<Command[]>(() => {
    const go = (to: string) => () => navigateWithTransition(() => navigate(to), null, to);
    const external = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer');
    return [
      { id: 'home', group: 'navigate', label: t.command.home, icon: Home, run: go('/') },
      { id: 'experience', group: 'navigate', label: t.nav.experience, icon: ArrowUpRight, run: go('/?section=experience') },
      { id: 'work', group: 'navigate', label: t.nav.work, icon: ArrowUpRight, run: go('/?section=work') },
      { id: 'about', group: 'navigate', label: t.nav.about, icon: ArrowUpRight, run: go('/?section=about') },
      { id: 'contact', group: 'navigate', label: t.nav.contact, icon: ArrowUpRight, run: go('/?section=contact') },
      ...projects.map<Command>(project => ({
        id: `case-${project.slug}`,
        group: 'cases',
        label: project.name,
        detail: project.subtitle[lang],
        keywords: project.category[lang],
        icon: FileText,
        run: go(`/work/${project.slug}`),
      })),
      {
        id: 'theme',
        group: 'actions',
        label: t.command.toggleTheme,
        icon: SunMoon,
        run: () => {
          const next = theme === 'dark' ? 'light' : 'dark';
          rememberTheme(next);
          animateThemeChange(() => setTheme(next), window.innerWidth / 2, window.innerHeight / 3);
        },
      },
      {
        id: 'language',
        group: 'actions',
        label: t.command.switchLanguage,
        icon: Languages,
        run: () => {
          const next = lang === 'en' ? 'ru' : 'en';
          rememberLang(next);
          runViewTransition(() => setLang(next), 'lang');
        },
      },
      { id: 'copy-email', group: 'actions', label: t.command.copyEmail, detail: EMAIL, icon: Copy, run: () => { void copyEmail(t); } },
      { id: 'write-email', group: 'actions', label: t.command.writeEmail, icon: Mail, run: () => { window.location.href = `mailto:${EMAIL}`; } },
      { id: 'linkedin', group: 'actions', label: t.command.openLinkedin, icon: Linkedin, run: external('https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US') },
      { id: 'telegram', group: 'actions', label: t.command.openTelegram, icon: Send, run: external('https://t.me/legionanstek') },
      { id: 'github', group: 'actions', label: t.command.openGithub, icon: Github, run: external('https://github.com/Simifar') },
    ];
  }, [lang, navigate, setLang, setTheme, t, theme]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter(command => [command.label, command.detail, command.keywords].some(text => text?.toLowerCase().includes(needle)));
  }, [commands, query]);

  useEffect(() => {
    const open = () => {
      takePendingOpen();
      if (dialog.current?.open) return;
      setQuery('');
      setActive(0);
      dialog.current?.showModal();
      input.current?.focus();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const shortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const slash = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !isTypingTarget(event.target);
      if (!shortcut && !slash) return;
      event.preventDefault();
      if (shortcut && dialog.current?.open) dialog.current.close();
      else open();
    };
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener('keydown', onKeyDown);
    if (takePendingOpen()) open();
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, listId]);

  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    dialog.current?.close();
    command.run();
  };

  const groups = [
    { key: 'navigate', label: t.command.groupNavigate },
    { key: 'cases', label: t.command.groupCases },
    { key: 'actions', label: t.command.groupActions },
  ] as const;

  return (
    <dialog
      ref={dialog}
      className="command-menu"
      aria-label={t.command.title}
      onClick={event => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="command-menu__panel">
        <div className="command-menu__search">
          <Search size={17} aria-hidden="true" />
          <input
            ref={input}
            className="command-menu__input"
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? `${listId}-${active}` : undefined}
            aria-label={t.command.placeholder}
            placeholder={t.command.placeholder}
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={event => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={event => {
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                if (!results.length) return;
                const step = event.key === 'ArrowDown' ? 1 : -1;
                setActive(current => (current + step + results.length) % results.length);
              } else if (event.key === 'Enter') {
                event.preventDefault();
                runCommand(results[active]);
              }
            }}
          />
        </div>

        <div id={listId} role="listbox" aria-label={t.command.title} className="command-menu__list">
          {results.length === 0 && <p className="command-menu__empty">{t.command.empty}</p>}
          {groups.map(group => {
            const items = results.filter(command => command.group === group.key);
            if (!items.length) return null;
            return (
              <div key={group.key} role="group" aria-labelledby={`${listId}-${group.key}`} className="command-menu__group">
                <p id={`${listId}-${group.key}`} className="command-menu__group-label" role="presentation">{group.label}</p>
                {items.map(command => {
                  const index = results.indexOf(command);
                  const Icon = command.icon;
                  return (
                    <div
                      key={command.id}
                      id={`${listId}-${index}`}
                      role="option"
                      aria-selected={index === active}
                      className="command-menu__item"
                      onPointerMove={() => setActive(index)}
                      onClick={() => runCommand(command)}
                    >
                      <Icon size={16} aria-hidden="true" />
                      <span className="command-menu__label">{command.label}</span>
                      {command.detail && <span className="command-menu__detail">{command.detail}</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="command-menu__footer" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> {t.command.hintMove}</span>
          <span><kbd><CornerDownLeft size={11} /></kbd> {t.command.hintOpen}</span>
          <span><kbd>esc</kbd> {t.command.hintClose}</span>
        </div>
      </div>
    </dialog>
  );
}
