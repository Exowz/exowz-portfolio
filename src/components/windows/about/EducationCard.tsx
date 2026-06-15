'use client';

import { useTranslations } from 'next-intl';

export function EducationCard() {
  const t = useTranslations('pages.about.education');

  return (
    <div className="glass-card my-1 rounded-2xl p-5 md:p-6">
      <div className="flex items-start gap-4">
        {/* Placeholder for cleared school logos/photo; swap when assets are supplied. */}
        <div
          className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl text-sm font-semibold sm:flex"
          style={{ border: '1px solid var(--window-border)', color: 'var(--text-secondary)' }}
          aria-hidden
        >
          M+A
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
