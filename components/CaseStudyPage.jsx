import Link from 'next/link';
import ArchitectureXRay from '@/components/ArchitectureXRay';
import PhoneGallery from '@/components/PhoneGallery';
import SiteFooter from '@/components/SiteFooter';
import { assetPath } from '@/data/site';

function groupScreenshots(screenshots) {
  return screenshots.reduce((groups, screenshot) => {
    const key = screenshot.label;
    groups[key] = groups[key] || [];
    groups[key].push(screenshot);
    return groups;
  }, {});
}

function TextList({ title, items }) {
  if (!items?.length) return null;
  return (
    <article className="case-study-panel">
      <h2 className="text-xl font-black">{title}</h2>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </article>
  );
}

export default function CaseStudyPage({ project }) {
  const groupedScreenshots = groupScreenshots(project.screenshots);
  const isMobileCollection = project.slug === 'java-mobile-applications';

  return (
    <>
      <main id="main">
        <section className="section case-hero">
          <Link href="/#work" className="button button-ghost w-fit">Back to work</Link>
          <p className="kicker">{project.client} • {project.status}</p>
          <h1 className="editorial-title">{project.title}</h1>
          <p className="lede">{project.expandedTitle}</p>
          <div className="case-layout mt-6">
            <div className="grid gap-4">
              <article className="case-study-panel">
                <h2 className="text-xl font-black">Overview</h2>
                <p className="mt-3">{project.summary}</p>
              </article>
              <article className="case-study-panel">
                <h2 className="text-xl font-black">Problem</h2>
                <p className="mt-3">{project.problem}</p>
              </article>
              <article className="case-study-panel">
                <h2 className="text-xl font-black">Solution</h2>
                <p className="mt-3">{project.solution}</p>
              </article>
              <article className="case-study-panel">
                <h2 className="text-xl font-black">Responsibilities</h2>
                <p className="mt-3">{project.role}</p>
              </article>
            </div>
            <div className="grid gap-4">
              <ArchitectureXRay project={project} />
              <div className="metadata-grid">
                <div className="metadata-item"><span>Type</span><strong>{project.metadata.type}</strong></div>
                <div className="metadata-item"><span>Language</span><strong>{project.metadata.primaryLanguage}</strong></div>
                <div className="metadata-item"><span>Database</span><strong>{project.metadata.database}</strong></div>
                <div className="metadata-item"><span>Challenge</span><strong>{project.metadata.challenge}</strong></div>
              </div>
              <div className="tag-list">
                {project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-compact">
          <p className="kicker">Architecture</p>
          <div className="architecture-line mt-4">
            {project.architecture.map((node, index) => (
              <span key={node} className="contents">
                <span className="architecture-node">{node}</span>
                {index < project.architecture.length - 1 && <span className="architecture-arrow">→</span>}
              </span>
            ))}
          </div>
        </section>

        <section className="section section-compact">
          <div className="case-section-grid">
            <TextList title="Core Features" items={project.features} />
            <TextList title="Engineering Decisions" items={project.decisions} />
            <TextList title="Challenges" items={project.challenges} />
            <TextList title="Tradeoffs" items={project.tradeoffs} />
            <TextList title="Current Limitations" items={project.limitations} />
            <TextList title="In Development" items={project.inDevelopment} />
          </div>
        </section>

        {!!project.screenshots.length && (
          <section className="section section-compact">
            <p className="kicker">Screenshots</p>
            {isMobileCollection ? (
              <div className="screenshot-grid mt-5 lg:grid-cols-4">
                {Object.entries(groupedScreenshots).map(([label, images]) => (
                  <PhoneGallery label={label} images={images} key={label} />
                ))}
              </div>
            ) : (
              <div className="screenshot-grid mt-5">
                {project.screenshots.map((screenshot) => (
                  <div className="project-image" key={screenshot.src}>
                    <img src={assetPath(screenshot.src)} alt={screenshot.label} loading="lazy" />
                    <span className="screen-label">{screenshot.label}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="section section-compact">
          <div className="case-study-panel">
            <p className="kicker">Links</p>
            <div className="action-row mt-4">
              {project.repositoryUrl && <a className="button button-primary" href={project.repositoryUrl} target="_blank" rel="noreferrer">Source Code</a>}
              {project.liveUrl && <a className="button button-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo</a>}
              {!project.repositoryUrl && !project.liveUrl && <p>No public repository or demo is currently available.</p>}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
