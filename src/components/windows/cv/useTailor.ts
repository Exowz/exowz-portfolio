'use client';

import { useCallback, useState } from 'react';
import { useLocale } from 'next-intl';
import type { TailorResult } from '@/lib/cv/tailor';

export type TailorStatus = 'idle' | 'loading' | 'ready' | 'empty' | 'error' | 'rate_limited' | 'unavailable';

export interface UseTailor {
  status: TailorStatus;
  result: TailorResult | null;
  role: string;
  tailor: (role: string) => Promise<void>;
  reset: () => void;
}

function isEmpty(result: TailorResult): boolean {
  return (
    !result.summary &&
    result.projects.length === 0 &&
    result.skillHighlights.length === 0 &&
    result.experienceHighlights.length === 0
  );
}

export function useTailor(): UseTailor {
  const locale = useLocale();
  const [status, setStatus] = useState<TailorStatus>('idle');
  const [result, setResult] = useState<TailorResult | null>(null);
  const [role, setRole] = useState('');

  const tailor = useCallback(
    async (role: string) => {
      const trimmed = role.trim();
      if (trimmed.length < 3) return;

      setStatus('loading');
      setResult(null);
      setRole(trimmed);

      try {
        const response = await fetch('/api/cv/tailor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: trimmed, locale }),
        });

        if (response.status === 429) return setStatus('rate_limited');
        if (response.status === 503) return setStatus('unavailable');
        if (!response.ok) return setStatus('error');

        const data = (await response.json()) as TailorResult;
        if (isEmpty(data)) return setStatus('empty');

        setResult(data);
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    },
    [locale]
  );

  const reset = useCallback(() => {
    setResult(null);
    setRole('');
    setStatus('idle');
  }, []);

  return { status, result, role, tailor, reset };
}
