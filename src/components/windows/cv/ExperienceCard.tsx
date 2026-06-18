'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { CvExperience } from '@/data/cv';
import { ExperienceModal } from './ExperienceModal';

export function ExperienceCard({ entry }: { entry: CvExperience }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const layoutId = `cv-exp-${entry.id}`;

  return (
    <>
      <motion.button
        ref={buttonRef}
        layoutId={layoutId}
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
      </motion.button>
      <ExperienceModal entry={entry} open={open} onClose={() => setOpen(false)} triggerRef={buttonRef} layoutId={layoutId} />
    </>
  );
}
