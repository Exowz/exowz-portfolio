'use client';

import { useTranslations } from 'next-intl';
import { IconBrandGithub, IconExternalLink, IconStarFilled } from '@tabler/icons-react';
import { Link } from '@/i18n/routing';
import type { Project } from '@/data/projects';
import { monogram } from '@/lib/projects/gallery';

const ICON_GRADIENT = 'linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 65%, #1e3a5f))';

/** App-icon project card: monogram tile + facet label, title, summary, tech chips, links. */
export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const t = useTranslations('projects');
  const tFacets = useTranslations('cv.facets');
  const title = t(`${project.key}.title`);
  const facetLabel = project.facets
    .slice(0, 3)
    .map((facet) => tFacets(facet))
    .join(' · ');

  return (
    <div
      className="group glass-card glass-card-hover relative flex h-full flex-col rounded-2xl p-5"
      style={{
        background: featured
          ? 'color-mix(in srgb, var(--accent) 7%, var(--window-content-bg))'
          : 'var(--window-content-bg)',
        borderColor: featured ? 'color-mix(in srgb, var(--accent) 32%, transparent)' : undefined,
      }}
    >
      {featured && (
        <IconStarFilled
          className="absolute right-4 top-4 h-3.5 w-3.5"
          style={{ color: 'var(--accent-text)' }}
          aria-hidden
        />
      )}

      <Link href={`/projects/${project.slug}`} className="flex flex-col gap-3 outline-none">
        <div className="flex items-center gap-3">
          <span
            className={`flex shrink-0 items-center justify-center rounded-xl font-extrabold tracking-wide text-white ${
              featured ? 'h-12 w-12 text-base' : 'h-10 w-10 text-sm'
            }`}
            style={{ background: ICON_GRADIENT, boxShadow: '0 6px 16px color-mix(in srgb, var(--accent) 35%, transparent)' }}
            aria-hidden
          >
            {monogram(title)}
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.13em]" style={{ color: 'var(--accent-text)' }}>
              {facetLabel}
            </p>
            <h3
              className={`font-bold leading-tight transition-colors group-hover:opacity-90 ${featured ? 'text-xl' : 'text-lg'}`}
              style={{ color: 'var(--foreground)' }}
            >
              {title}
            </h3>
          </div>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t(`${project.key}.description`)}
        </p>
      </Link>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full px-2.5 py-0.5 text-[11px]"
            style={{
              background: 'color-mix(in srgb, var(--accent) 9%, transparent)',
              border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
              color: 'var(--accent-text)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-4 pt-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
          >
            <IconBrandGithub className="h-4 w-4" />
            {t('viewCode')}
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
          >
            <IconExternalLink className="h-4 w-4" />
            {t('liveDemo')}
          </a>
        )}
        <span className="ml-auto" style={{ color: 'var(--text-tertiary)' }}>
          {project.date.slice(0, 4)}
        </span>
      </div>
    </div>
  );
}
