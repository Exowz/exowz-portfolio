'use client';

import { RefObject } from 'react';
import type { CvExperience } from '@/data/cv';
import { CvModal } from './CvModal';

export function ExperienceModal({
  entry,
  open,
  onClose,
  triggerRef,
  layoutId,
}: {
  entry: CvExperience;
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  layoutId?: string;
}) {
  return (
    <CvModal
      open={open}
      onClose={onClose}
      title={entry.role}
      triggerRef={triggerRef}
      layoutId={layoutId}
      titleLayoutId={layoutId ? `${layoutId}-title` : undefined}
    >
      <p className="mb-1 text-sm font-medium" style={{ color: 'var(--accent-text)' }}>
        {entry.company}
      </p>
      <p className="mb-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
        {entry.period} · {entry.location}
      </p>
      {entry.detail ? (
        <p className="text-sm leading-relaxed text-foreground/90">{entry.detail}</p>
      ) : (
        <ul className="ml-4 list-disc space-y-1 text-sm text-foreground/80">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
    </CvModal>
  );
}
