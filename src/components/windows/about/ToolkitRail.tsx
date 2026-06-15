'use client';

import { useTranslations } from 'next-intl';
import { Chip } from './Chip';

const GROUPS = ['dataAI', 'web', 'cloud', 'domain'] as const;

export function ToolkitRail() {
  const t = useTranslations('pages.about.toolkit');

  return (
    <section className="mx-auto w-full max-w-3xl space-y-3">
      {GROUPS.map((g) => (
        <div key={g} className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="shrink-0 text-[11px] uppercase tracking-wider sm:w-32" style={{ color: 'var(--accent-text)' }}>
            {t(`${g}Label`)}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {t(g).split(',').map((tok) => (
              <Chip key={tok}>{tok.trim()}</Chip>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
