'use client';

import { RefObject } from 'react';
import type { CvEducationEntry } from '@/data/cv';
import { CvModal } from './CvModal';

export function EducationModal({
  entry,
  open,
  onClose,
  triggerRef,
}: {
  entry: CvEducationEntry;
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
}) {
  return (
    <CvModal open={open} onClose={onClose} title={entry.institution} triggerRef={triggerRef}>
      <p className="mb-2 text-sm" style={{ color: 'var(--accent-text)' }}>
        {entry.degree}
      </p>
      <p className="mb-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
        {entry.period}
      </p>
      {entry.detail ? (
        <p className="text-sm leading-relaxed text-foreground/90">{entry.detail}</p>
      ) : entry.note ? (
        <p className="text-sm text-foreground/80">{entry.note}</p>
      ) : null}
    </CvModal>
  );
}
