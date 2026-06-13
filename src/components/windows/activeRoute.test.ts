import { describe, it, expect } from 'vitest';
import { parseActiveRoute } from './activeRoute';

describe('parseActiveRoute', () => {
  it('treats the bare locale segment as home', () => {
    expect(parseActiveRoute('/en-GB')).toEqual({ id: null, isHome: true, isDetail: false, slug: null });
    expect(parseActiveRoute('/fr')).toEqual({ id: null, isHome: true, isDetail: false, slug: null });
  });

  it('detects about and contact', () => {
    expect(parseActiveRoute('/en-GB/about')).toEqual({ id: 'about', isHome: false, isDetail: false, slug: null });
    expect(parseActiveRoute('/fr/contact')).toEqual({ id: 'contact', isHome: false, isDetail: false, slug: null });
  });

  it('detects the projects list', () => {
    expect(parseActiveRoute('/en-GB/projects')).toEqual({ id: 'projects', isHome: false, isDetail: false, slug: null });
  });

  it('detects principles and colophon', () => {
    expect(parseActiveRoute('/en-GB/principles')).toEqual({
      id: 'principles', isHome: false, isDetail: false, slug: null,
    });
    expect(parseActiveRoute('/fr/colophon')).toEqual({
      id: 'colophon', isHome: false, isDetail: false, slug: null,
    });
  });

  it('detects settings', () => {
    expect(parseActiveRoute('/en-GB/settings')).toEqual({
      id: 'settings', isHome: false, isDetail: false, slug: null,
    });
  });

  it('detects a project detail with its slug', () => {
    expect(parseActiveRoute('/en-GB/projects/risk-lens')).toEqual({
      id: 'projects', isHome: false, isDetail: true, slug: 'risk-lens',
    });
  });

  it('returns a null id for unknown routes (not home)', () => {
    expect(parseActiveRoute('/en-GB/nope')).toEqual({ id: null, isHome: false, isDetail: false, slug: null });
  });
});
