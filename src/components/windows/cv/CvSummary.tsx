'use client';

import { useLocale, useTranslations } from 'next-intl';
import { cvFor } from '@/data/cv';
import type { TailorResult } from '@/lib/cv/tailor';

export function CvSummary({ tailored }: { tailored?: TailorResult | null }) {
  const locale = useLocale();
  const t = useTranslations('cv');
  const c = cvFor(locale);

  return (
    <section id="summary" className="space-y-2">
      <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
        {t('sections.summary')}
      </h2>
      {tailored?.summary && (
        <div
          className="rounded-xl p-3"
          style={{ border: '1px solid var(--window-border)', background: 'color-mix(in srgb, var(--accent) 6%, transparent)' }}
        >
          <p className="leading-relaxed text-foreground">{tailored.summary}</p>
          <p className="mt-1 text-[10px]" style={{ color: 'var(--text-secondary)' }}>
            {t('tailor.disclaimer')}
          </p>
        </div>
      )}
      <p className="leading-relaxed text-foreground/90">{c.summary}</p>
    </section>
  );
}
