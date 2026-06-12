import { describe, it, expect } from 'vitest';
import { DOCK_APPS, GRID_APPS, resolveHref, type MobileApp } from './apps';

const ALL = [...DOCK_APPS, ...GRID_APPS];

describe('mobile app inventory', () => {
  it('pins exactly four apps in the dock', () => {
    expect(DOCK_APPS).toHaveLength(4);
    expect(DOCK_APPS.map((a) => a.id)).toEqual(['projects', 'about', 'contact', 'resume']);
  });

  it('has unique ids across dock and grid', () => {
    const ids = ALL.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every app exactly one of labelKey or label', () => {
    for (const app of ALL) {
      const hasKey = app.labelKey !== null;
      const hasLiteral = app.label !== null;
      expect(hasKey !== hasLiteral).toBe(true); // XOR
    }
  });

  it('gives route and external apps an href, and overlay apps none', () => {
    for (const app of ALL) {
      if (app.kind === 'overlay') expect(app.href).toBeNull();
      else expect(app.href).not.toBeNull();
    }
  });

  it('templates route hrefs with {locale} and uses absolute/known externals', () => {
    for (const app of ALL) {
      if (app.kind === 'route') expect(app.href!.startsWith('/{locale}/')).toBe(true);
      if (app.kind === 'external') {
        expect(/^https?:\/\//.test(app.href!) || app.href!.startsWith('/resume-{locale}')).toBe(true);
      }
    }
  });

  it('resolveHref substitutes the locale and passes externals through', () => {
    const projects = DOCK_APPS.find((a) => a.id === 'projects') as MobileApp;
    expect(resolveHref(projects, 'fr')).toBe('/fr/projects');
    const github = GRID_APPS.find((a) => a.id === 'github') as MobileApp;
    expect(resolveHref(github, 'fr')).toBe('https://github.com/exowz');
    const settings = GRID_APPS.find((a) => a.id === 'settings') as MobileApp;
    expect(resolveHref(settings, 'fr')).toBeNull();
  });
});
