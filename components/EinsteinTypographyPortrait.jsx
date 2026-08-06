'use client';

import { useEffect, useRef, useState } from 'react';
import { assetPath } from '@/data/site';

const PORTRAIT_SIZE = 560;
const LENS_SIZE = 150;
const LENS_ZOOM = 1.8;
const techStack = [
  'Python',
  'Java',
  'PHP',
  'JavaScript',
  'C++',
  'SQL',
  'Laravel',
  'Express.js',
  'Tailwind',
  'MySQL',
  'MariaDB',
  'NLP',
  'LLM',
  'Git',
  'GitHub',
  'Postman',
  'XAMPP'
];
const portraitText = `${techStack.join('  ')}  `.repeat(360);

export default function EinsteinTypographyPortrait() {
  const portraitRef = useRef(null);
  const [lens, setLens] = useState({ active: false, x: PORTRAIT_SIZE / 2, y: PORTRAIT_SIZE / 2 });

  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait) return undefined;

    function updateScale() {
      const rect = portrait.getBoundingClientRect();
      const scale = rect.width / PORTRAIT_SIZE;
      portrait.style.setProperty('--portrait-scale', `${scale}`);
    }

    const observer = new ResizeObserver(updateScale);
    observer.observe(portrait);
    updateScale();

    return () => observer.disconnect();
  }, []);

  function handlePointerMove(event) {
    const portrait = portraitRef.current;
    if (!portrait) return;
    const rect = portrait.getBoundingClientRect();
    const scale = rect.width / PORTRAIT_SIZE || 1;
    const x = Math.min(PORTRAIT_SIZE, Math.max(0, (event.clientX - rect.left) / scale));
    const y = Math.min(PORTRAIT_SIZE, Math.max(0, (event.clientY - rect.top) / scale));
    setLens({ active: true, x, y });
  }

  return (
    <div
      ref={portraitRef}
      className={`typography-portrait ${lens.active ? 'lens-active' : ''}`}
      style={{
        '--portrait-image': `url("${assetPath('/assets/Einstein.png')}")`,
        '--lens-x': `${lens.x}px`,
        '--lens-y': `${lens.y}px`,
        '--lens-size': `${LENS_SIZE}px`,
        '--lens-zoom': LENS_ZOOM
      }}
      aria-label="Einstein typography portrait built from Mary Ynah's technology stack"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setLens((current) => ({ ...current, active: false }))}
    >
      <p className="typography-portrait-text" aria-hidden="true">
        {portraitText}
      </p>
      <div className="portrait-lens" aria-hidden="true">
        <div className="portrait-lens-glass">
          <p className="portrait-lens-text">{portraitText}</p>
        </div>
      </div>
    </div>
  );
}
