'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { capabilities } from '@/data/capabilities';
import { projects } from '@/data/projects';

const SESSION_KEY = 'project-stack-intro-seen';
const DROP_DURATION = 720;
const DROP_DELAY = 190;
const DROP_LEAD_IN = 100;
const LOCK_PAUSE = 320;
const LOCK_DURATION = 520 + ((projects.length - 1) * 42);

const technologyIcons = {
  Python: 'devicon-python-plain',
  Java: 'devicon-java-plain',
  PHP: 'devicon-php-plain',
  JavaScript: 'devicon-javascript-plain',
  'C++': 'devicon-cplusplus-plain',
  SQL: 'devicon-azuresqldatabase-plain',
  Laravel: 'devicon-laravel-plain',
  Express: 'devicon-express-original',
  'Tailwind CSS': 'devicon-tailwindcss-original',
  MySQL: 'devicon-mysql-plain',
  MariaDB: 'devicon-mariadb-original',
  'Node.js': 'devicon-nodejs-plain',
  'Android Studio': 'devicon-androidstudio-plain',
  APK: 'devicon-android-plain',
  XAMPP: 'devicon-xampp-original',
  Web: 'devicon-html5-plain',
  GitHub: 'devicon-github-original'
};

const technologyAliases = {
  'LLM Integration': 'LLM',
  'Express.js': 'Express'
};

const capabilityStyles = new Map(capabilities.map((capability) => [capability.name, capability.styles]));

function TechnologyMark({ technology }) {
  const iconClass = technologyIcons[technology];
  const keyboardStyle = capabilityStyles.get(technologyAliases[technology] || technology);
  const markStyle = keyboardStyle
    ? {
        '--project-tech-top': keyboardStyle['--key-top'],
        '--project-tech-side': keyboardStyle['--key-side'],
        '--project-tech-border': keyboardStyle['--key-border']
      }
    : undefined;
  const fallback = technology
    .replace(' Integration', '')
    .split(/[\s.-]+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return (
    <span
      className={`project-tech-mark ${keyboardStyle ? 'project-tech-colored' : ''}`}
      style={markStyle}
      title={technology}
    >
      <span className="project-tech-icon-surface" aria-hidden="true">
        {iconClass ? <i className={`${iconClass} colored`} /> : <span>{fallback}</span>}
      </span>
      <span className="sr-only">{technology}</span>
    </span>
  );
}

function TechnologySummaryGroup({ technologies, slots, className }) {
  const hasOverflow = technologies.length > slots;
  const visibleCount = hasOverflow ? slots - 1 : technologies.length;
  const visibleTechnologies = technologies.slice(0, visibleCount);

  return (
    <span className={`project-tech-group ${className}`}>
      {visibleTechnologies.map((technology) => (
        <TechnologyMark technology={technology} key={technology} />
      ))}
      {hasOverflow && (
        <span className="project-tech-mark project-tech-more" title={`${technologies.length - visibleCount} more technologies`}>
          +{technologies.length - visibleCount}
        </span>
      )}
    </span>
  );
}

function ProjectTechnologySummary({ technologies }) {
  return (
    <span className="project-tech-summary">
      <TechnologySummaryGroup technologies={technologies} slots={4} className="project-tech-wide" />
      <TechnologySummaryGroup technologies={technologies} slots={3} className="project-tech-medium" />
      <TechnologySummaryGroup technologies={technologies} slots={2} className="project-tech-compact" />
    </span>
  );
}

export default function ProjectBlockStack() {
  const [motion, setMotion] = useState('pending');

  useEffect(() => {
    const hasPlayed = window.sessionStorage.getItem(SESSION_KEY) === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasPlayed || prefersReducedMotion) {
      setMotion('organized');
      return undefined;
    }

    setMotion('animate');
    const lockDelay = DROP_LEAD_IN + DROP_DURATION + ((projects.length - 1) * DROP_DELAY) + LOCK_PAUSE;
    const lockTimer = window.setTimeout(() => setMotion('locking'), lockDelay);
    const settleTimer = window.setTimeout(() => {
      setMotion('organized');
      window.sessionStorage.setItem(SESSION_KEY, 'true');
    }, lockDelay + LOCK_DURATION);

    return () => {
      window.clearTimeout(lockTimer);
      window.clearTimeout(settleTimer);
    };
  }, []);

  return (
    <div className={`project-stack project-stack-${motion}`} aria-label={`${projects.length} portfolio projects`}>
      <div className="project-stack-heading">
        <p className="kicker">Projects</p>
        <h2>Selected project work.</h2>
      </div>
      <div className="project-stack-stage">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="project-block"
            style={{
              '--block-index': index,
              '--block-shift': `${[-3, 4, -1, 3, 0][index % 5]}%`
            }}
            title={`View ${project.title}`}
          >
            <span className="project-block-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="project-block-copy">
              <strong>{project.title}</strong>
              <small>{project.projectCategoryLabel}</small>
            </span>
            <ProjectTechnologySummary technologies={project.technologies} />
          </Link>
        ))}
      </div>
      <div className="project-stack-caption">
        <span>Project stack</span>
        <span>{projects.length} builds and growing</span>
      </div>
    </div>
  );
}
