'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { IconCheck, IconLoader2, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export type ButtonStatus = 'idle' | 'loading' | 'success' | 'error';

interface StatefulButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status: ButtonStatus;
  children: ReactNode;
}

const ICON: Record<Exclude<ButtonStatus, 'idle'>, ReactNode> = {
  loading: <IconLoader2 className="h-5 w-5 animate-spin" />,
  success: <IconCheck className="h-5 w-5" />,
  error: <IconX className="h-5 w-5" />,
};

/**
 * Aceternity's stateful-button mechanic — the label stays put while a leading
 * loader / check / cross icon animates in by width + scale — but driven by an
 * external `status` instead of self-managing the click, so it plugs into our
 * existing state machines (contact form, CV tailor). Tokenized + reduced-motion.
 */
export function StatefulButton({ status, children, className, disabled, ...props }: StatefulButtonProps) {
  const reduce = useReducedMotion();

  return (
    <button
      disabled={disabled ?? status === 'loading'}
      className={cn(
        'relative flex items-center justify-center gap-2 transition motion-safe:active:scale-[0.98]',
        className,
      )}
      {...props}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {status !== 'idle' && (
          <motion.span
            key={status}
            initial={reduce ? { opacity: 0 } : { width: 0, opacity: 0, scale: 0.5 }}
            animate={reduce ? { opacity: 1 } : { width: 20, opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { width: 0, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="flex shrink-0 items-center justify-center overflow-hidden"
          >
            {ICON[status]}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span layout={!reduce}>{children}</motion.span>
    </button>
  );
}
