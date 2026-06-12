'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { type MobileApp, resolveHref } from './apps';
import { APP_ICONS } from './appIcons';

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
  const tNav = useTranslations('nav');
  const label = app.labelKey ? tNav(app.labelKey) : (app.label ?? '');
  const href = resolveHref(app, locale);

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

  const wrapperClass = 'flex flex-col items-center';

  // Route apps → client-side navigation.
  if (app.kind === 'route' && href) {
    return (
      <Link href={href} aria-label={label} className={wrapperClass}>
        {tile}
        {labelEl}
      </Link>
    );
  }

  // External apps (and the Resume PDF) → new tab.
  if (app.kind === 'external' && href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={wrapperClass}>
        {tile}
        {labelEl}
      </a>
    );
  }

  // Overlay apps (Settings, and P0a's Coming-soon placeholders) → callback.
  return (
    <button type="button" aria-label={label} onClick={() => onOpenOverlay?.(app.id)} className={wrapperClass}>
      {tile}
      {labelEl}
    </button>
  );
}
