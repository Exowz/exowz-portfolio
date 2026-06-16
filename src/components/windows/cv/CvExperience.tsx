'use client';

import { useLocale, useTranslations } from 'next-intl';
import { cvFor } from '@/data/cv';
import type { TailorResult } from '@/lib/cv/tailor';

export function CvExperience({ tailored }: { tailored?: TailorResult | null }) {
  const locale = useLocale();
  const t = useTranslations('cv.sections');
  const c = cvFor(locale);
  const highlights = new Set(tailored?.experienceHighlights ?? []);

  return (
    <section id="experience" className="space-y-5">
      <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
        {t('experience')}
      </h2>
      {c.experience.map((e) => {
        const active = highlights.size > 0 && highlights.has(e.id);
        return (
          <div
            key={e.id}
            className={`space-y-1.5 transition-opacity ${highlights.size > 0 ? 'rounded-xl p-3' : ''}`}
            style={{
              opacity: highlights.size > 0 && !active ? 0.6 : 1,
              border: active ? '1px solid var(--accent)' : highlights.size > 0 ? '1px solid transparent' : undefined,
              background: active ? 'color-mix(in srgb, var(--accent) 5%, transparent)' : 'transparent',
            }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <div className="flex min-w-0 items-center gap-2">
                {active && <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />}
                <p className="font-semibold text-foreground">
                  {e.role} · {e.company}
                </p>
              </div>
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
        );
      })}
    </section>
  );
}
