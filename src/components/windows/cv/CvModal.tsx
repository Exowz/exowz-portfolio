'use client';

import { ReactNode, RefObject, useEffect, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useHistoryOverlay } from '@/components/hooks/useHistoryOverlay';
import { useOutsideClick } from '@/components/hooks/useOutsideClick';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: ReactNode;
  triggerRef?: RefObject<HTMLElement | null>;
  /** Shared-layout id of the trigger card, enabling an expand-from-card morph. */
  layoutId?: string;
  /** Shared-layout id for the heading, so the card's title glides into place. */
  titleLayoutId?: string;
  /** Shared-layout id for the subtitle line (company / institution). */
  subtitleLayoutId?: string;
  children: ReactNode;
}

export function CvModal({
  open,
  onClose,
  title,
  subtitle,
  triggerRef,
  layoutId,
  titleLayoutId,
  subtitleLayoutId,
  children,
}: CvModalProps) {
  const t = useTranslations('cv');
  const reduce = useReducedMotion();
  // Morph the card out of its trigger when we have a shared id and motion is
  // allowed; otherwise fall back to a plain fade.
  const morph = Boolean(layoutId) && !reduce;
  const morphTitle = Boolean(titleLayoutId) && !reduce;
  const morphSubtitle = Boolean(subtitleLayoutId) && !reduce;
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  useHistoryOverlay(open, onClose);
  useOutsideClick(panelRef, () => {
    if (open) onClose();
  });

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      document.body.style.overflow = 'hidden';
      const focusId = window.setTimeout(() => panelRef.current?.focus(), 0);
      const onKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', onKey);
      return () => {
        window.clearTimeout(focusId);
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef?.current?.focus();
    }
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dim backdrop — its blur lives HERE, on a layer that only fades and
              never resizes, so it never repaints during the card morph. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.2 }}
            className="fixed inset-0 z-[94]"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-[95] grid place-items-center p-4">
            {/* Floating close (mobile) */}
            {!reduce && (
              <motion.button
                key="cv-close"
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                onClick={onClose}
                aria-label={t('modalClose')}
                className="absolute right-4 top-4 z-[96] flex h-8 w-8 items-center justify-center rounded-full lg:hidden"
                style={{ background: 'var(--window-close-btn)' }}
              >
                <IconX className="h-4 w-4" style={{ color: 'var(--window-btn-icon)' }} />
              </motion.button>
            )}

            {/* The morphing card: OPAQUE and filter-free, so the layout animation
                stays on the compositor and runs smoothly. */}
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
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl outline-none"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div className="flex items-start justify-between gap-3 p-5 pb-3">
                <div className="min-w-0">
                  <motion.h3
                    layoutId={morphTitle ? titleLayoutId : undefined}
                    className="text-base font-semibold text-foreground"
                  >
                    {title}
                  </motion.h3>
                  {subtitle && (
                    <motion.p
                      layoutId={morphSubtitle ? subtitleLayoutId : undefined}
                      className="mt-0.5 text-sm font-medium"
                      style={{ color: 'var(--accent-text)' }}
                    >
                      {subtitle}
                    </motion.p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('modalClose')}
                  className="hidden shrink-0 rounded-full p-1 opacity-60 hover:opacity-100 lg:block"
                  style={{ color: 'var(--foreground)' }}
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              {/* Content fades in over the morph rather than scaling with it. */}
              <motion.div
                initial={morph ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: morph ? 0.12 : 0 }}
                className="overflow-y-auto px-5 pb-5"
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
