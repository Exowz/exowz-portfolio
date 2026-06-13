import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { projects } from '@/data/projects';
import { buildAlternates } from '@/lib/seo';

// All locale-relative paths the site exposes (without the locale segment).
export function getSitePaths(): string[] {
  const staticPaths = ['', 'about', 'projects', 'contact', 'principles', 'colophon'];
  const projectPaths = projects.map((p) => `projects/${p.slug}`);
  return [...staticPaths, ...projectPaths];
}

// One sitemap entry per path per locale, each carrying hreflang alternates.
export function getSitemapEntries(now: Date = new Date()): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of getSitePaths()) {
    const { languages } = buildAlternates(routing.defaultLocale, path);
    for (const locale of routing.locales) {
      entries.push({
        url: languages[locale],
        lastModified: now,
        alternates: { languages },
      });
    }
  }
  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}
