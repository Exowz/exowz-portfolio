import { describe, expect, it } from 'vitest';
import { projects } from '@/data/projects';
import { selectPdfProjects } from './select-projects';

const featuredSlugs = projects.filter((project) => project.featured).map((project) => project.slug);

describe('selectPdfProjects', () => {
  it('returns exactly 3', () => {
    expect(selectPdfProjects([], projects)).toHaveLength(3);
    expect(selectPdfProjects(['risk-lens'], projects)).toHaveLength(3);
    expect(selectPdfProjects(['risk-lens', 'thoraxai', 'rib', 'dna'], projects)).toHaveLength(3);
  });

  it('keeps passed slugs first, in order, then fills from featured', () => {
    const out = selectPdfProjects(['rib'], projects).map((project) => project.slug);
    expect(out[0]).toBe('rib');
    expect(out).toHaveLength(3);
    for (const slug of out.slice(1)) expect(featuredSlugs).toContain(slug);
  });

  it('drops unknown slugs and dedupes', () => {
    const out = selectPdfProjects(['made-up', 'rib', 'rib'], projects).map((project) => project.slug);
    expect(out).toContain('rib');
    expect(new Set(out).size).toBe(out.length);
    expect(out).not.toContain('made-up');
  });

  it('defaults to the 3 featured when no slugs given', () => {
    expect(selectPdfProjects([], projects).map((project) => project.slug).sort()).toEqual([...featuredSlugs].sort());
  });
});
