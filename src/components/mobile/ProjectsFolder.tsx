'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useHistoryOverlay } from '@/components/hooks/useHistoryOverlay';
import { projects } from '@/data/projects';
import { markCameFromFolder } from './folderNavigation';
import { chunk, PROJECT_CATEGORIES, projectMatchesCategory, type ProjectCategory } from './projectCategories';

interface ProjectsFolderProps {
  open: boolean;
  onClose: () => void;
}

type Filter = ProjectCategory | 'All';

const ICONS_PER_PAGE = 9;

/** iOS-style Projects folder: compact panel, filters, and paginated app icons. */
export function ProjectsFolder({ open, onClose }: ProjectsFolderProps) {
  const t = useTranslations('projects');
  const tPage = useTranslations('pages.projects');
  const [filter, setFilter] = useState<Filter>('All');
  const [selectedPage, setSelectedPage] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center' });

  useHistoryOverlay(open, onClose);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const filters: Filter[] = ['All', ...PROJECT_CATEGORIES];
  const pages = useMemo(
    () => chunk(projects.filter((project) => projectMatchesCategory(project, filter)), ICONS_PER_PAGE),
    [filter],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => setSelectedPage(emblaApi.selectedScrollSnap());
    emblaApi.on('select', handleSelect);
    handleSelect();

    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit();
    emblaApi.scrollTo(0);
    setSelectedPage(0);
  }, [emblaApi, filter]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[70] flex items-center justify-center p-6 backdrop-blur-xl"
          style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={tPage('title')}
            tabIndex={-1}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="w-[88%] max-w-sm rounded-3xl p-5"
            style={{
              background: 'var(--window-bg)',
              border: '1px solid var(--window-border)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: 'var(--window-shadow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>
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

            <div className="mb-4 flex flex-wrap gap-2">
              {filters.map((currentFilter) => {
                const active = filter === currentFilter;

                return (
                  <button
                    key={currentFilter}
                    type="button"
                    onClick={() => setFilter(currentFilter)}
                    aria-pressed={active}
                    className="rounded-full px-2.5 py-1 text-xs"
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

            {pages.length === 0 ? (
              <div className="flex min-h-[18rem] items-center justify-center text-sm text-muted-foreground">
                No projects
              </div>
            ) : (
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="min-h-[18rem] flex-[0_0_100%]">
                      <div className="grid grid-cols-3 gap-x-3 gap-y-5">
                        {page.map((project) => (
                          <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            onClick={() => markCameFromFolder(project.slug)}
                            className="flex flex-col items-center gap-1.5"
                          >
                            <div
                              className="flex h-16 w-16 items-center justify-center rounded-2xl"
                              style={{
                                background: 'var(--dock-item-bg)',
                                border: '1px solid var(--dock-item-border)',
                                boxShadow: 'var(--dock-item-shadow)',
                              }}
                            >
                              <span className="text-2xl font-bold text-muted-foreground/40">
                                {t(`${project.key}.title`).charAt(0)}
                              </span>
                            </div>
                            <span
                              className="max-w-[4.5rem] truncate text-center text-[11px]"
                              style={{ color: 'var(--foreground)' }}
                            >
                              {t(`${project.key}.title`)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pages.length > 1 && (
              <div className="mt-4 flex justify-center gap-1.5">
                {pages.map((_, pageIndex) => (
                  <span
                    key={pageIndex}
                    className="h-1.5 w-1.5 rounded-full transition-colors"
                    style={{
                      background: pageIndex === selectedPage ? 'var(--accent)' : 'var(--window-border)',
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
