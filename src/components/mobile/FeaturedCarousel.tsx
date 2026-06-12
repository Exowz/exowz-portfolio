'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getFeaturedProjects } from './projectCategories';

/** Swipeable featured-projects carousel. Each slide links to the detail route. */
export function FeaturedCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start', containScroll: 'trimSnaps' });
  const t = useTranslations('projects');
  const featured = getFeaturedProjects(5);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-3">
        {featured.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="flex shrink-0 basis-[82%] flex-col overflow-hidden rounded-2xl border"
            style={{ borderColor: 'var(--window-border)', background: 'var(--dock-item-bg)' }}
          >
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
              <span className="text-4xl font-bold text-muted-foreground/30">
                {t(`${project.key}.title`).charAt(0)}
              </span>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {t(`${project.key}.title`)}
              </p>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                {t(`${project.key}.description`)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
