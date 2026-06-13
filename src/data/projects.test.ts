import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug } from './projects';
import enProjects from '../messages/en-GB/projects.json';
import frProjects from '../messages/fr/projects.json';

describe('projects data', () => {
  it('contains exactly 16 projects', () => {
    expect(projects).toHaveLength(16);
  });

  it('has unique slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every project has a non-empty key and at least one tag', () => {
    for (const p of projects) {
      expect(p.key.length).toBeGreaterThan(0);
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });

  it('getProjectBySlug returns the matching project', () => {
    const p = getProjectBySlug('shiatsu-guyane');
    expect(p).toBeDefined();
    expect(p?.key).toBe('shiatsuGuyane');
    expect(p?.demo).toBe('https://www.shiatsu-guyane.com/fr');
  });

  it('getProjectBySlug returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeUndefined();
  });

  it('every project key has matching i18n copy in both locales', () => {
    const en = enProjects as Record<string, unknown>;
    const fr = frProjects as Record<string, unknown>;
    for (const p of projects) {
      expect(en[p.key], `missing en-GB copy for ${p.slug} (key: ${p.key})`).toBeDefined();
      expect(fr[p.key], `missing fr copy for ${p.slug} (key: ${p.key})`).toBeDefined();
    }
  });
});
