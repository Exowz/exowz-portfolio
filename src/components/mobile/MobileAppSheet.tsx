'use client';

import { useState, type ReactNode } from 'react';
import { motion, useDragControls } from 'framer-motion';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useIsMobile } from '@/components/hooks/useIsMobile';
import { parseActiveRoute } from '@/components/windows/activeRoute';
import { getProjectBySlug } from '@/data/projects';
import { shouldDismissDownward, shouldGoBackRightward } from './gestures';
import { consumeCameFromFolder } from './folderNavigation';
import { StatusBar } from './StatusBar';
import { ControlCenter } from './ControlCenter';
import { MobileNavBar } from './MobileNavBar';
import { ProjectsWindow } from '@/components/windows/ProjectsWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { ContactWindow } from '@/components/windows/ContactWindow';
import { PrinciplesWindow } from '@/components/windows/PrinciplesWindow';
import { ColophonWindow } from '@/components/windows/ColophonWindow';
import { SettingsWindow } from '@/components/windows/SettingsWindow';
import { CvWindow } from '@/components/windows/cv/CvWindow';

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
  const tPrinciples = useTranslations('principles');
  const tColophon = useTranslations('colophon');
  const tSettings = useTranslations('settings');
  const tCv = useTranslations('cv');
  const tProjects = useTranslations('projects');
  const [controlOpen, setControlOpen] = useState(false);

  if (isMobile !== true) return null;

  const { id, isDetail, slug } = parseActiveRoute(pathname);
  if (id === null) return null;

  // The Settings app already exposes everything Control Center does, so its status
  // bar stays non-interactive; every other app gets a tappable Control Center.
  const isSettings = id === 'settings';

  let title = '';
  let content: ReactNode = null;
  let onBack = () => router.push('/');

  if (id === 'about') {
    title = tAboutPage('title');
    content = <AboutWindow />;
  } else if (id === 'contact') {
    title = tContactPage('title');
    content = <ContactWindow />;
  } else if (id === 'principles') {
    title = tPrinciples('title');
    content = <PrinciplesWindow />;
  } else if (id === 'colophon') {
    title = tColophon('title');
    content = <ColophonWindow />;
  } else if (id === 'settings') {
    title = tSettings('title');
    content = <SettingsWindow />;
  } else if (id === 'cv') {
    title = tCv('title');
    content = <CvWindow />;
  } else if (isDetail && slug) {
    const project = getProjectBySlug(slug);
    title = project ? tProjects(`${project.key}.title`) : tProjectsPage('title');
    content = <ProjectDetailWindow slug={slug} hideBackLink />;
    onBack = () => {
      if (consumeCameFromFolder(slug)) router.back();
      else router.push('/projects');
    };
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
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0, right: 0.6 }}
        onDragEnd={(_, info) => {
          if (shouldGoBackRightward(info.offset.x, info.velocity.x)) onBack();
        }}
        className="absolute inset-y-0 left-0 z-10 w-5 touch-none"
        aria-hidden="true"
      />
      <StatusBar
        onOpenControlCenter={isSettings ? undefined : () => setControlOpen(true)}
        controlCenterOpen={controlOpen}
      />
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
      {!isSettings && <ControlCenter open={controlOpen} onClose={() => setControlOpen(false)} />}
    </motion.div>
  );
}
