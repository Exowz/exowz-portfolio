'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { projects, type CvFacet } from '@/data/projects';
import { Link } from '@/i18n/routing';
import { selectPdfProjects } from '@/lib/cv/select-projects';
import type { TailorResult } from '@/lib/cv/tailor';
import { FacetFilter } from './FacetFilter';

export function FeaturedProjects({ tailored }: { tailored?: TailorResult | null }) {
  const t = useTranslations('cv');
  const tProjects = useTranslations('projects');
  const reduce = useReducedMotion();
  const [seeAll, setSeeAll] = useState(false);
  const [active, setActive] = useState<CvFacet | null>(null);

  const reasonBySlug = useMemo(() => new Map((tailored?.projects ?? []).map((project) => [project.slug, project.reason])), [tailored]);

  const topRow = useMemo(() => selectPdfProjects(tailored?.projects.map((project) => project.slug) ?? [], projects), [tailored]);

  const allOrdered = useMemo(() => {
    if (!tailored || tailored.projects.length === 0) return projects;

    const rank = new Map(tailored.projects.map((project, index) => [project.slug, index]));
    return [...projects].sort((a, b) => (rank.get(a.slug) ?? 999) - (rank.get(b.slug) ?? 999));
  }, [tailored]);

  const shown = seeAll ? (active ? allOrdered.filter((project) => project.facets.includes(active)) : allOrdered) : topRow;

  return (
    <section id="projects" className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
          {t('sections.projects')}
        </h2>
        <button
          type="button"
          onClick={() => setSeeAll((current) => !current)}
          className="text-xs"
          style={{ color: 'var(--text-secondary)' }}
        >
          {seeAll ? t('projectsCollapse') : t('projectsSeeAll')}
        </button>
      </div>
      {seeAll && <FacetFilter active={active} onChange={setActive} />}
      <motion.div layout={!reduce} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => {
          const reason = reasonBySlug.get(project.slug);
          return (
            <motion.div key={project.slug} layout={!reduce}>
              <Link
                href={`/projects/${project.slug}`}
                className="glass-card flex h-full flex-col gap-1 rounded-xl p-4 transition-shadow hover:shadow-lg"
              >
                <p className="font-semibold text-foreground">{tProjects(`${project.key}.title`)}</p>
                <p className="line-clamp-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {tProjects(`${project.key}.description`)}
                </p>
                {reason && (
                  <p className="mt-1 text-xs" style={{ color: 'var(--accent-text)' }}>
                    {t('tailor.whyFits')}: {reason}
                  </p>
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
