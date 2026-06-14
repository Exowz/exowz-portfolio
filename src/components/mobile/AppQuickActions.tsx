'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface QuickAction {
  id: string;
  label: string;
  icon: ReactNode;
  onSelect: () => void;
}

interface AppQuickActionsProps {
  open: boolean;
  x: number;
  y: number;
  actions: QuickAction[];
  onClose: () => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function AppQuickActions({ open, x, y, actions, onClose }: AppQuickActionsProps) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const left = typeof window === 'undefined' ? x : clamp(x, 16, window.innerWidth - 236);
  const top = typeof window === 'undefined' ? y : clamp(y, 16, window.innerHeight - 220);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90]"
          onClick={onClose}
        >
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 6 }}
            transition={{ duration: 0.16 }}
            className="absolute w-56 overflow-hidden rounded-2xl p-1"
            style={{
              left,
              top,
              background: 'var(--window-bg)',
              border: '1px solid var(--window-border)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: 'var(--window-shadow)',
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  action.onSelect();
                  onClose();
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm"
                style={{ color: 'var(--foreground)' }}
              >
                <span className="h-4 w-4" style={{ color: 'var(--accent-text)' }}>
                  {action.icon}
                </span>
                <span className="truncate">{action.label}</span>
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
