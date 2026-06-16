'use client';

import { useLocale, useTranslations } from 'next-intl';
import { cvFor } from '@/data/cv';

export function CvExperience() {
  const locale = useLocale();
  const t = useTranslations('cv.sections');
  const c = cvFor(locale);

  return (
    <section id="experience" className="space-y-5">
      <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
        {t('experience')}
      </h2>
      {c.experience.map((e) => (
        <div key={`${e.company}-${e.period}`} className="space-y-1.5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <p className="font-semibold text-foreground">
              {e.role} · {e.company}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {e.period} · {e.location}
            </p>
          </div>
          <ul className="ml-4 list-disc space-y-1 text-sm text-foreground/80">
            {e.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
