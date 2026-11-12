'use client';

import { useEffect, useState } from 'react';
import ProjectBlockStack from '@/components/ProjectBlockStack';
import { profile } from '@/data/profile';

const HERO_GREETING = "Hi, I'm Ynah Sese";
const VISITOR_STORAGE_KEY = 'ynah-portfolio-visitor-counted-v1';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const buildTime = new Intl.DateTimeFormat('en-PH', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Manila'
}).format(new Date(process.env.NEXT_PUBLIC_BUILD_TIME));

export default function HeroSection() {
  const [typedGreeting, setTypedGreeting] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    if (!supabaseUrl || !supabaseKey) return undefined;

    const controller = new AbortController();
    const headers = {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json'
    };

    async function loadVisitorCount() {
      try {
        const alreadyCounted = window.localStorage.getItem(VISITOR_STORAGE_KEY) === 'true';
        const endpoint = alreadyCounted
          ? `${supabaseUrl}/rest/v1/site_stats?select=visitor_count&id=eq.1`
          : `${supabaseUrl}/rest/v1/rpc/increment_visitor_count`;
        const response = await fetch(endpoint, {
          method: alreadyCounted ? 'GET' : 'POST',
          headers,
          body: alreadyCounted ? undefined : '{}',
          signal: controller.signal
        });

        if (!response.ok) throw new Error(`Visitor counter request failed: ${response.status}`);

        const result = await response.json();
        const count = alreadyCounted ? result?.[0]?.visitor_count : result;
        if (Number.isFinite(Number(count))) {
          setVisitorCount(Number(count));
          if (!alreadyCounted) window.localStorage.setItem(VISITOR_STORAGE_KEY, 'true');
        }
      } catch (error) {
        if (error.name !== 'AbortError') console.warn('Visitor counter unavailable.');
      }
    }

    loadVisitorCount();
    return () => controller.abort();
  }, []);

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
          <div className="hero-meta" aria-label="Portfolio information">
            <span>
              Updated <time dateTime={process.env.NEXT_PUBLIC_BUILD_TIME}>{buildTime}</time>
            </span>
            <span aria-live="polite">
              Visitors {visitorCount === null ? '--' : visitorCount.toLocaleString('en-US')}
            </span>
          </div>
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
