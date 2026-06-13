'use client';

import { motion } from 'framer-motion';

/** Springboard identity widget — the mobile home for the desktop hero. */
export function IdentityWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-3xl px-5 py-6 text-center"
      style={{
        background: 'var(--dock-item-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--dock-item-border)',
        boxShadow: 'var(--dock-item-shadow)',
      }}
    >
      <h1 className="font-stanley text-3xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
        Exowz
      </h1>
      <p className="mt-1 text-sm italic" style={{ color: 'var(--text-secondary)' }}>
        Code, Design, Create.
      </p>
    </motion.div>
  );
}
