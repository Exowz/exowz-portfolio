import { type Project } from '@/data/projects';

export type ProjectCategory = 'AI' | 'Data' | 'Web' | 'Open Source';

/** Order shown in the filter chips after "All". */
export const PROJECT_CATEGORIES: ProjectCategory[] = ['AI', 'Data', 'Web', 'Open Source'];

/** Lowercased substrings matched against a project's tags. Tune as the project set grows. */
const CATEGORY_KEYWORDS: Record<'AI' | 'Data' | 'Web', string[]> = {
  AI: [
    'pytorch',
    'deep learning',
    'machine learning',
    'computer vision',
    'explainable ai',
    'mistral ai',
    'xgboost',
    'llm',
    'nlp',
  ],
  Data: ['pandas', 'data visualization', 'plotly', 'postgresql', 'shiny', 'streamlit', 'numpy', 'sql'],
  Web: ['next.js', 'react', 'vue', 'laravel', 'tailwind', 'typescript', 'fastapi', 'appwrite', 'vercel', 'svelte', 'node'],
};

/** Categories a project belongs to, derived from its tags and GitHub presence. */
export function getProjectCategories(project: Project): ProjectCategory[] {
  const tagsLower = project.tags.map((tag) => tag.toLowerCase());
  const categories: ProjectCategory[] = [];

  (['AI', 'Data', 'Web'] as const).forEach((category) => {
    if (CATEGORY_KEYWORDS[category].some((keyword) => tagsLower.some((tag) => tag.includes(keyword)))) {
      categories.push(category);
    }
  });

  if (project.github !== null) categories.push('Open Source');
  return categories;
}

/** Whether a project should show under a given filter. */
export function projectMatchesCategory(project: Project, category: ProjectCategory | 'All'): boolean {
  if (category === 'All') return true;
  return getProjectCategories(project).includes(category);
}

/** Split a list into fixed-size pages. */
export function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }

  return pages;
}
