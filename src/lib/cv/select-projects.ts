import type { Project } from '@/data/projects';

/** The 3 projects for a tailored output: the passed slugs that resolve (in order,
 * deduped, unknowns dropped), then filled from the `featured` set to exactly 3. */
export function selectPdfProjects(slugs: string[], all: Project[]): Project[] {
  const bySlug = new Map(all.map((project) => [project.slug, project]));
  const picked: Project[] = [];
  const seen = new Set<string>();
  const push = (project: Project | undefined) => {
    if (project && !seen.has(project.slug) && picked.length < 3) {
      seen.add(project.slug);
      picked.push(project);
    }
  };

  for (const slug of slugs) push(bySlug.get(slug));
  for (const featured of all.filter((project) => project.featured)) push(featured);
  for (const project of all) push(project);

  return picked.slice(0, 3);
}
