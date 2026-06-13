'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function NowWidget() {
  const t = useTranslations('now');
  const items = t.raw('items') as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
      className="mt-4 rounded-3xl px-5 py-4"
      style={{
        background: 'var(--dock-item-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--dock-item-border)',
        boxShadow: 'var(--dock-item-shadow)',
      }}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          {t('title')}
        </span>
        <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
          {t('updatedLabel')} · {t('updated')}
        </span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2 text-xs leading-snug" style={{ color: 'var(--foreground)' }}>
            <span style={{ color: 'var(--accent)' }}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
