'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { NowWidgetBody } from './NowWidgetBody';

interface NowWidgetProps {
  onOpen: () => void;
}

/** Springboard Now tile: a 2x2 square with auto/manual-scrolling Now content. */
export function NowWidget({ onOpen }: NowWidgetProps) {
  const t = useTranslations('now');
  const startRef = useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t('title')}
      className="col-span-2 row-span-2 overflow-hidden rounded-3xl px-4 py-3"
      style={{
        background: 'var(--dock-item-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--dock-item-border)',
        boxShadow: 'var(--dock-item-shadow)',
      }}
      onPointerDown={(event) => {
        startRef.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        const start = startRef.current;
        startRef.current = null;
        if (!start) return;

        const distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
        if (distance < 8) onOpen();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <NowWidgetBody />
    </div>
  );
}
