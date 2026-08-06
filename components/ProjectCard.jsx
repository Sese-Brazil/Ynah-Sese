'use client';

import Link from 'next/link';
import { assetPath } from '@/data/site';

export default function ProjectCard({ project, compact = false }) {
  function handlePointerMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
  }

  return (
    <article className={`project-card ${compact ? 'compact' : ''}`} onPointerMove={handlePointerMove}>
      <div className="project-card-media">
        {project.image ? (
          <img src={assetPath(project.image)} alt={`${project.title} screenshot`} loading="lazy" />
        ) : (
          <div className="project-card-media-fallback">
            <span>{project.projectCategoryLabel}</span>
          </div>
        )}
      </div>
      <div className="project-card-body">
        <div>
          <div className="project-badge-row">
            <span>{project.buildTypeLabel}</span>
            <span>{project.projectCategoryLabel}</span>
          </div>
          <p className="kicker mt-3">{project.status}</p>
          <h3>{project.title}</h3>
        </div>
        <p>{project.summary}</p>
        <div className="tag-list">
          {project.technologies.slice(0, 5).map((technology) => <span className="tag" key={technology}>{technology}</span>)}
        </div>
        <div className="project-actions">
          <Link className="button button-primary" href={`/work/${project.slug}`}>Show Detail</Link>
          {project.repositoryUrl && <a className="button button-secondary" href={project.repositoryUrl} target="_blank" rel="noreferrer">Source</a>}
          {project.liveUrl && <a className="button button-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">Demo</a>}
        </div>
      </div>
    </article>
  );
}
