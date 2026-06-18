'use client';

import { useTranslations } from 'next-intl';

export function NowExpandedContent() {
  const t = useTranslations('now');
  const items = t.raw('items') as string[];

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>
            {t('title')}
          </h2>
          <span className="shrink-0 text-xs" style={{ color: 'var(--text-secondary)' }}>
            {t('updatedLabel')} · {t('updated')}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl border px-4 py-3 text-sm leading-relaxed"
            style={{
              color: 'var(--foreground)',
              borderColor: 'var(--window-border)',
              background: 'color-mix(in srgb, var(--window-bg) 70%, transparent)',
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
