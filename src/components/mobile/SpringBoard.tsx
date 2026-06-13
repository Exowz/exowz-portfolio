'use client';

import { GRID_APPS } from './apps';
import { AppIcon } from './AppIcon';
import { IdentityWidget } from './IdentityWidget';
import { NowWidget } from './NowWidget';

interface SpringBoardProps {
  locale: string;
  onOpenOverlay: (id: string) => void;
}

/** Scrollable springboard body: identity widget + the app-icon grid. */
export function SpringBoard({ locale, onOpenOverlay }: SpringBoardProps) {
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2">
      <IdentityWidget />
      <NowWidget />
      <div className="mt-8 grid grid-cols-4 gap-x-4 gap-y-6">
        {GRID_APPS.map((app) => (
          <AppIcon key={app.id} app={app} locale={locale} onOpenOverlay={onOpenOverlay} />
        ))}
      </div>
    </div>
  );
}
