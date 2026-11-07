'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '@/data/projects';
import { assetPath } from '@/data/site';

export default function CommandPalette({ darkMode, onClose, onThemeToggle, open, profile }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  const commands = useMemo(() => [
    { label: 'Go to Home', group: 'Navigation', run: () => location.assign('/#home') },
    { label: 'Open AURA AI project', group: 'Work', run: () => location.assign('/work/aura-ai') },
    { label: 'Go to Tech Stack', group: 'Navigation', run: () => location.assign('/#tech-stack') },
    { label: 'Open Resume', group: 'Resume', run: () => window.open(assetPath(profile.resume.path), '_blank', 'noreferrer') },
    { label: 'Download Resume', group: 'Resume', run: () => location.assign(assetPath(profile.resume.path)) },
    {
      label: 'Copy Email',
      group: 'Contact',
      run: async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setFeedback('Email copied.');
        } catch (error) {
          setFeedback(profile.email);
        }
      }
    },
    { label: 'Open GitHub', group: 'Contact', run: () => window.open(profile.github, '_blank', 'noreferrer') },
    { label: 'Open LinkedIn', group: 'Contact', run: () => window.open(profile.linkedin, '_blank', 'noreferrer') },
    { label: `Toggle Theme (${darkMode ? 'Light' : 'Dark'})`, group: 'System', run: () => onThemeToggle(dialogRef.current) },
    ...projects.map((project) => ({
      label: `Open ${project.title}`,
      group: 'Projects',
      run: () => location.assign(`/work/${project.slug}`)
    }))
  ], [darkMode, onThemeToggle, profile]);

  const filteredCommands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter((command) => `${command.label} ${command.group}`.toLowerCase().includes(normalized));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('palette-locked');
    setQuery('');
    setActiveIndex(0);
    setFeedback('');
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => document.body.classList.remove('palette-locked');
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  function closePalette() {
    onClose();
  }

  function runCommand(command) {
    command.run();
    if (command.label !== 'Copy Email') closePalette();
  }

  function handleKeyDown(event) {
    const focusable = dialogRef.current?.querySelectorAll('input, button');
    if (event.key === 'Escape') {
      event.preventDefault();
      closePalette();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((value) => Math.min(value + 1, filteredCommands.length - 1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((value) => Math.max(value - 1, 0));
      return;
    }
    if (event.key === 'Enter' && filteredCommands[activeIndex]) {
      event.preventDefault();
      runCommand(filteredCommands[activeIndex]);
      return;
    }
    if (event.key === 'Tab' && focusable?.length) {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <div className="command-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closePalette()}>
      <div
        ref={dialogRef}
        className="command-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={handleKeyDown}
      >
        <input
          ref={inputRef}
          className="command-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search commands..."
          aria-label="Search commands"
        />
        <div className="command-list" role="listbox" aria-label="Available commands">
          {filteredCommands.map((command, index) => (
            <button
              key={`${command.group}-${command.label}`}
              className={`command-item ${index === activeIndex ? 'active' : ''}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => runCommand(command)}
            >
              <strong>{command.label}</strong>
              <span>{command.group}</span>
            </button>
          ))}
          {!filteredCommands.length && <div className="command-item">No commands found.</div>}
        </div>
        {feedback && <p className="copy-feedback px-4 pb-4">{feedback}</p>}
      </div>
    </div>
  );
}
