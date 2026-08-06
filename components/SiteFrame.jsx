'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { navigation } from '@/data/navigation';
import { profile } from '@/data/profile';
import CommandPalette from '@/components/CommandPalette';
import SiteHeader from '@/components/SiteHeader';

export default function SiteFrame({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains('dark'));
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const applyTheme = useCallback((nextDark) => {
    document.documentElement.classList.toggle('dark', nextDark);
    try {
      localStorage.setItem('portfolio-theme', nextDark ? 'dark' : 'light');
    } catch (error) {}
    setDarkMode(nextDark);
  }, []);

  const toggleTheme = useCallback(() => {
    if (transitioning) return;

    const nextDark = !document.documentElement.classList.contains('dark');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      applyTheme(nextDark);
      return;
    }

    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    setTransitioning(true);
    applyTheme(nextDark);

    timersRef.current = [
      window.setTimeout(() => setTransitioning(false), 360)
    ];
  }, [applyTheme, transitioning]);

  useEffect(() => {
    function handleKeyDown(event) {
      const editable = event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName);
      if (editable) return;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="site-background" aria-hidden="true" />
      <SiteHeader
        darkMode={darkMode}
        navigation={navigation}
        onCommandOpen={() => setPaletteOpen(true)}
        onThemeToggle={toggleTheme}
        profile={profile}
        transitioning={transitioning}
      />
      {children}
      <CommandPalette
        darkMode={darkMode}
        onClose={() => setPaletteOpen(false)}
        onThemeToggle={toggleTheme}
        open={paletteOpen}
        profile={profile}
      />
    </>
  );
}
