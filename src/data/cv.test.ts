import { existsSync } from 'fs';
import { join } from 'path';
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
      for (const e of c.experience) expect(e.id, `${lang} experience id`).toBeTruthy();
      for (const e of c.experience) expect(e.detail && e.detail.length > 20, `${lang} exp ${e.company} detail`).toBeTruthy();
      for (const e of c.experience) expect(e.company && e.role && e.period && e.highlights.length).toBeTruthy();
      for (const e of c.education) {
        expect(e.id, `${lang} edu id`).toBeTruthy();
        expect(e.detail && e.detail.length > 20, `${lang} edu ${e.id} detail`).toBeTruthy();
      }
      const credIds = new Set(c.credentials.map((cr) => cr.id));
      for (const e of c.education)
        for (const b of e.badges ?? []) expect(credIds.has(b), `${lang} badge ${b}`).toBe(true);
      for (const e of c.education)
        if (e.logo) expect(existsSync(join(process.cwd(), 'public', e.logo)), `${lang} edu logo ${e.logo}`).toBe(true);
      for (const cr of c.credentials) {
        expect(cr.title && cr.body, `${lang} credential ${cr.id} text`).toBeTruthy();
        expect(existsSync(join(process.cwd(), 'public', cr.image)), `${lang} credential image ${cr.image}`).toBe(true);
      }
      for (const e of c.education) expect(e.institution && e.degree && e.period).toBeTruthy();
      for (const s of c.skills) expect(s.category && s.techs.length).toBeTruthy();
    });
  }
});
