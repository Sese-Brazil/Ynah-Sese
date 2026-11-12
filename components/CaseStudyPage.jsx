import Link from 'next/link';
import ArchitectureXRay from '@/components/ArchitectureXRay';
import SiteFooter from '@/components/SiteFooter';

function DetailList({ eyebrow, title, items }) {
  if (!items?.length) return null;
  return (
    <article className="case-detail-group">
      <p className="case-detail-eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <ul className="case-detail-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

function ProjectActions({ project, compact = false }) {
  if (!project.repositoryUrl && !project.liveUrl) return null;
  return (
    <div className={`action-row ${compact ? 'case-actions-compact' : ''}`}>
      {project.repositoryUrl && <a className="button button-primary" href={project.repositoryUrl} target="_blank" rel="noreferrer">View source</a>}
      {project.liveUrl && <a className="button button-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">Open live demo</a>}
    </div>
  );
}

export default function CaseStudyPage({ project }) {
  return (
    <>
      <main id="main">
        <section className="section case-hero">
          <div className="case-topline">
            <Link href="/#home" className="case-back-link">&larr; Back to portfolio</Link>
            <ProjectActions project={project} compact />
          </div>
          <div className="case-title-block">
            <div className="case-badges" aria-label="Project classification">
              <span>{project.buildTypeLabel}</span>
              <span>{project.projectCategoryLabel}</span>
              <span>{project.status}</span>
              {project.year && <span>{project.year}</span>}
            </div>
            <h1 className="editorial-title">{project.title}</h1>
            <p className="case-expanded-title">{project.expandedTitle}</p>
            <p className="lede">{project.subtitle}</p>
          </div>
          <div className="case-overview-layout">
            <ArchitectureXRay project={project} />
            <aside className="case-facts" aria-label="Project facts">
              <p className="kicker">At a glance</p>
              <dl className="case-fact-list">
                <div><dt>Project type</dt><dd>{project.metadata.type}</dd></div>
                <div><dt>Primary language</dt><dd>{project.metadata.primaryLanguage}</dd></div>
                <div><dt>Database</dt><dd>{project.metadata.database}</dd></div>
                <div><dt>Core challenge</dt><dd>{project.metadata.challenge}</dd></div>
              </dl>
              <div className="tag-list" aria-label="Technologies used">
                {project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
              </div>
            </aside>
          </div>
        </section>

        <section className="section section-compact case-narrative" aria-labelledby={`${project.slug}-story`}>
          <div className="case-section-heading"><p className="kicker">Case study</p><h2 id={`${project.slug}-story`}>From context to working system.</h2></div>
          <div className="case-story-grid">
            <article><span>01</span><h3>Overview</h3><p>{project.summary}</p></article>
            <article><span>02</span><h3>The problem</h3><p>{project.problem}</p></article>
            <article><span>03</span><h3>The approach</h3><p>{project.solution}</p></article>
          </div>
          <article className="case-contribution">
            <div><p className="kicker">My contribution</p><h2>What I worked on.</h2></div>
            <p>{project.role}</p>
          </article>
        </section>

        <section className="section section-compact case-flow-section" aria-labelledby={`${project.slug}-flow`}>
          <div className="case-section-heading"><p className="kicker">System flow</p><h2 id={`${project.slug}-flow`}>How the parts connect.</h2></div>
          <ol className="case-flow">
            {project.architecture.map((node, index) => <li key={node}><span>{String(index + 1).padStart(2, '0')}</span><strong>{node}</strong></li>)}
          </ol>
        </section>

        <section className="section section-compact" aria-labelledby={`${project.slug}-engineering`}>
          <div className="case-section-heading"><p className="kicker">Engineering notes</p><h2 id={`${project.slug}-engineering`}>Features, decisions, and constraints.</h2></div>
          <div className="case-detail-grid">
            <DetailList eyebrow="Product" title="Core features" items={project.features} />
            <DetailList eyebrow="Reasoning" title="Engineering decisions" items={project.decisions} />
            <DetailList eyebrow="Execution" title="Challenges addressed" items={project.challenges} />
            <DetailList eyebrow="Scope" title="Tradeoffs" items={project.tradeoffs} />
            <DetailList eyebrow="Current state" title="Known limitations" items={project.limitations} />
            <DetailList eyebrow="Next steps" title="In development" items={project.inDevelopment} />
          </div>
        </section>

        <section className="section section-compact">
          <div className="case-closing">
            <div>
              <p className="kicker">Project links</p>
              <h2>{project.repositoryUrl || project.liveUrl ? 'Explore the implementation.' : 'Project access.'}</h2>
              {!project.repositoryUrl && !project.liveUrl && <p>No public repository or live demo is currently available for this project.</p>}
            </div>
            <ProjectActions project={project} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
