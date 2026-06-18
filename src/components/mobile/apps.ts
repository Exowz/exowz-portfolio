export type MobileAppKind = 'route' | 'external' | 'overlay';

export type AppId =
  | 'projects'
  | 'about'
  | 'contact'
  | 'resume'
  | 'github'
  | 'linkedin'
  | 'principles'
  | 'settings'
  | 'colophon';

/**
 * A mobile app entry. Exactly one of `labelKey` (i18n key under the `nav`
 * namespace) or `label` (literal, for brand names / not-yet-localized apps)
 * is set — enforced at the type level via the union below. `href` is a path
 * template (`{locale}` substituted at render) for route/external apps, null for overlays.
 */
export type MobileApp =
  | { id: AppId; labelKey: string; label: null; kind: MobileAppKind; href: string | null }
  | { id: AppId; labelKey: null; label: string; kind: MobileAppKind; href: string | null };

/** The four pinned dock apps (left → right). */
export const DOCK_APPS: MobileApp[] = [
  { id: 'projects', labelKey: 'projects', label: null, kind: 'overlay', href: null },
  { id: 'about', labelKey: 'about', label: null, kind: 'route', href: '/{locale}/about' },
  { id: 'contact', labelKey: 'contact', label: null, kind: 'route', href: '/{locale}/contact' },
  { id: 'resume', labelKey: 'resume', label: null, kind: 'route', href: '/{locale}/cv' },
];

/** Springboard grid apps. TODO(P3): give principles/colophon real routes. */
export const GRID_APPS: MobileApp[] = [
  { id: 'github', labelKey: null, label: 'GitHub', kind: 'external', href: 'https://github.com/exowz' },
  { id: 'linkedin', labelKey: null, label: 'LinkedIn', kind: 'external', href: 'https://linkedin.com/in/mke-kapoor' },
  { id: 'principles', labelKey: null, label: 'Principles', kind: 'route', href: '/{locale}/principles' },
  { id: 'settings', labelKey: 'settings', label: null, kind: 'overlay', href: null },
  { id: 'colophon', labelKey: null, label: 'Colophon', kind: 'route', href: '/{locale}/colophon' },
];

/** Resolve an app's destination for a locale. Returns null for overlay apps (no URL). */
export function resolveHref(app: MobileApp, locale: string): string | null {
  if (app.href === null) return null;
  return app.href.replace('{locale}', locale);
}
