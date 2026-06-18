/**
 * Slug-scoped one-shot flag: which project detail, if any, was opened from the
 * Projects folder rather than from a direct route/deep-link.
 */
let folderProjectSlug: string | null = null;

export function markCameFromFolder(slug: string): void {
  folderProjectSlug = slug;
}

/** True only if `slug` matches the marked project; always clears the flag. */
export function consumeCameFromFolder(slug: string): boolean {
  const matched = folderProjectSlug === slug;
  folderProjectSlug = null;
  return matched;
}

export function clearCameFromFolder(): void {
  folderProjectSlug = null;
}
