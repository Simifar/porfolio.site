import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

const AppContext = createContext<AppContextType>({
  lang: 'en',
  setLang: () => {},
  theme: 'dark',
  setTheme: () => {},
  t: en,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lang') as Lang) || 'en';
    }
    return 'en';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    if (theme === 'light') {
      document.documentElement.style.backgroundColor = '#F5F5F2';
      document.documentElement.style.color = '#08090B';
    } else {
      document.documentElement.style.backgroundColor = '#08090B';
      document.documentElement.style.color = '#F5F5F2';
    }
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

// Scroll progress hook
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

// Intersection observer hook
export function useInView(threshold = 0.1) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref);
        }
      },
      { threshold }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, inView };
}

// Mouse position hook for spotlight
export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return { pos, handleMouseMove };
}
