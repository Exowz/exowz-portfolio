'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { projects, type CvFacet } from '@/data/projects';
import type { TailorResult } from '@/lib/cv/tailor';
import { FacetFilter } from './FacetFilter';

export function CvProjects({ tailored }: { tailored?: TailorResult | null }) {
  const t = useTranslations('cv');
  const tProjects = useTranslations('projects');
  const reduce = useReducedMotion();
  const [active, setActive] = useState<CvFacet | null>(null);
  const reasonBySlug = useMemo(() => new Map((tailored?.projects ?? []).map((p) => [p.slug, p.reason])), [tailored]);
  const ordered = useMemo(() => {
    if (!tailored || tailored.projects.length === 0) return projects;

    const rank = new Map(tailored.projects.map((p, index) => [p.slug, index]));
    return [...projects].sort((a, b) => (rank.get(a.slug) ?? 999) - (rank.get(b.slug) ?? 999));
  }, [tailored]);
  const shown = useMemo(() => (active ? ordered.filter((p) => p.facets.includes(active)) : ordered), [active, ordered]);

  return (
    <section id="projects" className="space-y-4">
      <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
        {t('sections.projects')}
      </h2>
      <FacetFilter active={active} onChange={setActive} />
      <motion.div layout={!reduce} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {shown.map((p) => {
          const reason = reasonBySlug.get(p.slug);
          return (
            <motion.div key={p.slug} layout={!reduce}>
              <Link
                href={`/projects/${p.slug}`}
                className="glass-card flex h-full flex-col gap-1 rounded-xl p-4 transition-shadow hover:shadow-lg"
              >
                <p className="font-semibold text-foreground">{tProjects(`${p.key}.title`)}</p>
                <p className="line-clamp-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {tProjects(`${p.key}.description`)}
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
