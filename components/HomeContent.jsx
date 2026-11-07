'use client';

import { useCallback, useEffect, useState } from 'react';
import AboutJourney from '@/components/AboutJourney';
import Capabilities from '@/components/Capabilities';
import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/HeroSection';
import ResumeSection from '@/components/ResumeSection';
import SiteFooter from '@/components/SiteFooter';

const HIDDEN_SECTION_IDS = new Set(['tech-stack', 'about', 'resume', 'contact']);

export default function HomeContent() {
  const [revealed, setRevealed] = useState(false);

  const revealContent = useCallback(() => setRevealed(true), []);

  useEffect(() => {
    function revealFromHash() {
      const sectionId = window.location.hash.replace('#', '');
      if (HIDDEN_SECTION_IDS.has(sectionId)) revealContent();
    }

    revealFromHash();
    window.addEventListener('hashchange', revealFromHash);
    return () => window.removeEventListener('hashchange', revealFromHash);
  }, [revealContent]);

  useEffect(() => {
    if (!revealed) return;
    const sectionId = window.location.hash.replace('#', '');
    if (!HIDDEN_SECTION_IDS.has(sectionId)) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [revealed]);

  return (
    <>
      <main id="main">
        <HeroSection />
        {!revealed && (
          <div className="content-reveal-prompt container">
            <button
              className="content-reveal-button"
              type="button"
              onClick={revealContent}
              aria-controls="additional-content"
              aria-expanded="false"
              aria-label="Reveal the rest of the portfolio"
            >
              <span aria-hidden="true">&#8595;</span>
            </button>
          </div>
        )}
        {revealed && (
          <div id="additional-content" className="additional-content">
            <Capabilities />
            <AboutJourney />
            <ResumeSection />
            <ContactSection />
          </div>
        )}
      </main>
      {revealed && <SiteFooter />}
    </>
  );
}
