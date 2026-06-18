'use client';

import { GRID_APPS } from './apps';
import { AppIcon } from './AppIcon';
import { IdentityWidget } from './IdentityWidget';
import { NowWidget } from './NowWidget';

interface SpringBoardProps {
  locale: string;
  onOpenOverlay: (id: string) => void;
  onOpenNow: () => void;
}

/** Scrollable springboard body: identity widget + the app-icon grid. */
export function SpringBoard({ locale, onOpenOverlay, onOpenNow }: SpringBoardProps) {
  return (
    <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2">
      <IdentityWidget />
      {/* One iOS-style grid: the Now tile (2×2) sits among the 1×1 app icons. */}
      <div className="mt-5 grid grid-cols-4 auto-rows-[5.25rem] gap-x-4 gap-y-5">
        <NowWidget onOpen={onOpenNow} />
        {GRID_APPS.map((app) => (
          <AppIcon key={app.id} app={app} locale={locale} onOpenOverlay={onOpenOverlay} />
        ))}
      </div>
    </div>
  );
}
