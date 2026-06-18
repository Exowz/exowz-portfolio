'use client';

import { ReactNode, RefObject, useEffect, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useHistoryOverlay } from '@/components/hooks/useHistoryOverlay';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  triggerRef?: RefObject<HTMLElement | null>;
  /** Shared-layout id of the trigger card, enabling an expand-from-card morph. */
  layoutId?: string;
  children: ReactNode;
}

export function CvModal({ open, onClose, title, triggerRef, layoutId, children }: CvModalProps) {
  const t = useTranslations('cv');
  const reduce = useReducedMotion();
  // Morph the panel out of its trigger card when we have a shared id and motion
  // is allowed; otherwise fall back to the plain scale-fade.
  const morph = Boolean(layoutId) && !reduce;
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  useHistoryOverlay(open, onClose);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const id = window.setTimeout(() => panelRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }

    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef?.current?.focus();
    }
  }, [open, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.12 : 0.2 }}
          className="fixed inset-0 z-[95] flex items-center justify-center p-4"
          style={{
            background: 'color-mix(in srgb, var(--background) 78%, transparent)',
            backdropFilter: 'blur(44px) saturate(140%)',
            WebkitBackdropFilter: 'blur(44px) saturate(140%)',
          }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            layoutId={morph ? layoutId : undefined}
            initial={morph ? { opacity: 0 } : reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={morph ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={morph ? { opacity: 0 } : reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
            style={{ background: 'color-mix(in srgb, var(--card) 92%, transparent)' }}
            className="glass-card relative max-h-[80vh] w-full max-w-md overflow-y-auto rounded-2xl p-5 outline-none"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('modalClose')}
                className="shrink-0 rounded-full p-1 opacity-60 hover:opacity-100"
                style={{ color: 'var(--foreground)' }}
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
