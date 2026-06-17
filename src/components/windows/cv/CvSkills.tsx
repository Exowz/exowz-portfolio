'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Chip } from '@/components/windows/about/Chip';
import { cvFor } from '@/data/cv';
import type { TailorResult } from '@/lib/cv/tailor';

export function CvSkills({ tailored }: { tailored?: TailorResult | null }) {
  const locale = useLocale();
  const t = useTranslations('cv.sections');
  const c = cvFor(locale);
  const highlights = new Set(tailored?.skillHighlights ?? []);

  return (
    <section id="skills" className="glass-card space-y-3 rounded-2xl p-5">
      <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
        {t('skills')}
      </h2>
      {c.skills.map((g) => (
        <div key={g.category} className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-3">
          <span className="shrink-0 text-[11px] uppercase tracking-wider sm:w-40" style={{ color: 'var(--text-secondary)' }}>
            {g.category}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {g.techs.map((tk) => {
              const active = highlights.size > 0 && highlights.has(tk);
              return (
                <span key={tk} style={{ opacity: highlights.size > 0 && !active ? 0.5 : 1 }}>
                  <Chip accent={active}>{tk}</Chip>
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
