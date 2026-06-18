'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type LoadingState = { text: string };

// Outline circle-check (future steps).
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={cn('h-6 w-6', className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

// Solid circle-check (current + completed steps).
const CheckFilled = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cn('h-6 w-6', className)}>
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

function LoaderCore({
  loadingStates,
  value,
  reduce,
}: {
  loadingStates: LoadingState[];
  value: number;
  reduce: boolean;
}) {
  return (
    <div className="relative mx-auto mt-40 flex max-w-xl flex-col justify-start">
      {loadingStates.map((state, index) => {
        // Steps fade the further they are from the active one; the whole list
        // slides up as we advance so the current step stays roughly centered.
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);
        const current = index === value;
        const tone = current || index < value ? 'var(--accent-text)' : 'var(--foreground)';

        return (
          <motion.div
            key={index}
            className="mb-4 flex gap-2 text-left"
            initial={{ opacity: 0, y: reduce ? 0 : -(value * 40) }}
            animate={{ opacity, y: reduce ? 0 : -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ color: index > value ? 'var(--text-secondary)' : 'var(--accent-text)' }}>
              {index > value ? <CheckIcon /> : <CheckFilled />}
            </div>
            <span style={{ color: tone, fontWeight: current ? 600 : 400 }}>{state.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * Faithful port of Aceternity's multi-step loader (upward-translating list,
 * distance-based fade, outline→filled check progression, radial vignette),
 * retokenized to our design system. `loop=false` makes it advance to the last
 * step and hold there until `loading` flips false — right for a single async op.
 */
export function MultiStepLoader({
  loadingStates,
  loading,
  duration = 1500,
  loop = false,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
}) {
  const reduce = useReducedMotion();
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentState((prev) =>
        loop
          ? prev === loadingStates.length - 1
            ? 0
            : prev + 1
          : Math.min(prev + 1, loadingStates.length - 1),
      );
    }, duration);
    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[110] flex h-full w-full items-center justify-center backdrop-blur-2xl"
        >
          <div className="relative h-96">
            <LoaderCore value={currentState} loadingStates={loadingStates} reduce={Boolean(reduce)} />
          </div>
          {/* Vignette: solid background at the edges fades out steps that scroll
              away, transparent center keeps the active step crisp. */}
          <div
            className="absolute inset-x-0 bottom-0 z-20 h-full"
            style={{
              background: 'var(--background)',
              maskImage: 'radial-gradient(900px at center, transparent 30%, white)',
              WebkitMaskImage: 'radial-gradient(900px at center, transparent 30%, white)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
