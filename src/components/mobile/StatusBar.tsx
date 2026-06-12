'use client';

import { useLocale } from 'next-intl';
import { IconWifi, IconBattery3 } from '@tabler/icons-react';
import { useClock } from '@/components/hooks/useClock';

/** iOS-style status bar: live clock on the left, decorative indicators on the right. */
export function StatusBar() {
  const locale = useLocale();
  const time = useClock(locale);

  return (
    <div
      className="flex items-center justify-between px-5 pb-1 text-sm font-medium"
      style={{ color: 'var(--foreground)', paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
    >
      <time className="font-mono tracking-wider tabular-nums">{time}</time>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <IconWifi className="h-4 w-4" />
        <IconBattery3 className="h-4 w-4" />
      </div>
    </div>
  );
}
