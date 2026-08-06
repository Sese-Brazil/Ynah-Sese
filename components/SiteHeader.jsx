'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path fill="currentColor" d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1.7 2.1 3.4 1.5.1-.8.4-1.4.7-1.7-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.2 4.8 18.2 5 18.2 5c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
    </svg>
  );
}

export default function SiteHeader({ darkMode, navigation, onCommandOpen, onThemeToggle, profile, transitioning }) {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const sectionIds = navigation.map((item) => item.href.split('#')[1]).filter(Boolean);

    function syncActiveSection() {
      const currentHash = window.location.hash.replace('#', '');
      if (sectionIds.includes(currentHash)) {
        setActiveSection(currentHash);
      }

      const headerOffset = 96;
      const readingLine = window.scrollY + headerOffset + window.innerHeight * 0.22;
      const currentSection = sectionIds.reduce((current, id) => {
        const section = document.getElementById(id);
        if (!section) return current;
        return section.offsetTop <= readingLine ? id : current;
      }, sectionIds[0] || 'home');

      setActiveSection(currentSection);
    }

    let frameId = 0;
    function handleScroll() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncActiveSection);
    }

    syncActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', syncActiveSection);
    window.addEventListener('resize', syncActiveSection);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', syncActiveSection);
      window.removeEventListener('resize', syncActiveSection);
    };
  }, [navigation]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-locked', menuOpen);
    if (!menuOpen) return undefined;

    const focusable = menuRef.current?.querySelectorAll('a, button');
    focusable?.[0]?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('menu-locked');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="site-nav container" aria-label="Main navigation">
        <Link href="/#home" className="brand" onClick={() => { setActiveSection('home'); setMenuOpen(false); }}>
          <span>{profile.brand}</span>
        </Link>
        <div className="nav-links" aria-label="Section navigation">
          {navigation.map((item) => {
            const id = item.href.split('#')[1];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${activeSection === id ? 'active' : ''}`}
                onClick={() => setActiveSection(id)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="nav-actions">
          <button className="kbd-hint desktop-only" type="button" onClick={onCommandOpen} aria-label="Open command palette">
            Ctrl K
          </button>
          <a className="icon-button desktop-only" href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">
            <GithubIcon />
          </a>
          <button
            ref={toggleRef}
            className="theme-button"
            type="button"
            disabled={transitioning}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={darkMode}
            onClick={() => onThemeToggle(toggleRef.current)}
          >
            {darkMode ? '☾' : '☼'}
          </button>
          <button className="menu-button" type="button" aria-label="Open mobile menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            ☰
          </button>
        </div>
      </nav>
      <div ref={menuRef} className="mobile-panel" hidden={!menuOpen}>
        {navigation.map((item) => {
          const id = item.href.split('#')[1];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${activeSection === id ? 'active' : ''}`}
              onClick={() => { setActiveSection(id); setMenuOpen(false); }}
            >
              {item.label}
            </Link>
          );
        })}
        <a className="nav-link" href={profile.github} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub</a>
        <button className="nav-link text-left" type="button" onClick={() => { onCommandOpen(); setMenuOpen(false); }}>Command Palette</button>
      </div>
    </header>
  );
}
