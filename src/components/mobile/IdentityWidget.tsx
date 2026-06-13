'use client';

import { motion } from 'framer-motion';

/** Springboard identity widget — the mobile home for the desktop hero. */
export function IdentityWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center rounded-3xl px-6 py-5 text-center"
      style={{
        background: 'var(--dock-item-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--dock-item-border)',
        boxShadow: 'var(--dock-item-shadow)',
      }}
    >
      <div className="flex w-full -translate-x-[0.08em] flex-col items-center">
        <h1 className="font-stanley text-3xl font-bold leading-none tracking-tight" style={{ color: 'var(--foreground)' }}>
          Exowz
        </h1>
        <p className="mt-2 text-xs italic" style={{ color: 'var(--text-secondary)' }}>
          Code, Design, Create.
        </p>
      </div>
    </motion.div>
  );
}
