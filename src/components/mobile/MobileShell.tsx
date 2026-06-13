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
import { ComingSoon } from './ComingSoon';

const ProjectsFolder = dynamic(
  () => import('./ProjectsFolder').then((module) => module.ProjectsFolder),
  { ssr: false },
);

type Overlay = 'settings' | 'soon' | 'projects' | null;

/**
 * The iOS shell layer. Mobile-only (`md:hidden`), home-route-only. Covers the
 * macOS Header/Dock with its own opaque wallpaper rather than mutating layout.
 */
export function MobileShell() {
  const pathname = usePathname();
  const locale = useLocale();
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [soonTitle, setSoonTitle] = useState<string | null>(null);

  // Render the springboard only on the locale-home route.
  if (!parseActiveRoute(pathname).isHome) return null;

  const handleOpenOverlay = (id: string) => {
    if (id === 'settings') {
      setOverlay('settings');
      return;
    }
    if (id === 'projects') {
      setOverlay('projects');
      return;
    }
    // principles / colophon → placeholder until their content/routes land (P3).
    setSoonTitle(id === 'principles' ? 'Principles' : 'Colophon');
    setOverlay('soon');
  };

  // NOTE(P0b/a11y): on mobile home this fixed layer visually COVERS the macOS
  // Header/Dock, but those remain in the DOM and tab/focus order. P0b removes the
  // macOS mobile chrome on the home route (see design doc "Known limitations").
  return (
    <div className="mobile-wallpaper fixed inset-0 z-[60] flex flex-col md:hidden">
      <StatusBar />
      <SpringBoard locale={locale} onOpenOverlay={handleOpenOverlay} />
      <MobileDock locale={locale} onOpenOverlay={handleOpenOverlay} />
      <ProjectsFolder open={overlay === 'projects'} onClose={() => setOverlay(null)} />
      <Settings open={overlay === 'settings'} onClose={() => setOverlay(null)} />
      <ComingSoon
        open={overlay === 'soon'}
        title={soonTitle}
        onClose={() => {
          setOverlay(null);
          setSoonTitle(null);
        }}
      />
    </div>
  );
}
