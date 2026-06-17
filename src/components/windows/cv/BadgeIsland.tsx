'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { CvCredential } from '@/data/cv';
import { CredentialModal } from './CredentialModal';

export function BadgeIsland({ credential }: { credential: CvCredential }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={credential.title}
        className="glass-card flex shrink-0 items-center justify-center rounded-xl p-2 transition-shadow hover:shadow-lg"
      >
        <div className="relative h-12 w-12">
          <Image src={credential.image} alt={credential.title} fill className="object-contain" sizes="48px" />
        </div>
      </button>
      <CredentialModal credential={credential} open={open} onClose={() => setOpen(false)} triggerRef={buttonRef} />
    </>
  );
}
