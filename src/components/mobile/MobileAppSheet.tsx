'use client';

import type { ReactNode } from 'react';
import { motion, useDragControls } from 'framer-motion';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useIsMobile } from '@/components/hooks/useIsMobile';
import { parseActiveRoute } from '@/components/windows/activeRoute';
import { getProjectBySlug } from '@/data/projects';
import { shouldDismissDownward } from './gestures';
import { StatusBar } from './StatusBar';
import { MobileNavBar } from './MobileNavBar';
import { ProjectsWindow } from '@/components/windows/ProjectsWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { ContactWindow } from '@/components/windows/ContactWindow';

const ProjectDetailWindow = dynamic(() => import('@/components/windows/ProjectDetailWindow'), {
  ssr: false,
});

/**
 * Mobile-only full-screen iOS app sheet for route-backed apps.
 * Renders nothing on home, unknown routes, and confirmed desktop widths.
 */
export function MobileAppSheet() {
  const pathname = usePathname();
  const router = useRouter();
  const dragControls = useDragControls();
  const isMobile = useIsMobile();
  const tProjectsPage = useTranslations('pages.projects');
  const tAboutPage = useTranslations('pages.about');
  const tContactPage = useTranslations('pages.contact');
  const tProjects = useTranslations('projects');

  if (isMobile !== true) return null;

  const { id, isDetail, slug } = parseActiveRoute(pathname);
  if (id === null) return null;

  let title = '';
  let content: ReactNode = null;
  let onBack = () => router.push('/');

  if (id === 'about') {
    title = tAboutPage('title');
    content = <AboutWindow />;
  } else if (id === 'contact') {
    title = tContactPage('title');
    content = <ContactWindow />;
  } else if (isDetail && slug) {
    const project = getProjectBySlug(slug);
    title = project ? tProjects(`${project.key}.title`) : tProjectsPage('title');
    content = <ProjectDetailWindow slug={slug} />;
    onBack = () => router.push('/projects');
  } else {
    title = tProjectsPage('title');
    content = <ProjectsWindow />;
  }

  return (
    <motion.div
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.6 }}
      onDragEnd={(_, info) => {
        if (shouldDismissDownward(info.offset.y, info.velocity.y)) onBack();
      }}
      className="fixed inset-0 z-[60] flex flex-col bg-background md:hidden"
    >
      <StatusBar />
      <div
        className="flex shrink-0 touch-none cursor-grab justify-center pt-1.5 pb-0.5"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div
          className="h-1 w-9 rounded-full opacity-60"
          style={{ background: 'var(--window-border)' }}
          aria-hidden="true"
        />
      </div>
      <MobileNavBar title={title} onBack={onBack} />
      <div className="flex-1 overflow-y-auto">{content}</div>
    </motion.div>
  );
}
