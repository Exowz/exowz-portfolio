'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { IconStarFilled } from '@tabler/icons-react';
import { projects, type CvFacet } from '@/data/projects';
import { filterProjects } from '@/lib/projects/gallery';
import { FacetFilter } from './cv/FacetFilter';
import { ProjectCard } from './projects/ProjectCard';

export function ProjectsWindow() {
  const t = useTranslations('pages.projects');
  const [facet, setFacet] = useState<CvFacet | null>(null);

  const filtered = filterProjects(projects, facet);
  // When unfiltered, surface featured projects in their own strip; once a facet is
  // chosen the filter is global, so everything collapses into one grid.
  const featured = facet === null ? filtered.filter((p) => p.featured) : [];
  const rest = facet === null ? filtered.filter((p) => !p.featured) : filtered;

  const heading = (text: string, icon?: React.ReactNode) => (
    <div className="mb-4 flex items-center gap-2">
      {icon}
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
        {text}
      </h2>
    </div>
  );

  const grid = (list: typeof projects, featuredCards: boolean) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((project, index) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
        >
          <ProjectCard project={project} featured={featuredCards && project.featured} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="p-5 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-5">
          <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            {t('description')}
          </p>
          <FacetFilter active={facet} onChange={setFacet} />
        </header>

        {featured.length > 0 && (
          <section>
            {heading(t('featured'), <IconStarFilled className="h-3.5 w-3.5" style={{ color: 'var(--accent-text)' }} />)}
            {grid(featured, true)}
          </section>
        )}

        {rest.length > 0 && (
          <section>
            {featured.length > 0 && heading(t('allProjects'))}
            {grid(rest, false)}
          </section>
        )}

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('empty')}
          </p>
        )}
      </div>
    </div>
  );
}
