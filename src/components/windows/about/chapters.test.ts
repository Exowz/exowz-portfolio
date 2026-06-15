import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { CHAPTERS } from './chapters';
import enPages from '@/messages/en-GB/pages.json';

const MESSAGES = join(process.cwd(), 'src/messages');
const locales = readdirSync(MESSAGES).filter(
  (d) => statSync(join(MESSAGES, d)).isDirectory() && existsSync(join(MESSAGES, d, 'pages.json')),
);

describe('about chapters config', () => {
  it('covers 6 chapters', () => {
    expect(CHAPTERS.map((c) => c.id)).toEqual(['origins', 'dream', 'fall', 'return', 'dataAI', 'sovereignty']);
  });

  it('every chapter beat is an existing story key (en-GB)', () => {
    const story = (enPages as { about: { story: Record<string, string> } }).about.story;
    for (const ch of CHAPTERS) {
      for (const b of ch.beats) {
        expect(story[b], `${ch.id}/${b}`).toBeDefined();
      }
    }
  });
});

describe('about i18n keys across all locales', () => {
  it('has 12 locales', () => expect(locales.length).toBe(12));

  for (const loc of locales) {
    it(`${loc}: all new About keys present`, () => {
      const about = JSON.parse(readFileSync(join(MESSAGES, loc, 'pages.json'), 'utf8')).about;
      expect(about.displayName, 'displayName').toBeTruthy();
      expect(about.status?.degree && about.status?.seeking, 'status').toBeTruthy();
      expect(about.principlesTitle, 'principlesTitle').toBeTruthy();
      expect(Array.isArray(about.principles) && about.principles.length === 5, 'principles[5]').toBe(true);
      for (const k of ['programme', 'schools', 'grade']) {
        expect(about.education?.[k], `education.${k}`).toBeTruthy();
      }
      for (const c of CHAPTERS) {
        expect(about.chapters?.[c.id], `chapters.${c.id}`).toBeTruthy();
      }
      for (const g of ['dataAI', 'web', 'cloud', 'domain']) {
        expect(about.toolkit?.[g], `toolkit.${g}`).toBeTruthy();
        expect(about.toolkit?.[`${g}Label`], `toolkit.${g}Label`).toBeTruthy();
      }
      for (const k of ['mauritius', 'cooking']) {
        expect(about.captions?.[k], `captions.${k}`).toBeTruthy();
      }
    });
  }
});
