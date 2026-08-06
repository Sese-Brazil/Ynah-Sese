'use client';

import { useEffect, useMemo, useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { capabilities, capabilityFilters, categoryLabels, keyboardRows } from '@/data/capabilities';

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
      aria-pressed={lightsOn}
    >
      <span aria-hidden="true" />
      Keyboard lights {lightsOn ? 'on' : 'off'}
    </button>
  );
}

function TechKeyboard({ activeFilter, lightsOn, lightWave }) {
  return (
    <div className={`keyboard-desktop keyboard-scroll-shell ${lightsOn ? 'lights-on' : 'lights-off'} ${lightWave ? 'light-wave' : ''}`}>
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

function MiniTechKeyboard({ activeFilter, lightsOn, lightWave }) {
  const groupedCapabilities = useMemo(
    () => capabilityFilters
      .filter((filter) => filter.id !== 'all')
      .map((filter) => ({
        ...filter,
        skills: capabilities.filter((skill) => skill.category === filter.id)
      }))
      .filter((group) => group.skills.length),
    []
  );

  let keyIndex = 0;

  return (
    <div className={`keyboard-mini ${lightsOn ? 'lights-on' : 'lights-off'} ${lightWave ? 'light-wave' : ''}`}>
      {groupedCapabilities.map((group) => {
        const groupIsMuted = activeFilter !== 'all' && activeFilter !== group.id;
        return (
          <section className={`mini-key-group ${groupIsMuted ? 'muted' : ''}`} key={group.id}>
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

  useEffect(() => {
    if (!lightsOn) {
      setLightWave(false);
      return undefined;
    }

    setLightWave(true);
    const timer = window.setTimeout(() => setLightWave(false), 1700);
    return () => window.clearTimeout(timer);
  }, [lightsOn]);

  return (
    <section className="section" id="capabilities">
      <SectionHeading kicker="Capabilities" title="Technology I have worked with.">
        Tools and concepts I have used through academic projects, capstone work, and personal builds while continuing to strengthen my depth through practice.
      </SectionHeading>

      <div className="capability-keyboard mt-8">
        <div className="capability-controls">
          <CategoryFilters activeFilter={activeFilter} onChange={setActiveFilter} />
          <KeyboardLightToggle lightsOn={lightsOn} onToggle={() => setLightsOn((value) => !value)} />
        </div>
        <TechKeyboard activeFilter={activeFilter} lightsOn={lightsOn} lightWave={lightWave} />
        <MiniTechKeyboard activeFilter={activeFilter} lightsOn={lightsOn} lightWave={lightWave} />
        <p className="capability-note">Select a category to highlight related technologies.</p>
      </div>
    </section>
  );
}                                                                       
