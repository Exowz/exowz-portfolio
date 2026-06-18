'use client';

import { useEffect, useState } from 'react';

// Matches Tailwind's `md` breakpoint: < 768px is "mobile".
const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Returns `null` until measured (post-mount), then `true`/`false`.
 * Callers should render a neutral placeholder while `null`.
 */
export function useIsMobile(): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return isMobile;
}
