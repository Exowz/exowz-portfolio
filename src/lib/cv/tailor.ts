export interface TailorProject {
  slug: string;
  reason: string;
}

export interface TailorResult {
  label: string;
  summary: string;
  projects: TailorProject[];
  skillHighlights: string[];
  experienceHighlights: string[];
}

export const TAILOR_LIMITS = {
  label: 50,
  summary: 280,
  projects: 5,
  reason: 140,
  skillHighlights: 12,
  experienceHighlights: 3,
  roleInputMax: 2000,
  roleInputMin: 3,
} as const;

export const EMPTY_TAILOR_RESULT: TailorResult = {
  label: '',
  summary: '',
  projects: [],
  skillHighlights: [],
  experienceHighlights: [],
};

export interface TailorVocab {
  slugs: Set<string>;
  skills: Set<string>;
  experienceIds: Set<string>;
}

function clampStr(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[*_`#]+/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function dedupeAllowed(values: unknown, allowed: Set<string>, max: number): string[] {
  if (!Array.isArray(values)) return [];

  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    if (typeof value !== 'string' || !allowed.has(value) || seen.has(value)) continue;
    seen.add(value);
    out.push(value);
    if (out.length >= max) break;
  }
  return out;
}

/** Validate and clamp a raw model object against the known vocabulary. Never throws. */
export function groundTailorResult(raw: unknown, vocab: TailorVocab): TailorResult {
  if (!raw || typeof raw !== 'object') return { ...EMPTY_TAILOR_RESULT };
  const result = raw as Record<string, unknown>;

  const seenSlug = new Set<string>();
  const projects = Array.isArray(result.projects)
    ? result.projects.reduce<TailorProject[]>((acc, entry) => {
        if (acc.length >= TAILOR_LIMITS.projects) return acc;
        if (!entry || typeof entry !== 'object') return acc;

        const project = entry as Record<string, unknown>;
        const slug = project.slug;
        if (typeof slug !== 'string' || !vocab.slugs.has(slug) || seenSlug.has(slug)) return acc;

        seenSlug.add(slug);
        acc.push({ slug, reason: clampStr(project.reason, TAILOR_LIMITS.reason) });
        return acc;
      }, [])
    : [];

  return {
    label: clampStr(result.label, TAILOR_LIMITS.label),
    summary: clampStr(result.summary, TAILOR_LIMITS.summary),
    projects,
    skillHighlights: dedupeAllowed(result.skillHighlights, vocab.skills, TAILOR_LIMITS.skillHighlights),
    experienceHighlights: dedupeAllowed(result.experienceHighlights, vocab.experienceIds, TAILOR_LIMITS.experienceHighlights),
  };
}
