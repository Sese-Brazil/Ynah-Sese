'use client';

import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { profile } from '@/data/profile';
import { assetPath } from '@/data/site';

export default function ContactSection() {
  const [feedback, setFeedback] = useState('');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setFeedback('Email copied.');
    } catch (error) {
      setFeedback(profile.email);
    }
  }

  return (
    <section className="section" id="contact">
      <div className="contact-layout">
        <SectionHeading kicker="Contact" title="Let's build something useful.">
          {profile.availability.enabled
            ? 'I am interested in software engineering, full-stack development, AI engineering, and internship opportunities where I can contribute while continuing to learn.'
            : 'Reach out for software engineering, full-stack, AI, and data systems opportunities.'}
        </SectionHeading>
        <div className="contact-panel">
          <div className="contact-grid">
            <button className="contact-item text-left" type="button" onClick={copyEmail}>
              <span>Email</span>
              <strong>{profile.email}</strong>
            </button>
            <a className="contact-item" href={profile.github} target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <strong>Sese-Brazil</strong>
            </a>
            <a className="contact-item" href={profile.linkedin} target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <strong>Mary Ynah Brazil Sese</strong>
            </a>
            <a className="contact-item" href={assetPath(profile.resume.path)} target="_blank" rel="noreferrer">
              <span>Resume</span>
              <strong>{profile.resume.label}</strong>
            </a>
            <div className="contact-item">
              <span>Location</span>
              <strong>{profile.location}</strong>
            </div>
          </div>
          <p className="copy-feedback mt-4" aria-live="polite">{feedback}</p>
        </div>
      </div>
    </section>
  );
}
