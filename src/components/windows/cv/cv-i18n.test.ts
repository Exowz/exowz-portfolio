import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const MESSAGES = join(process.cwd(), 'src/messages');
const locales = readdirSync(MESSAGES).filter(
  (d) => statSync(join(MESSAGES, d)).isDirectory() && existsSync(join(MESSAGES, d, 'cv.json')),
);

describe('cv i18n chrome', () => {
  it('present in all 12 locales with required keys', () => {
    expect(locales.length).toBe(12);
    for (const loc of locales) {
      const c = JSON.parse(readFileSync(join(MESSAGES, loc, 'cv.json'), 'utf8'));
      expect(c.title, `${loc} title`).toBeTruthy();
      for (const s of ['summary', 'skills', 'experience', 'education', 'projects']) {
        expect(c.sections?.[s], `${loc} sections.${s}`).toBeTruthy();
      }
      for (const a of ['downloadPdf', 'contact']) {
        expect(c.actions?.[a], `${loc} actions.${a}`).toBeTruthy();
      }
      for (const f of ['all', 'data-eng', 'ml', 'ai-rag', 'finance', 'web', 'sovereignty']) {
        expect(c.facets?.[f], `${loc} facets.${f}`).toBeTruthy();
      }
    }
  });
});
