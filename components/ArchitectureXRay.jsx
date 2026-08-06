'use client';

import { useState } from 'react';
import { assetPath } from '@/data/site';

export default function ArchitectureXRay({ project }) {
  const [xray, setXray] = useState(false);

  return (
    <div>
      <button className="xray-toggle" type="button" aria-pressed={xray} onClick={() => setXray((value) => !value)}>
        {xray ? 'Normal View' : 'X-Ray'}
      </button>
      <div className="mt-3 project-image">
        {xray ? (
          <div className="xray-view" aria-label={`${project.title} architecture x-ray`}>
            {project.xrayNodes.map((node, index) => (
              <div className="xray-row" key={node.id}>
                <span className="xray-pill">{node.label}</span>
                {index < project.xrayNodes.length - 1 && <span className="xray-flow">→</span>}
              </div>
            ))}
          </div>
        ) : project.image ? (
          <img src={assetPath(project.image)} alt={`${project.title} screenshot`} loading="lazy" />
        ) : (
          <div className="project-image-fallback">{project.title}<br />Architecture-first case study</div>
        )}
      </div>
    </div>
  );
}
