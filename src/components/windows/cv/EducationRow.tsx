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
        {entry.logos && entry.logos.length > 0 && (
          // White plate: institution logos are dark/coloured marks, so they need
          // a constant light backing to stay legible in both themes. Joint
          // degrees (e.g. Mines × Albert) stack their logos here.
          <span
            className="flex h-12 w-12 shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg p-1.5"
            style={{ background: '#ffffff', border: '1px solid var(--border)' }}
          >
            {entry.logos.map((logo) => (
              <Image key={logo} src={logo} alt="" width={44} height={44} className="h-auto w-full object-contain" />
            ))}
          </span>
        )}
        <span className="flex min-w-0 flex-col items-start gap-0.5">
          <motion.span layoutId={`${layoutId}-title`} className="font-medium text-foreground">
            {entry.degree}
          </motion.span>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            <motion.span layoutId={`${layoutId}-subtitle`} className="font-medium" style={{ color: 'var(--accent-text)' }}>
              {entry.institution}
            </motion.span>
            {` · ${entry.period}`}
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
