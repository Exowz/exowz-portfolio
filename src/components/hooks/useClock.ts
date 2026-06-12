'use client';

import { useEffect, useState } from 'react';
import { formatClock } from '@/lib/clock';

/** Live clock string, updated every second, formatted per locale. Empty until mounted. */
export function useClock(locale: string): string {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(formatClock(new Date(), locale));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [locale]);

  return time;
}
