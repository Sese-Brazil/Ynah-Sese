'use client';

import { useState } from 'react';
import { assetPath } from '@/data/site';

export default function PhoneGallery({ label, images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  function move(direction) {
    setActiveIndex((value) => (value + direction + total) % total);
  }

  return (
    <div className="phone-gallery">
      {images.map((image, index) => (
        <img
          className={`phone-slide ${index === activeIndex ? 'active' : ''}`}
          src={assetPath(image.src)}
          alt={`${label} screen ${index + 1}`}
          key={image.src}
        />
      ))}
      {total > 1 && (
        <>
          <button className="phone-arrow phone-arrow-left" type="button" aria-label={`Previous ${label} screen`} onClick={() => move(-1)}>‹</button>
          <button className="phone-arrow phone-arrow-right" type="button" aria-label={`Next ${label} screen`} onClick={() => move(1)}>›</button>
        </>
      )}
      <span className="screen-label">{label}</span>
    </div>
  );
}
