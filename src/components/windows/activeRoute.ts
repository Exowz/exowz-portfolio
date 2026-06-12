export type ActiveWindowId = 'projects' | 'about' | 'contact' | null;

export interface ActiveRoute {
  /** Which app the current route maps to, or null for home/unknown. */
  id: ActiveWindowId;
  /** True when the path is just the locale segment (e.g. /en-GB). */
  isHome: boolean;
  /** True for /[locale]/projects/[slug]. */
  isDetail: boolean;
  /** The project slug for detail routes, else null. */
  slug: string | null;
}

/**
 * Parse a full (locale-prefixed) pathname into the active app view.
 * Single source of truth shared by the mobile shell and app sheet.
 */
export function parseActiveRoute(pathname: string): ActiveRoute {
  const rest = pathname.split('/').filter(Boolean).slice(1); // drop the [locale] segment
  if (rest.length === 0) return { id: null, isHome: true, isDetail: false, slug: null };

  if (rest[0] === 'about') return { id: 'about', isHome: false, isDetail: false, slug: null };
  if (rest[0] === 'contact') return { id: 'contact', isHome: false, isDetail: false, slug: null };
  if (rest[0] === 'projects') {
    const isDetail = rest.length > 1;
    return { id: 'projects', isHome: false, isDetail, slug: isDetail ? rest[1] : null };
  }
  return { id: null, isHome: false, isDetail: false, slug: null };
}
