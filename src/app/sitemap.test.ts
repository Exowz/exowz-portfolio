import { describe, it, expect } from 'vitest';
import { getSitePaths, getSitemapEntries } from './sitemap';
import { routing } from '@/i18n/routing';
import { projects } from '@/data/projects';

describe('sitemap', () => {
  it('exposes every static route plus one entry per project', () => {
    const paths = getSitePaths();
    expect(paths).toContain('');
    expect(paths).toContain('about');
    expect(paths).toContain('projects');
    expect(paths).toContain('contact');
    expect(paths).toContain('principles');
    expect(paths).toContain('colophon');
    expect(paths).toContain('settings');
    expect(paths).toContain('cv');
    for (const p of projects) {
      expect(paths).toContain(`projects/${p.slug}`);
    }
    expect(paths).toHaveLength(8 + projects.length);
  });

  it('emits one URL per path per locale', () => {
    const entries = getSitemapEntries();
    expect(entries).toHaveLength(getSitePaths().length * routing.locales.length);
  });

  it('every entry has a unique URL and hreflang alternates', () => {
    const entries = getSitemapEntries();
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const e of entries) {
      expect(e.alternates?.languages).toBeDefined();
      for (const locale of routing.locales) {
        expect(e.alternates?.languages?.[locale]).toBeDefined();
      }
    }
  });
});
