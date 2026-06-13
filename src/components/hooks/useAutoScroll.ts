'use client';

import { useEffect, type RefObject } from 'react';

interface AutoScrollOptions {
  enabled: boolean;
  speed?: number;
  resumeDelay?: number;
}

/**
 * Gently auto-scrolls a vertical scroll container while keeping native manual
 * scrolling available. Consumers should render the content twice for looping.
 */
export function useAutoScroll(ref: RefObject<HTMLElement | null>, options: AutoScrollOptions) {
  const { enabled, speed = 0.35, resumeDelay = 2500 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let raf = 0;
    let pausedUntil = 0;

    const step = () => {
      if (Date.now() >= pausedUntil) {
        el.scrollTop += speed;
        const half = el.scrollHeight / 2;
        if (half > 0 && el.scrollTop >= half) el.scrollTop -= half;
      }
      raf = requestAnimationFrame(step);
    };

    const pause = () => {
      pausedUntil = Date.now() + resumeDelay;
    };

    raf = requestAnimationFrame(step);
    el.addEventListener('pointerdown', pause);
    el.addEventListener('wheel', pause, { passive: true });
    el.addEventListener('touchmove', pause, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('wheel', pause);
      el.removeEventListener('touchmove', pause);
    };
  }, [ref, enabled, speed, resumeDelay]);
}
