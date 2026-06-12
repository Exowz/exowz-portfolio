import { describe, it, expect } from 'vitest';
import { getProjectBySlug } from '@/data/projects';
import {
  getProjectCategories,
  getFeaturedProjects,
  projectMatchesCategory,
  PROJECT_CATEGORIES,
} from './projectCategories';

const riskLens = getProjectBySlug('risk-lens')!;
const thorax = getProjectBySlug('thoraxai')!;

describe('PROJECT_CATEGORIES', () => {
  it('lists the four filter categories', () => {
    expect(PROJECT_CATEGORIES).toEqual(['AI', 'Data', 'Web', 'Open Source']);
  });
});

describe('getProjectCategories', () => {
  it('derives multiple categories from tags and github', () => {
    const categories = getProjectCategories(riskLens);
    expect(categories).toContain('Web');
    expect(categories).toContain('Data');
    expect(categories).toContain('AI');
    expect(categories).toContain('Open Source');
  });

  it('classifies an ML project as AI and Open Source', () => {
    const categories = getProjectCategories(thorax);
    expect(categories).toContain('AI');
    expect(categories).toContain('Open Source');
    expect(categories).not.toContain('Web');
  });
});

describe('projectMatchesCategory', () => {
  it('matches everything for All', () => {
    expect(projectMatchesCategory(thorax, 'All')).toBe(true);
  });

  it('filters by a specific category', () => {
    expect(projectMatchesCategory(thorax, 'AI')).toBe(true);
    expect(projectMatchesCategory(thorax, 'Web')).toBe(false);
  });
});

describe('getFeaturedProjects', () => {
  it('returns the first N projects', () => {
    expect(getFeaturedProjects(3)).toHaveLength(3);
    expect(getFeaturedProjects(3)[0].slug).toBe('risk-lens');
  });
});
