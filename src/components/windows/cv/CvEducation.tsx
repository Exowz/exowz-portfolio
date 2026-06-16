'use client';

import { useLocale, useTranslations } from 'next-intl';
import { EducationCard } from '@/components/windows/about/EducationCard';
import { cvFor } from '@/data/cv';

export function CvEducation() {
  const locale = useLocale();
  const t = useTranslations('cv.sections');
  const c = cvFor(locale);

  return (
    <section id="education" className="space-y-4">
      <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
        {t('education')}
      </h2>
      <EducationCard />
      <div className="space-y-3">
        {c.education.map((e) => (
          <div key={`${e.institution}-${e.period}`} className="flex flex-wrap items-baseline justify-between gap-x-3">
            <div>
              <p className="text-sm font-medium text-foreground">{e.degree}</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {e.institution}
                {e.note ? ` · ${e.note}` : ''}
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {e.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
