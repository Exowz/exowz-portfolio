import type { ReactNode } from 'react';

export function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className="rounded-full px-3 py-1.5 text-xs font-medium"
      style={{
        color: accent ? 'var(--accent-text)' : 'var(--text-secondary)',
        border: '1px solid var(--window-border)',
        background: accent ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : 'transparent',
      }}
    >
      {children}
    </span>
  );
}
