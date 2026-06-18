'use client';

import { useTranslations } from 'next-intl';
import { Chip } from './Chip';

export function PrinciplesRow() {
  const t = useTranslations('pages.about');
  const items = t.raw('principles') as string[];

  return (
    <section className="mx-auto w-full max-w-3xl space-y-3 text-center">
      <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-secondary)' }}>
        {t('principlesTitle')}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((p) => (
          <Chip key={p} accent>
            {p}
          </Chip>
        ))}
      </div>
    </section>
  );
}
