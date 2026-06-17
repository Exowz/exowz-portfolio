'use client';

import { RefObject } from 'react';
import Image from 'next/image';
import type { CvCredential } from '@/data/cv';
import { CvModal } from './CvModal';

export function CredentialModal({
  credential,
  open,
  onClose,
  triggerRef,
}: {
  credential: CvCredential;
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
}) {
  return (
    <CvModal open={open} onClose={onClose} title={credential.title} triggerRef={triggerRef}>
      <div className="flex gap-4">
        <div className="relative h-20 w-20 shrink-0">
          <Image src={credential.image} alt={credential.title} fill className="object-contain" sizes="80px" />
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">{credential.body}</p>
      </div>
    </CvModal>
  );
}
