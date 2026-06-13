'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePrefersReducedMotion } from '@/components/hooks/usePrefersReducedMotion';
import { useAutoScroll } from '@/components/hooks/useAutoScroll';

/** Shared Now content: header plus an auto/manual-scrolling item list. */
export function NowWidgetBody() {
  const t = useTranslations('now');
  const items = t.raw('items') as string[];
  const reducedMotion = usePrefersReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  useAutoScroll(scrollRef, { enabled: !reducedMotion });

  const rows = (prefix: string) =>
    items.map((item, index) => (
      <li
        key={`${prefix}-${index}`}
        className="mb-2 flex gap-1.5 text-[11px] leading-snug"
        style={{ color: 'var(--foreground)' }}
      >
        <span style={{ color: 'var(--accent)' }}>•</span>
        <span>{item}</span>
      </li>
    ));

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-baseline justify-between gap-3">
        <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          {t('title')}
        </span>
        <span className="shrink-0 text-[10px]" style={{ color: 'var(--text-secondary)' }}>
          {t('updated')}
        </span>
      </div>

      <div
        ref={scrollRef}
        className="mt-1.5 min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <ul>{rows('a')}</ul>
        {!reducedMotion && <ul aria-hidden="true">{rows('b')}</ul>}
      </div>
    </div>
  );
}
