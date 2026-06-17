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

  it('marks exactly 3 featured projects', () => {
    expect(projects.filter((p) => p.featured).map((p) => p.slug).sort()).toEqual([
      'portfolio-projects-ai',
      'risk-lens',
      'thoraxai',
    ]);
  });

  it('every project has a non-empty key and at least one tag', () => {
    for (const p of projects) {
      expect(p.key.length).toBeGreaterThan(0);
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });

  it('every project has a non-empty facets array of valid values', () => {
    const valid = new Set(['data-eng', 'ml', 'ai-rag', 'finance', 'web', 'sovereignty']);
    for (const p of projects) {
      expect(p.facets.length, `${p.slug} has no facets`).toBeGreaterThan(0);
      for (const f of p.facets) expect(valid.has(f), `${p.slug}: invalid facet ${f}`).toBe(true);
    }
  });

  it('every facet is used by at least one project (no dead filter)', () => {
    const used = new Set(projects.flatMap((p) => p.facets));
    for (const f of ['data-eng', 'ml', 'ai-rag', 'finance', 'web', 'sovereignty']) {
      expect(used.has(f as (typeof projects)[number]['facets'][number]), `facet ${f} unused`).toBe(true);
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
