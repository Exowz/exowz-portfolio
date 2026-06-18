'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useHistoryOverlay } from '@/components/hooks/useHistoryOverlay';
import { NowExpandedContent } from '@/components/widgets/NowExpandedContent';

interface NowOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function NowOverlay({ open, onClose }: NowOverlayProps) {
  const t = useTranslations('now');
  const tCommon = useTranslations('common');
  const panelRef = useRef<HTMLDivElement>(null);

  useHistoryOverlay(open, onClose);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[70] flex items-center justify-center p-6 backdrop-blur-xl"
          style={{ background: 'var(--sheet-scrim)' }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
            tabIndex={-1}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="max-h-[72vh] w-[88%] max-w-sm overflow-y-auto rounded-3xl p-5"
            style={{
              background: 'var(--window-bg)',
              border: '1px solid var(--window-border)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: 'var(--window-shadow)',
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative mb-4 flex items-center">
              <button
                type="button"
                onClick={onClose}
                aria-label={tCommon('close')}
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: 'var(--window-close-btn)' }}
              >
                <IconX className="h-4 w-4" style={{ color: 'var(--window-btn-icon)' }} />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>
                {t('title')}
              </span>
            </div>

            <NowExpandedContent />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
