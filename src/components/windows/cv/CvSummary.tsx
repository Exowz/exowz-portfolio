'use client';

import { useLocale, useTranslations } from 'next-intl';
import { cvFor } from '@/data/cv';

export function CvSummary() {
  const locale = useLocale();
  const t = useTranslations('cv.sections');
  const c = cvFor(locale);

  return (
    <section id="summary" className="space-y-2">
      <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
        {t('summary')}
      </h2>
      <p className="leading-relaxed text-foreground/90">{c.summary}</p>
    </section>
  );
}
