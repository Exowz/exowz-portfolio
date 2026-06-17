'use client';

import { useRef, useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { CvModal } from './CvModal';

export function AiTailoredExplainer() {
  const t = useTranslations('cv.tailor');
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('explainerTitle')}
        className="mt-1 flex items-center gap-1 rounded-lg px-2 py-1 text-xs"
        style={{ color: 'var(--text-secondary)', border: '1px solid var(--window-border)' }}
      >
        <IconInfoCircle className="h-4 w-4" />
        <span className="hidden sm:inline">{t('explainerLink')}</span>
      </button>
      <CvModal open={open} onClose={() => setOpen(false)} title={t('explainerTitle')} triggerRef={buttonRef}>
        <p className="text-sm leading-relaxed text-foreground/90">{t('explainerBody')}</p>
      </CvModal>
    </>
  );
}
