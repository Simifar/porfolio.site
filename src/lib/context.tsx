import React, { createContext, useContext, useState, useEffect } from 'react';
import { en, ru, Content } from '../content/i18n';

type Lang = 'en' | 'ru';
type Theme = 'dark' | 'light';

interface AppContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: Content;
}

function readPreference(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The site still works for this session when storage is unavailable.
  }
}

// Toggles animate the change through a view transition, which applies it a
// frame later. Saving the choice first keeps it even if the reader leaves the
// page before that frame.
export function rememberLang(lang: Lang) {
  savePreference('lang', lang);
  writeLangToUrl(lang);
}

export function rememberTheme(theme: Theme) {
  savePreference('theme', theme);
}

function isLang(value: string | null): value is Lang {
  return value === 'en' || value === 'ru';
}

// The language lives in the query string before the hash, so a shared link
// opens in the sender's language without touching hash routing.
function writeLangToUrl(lang: Lang) {
  const url = new URL(window.location.href);
  if (url.searchParams.get('lang') === lang) return;
  url.searchParams.set('lang', lang);
  window.history.replaceState(window.history.state, '', url);
}

const AppContext = createContext<AppContextType>({
  lang: 'en',
  setLang: () => {},
  theme: 'dark',
  setTheme: () => {},
  t: en,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const fromUrl = new URLSearchParams(window.location.search).get('lang');
      if (isLang(fromUrl)) return fromUrl;
      const saved = readPreference('lang');
      if (isLang(saved)) return saved;
    }
    return 'en';
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    writeLangToUrl(next);
  };

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = readPreference('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    savePreference('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    savePreference('theme', theme);
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#141817' : '#F2F3EF');
  }, [theme]);

  const t = lang === 'en' ? en : ru;

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
