'use client';

import { DOCK_APPS } from './apps';
import { AppIcon } from './AppIcon';

/** Fixed iOS dock: the four pinned apps, no labels (iOS dock convention). */
export function MobileDock({
  locale,
  onOpenOverlay,
}: {
  locale: string;
  onOpenOverlay: (id: string) => void;
}) {
  return (
    <div
      className="mx-4 flex items-center justify-around rounded-3xl px-3 py-3"
      style={{
        background: 'var(--dock-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--dock-border)',
        boxShadow: 'var(--dock-shadow)',
        marginBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)',
      }}
    >
      {DOCK_APPS.map((app) => (
        <AppIcon key={app.id} app={app} locale={locale} onOpenOverlay={onOpenOverlay} hideLabel />
      ))}
    </div>
  );
}
