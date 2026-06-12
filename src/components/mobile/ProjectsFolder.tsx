'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useHistoryOverlay } from '@/components/hooks/useHistoryOverlay';
import { projects } from '@/data/projects';
import { FeaturedCarousel } from './FeaturedCarousel';
import { PROJECT_CATEGORIES, projectMatchesCategory, type ProjectCategory } from './projectCategories';

interface ProjectsFolderProps {
  open: boolean;
  onClose: () => void;
}

type Filter = ProjectCategory | 'All';

/** iOS-style Projects folder overlay: featured carousel, filter chips, and grid. */
export function ProjectsFolder({ open, onClose }: ProjectsFolderProps) {
  const t = useTranslations('projects');
  const tPage = useTranslations('pages.projects');
  const [filter, setFilter] = useState<Filter>('All');
  const panelRef = useRef<HTMLDivElement>(null);

  useHistoryOverlay(open, onClose);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const filters: Filter[] = ['All', ...PROJECT_CATEGORIES];
  const visibleProjects = projects.filter((project) => projectMatchesCategory(project, filter));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[70] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={tPage('title')}
            tabIndex={-1}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-3xl"
            style={{
              background: 'var(--window-bg)',
              border: '1px solid var(--window-border)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: 'var(--window-shadow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between px-5 pt-5 pb-2">
              <span className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                {tPage('title')}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: 'var(--window-close-btn)' }}
              >
                <IconX className="h-4 w-4" style={{ color: 'var(--window-btn-icon)' }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-5">
              <FeaturedCarousel />

              <div className="mt-4 flex flex-wrap gap-2">
                {filters.map((currentFilter) => {
                  const active = filter === currentFilter;

                  return (
                    <button
                      key={currentFilter}
                      type="button"
                      onClick={() => setFilter(currentFilter)}
                      aria-pressed={active}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{
                        color: active ? 'var(--accent)' : 'var(--foreground)',
                        border: active ? '1px solid var(--accent)' : '1px solid var(--window-border)',
                        background: active ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
                      }}
                    >
                      {currentFilter}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {visibleProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="flex flex-col overflow-hidden rounded-2xl border"
                    style={{ borderColor: 'var(--window-border)', background: 'var(--dock-item-bg)' }}
                  >
                    <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
                      <span className="text-2xl font-bold text-muted-foreground/30">
                        {t(`${project.key}.title`).charAt(0)}
                      </span>
                    </div>
                    <p className="truncate px-2 py-2 text-xs font-medium" style={{ color: 'var(--foreground)' }}>
                      {t(`${project.key}.title`)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
