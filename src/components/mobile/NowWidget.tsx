'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/components/hooks/usePrefersReducedMotion';

/**
 * Springboard "Now" widget: a 2×2 tile whose items auto-scroll vertically so it
 * shows everything while staying compact. The list is rendered twice and the
 * track translates by exactly one copy (-50%) for a seamless loop. Under
 * reduced motion it's a static, scrollable list.
 */
export function NowWidget() {
  const t = useTranslations('now');
  const items = t.raw('items') as string[];
  const reduced = usePrefersReducedMotion();

  const rows = (prefix: string) =>
    items.map((item, i) => (
      <li
        key={`${prefix}-${i}`}
        className="mb-2 flex gap-1.5 text-[11px] leading-snug"
        style={{ color: 'var(--foreground)' }}
      >
        <span style={{ color: 'var(--accent)' }}>•</span>
        <span>{item}</span>
      </li>
    ));

  return (
    <div
      className="col-span-2 row-span-2 flex flex-col overflow-hidden rounded-3xl px-4 py-3"
      style={{
        background: 'var(--dock-item-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--dock-item-border)',
        boxShadow: 'var(--dock-item-shadow)',
      }}
    >
      <div className="flex shrink-0 items-baseline justify-between">
        <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          {t('title')}
        </span>
        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
          {t('updated')}
        </span>
      </div>

      <div
        className="relative mt-1.5 flex-1 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)',
        }}
      >
        {reduced ? (
          <ul className="h-full overflow-y-auto">{rows('s')}</ul>
        ) : (
          <motion.ul
            animate={{ y: ['0%', '-50%'] }}
            transition={{ duration: items.length * 3, ease: 'linear', repeat: Infinity }}
          >
            {rows('a')}
            {rows('b')}
          </motion.ul>
        )}
      </div>
    </div>
  );
}
