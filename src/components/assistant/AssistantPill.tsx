'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { IconSparkles } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface AssistantPillProps {
  onOpen: () => void;
  className?: string;
}

export function AssistantPill({ onOpen, className = '' }: AssistantPillProps) {
  const t = useTranslations('assistant');
  const prefersReducedMotion = useReducedMotion();
  const prompts = useMemo(() => {
    const raw = t.raw('pillPrompts');
    return Array.isArray(raw) && raw.every((item) => typeof item === 'string') ? raw : ['Ask...'];
  }, [t]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || prompts.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % prompts.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, prompts.length]);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      className={`pointer-events-auto flex h-11 min-w-[13rem] items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium ${className}`}
      style={{
        color: 'var(--foreground)',
        background: 'var(--dock-bg)',
        borderColor: 'var(--dock-border)',
        boxShadow: 'var(--dock-shadow)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
      aria-label={prompts[index]}
    >
      <IconSparkles className="h-4 w-4 shrink-0" style={{ color: 'var(--accent-text)' }} />
      <span className="relative block h-5 min-w-0 flex-1 overflow-hidden text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={prefersReducedMotion ? prompts[0] : prompts[index]}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute inset-0 truncate"
          >
            {prefersReducedMotion ? prompts[0] : prompts[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
