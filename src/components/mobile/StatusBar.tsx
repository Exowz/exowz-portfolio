'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { IconWifi, IconBattery3 } from '@tabler/icons-react';
import { useClock } from '@/components/hooks/useClock';

/** iOS-style status bar: live clock on the left, decorative indicators on the right. */
export function StatusBar({
  onOpenControlCenter,
  controlCenterOpen = false,
}: {
  onOpenControlCenter?: () => void;
  controlCenterOpen?: boolean;
}) {
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
      <div
        className="relative flex w-full items-center justify-between px-5 pb-1 text-sm font-medium"
        style={{ color: 'var(--foreground)', paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
      >
        <time className="font-mono tracking-wider tabular-nums">{time}</time>
        <motion.button
          type="button"
          onClick={onOpenControlCenter}
          aria-label={t('open')}
          aria-pressed={controlCenterOpen}
          whileTap={{ scale: 0.96 }}
          className="flex h-9 w-16 items-center justify-center gap-1.5 rounded-2xl"
          style={{
            background: controlCenterOpen
              ? 'color-mix(in srgb, var(--accent) 18%, var(--window-bg))'
              : 'var(--window-bg)',
            border: controlCenterOpen ? '1px solid var(--accent)' : '1px solid var(--window-border)',
            boxShadow: 'var(--dock-shadow)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          {indicators}
        </motion.button>
      </div>
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
