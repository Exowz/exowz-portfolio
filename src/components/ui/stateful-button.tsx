'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { IconCheck, IconLoader2, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export type ButtonStatus = 'idle' | 'loading' | 'success' | 'error';

interface StatefulButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status: ButtonStatus;
  /** Optional labels per state; omit to show the state icon alone. */
  loadingLabel?: ReactNode;
  successLabel?: ReactNode;
  errorLabel?: ReactNode;
  iconClassName?: string;
  children: ReactNode;
}

/**
 * A button whose content cross-fades between idle / loading (spinner) /
 * success (check) / error (cross) states. Styling is passed through via
 * `className` + `style`, so each call site keeps its own look and tokens.
 * The transition is disabled under prefers-reduced-motion.
 */
export function StatefulButton({
  status,
  loadingLabel,
  successLabel,
  errorLabel,
  iconClassName = 'h-5 w-5 shrink-0',
  children,
  className,
  disabled,
  ...props
}: StatefulButtonProps) {
  const reduce = useReducedMotion();

  const states: Record<ButtonStatus, ReactNode> = {
    idle: children,
    loading: (
      <>
        <IconLoader2 className={cn(iconClassName, 'animate-spin')} />
        {loadingLabel}
      </>
    ),
    success: (
      <>
        <IconCheck className={iconClassName} />
        {successLabel}
      </>
    ),
    error: (
      <>
        <IconX className={iconClassName} />
        {errorLabel}
      </>
    ),
  };

  return (
    <button
      disabled={disabled ?? status === 'loading'}
      className={cn(
        'relative flex items-center justify-center gap-2 overflow-hidden transition motion-safe:active:scale-[0.98]',
        className,
      )}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={status}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="flex items-center justify-center gap-2"
        >
          {states[status]}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
