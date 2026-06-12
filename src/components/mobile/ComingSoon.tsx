'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';

interface ComingSoonProps {
  open: boolean;
  /** App name shown in the sheet (e.g. "Principles"); null when closed. */
  title: string | null;
  onClose: () => void;
}

/** Tiny placeholder sheet for grid apps whose content arrives in a later phase. */
export function ComingSoon({ open, title, onClose }: ComingSoonProps) {
  return (
    <AnimatePresence>
      {open && title && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[70] flex items-end justify-center"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="m-4 w-full max-w-sm rounded-3xl p-5 text-center"
            style={{
              background: 'var(--window-bg)',
              border: '1px solid var(--window-border)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: 'var(--window-shadow)',
              paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.25rem)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: 'var(--window-close-btn)' }}
              >
                <IconX className="h-4 w-4" style={{ color: 'var(--window-btn-icon)' }} />
              </button>
            </div>
            <p className="text-lg font-medium" style={{ color: 'var(--foreground)' }}>{title}</p>
            <p className="mt-1 text-sm" style={{ color: '#b0bec5' }}>Coming soon.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
