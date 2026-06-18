import { describe, expect, it } from 'vitest';
import { EMPTY_TAILOR_RESULT, TAILOR_LIMITS, groundTailorResult, type TailorVocab } from './tailor';

const vocab: TailorVocab = {
  slugs: new Set(['risk-lens', 'thoraxai', 'rib']),
  skills: new Set(['Python', 'SQL', 'FastAPI']),
  experienceIds: new Set(['purecontrol', 'freelance']),
};

describe('groundTailorResult', () => {
  it('returns the empty safe result for malformed input', () => {
    expect(groundTailorResult(null, vocab)).toEqual(EMPTY_TAILOR_RESULT);
    expect(groundTailorResult('nope', vocab)).toEqual(EMPTY_TAILOR_RESULT);
  });

  it('drops unknown slugs/skills/experience ids', () => {
    const r = groundTailorResult(
      {
        label: 'Data Engineer',
        summary: 'ok',
        projects: [
          { slug: 'risk-lens', reason: 'fit' },
          { slug: 'made-up', reason: 'x' },
        ],
        skillHighlights: ['Python', 'COBOL'],
        experienceHighlights: ['purecontrol', 'ghost'],
      },
      vocab
    );
    expect(r.projects.map((p) => p.slug)).toEqual(['risk-lens']);
    expect(r.skillHighlights).toEqual(['Python']);
    expect(r.experienceHighlights).toEqual(['purecontrol']);
  });

  it('strips markdown and clamps lengths/counts', () => {
    const r = groundTailorResult(
      {
        label: 'x'.repeat(200),
        summary: `**${'y'.repeat(400)}**`,
        projects: Array.from({ length: 9 }, () => ({ slug: 'rib', reason: 'z'.repeat(300) })),
        skillHighlights: Array.from({ length: 30 }, () => 'Python'),
        experienceHighlights: ['purecontrol', 'freelance', 'purecontrol'],
      },
      vocab
    );
    expect(r.label.length).toBeLessThanOrEqual(TAILOR_LIMITS.label);
    expect(r.summary.includes('*')).toBe(false);
    expect(r.summary.length).toBeLessThanOrEqual(TAILOR_LIMITS.summary);
    expect(r.projects.length).toBeLessThanOrEqual(TAILOR_LIMITS.projects);
    expect(r.projects[0].reason.length).toBeLessThanOrEqual(TAILOR_LIMITS.reason);
    expect(r.skillHighlights).toEqual(['Python']);
    expect(r.experienceHighlights).toEqual(['purecontrol', 'freelance']);
  });
});
