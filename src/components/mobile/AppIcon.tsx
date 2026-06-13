'use client';

import { useCallback, useMemo, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  IconCopy,
  IconExternalLink,
  IconFolderOpen,
  IconPlayerPlay,
  IconSettings,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { type MobileApp, resolveHref } from './apps';
import { APP_ICONS } from './appIcons';
import { AppQuickActions, type QuickAction } from './AppQuickActions';
import { useLongPress } from '@/components/hooks/useLongPress';

interface AppIconProps {
  app: MobileApp;
  locale: string;
  /** Called for `overlay` apps (e.g. Settings). Optional; inert if absent. */
  onOpenOverlay?: (id: string) => void;
  /** Hide the text label (used inside the dock). */
  hideLabel?: boolean;
}

/** A single iOS-style app tile: rounded-square icon + label. Routes, external links, or overlays. */
export function AppIcon({ app, locale, onOpenOverlay, hideLabel = false }: AppIconProps) {
  const router = useRouter();
  const tNav = useTranslations('nav');
  const tActions = useTranslations('actions');
  const label = app.labelKey ? tNav(app.labelKey) : (app.label ?? app.id);
  const href = resolveHref(app, locale);
  const [menu, setMenu] = useState<{ open: boolean; x: number; y: number }>({ open: false, x: 0, y: 0 });

  const openApp = useCallback(() => {
    if (app.kind === 'route' && href) {
      router.push(href);
      return;
    }
    if (app.kind === 'external' && href) {
      const win = window.open(href, '_blank', 'noopener,noreferrer');
      if (win) win.opener = null;
      return;
    }
    onOpenOverlay?.(app.id);
  }, [app.id, app.kind, href, onOpenOverlay, router]);

  const openMenu = useCallback((x: number, y: number) => {
    setMenu({ open: true, x, y });
  }, []);

  const { handlers, suppressClickRef } = useLongPress({
    onLongPress: (event) => {
      openMenu(event.clientX, event.clientY);
    },
  });

  const actions = useMemo<QuickAction[]>(() => {
    const items: QuickAction[] = [
      {
        id: 'open',
        label: app.id === 'projects'
          ? tActions('openFolder')
          : app.id === 'resume'
            ? tActions('openResume')
            : app.kind === 'external'
              ? tActions('openLink')
              : tActions('openApp', { app: label }),
        icon: app.id === 'projects'
          ? <IconFolderOpen className="h-full w-full" />
          : app.id === 'settings'
            ? <IconSettings className="h-full w-full" />
            : app.kind === 'external'
              ? <IconExternalLink className="h-full w-full" />
              : <IconPlayerPlay className="h-full w-full" />,
        onSelect: openApp,
      },
    ];

    if (app.id === 'github') {
      items.push({
        id: 'copy-github',
        label: tActions('copyUsername'),
        icon: <IconCopy className="h-full w-full" />,
        onSelect: () => navigator.clipboard?.writeText('exowz').catch(() => {}),
      });
    }

    return items;
  }, [app.id, app.kind, label, openApp, tActions]);

  const tile = (
    <motion.div
      whileTap={{ scale: 0.92 }}
      className="flex h-14 w-14 items-center justify-center rounded-2xl"
      style={{
        background: 'var(--dock-item-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--dock-item-border)',
        boxShadow: 'var(--dock-item-shadow)',
        color: 'var(--dock-text)',
      }}
    >
      <div className="h-7 w-7">{APP_ICONS[app.id]}</div>
    </motion.div>
  );

  const labelEl = hideLabel ? null : (
    <span className="mt-1 max-w-[64px] truncate text-center text-xs" style={{ color: 'var(--dock-text)' }}>
      {label}
    </span>
  );

  return (
    <>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        className="flex flex-col items-center"
        onClick={(event) => {
          if (suppressClickRef.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
            return;
          }
          openApp();
        }}
        onContextMenu={(event: MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          openMenu(event.clientX, event.clientY);
        }}
        {...handlers}
      >
        {tile}
        {labelEl}
      </button>
      <AppQuickActions
        open={menu.open}
        x={menu.x}
        y={menu.y}
        actions={actions}
        onClose={() => setMenu((current) => ({ ...current, open: false }))}
      />
    </>
  );
}
