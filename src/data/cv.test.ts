import { describe, expect, it } from 'vitest';
import { cv } from './cv';

describe('cv data', () => {
  it('has en and fr content', () => {
    expect(cv.en).toBeDefined();
    expect(cv.fr).toBeDefined();
  });

  for (const lang of ['en', 'fr'] as const) {
    it(`${lang}: required fields present, no phone`, () => {
      const c = cv[lang];
      expect(c.title && c.summary && c.objective).toBeTruthy();
      expect(c.contact.email && c.contact.location && c.contact.linkedin && c.contact.github).toBeTruthy();
      expect((c.contact as unknown as Record<string, unknown>).phone).toBeUndefined();
      expect(c.experience.length).toBeGreaterThan(0);
      expect(c.education.length).toBeGreaterThan(0);
      expect(c.skills.length).toBeGreaterThan(0);
      expect(c.languages.length).toBeGreaterThan(0);
      for (const e of c.experience) expect(e.company && e.role && e.period && e.highlights.length).toBeTruthy();
      for (const e of c.education) expect(e.institution && e.degree && e.period).toBeTruthy();
      for (const s of c.skills) expect(s.category && s.techs.length).toBeTruthy();
    });
  }
});
