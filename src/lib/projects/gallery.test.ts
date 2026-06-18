import { describe, it, expect } from 'vitest';
import { filterProjects, monogram } from './gallery';
import { projects } from '@/data/projects';

describe('filterProjects', () => {
  it('returns all projects when facet is null', () => {
    expect(filterProjects(projects, null)).toHaveLength(projects.length);
  });

  it('returns only projects carrying the facet', () => {
    const finance = filterProjects(projects, 'finance');
    expect(finance.length).toBeGreaterThan(0);
    expect(finance.every((p) => p.facets.includes('finance'))).toBe(true);
  });

  it('preserves source order', () => {
    const ml = filterProjects(projects, 'ml');
    const ordered = projects.filter((p) => p.facets.includes('ml'));
    expect(ml.map((p) => p.slug)).toEqual(ordered.map((p) => p.slug));
  });
});

describe('monogram', () => {
  it('uses the first two capitals when present', () => {
    expect(monogram('RiskLens')).toBe('RL');
    expect(monogram('ThoraxAI')).toBe('TA');
    expect(monogram('Blue-Gold Analytics')).toBe('BG');
  });

  it('falls back to the first two letters', () => {
    expect(monogram('scraping')).toBe('SC');
    expect(monogram('mots-fléchés')).toBe('MO');
  });
});
