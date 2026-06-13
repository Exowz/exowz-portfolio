'use client';

import { NowWidgetBody } from './NowWidgetBody';

/** Springboard Now tile: a 2x2 square with auto/manual-scrolling Now content. */
export function NowWidget() {
  return (
    <div
      className="col-span-2 row-span-2 overflow-hidden rounded-3xl px-4 py-3"
      style={{
        background: 'var(--dock-item-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--dock-item-border)',
        boxShadow: 'var(--dock-item-shadow)',
      }}
    >
      <NowWidgetBody />
    </div>
  );
}
