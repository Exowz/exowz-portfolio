'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { IconWifi, IconBattery3 } from '@tabler/icons-react';
import { useClock } from '@/components/hooks/useClock';

/** iOS-style status bar: live clock on the left, decorative indicators on the right. */
export function StatusBar({ onOpenControlCenter }: { onOpenControlCenter?: () => void }) {
  const locale = useLocale();
  const t = useTranslations('controlCenter');
  const time = useClock(locale);
  const indicators = (
    <>
      <IconWifi className="h-4 w-4" />
      <IconBattery3 className="h-4 w-4" />
    </>
  );

  if (onOpenControlCenter) {
    return (
      <motion.button
        type="button"
        onClick={onOpenControlCenter}
        aria-label={t('open')}
        className="relative flex w-full items-center justify-between px-5 pb-1 text-sm font-medium active:scale-[0.995]"
        style={{ color: 'var(--foreground)', paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
      >
        <time className="font-mono tracking-wider tabular-nums">{time}</time>
        <span className="relative flex items-center gap-1.5 rounded-full px-1.5 py-1">
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid var(--foreground)' }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: [0, 0.14, 0], scale: [0.92, 1.12, 1.2] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 5, ease: 'easeOut' }}
          />
          {indicators}
        </span>
      </motion.button>
    );
  }

  return (
    <div
      className="flex items-center justify-between px-5 pb-1 text-sm font-medium"
      style={{ color: 'var(--foreground)', paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
    >
      <time className="font-mono tracking-wider tabular-nums">{time}</time>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {indicators}
      </div>
    </div>
  );
}
