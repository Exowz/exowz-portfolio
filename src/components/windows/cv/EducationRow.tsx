'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { CvCredential, CvEducationEntry } from '@/data/cv';
import { BadgeIsland } from './BadgeIsland';
import { EducationModal } from './EducationModal';

export function EducationRow({ entry, credentials }: { entry: CvEducationEntry; credentials: CvCredential[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const entryCredentials = (entry.badges ?? [])
    .map((id) => credentials.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is CvCredential => Boolean(candidate));
  const layoutId = `cv-edu-${entry.id}`;

  return (
    <div className="flex items-stretch gap-3">
      <motion.button
        ref={buttonRef}
        layoutId={layoutId}
        type="button"
        onClick={() => setOpen(true)}
        className="glass-card flex flex-1 items-center gap-3 rounded-xl p-4 text-left transition-shadow hover:shadow-lg"
      >
        {entry.logo && (
          // White plate: institution logos are dark/coloured marks, so they need
          // a constant light backing to stay legible in both themes.
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg p-1.5"
            style={{ background: '#ffffff', border: '1px solid var(--border)' }}
          >
            <Image src={entry.logo} alt="" width={40} height={40} className="h-full w-full object-contain" />
          </span>
        )}
        <span className="flex min-w-0 flex-col items-start gap-0.5">
          <motion.span layoutId={`${layoutId}-title`} className="font-medium text-foreground">
            {entry.degree}
          </motion.span>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {entry.institution} · {entry.period}
          </span>
        </span>
      </motion.button>
      {entryCredentials.map((credential) => (
        <BadgeIsland key={credential.id} credential={credential} />
      ))}
      <EducationModal entry={entry} open={open} onClose={() => setOpen(false)} triggerRef={buttonRef} layoutId={layoutId} />
    </div>
  );
}
