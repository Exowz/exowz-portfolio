'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { StatusBar } from './StatusBar';
import { SpringBoard } from './SpringBoard';
import { MobileDock } from './MobileDock';
import { MinimalSettings } from './MinimalSettings';
import { ComingSoon } from './ComingSoon';

type Overlay = 'settings' | 'soon' | null;

/**
 * The iOS shell layer. Mobile-only (`md:hidden`), home-route-only. Covers the
 * macOS Header/Dock with its own opaque wallpaper rather than mutating layout.
 */
export function MobileShell() {
  const pathname = usePathname();
  const locale = useLocale();
  const { theme } = useTheme();
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [soonTitle, setSoonTitle] = useState<string | null>(null);

  // Home route = path is just the locale segment (mirrors LayoutContent).
  const route = pathname.split('/').filter(Boolean).slice(1).join('/');
  if (route !== '') return null;

  const colors =
    theme === 'dark' ? ['#1a1a1a', '#2a2a2a', '#64b5f6'] : ['#f5f5f5', '#ffffff', '#64b5f6'];

  const handleOpenOverlay = (id: string) => {
    if (id === 'settings') {
      setOverlay('settings');
      return;
    }
    // principles / colophon → placeholder until their content/routes land (P3).
    setSoonTitle(id === 'principles' ? 'Principles' : 'Colophon');
    setOverlay('soon');
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col md:hidden"
      style={{
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
      }}
    >
      <StatusBar />
      <SpringBoard locale={locale} onOpenOverlay={handleOpenOverlay} />
      <MobileDock locale={locale} />
      <MinimalSettings open={overlay === 'settings'} onClose={() => setOverlay(null)} />
      <ComingSoon open={overlay === 'soon'} title={soonTitle} onClose={() => setOverlay(null)} />
    </div>
  );
}
