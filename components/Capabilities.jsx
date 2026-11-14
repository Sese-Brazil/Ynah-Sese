'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { capabilities, capabilityFilters, categoryLabels, keyboardRows } from '@/data/capabilities';

const lightPalettes = [
  { id: 'ice', label: 'Ice', colors: ['#e1f7ff', '#27c9dc', '#ffb547'] },
  { id: 'rgb', label: 'RGB', colors: ['#1b70ff', '#ff4fd8', '#ff2d4b'] },
  { id: 'mono', label: 'Mono', colors: ['#ffffff', '#bec6d0', '#828b97'] },
  { id: 'signal', label: 'Signal', colors: ['#ff4444', '#ffb547', '#f5f8ff'] }
];

function CategoryFilters({ activeFilter, onChange }) {
  return (
    <div className="capability-toolbar" aria-label="Filter technology stack">
      {capabilityFilters.map((filter) => (
        <button
          className={`capability-filter ${activeFilter === filter.id ? 'active' : ''}`}
          key={filter.id}
          type="button"
          onClick={() => onChange(filter.id)}
          aria-pressed={activeFilter === filter.id}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function KeycapShell({ children, className = '', style, ariaLabel, type = 'button', disabled = false }) {
  if (type === 'span') {
    return (
      <span className={`keyboard-key ${className}`} style={style} aria-hidden="true">
        <span className="keycap-body">
          <span className="keycap-top">{children}</span>
        </span>
      </span>
    );
  }

  return (
    <button
      className={`keyboard-key ${className}`}
      type="button"
      style={style}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <span className="keycap-body">
        <span className="keycap-top">{children}</span>
      </span>
    </button>
  );
}

function ModifierKey({ item }) {
  return (
    <KeycapShell
      className={`modifier-key modifier-${item.variant} ${item.label ? '' : 'blank-key'}`}
      style={{ '--key-span': item.unit * 4 }}
      type="span"
    >
      <span className="modifier-label">{item.label}</span>
    </KeycapShell>
  );
}

function EmptyLetterKey({ letter }) {
  return (
    <KeycapShell className="letter-key empty-letter-key" style={{ '--key-span': 4 }} type="span">
      <span className="letter-hint">{letter}</span>
    </KeycapShell>
  );
}

function TechKeycap({ item, activeFilter, keyIndex }) {
  const tech = item.skill;
  const isRelevant = activeFilter === 'all' || tech.category === activeFilter;
  const category = categoryLabels[tech.category] || tech.category;
  const keyHint = item.letter || item.label;
  const lightLane = ['blue', 'pink', 'red'][keyIndex % 3];

  return (
    <KeycapShell
      className={`letter-key tech-letter-key rgb-light-${lightLane} ${item.type === 'neutral' ? 'wide-tech-key' : ''} ${isRelevant ? 'active' : 'filtered'}`}
      style={{ '--key-span': (item.unit || 1) * 4, '--wave-index': keyIndex, ...tech.styles }}
      ariaLabel={`${tech.name} - ${category}`}
      disabled={!isRelevant}
    >
      {isRelevant ? (
        <>
          <span className="tech-key-icon" aria-hidden="true">
            {tech.iconClass ? <i className={tech.iconClass} /> : <span>{tech.mark}</span>}
          </span>
          <span className="tech-key-label">{tech.name}</span>
        </>
      ) : (
        <span className="letter-hint">{keyHint}</span>
      )}
    </KeycapShell>
  );
}

function KeyboardRow({ row, activeFilter, rowIndex }) {
  return (
    <div className={`keyboard-row keyboard-row-${row.id}`}>
      {row.keys.map((item, index) => {
        const key = `${row.id}-${item.label || item.letter}-${index}`;
        if (item.skill) {
          return (
            <TechKeycap
              item={item}
              activeFilter={activeFilter}
              key={key}
              keyIndex={(rowIndex * 14) + index}
            />
          );
        }
        if (item.type === 'neutral') return <ModifierKey item={item} key={key} />;
        return <EmptyLetterKey letter={item.letter} key={key} />;
      })}
    </div>
  );
}

function KeyboardLightToggle({ lightsOn, onToggle }) {
  return (
    <button
      className={`keyboard-light-toggle ${lightsOn ? 'active' : ''}`}
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={lightsOn}
      aria-label={`Turn keyboard lights ${lightsOn ? 'off' : 'on'}`}
    >
      <span className="keyboard-switch-track" aria-hidden="true">
        <span className="keyboard-switch-thumb" />
        <span className="keyboard-switch-label">{lightsOn ? 'On' : 'Off'}</span>
      </span>
    </button>
  );
}

function KeyboardPaletteSelect({ palette, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, lightPalettes.findIndex((option) => option.id === palette)));
  const controlRef = useRef(null);
  const selectedPalette = lightPalettes.find((option) => option.id === palette) || lightPalettes[0];

  useEffect(() => {
    if (!open) return undefined;

    function handlePointerDown(event) {
      if (!controlRef.current?.contains(event.target)) setOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  function selectPalette(option) {
    onChange(option.id);
    setActiveIndex(lightPalettes.findIndex((item) => item.id === option.id));
    setOpen(false);
  }

  function handleMenuKeyDown(event) {
    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        setOpen(true);
        setActiveIndex(Math.max(0, lightPalettes.findIndex((option) => option.id === palette)));
      }
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key)) return;
    event.preventDefault();

    if (event.key === 'Enter' || event.key === ' ') {
      selectPalette(lightPalettes[activeIndex]);
      return;
    }

    let nextIndex = activeIndex;
    if (event.key === 'ArrowDown') nextIndex = (activeIndex + 1) % lightPalettes.length;
    if (event.key === 'ArrowUp') nextIndex = (activeIndex - 1 + lightPalettes.length) % lightPalettes.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lightPalettes.length - 1;
    setActiveIndex(nextIndex);
  }

  return (
    <div className="keyboard-palette-control" ref={controlRef} onKeyDown={handleMenuKeyDown}>
      <button
        className="keyboard-palette-trigger"
        type="button"
        aria-label={`Keyboard light palette: ${selectedPalette.label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="keyboard-palette-menu"
        onClick={() => {
          setActiveIndex(Math.max(0, lightPalettes.findIndex((option) => option.id === palette)));
          setOpen((value) => !value);
        }}
      >
        <span className="keyboard-palette-dot" aria-hidden="true" />
        <span>{selectedPalette.label}</span>
        <span className="keyboard-palette-chevron" aria-hidden="true" />
      </button>
      {open && (
        <div
          className="keyboard-palette-menu"
          id="keyboard-palette-menu"
          role="listbox"
          aria-label="Keyboard light palettes"
        >
          {lightPalettes.map((option, index) => (
            <button
              className={`keyboard-palette-option ${option.id === palette ? 'selected' : ''} ${index === activeIndex ? 'active' : ''}`}
              type="button"
              role="option"
              aria-selected={option.id === palette}
              key={option.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => selectPalette(option)}
            >
              <span className="keyboard-palette-swatches" aria-hidden="true">
                {option.colors.map((color) => <span key={color} style={{ background: color }} />)}
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TechKeyboard({ activeFilter, lightsOn, lightWave, palette }) {
  return (
    <div className={`keyboard-desktop keyboard-scroll-shell palette-${palette} ${lightsOn ? 'lights-on' : 'lights-off'} ${lightWave ? 'light-wave' : ''}`}>
      <div className="keyboard-frame">
        <div className="keyboard-plate" aria-label="Technology keyboard">
          {keyboardRows.map((row, rowIndex) => (
            <KeyboardRow activeFilter={activeFilter} key={row.id} row={row} rowIndex={rowIndex} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniTechKey({ skill, activeFilter, keyIndex }) {
  const isRelevant = activeFilter === 'all' || skill.category === activeFilter;
  const category = categoryLabels[skill.category] || skill.category;
  const lightLane = ['blue', 'pink', 'red'][keyIndex % 3];

  return (
    <button
      className={`mini-tech-key tech-letter-key rgb-light-${lightLane} ${isRelevant ? 'active' : 'filtered'}`}
      style={{ '--wave-index': keyIndex, ...skill.styles }}
      type="button"
      aria-label={`${skill.name} - ${category}`}
      disabled={!isRelevant}
    >
      <span className="keycap-body">
        <span className="keycap-top">
          <span className="tech-key-icon" aria-hidden="true">
            {skill.iconClass ? <i className={skill.iconClass} /> : <span>{skill.mark}</span>}
          </span>
          <span className="tech-key-label">{skill.name}</span>
        </span>
      </span>
    </button>
  );
}

function MiniTechKeyboard({ activeFilter, lightsOn, lightWave, palette }) {
  const groupedCapabilities = useMemo(
    () => capabilityFilters
      .filter((filter) => filter.id !== 'all')
      .filter((filter) => activeFilter === 'all' || filter.id === activeFilter)
      .map((filter) => ({
        ...filter,
        skills: capabilities.filter((skill) => skill.category === filter.id)
      }))
      .filter((group) => group.skills.length),
    [activeFilter]
  );

  let keyIndex = 0;

  return (
    <div className={`keyboard-mini palette-${palette} ${lightsOn ? 'lights-on' : 'lights-off'} ${lightWave ? 'light-wave' : ''}`}>
      {groupedCapabilities.map((group) => {
        return (
          <section className="mini-key-group" key={group.id}>
            <div className="mini-key-group-header">
              <span>{group.label}</span>
              <small>{group.skills.length} tools</small>
            </div>
            <div className="mini-key-grid">
              {group.skills.map((skill) => {
                keyIndex += 1;
                return (
                  <MiniTechKey
                    activeFilter={activeFilter}
                    key={skill.name}
                    keyIndex={keyIndex}
                    skill={skill}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function CapabilityLegend() {
  const categories = useMemo(
    () => [...new Set(capabilities.map((skill) => skill.category))],
    []
  );

  return (
    <div className="capability-legend" aria-label="Technology categories">
      {categories.map((category) => (
        <span className="legend-item" key={category}>
          <span aria-hidden="true" />
          {categoryLabels[category]}
        </span>
      ))}
    </div>
  );
}

export default function Capabilities() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightsOn, setLightsOn] = useState(false);
  const [lightWave, setLightWave] = useState(false);
  const [palette, setPalette] = useState('ice');

  useEffect(() => {
    try {
      const savedPalette = window.localStorage.getItem('keyboard-light-palette');
      if (lightPalettes.some((option) => option.id === savedPalette)) setPalette(savedPalette);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (!lightsOn) {
      setLightWave(false);
      return undefined;
    }

    setLightWave(true);
    const timer = window.setTimeout(() => setLightWave(false), 1700);
    return () => window.clearTimeout(timer);
  }, [lightsOn, palette]);

  function changePalette(nextPalette) {
    setPalette(nextPalette);
    try {
      window.localStorage.setItem('keyboard-light-palette', nextPalette);
    } catch (error) {}
  }

  return (
    <section className="section" id="tech-stack">
      <SectionHeading kicker="Tech Stack" title="Technology I have worked with.">
        Tools and concepts I have used through academic projects, capstone work, and personal builds while continuing to strengthen my depth through practice.
      </SectionHeading>

      <div className="capability-keyboard mt-8">
        <div className="capability-controls">
          <CategoryFilters activeFilter={activeFilter} onChange={setActiveFilter} />
        </div>
        <div className={`keyboard-console palette-${palette}`}>
          <div className="keyboard-console-header">
            <div className="keyboard-console-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="keyboard-console-controls">
              <span className="keyboard-console-label">Lighting</span>
              <div className="keyboard-light-controls">
                <KeyboardPaletteSelect palette={palette} onChange={changePalette} />
                <KeyboardLightToggle lightsOn={lightsOn} onToggle={() => setLightsOn((value) => !value)} />
              </div>
            </div>
          </div>
          <TechKeyboard activeFilter={activeFilter} lightsOn={lightsOn} lightWave={lightWave} palette={palette} />
          <MiniTechKeyboard activeFilter={activeFilter} lightsOn={lightsOn} lightWave={lightWave} palette={palette} />
        </div>
        <p className="capability-note">Select a category to highlight related technologies.</p>
      </div>
    </section>
  );
}                                                                       
