'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { IconCheck, IconLoader2 } from '@tabler/icons-react';

interface MultiStepLoaderProps {
  loading: boolean;
  steps: string[];
  /** ms each step is shown before advancing; the last step holds until loading ends. */
  stepDuration?: number;
}

/**
 * Full-screen sequenced loader: walks through `steps`, ticking each off, and
 * parks on the final step until `loading` flips false. The cadence is purely
 * cosmetic — it dresses up a single async call (e.g. PDF generation) that gives
 * no real progress events. Tokenized + reduced-motion aware.
 */
export function MultiStepLoader({ loading, steps, stepDuration = 1100 }: MultiStepLoaderProps) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrent(0);
      return;
    }
    setCurrent(0);
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      if (index >= steps.length - 1) {
        setCurrent(steps.length - 1);
        window.clearInterval(id);
      } else {
        setCurrent(index);
      }
    }, stepDuration);
    return () => window.clearInterval(id);
  }, [loading, steps.length, stepDuration]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[110] flex items-center justify-center p-6"
          style={{
            background: 'color-mix(in srgb, var(--background) 78%, transparent)',
            backdropFilter: 'blur(32px) saturate(140%)',
            WebkitBackdropFilter: 'blur(32px) saturate(140%)',
          }}
        >
          <div className="flex flex-col gap-3.5">
            {steps.map((step, index) => {
              const done = index < current;
              const active = index === current;
              return (
                <motion.div
                  key={step}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: done || active ? 1 : 0.35, y: 0 }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : index * 0.04 }}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                    {done ? (
                      <IconCheck className="h-5 w-5" style={{ color: 'var(--accent-text)' }} />
                    ) : active ? (
                      <IconLoader2 className="h-5 w-5 animate-spin" style={{ color: 'var(--accent-text)' }} />
                    ) : (
                      <span className="h-2 w-2 rounded-full" style={{ background: 'var(--text-tertiary)' }} />
                    )}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: done || active ? 'var(--foreground)' : 'var(--text-secondary)',
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {step}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
