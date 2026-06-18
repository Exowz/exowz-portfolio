'use client';

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';

interface LongPressOptions {
  delay?: number;
  moveTolerance?: number;
  onLongPress: (event: PointerEvent) => void;
}

export function useLongPress({ delay = 450, moveTolerance = 12, onLongPress }: LongPressOptions) {
  const timerRef = useRef<number | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const onLongPressRef = useRef(onLongPress);

  useEffect(() => {
    onLongPressRef.current = onLongPress;
  }, [onLongPress]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const clear = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    startRef.current = null;
  };

  return {
    suppressClickRef,
    handlers: {
      onPointerDown: (event: ReactPointerEvent) => {
        if (event.button !== 0) return;

        startRef.current = { x: event.clientX, y: event.clientY };
        timerRef.current = window.setTimeout(() => {
          suppressClickRef.current = true;
          onLongPressRef.current(event.nativeEvent);
          clear();
        }, delay);
      },
      onPointerMove: (event: ReactPointerEvent) => {
        const start = startRef.current;
        if (!start) return;

        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.hypot(dx, dy) > moveTolerance) clear();
      },
      onPointerUp: clear,
      onPointerLeave: clear,
      onPointerCancel: clear,
    },
  };
}
