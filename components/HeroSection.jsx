import EinsteinTypographyPortrait from '@/components/EinsteinTypographyPortrait';
import { profile } from '@/data/profile';

export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="kicker">Computer Science Student - Exploring AI & Full-Stack Systems</p>
          <h1 className="hero-title">Hi, I'm Ynah Sese</h1>
          <p className="hero-subtitle">I build practical applications while growing my skills in modern web technologies.
            
          </p>
          <p className="hero-subtitle">{profile.summary}</p>
          {profile.availability.enabled && <p className="availability">{profile.availability.label}</p>}
          <div className="action-row">
            <a href="#work" className="button button-primary">Explore My Work</a>
            <a href="#resume" className="button button-secondary">View Resume</a>
            <a href={profile.github} className="button button-ghost" target="_blank" rel="noreferrer">GitHub</a>
          </div>

        </div>
        <EinsteinTypographyPortrait />
      </div>
    </section>
  );
}
