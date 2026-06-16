'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { projects, type CvFacet } from '@/data/projects';
import { FacetFilter } from './FacetFilter';

export function CvProjects() {
  const t = useTranslations('cv.sections');
  const tProjects = useTranslations('projects');
  const reduce = useReducedMotion();
  const [active, setActive] = useState<CvFacet | null>(null);
  const shown = useMemo(() => (active ? projects.filter((p) => p.facets.includes(active)) : projects), [active]);

  return (
    <section id="projects" className="space-y-4">
      <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
        {t('projects')}
      </h2>
      <FacetFilter active={active} onChange={setActive} />
      <motion.div layout={!reduce} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {shown.map((p) => (
          <motion.div key={p.slug} layout={!reduce}>
            <Link
              href={`/projects/${p.slug}`}
              className="glass-card flex h-full flex-col gap-1 rounded-xl p-4 transition-shadow hover:shadow-lg"
            >
              <p className="font-semibold text-foreground">{tProjects(`${p.key}.title`)}</p>
              <p className="line-clamp-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {tProjects(`${p.key}.description`)}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
