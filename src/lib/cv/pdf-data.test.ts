import { describe, expect, it } from 'vitest';
import { cv } from '@/data/cv';
import { buildCvPdfData } from './pdf-data';

const projects = [
  { name: 'RiskLens', techs: ['FastAPI'], description: 'desc' },
  { name: 'ThoraxAI', techs: ['PyTorch'], description: 'desc' },
  { name: 'Portfolio AI', techs: ['RAG'], description: 'desc' },
];

describe('buildCvPdfData', () => {
  it('uses the static cv summary, never client text', () => {
    const data = buildCvPdfData('en', cv.en, projects);
    expect(data.summary).toBe(cv.en.summary);
  });

  it('omits phone and includes contact_bits without it', () => {
    const data = buildCvPdfData('en', cv.en, projects);
    expect((data.contact as unknown as Record<string, unknown>).phone).toBeUndefined();
    expect(data.contact_bits.join(' ')).not.toMatch(/\d{2}\s?\d{2}\s?\d{2}/);
    expect(data.contact_bits.some((bit) => bit.includes('@'))).toBe(true);
  });

  it('passes the 3 projects through and sets language', () => {
    expect(buildCvPdfData('fr', cv.fr, projects).projects).toHaveLength(3);
    expect(buildCvPdfData('fr', cv.fr, projects).language).toBe('fr');
    expect(buildCvPdfData('en', cv.en, projects).language).toBe('en');
  });

  it('supplies the alternance meta fields the templates expect (per-locale, non-empty)', () => {
    const fr = buildCvPdfData('fr', cv.fr, projects);
    const en = buildCvPdfData('en', cv.en, projects);
    for (const data of [fr, en]) {
      expect(data.target).toBeTruthy();
      expect(data.program).toBeTruthy();
      expect(data.rhythm).toBeTruthy();
      expect(data.duration).toBeTruthy();
      expect(data.start_date).toBeTruthy();
      expect(data.soft_skills.length).toBeGreaterThan(0);
      expect(data.interests).toBeTruthy();
    }
    expect(fr.target).not.toBe(en.target);
  });
});
