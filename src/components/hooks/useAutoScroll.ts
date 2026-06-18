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
  const { enabled, speed = 0.7, resumeDelay = 900 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let raf = 0;
    let scrollPosition = el.scrollTop;
    let pausedUntil = 0;
    let pointerPaused = false;

    const step = () => {
      if (!pointerPaused && Date.now() >= pausedUntil) {
        scrollPosition += speed;
        const half = el.scrollHeight / 2;
        if (half > 0 && scrollPosition >= half) scrollPosition -= half;
        el.scrollTop = scrollPosition;
      }
      raf = requestAnimationFrame(step);
    };

    const pauseTemporarily = () => {
      pausedUntil = Date.now() + resumeDelay;
      scrollPosition = el.scrollTop;
    };
    const pauseForPointer = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') pointerPaused = true;
      scrollPosition = el.scrollTop;
    };
    const pauseForTouch = () => {
      pointerPaused = true;
      scrollPosition = el.scrollTop;
    };
    const resumeAfterTouch = () => {
      pointerPaused = false;
      pauseTemporarily();
    };
    const resumeForPointer = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') {
        pointerPaused = false;
        pauseTemporarily();
      }
    };
    const syncManualScroll = () => {
      if (pointerPaused || Date.now() < pausedUntil) scrollPosition = el.scrollTop;
    };

    raf = requestAnimationFrame(step);
    el.addEventListener('pointerenter', pauseForPointer);
    el.addEventListener('pointerleave', resumeForPointer);
    el.addEventListener('pointerdown', pauseForTouch);
    el.addEventListener('pointerup', resumeAfterTouch);
    el.addEventListener('pointercancel', resumeAfterTouch);
    el.addEventListener('wheel', pauseTemporarily, { passive: true });
    el.addEventListener('touchmove', pauseTemporarily, { passive: true });
    el.addEventListener('scroll', syncManualScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', pauseForPointer);
      el.removeEventListener('pointerleave', resumeForPointer);
      el.removeEventListener('pointerdown', pauseForTouch);
      el.removeEventListener('pointerup', resumeAfterTouch);
      el.removeEventListener('pointercancel', resumeAfterTouch);
      el.removeEventListener('wheel', pauseTemporarily);
      el.removeEventListener('touchmove', pauseTemporarily);
      el.removeEventListener('scroll', syncManualScroll);
    };
  }, [ref, enabled, speed, resumeDelay]);
}
