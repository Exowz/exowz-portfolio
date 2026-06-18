'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { CvCredential, CvEducationEntry } from '@/data/cv';
import { BadgeIsland } from './BadgeIsland';
import { EducationModal } from './EducationModal';

export function EducationRow({ entry, credentials }: { entry: CvEducationEntry; credentials: CvCredential[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const credential = entry.badge ? credentials.find((candidate) => candidate.id === entry.badge) : undefined;
  const layoutId = `cv-edu-${entry.id}`;

  return (
    <div className="flex items-stretch gap-3">
      <motion.button
        ref={buttonRef}
        layoutId={layoutId}
        type="button"
        onClick={() => setOpen(true)}
        className="glass-card flex flex-1 flex-col items-start gap-0.5 rounded-xl p-4 text-left transition-shadow hover:shadow-lg"
      >
        <p className="font-medium text-foreground">{entry.degree}</p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {entry.institution} · {entry.period}
        </p>
      </motion.button>
      {credential && <BadgeIsland credential={credential} />}
      <EducationModal entry={entry} open={open} onClose={() => setOpen(false)} triggerRef={buttonRef} layoutId={layoutId} />
    </div>
  );
}
