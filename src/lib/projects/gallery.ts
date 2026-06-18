import type { CvFacet, Project } from '@/data/projects';

/** Filter projects by facet. `null` = "All" (no filtering). */
export function filterProjects(projects: Project[], facet: CvFacet | null): Project[] {
  if (!facet) return projects;
  return projects.filter((project) => project.facets.includes(facet));
}

/**
 * Up-to-2-character monogram for a project's app-icon tile.
 * Prefers the capital letters in the title (so "RiskLens" → "RL", "ThoraxAI" → "TA"),
 * falling back to the first two letters when there aren't two capitals.
 */
export function monogram(title: string): string {
  const caps = title.match(/[A-Z]/g);
  if (caps && caps.length >= 2) return (caps[0] + caps[1]).toUpperCase();
  const letters = title.replace(/[^A-Za-z]/g, '');
  return (letters.slice(0, 2) || title.slice(0, 2)).toUpperCase();
}
