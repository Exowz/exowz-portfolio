'use client';

import { useRef, useState } from 'react';
import type { CvExperience } from '@/data/cv';
import { ExperienceModal } from './ExperienceModal';

export function ExperienceCard({ entry }: { entry: CvExperience }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        className="glass-card flex w-full flex-col items-start gap-1 rounded-xl p-4 text-left transition-shadow hover:shadow-lg"
      >
        <p className="font-semibold text-foreground">{entry.role}</p>
        <p className="text-sm" style={{ color: 'var(--accent-text)' }}>
          {entry.company}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {entry.period} · {entry.location}
        </p>
      </button>
      <ExperienceModal entry={entry} open={open} onClose={() => setOpen(false)} triggerRef={buttonRef} />
    </>
  );
}
