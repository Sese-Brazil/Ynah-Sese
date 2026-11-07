'use client';

import { useEffect, useState } from 'react';
import ProjectBlockStack from '@/components/ProjectBlockStack';
import { profile } from '@/data/profile';

const HERO_GREETING = "Hi, I'm Ynah Sese";

export default function HeroSection() {
  const [typedGreeting, setTypedGreeting] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedGreeting(HERO_GREETING);
      setShowCursor(false);
      return undefined;
    }

    let characterIndex = 0;
    let cursorTimer;
    setTypedGreeting('');
    setShowCursor(true);

    const typingTimer = window.setInterval(() => {
      characterIndex += 1;
      setTypedGreeting(HERO_GREETING.slice(0, characterIndex));

      if (characterIndex === HERO_GREETING.length) {
        window.clearInterval(typingTimer);
        cursorTimer = window.setTimeout(() => setShowCursor(false), 750);
      }
    }, 72);

    return () => {
      window.clearInterval(typingTimer);
      window.clearTimeout(cursorTimer);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="kicker">Computer Science Student - Exploring AI & Full-Stack Systems</p>
          <h1 className="hero-title" aria-label={HERO_GREETING}>
            <span className="hero-title-measure" aria-hidden="true">{HERO_GREETING}</span>
            <span className="hero-title-typed" aria-hidden="true">
              {typedGreeting}
              {showCursor && <span className="typing-cursor" />}
            </span>
          </h1>
          <p className="hero-subtitle">{profile.summary}</p>
          {profile.availability.enabled && (
            <div className="availability" aria-label={profile.availability.label}>
              <span className="availability-marquee" aria-hidden="true">
                <span className="availability-track">
                  <span>{profile.availability.label}</span>
                  <span>{profile.availability.label}</span>
                </span>
              </span>
            </div>
          )}
        </div>
        <ProjectBlockStack />
      </div>
    </section>
  );
}
