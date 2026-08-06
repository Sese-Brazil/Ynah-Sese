'use client';

import { useEffect, useMemo, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import { projectBuildFilters, projectCategoryFilters, projects } from '@/data/projects';

const PAGE_SIZE = 3;

function ProjectFilterSelect({ activeValue, filters, label, onChange }) {
  return (
    <label className="project-filter-field">
      <span>{label}</span>
      <select value={activeValue} onChange={(event) => onChange(event.target.value)}>
        {filters.map((filter) => (
          <option key={filter.id} value={filter.id}>
            {filter.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function SelectedProjects() {
  const [activeBuild, setActiveBuild] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredProjects = useMemo(
    () => projects.filter((project) => {
      const matchesBuild = activeBuild === 'all' || project.buildType === activeBuild;
      const matchesCategory = activeCategory === 'all' || project.projectCategory === activeCategory;
      return matchesBuild && matchesCategory;
    }),
    [activeBuild, activeCategory]
  );

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeBuild, activeCategory]);

  return (
    <section className="section section-compact" id="work">
      <SectionHeading kicker="Project library" title="Builds grouped by role and system type.">
        A growing collection of academic, collaborative, and solo project builds presented as practical systems.
      </SectionHeading>

      <div className="project-filter-panel mt-8">
        <ProjectFilterSelect
          activeValue={activeBuild}
          filters={projectBuildFilters}
          label="Build Type"
          onChange={setActiveBuild}
        />
        <ProjectFilterSelect
          activeValue={activeCategory}
          filters={projectCategoryFilters}
          label="System Category"
          onChange={setActiveCategory}
        />
      </div>

      <div className="project-library-grid mt-6">
        {visibleProjects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>

      {filteredProjects.length > PAGE_SIZE && (
        <div className="project-pagination mt-6">
          {hasMoreProjects ? (
            <button className="project-more-button" type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
              Show More
            </button>
          ) : (
            <button className="project-more-button" type="button" onClick={() => setVisibleCount(PAGE_SIZE)}>
              Show Less
            </button>
          )}
          <p>
            Showing {Math.min(visibleCount, filteredProjects.length)} of {filteredProjects.length} projects
          </p>
        </div>
      )}

      {!filteredProjects.length && (
        <p className="project-empty-state mt-6">
          No projects match this combination yet.
        </p>
      )}
    </section>
  );
}
