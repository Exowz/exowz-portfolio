import { describe, it, expect } from 'vitest';
import { buildAlternates, buildOgImageUrl, SITE_URL } from './seo';
import { routing } from '@/i18n/routing';

describe('buildAlternates', () => {
  it('builds canonical + hreflang for the home path', () => {
    const a = buildAlternates('en-GB', '');
    expect(a.canonical).toBe(`${SITE_URL}/en-GB`);
    expect(a.languages['en-GB']).toBe(`${SITE_URL}/en-GB`);
    expect(a.languages['fr']).toBe(`${SITE_URL}/fr`);
    expect(a.languages['x-default']).toBe(`${SITE_URL}/en-GB`);
  });

  it('builds canonical + hreflang for a nested path', () => {
    const a = buildAlternates('fr', 'projects/risk-lens');
    expect(a.canonical).toBe(`${SITE_URL}/fr/projects/risk-lens`);
    expect(a.languages['en-GB']).toBe(`${SITE_URL}/en-GB/projects/risk-lens`);
    expect(a.languages['fr']).toBe(`${SITE_URL}/fr/projects/risk-lens`);
    expect(a.languages['x-default']).toBe(`${SITE_URL}/en-GB/projects/risk-lens`);
  });

  it('normalizes stray slashes in the path', () => {
    const a = buildAlternates('en-GB', '/about/');
    expect(a.canonical).toBe(`${SITE_URL}/en-GB/about`);
  });

  it('includes an entry for every locale plus x-default', () => {
    const a = buildAlternates('en-GB', 'contact');
    expect(Object.keys(a.languages).sort()).toEqual([...routing.locales, 'x-default'].sort());
  });
});

describe('buildOgImageUrl', () => {
  it('points at the /api/og endpoint and encodes params', () => {
    const url = buildOgImageUrl({ title: 'RiskLens', subtitle: 'Risk & AI', badge: 'FinTech' });
    expect(url.startsWith(`${SITE_URL}/api/og?`)).toBe(true);
    const qs = new URL(url).searchParams;
    expect(qs.get('title')).toBe('RiskLens');
    expect(qs.get('subtitle')).toBe('Risk & AI');
    expect(qs.get('badge')).toBe('FinTech');
  });

  it('omits optional params when not provided', () => {
    const url = buildOgImageUrl({ title: 'Exowz' });
    const qs = new URL(url).searchParams;
    expect(qs.get('title')).toBe('Exowz');
    expect(qs.has('subtitle')).toBe(false);
    expect(qs.has('badge')).toBe(false);
  });
});
