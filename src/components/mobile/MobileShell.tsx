'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { parseActiveRoute } from '@/components/windows/activeRoute';
import { StatusBar } from './StatusBar';
import { SpringBoard } from './SpringBoard';
import { MobileDock } from './MobileDock';
import { Settings } from './Settings';
import { ControlCenter } from './ControlCenter';
import { NowOverlay } from './NowOverlay';
import { MobileAmbientBackground } from './MobileAmbientBackground';
import { AssistantChat } from '@/components/assistant/AssistantChat';
import { AssistantPill } from '@/components/assistant/AssistantPill';

const ProjectsFolder = dynamic(
  () => import('./ProjectsFolder').then((module) => module.ProjectsFolder),
  { ssr: false },
);

type Overlay = 'settings' | 'projects' | 'control' | 'now' | 'assistant' | null;

/**
 * The iOS shell layer. Mobile-only (`md:hidden`), home-route-only. Covers the
 * macOS Header/Dock with its own opaque wallpaper rather than mutating layout.
 */
export function MobileShell() {
  const pathname = usePathname();
  const locale = useLocale();
  const [overlay, setOverlay] = useState<Overlay>(null);

  // Render the springboard only on the locale-home route.
  if (!parseActiveRoute(pathname).isHome) return null;

  const handleOpenOverlay = (id: string) => {
    if (id === 'settings') {
      setOverlay('settings');
      return;
    }
    if (id === 'projects') {
      setOverlay('projects');
    }
  };

  // NOTE(P0b/a11y): on mobile home this fixed layer visually COVERS the macOS
  // Header/Dock, but those remain in the DOM and tab/focus order. P0b removes the
  // macOS mobile chrome on the home route (see design doc "Known limitations").
  return (
    <div className="mobile-wallpaper fixed inset-0 z-[60] flex flex-col md:hidden">
      <MobileAmbientBackground />
      <StatusBar onOpenControlCenter={() => setOverlay('control')} />
      <SpringBoard locale={locale} onOpenOverlay={handleOpenOverlay} onOpenNow={() => setOverlay('now')} />
      {overlay === null && (
        <div className="pointer-events-none absolute left-1/2 z-[65] w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2" style={{ bottom: 'calc(env(safe-area-inset-bottom) + 7.6rem)' }}>
          <AssistantPill onOpen={() => setOverlay('assistant')} className="w-full min-w-0" />
        </div>
      )}
      <MobileDock locale={locale} onOpenOverlay={handleOpenOverlay} />
      <ProjectsFolder open={overlay === 'projects'} onClose={() => setOverlay(null)} />
      <NowOverlay open={overlay === 'now'} onClose={() => setOverlay(null)} />
      <Settings open={overlay === 'settings'} onClose={() => setOverlay(null)} />
      <ControlCenter open={overlay === 'control'} onClose={() => setOverlay(null)} />
      <AssistantChat open={overlay === 'assistant'} onClose={() => setOverlay(null)} variant="mobile" />
    </div>
  );
}
