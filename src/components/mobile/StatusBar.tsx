'use client';

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

  return (
    <div
      className="flex items-center justify-between px-5 pb-1 text-sm font-medium"
      style={{ color: 'var(--foreground)', paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
    >
      <time className="font-mono tracking-wider tabular-nums">{time}</time>
      {onOpenControlCenter ? (
        <button
          type="button"
          onClick={onOpenControlCenter}
          aria-label={t('open')}
          className="flex items-center gap-1.5 rounded-full px-1.5 py-1 active:scale-95"
        >
          {indicators}
        </button>
      ) : (
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {indicators}
        </div>
      )}
    </div>
  );
}
