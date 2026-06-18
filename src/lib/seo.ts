import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://mke-kapoor.com';
export const SITE_NAME = 'Exowz';

// next-intl locale → Open Graph locale tag
export const OG_LOCALE: Record<string, string> = {
  'en-GB': 'en_GB',
  fr: 'fr_FR',
  es: 'es_ES',
  pt: 'pt_PT',
  de: 'de_DE',
  it: 'it_IT',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ru: 'ru_RU',
  ko: 'ko_KR',
  hi: 'hi_IN',
  ar: 'ar_SA',
};

// Normalize a locale-relative path: strip leading/trailing slashes.
// '' (home) stays ''. 'projects/risk-lens' stays as-is.
function normalizePath(path: string): string {
  return path.replace(/^\/+|\/+$/g, '');
}

// Absolute URL for a given locale + locale-relative path.
function urlFor(locale: string, path: string): string {
  const clean = normalizePath(path);
  return clean ? `${SITE_URL}/${locale}/${clean}` : `${SITE_URL}/${locale}`;
}

export interface Alternates {
  canonical: string;
  languages: Record<string, string>;
}

// Canonical + hreflang alternates for a locale-relative path.
// `path` excludes the locale segment, e.g. '' (home), 'about', 'projects/risk-lens'.
export function buildAlternates(locale: string, path: string): Alternates {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = urlFor(l, path);
  }
  languages['x-default'] = urlFor(routing.defaultLocale, path);

  return {
    canonical: urlFor(locale, path),
    languages,
  };
}

// Absolute URL to the dynamic OG image endpoint for a route.
export function buildOgImageUrl(params: {
  title: string;
  subtitle?: string;
  badge?: string;
}): string {
  const qs = new URLSearchParams();
  qs.set('title', params.title);
  if (params.subtitle) qs.set('subtitle', params.subtitle);
  if (params.badge) qs.set('badge', params.badge);
  return `${SITE_URL}/api/og?${qs.toString()}`;
}

// Shared metadata builder for a localized route. `path` is locale-relative
// ('' for home). `absoluteTitle` skips the "%s · Exowz" template (home uses it).
export function buildRouteMetadata(params: {
  locale: string;
  path: string;
  title: string;
  description: string;
  badge?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const { locale, path, title, description, badge, absoluteTitle } = params;
  const alternates = buildAlternates(locale, path);
  const image = buildOgImageUrl({ title, subtitle: description, badge });

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] ?? OG_LOCALE[routing.defaultLocale],
      url: alternates.canonical,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
