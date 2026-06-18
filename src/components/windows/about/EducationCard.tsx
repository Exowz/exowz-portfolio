'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function EducationCard() {
  const t = useTranslations('pages.about.education');

  return (
    <div className="glass-card my-1 rounded-2xl p-5 md:p-6">
      <div className="flex items-start gap-4">
        {/* White plate keeps the dark/coloured school marks legible in both themes. */}
        <div
          className="hidden h-16 w-16 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl p-2 sm:flex"
          style={{ border: '1px solid var(--border)', background: '#ffffff' }}
          aria-hidden
        >
          <Image src="/images/logos/mines-psl.png" alt="" width={56} height={27} className="h-auto w-full object-contain" />
          <Image src="/images/logos/albert-school.png" alt="" width={56} height={8} className="h-auto w-full object-contain" />
        </div>
        <div className="space-y-1">
          <p className="text-base font-semibold text-foreground">{t('programme')}</p>
          <p className="text-sm" style={{ color: 'var(--accent-text)' }}>
            {t('schools')}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {t('grade')}
          </p>
        </div>
      </div>
    </div>
  );
}
