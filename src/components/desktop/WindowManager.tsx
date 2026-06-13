'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { IconFolder, IconUser, IconMail, IconScale, IconBook2 } from '@tabler/icons-react';
import { Window } from './Window';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { AboutWindow } from '../windows/AboutWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { PrinciplesWindow } from '../windows/PrinciplesWindow';
import { ColophonWindow } from '../windows/ColophonWindow';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/components/hooks/useIsMobile';
import { parseActiveRoute } from '@/components/windows/activeRoute';

// Dynamically import the project detail component
const ProjectDetailWindow = dynamic(
  () => import('../windows/ProjectDetailWindow'),
  { ssr: false }
);

type WindowType = 'projects' | 'about' | 'contact' | 'principles' | 'colophon' | null;

interface WindowManagerContextType {
  openWindow: WindowType;
  closeWindow: () => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const isMobile = useIsMobile();
  const [openWindow, setOpenWindow] = useState<WindowType>(null);

  // Check if we're on a detail page
  const pathParts = pathname.split('/').filter(Boolean);
  const route = pathParts.length > 1 ? pathParts.slice(1).join('/') : '';
  const isProjectDetailPage = route.startsWith('projects/') && route !== 'projects';

  // Extract project slug from pathname for detail pages
  const projectSlug = isProjectDetailPage ? route.split('/')[1] : null;

  // CRITICAL: Only sync URL -> window state (one direction)
  // Don't call setState inside useEffect without proper guards
  useEffect(() => {
    const { id } = parseActiveRoute(pathname);
    const newWindow: WindowType = id;

    // Only update if different (prevents infinite loop)
    setOpenWindow(prevWindow => {
      if (prevWindow !== newWindow) {
        return newWindow;
      }
      return prevWindow;
    });
  }, [pathname]); // Only depend on pathname

  const closeWindow = () => {
    router.push(`/${locale}`);
  };

  return (
    <WindowManagerContext.Provider value={{ openWindow, closeWindow }}>
      {/* Render children normally */}
      {children}

      {/* Windows with content - desktop only. Mobile routes render through MobileAppSheet. */}
      {isMobile === false && (
        <WindowContent
          openWindow={openWindow}
          isProjectDetailPage={isProjectDetailPage}
          projectSlug={projectSlug}
        />
      )}
    </WindowManagerContext.Provider>
  );
}

function WindowContent({
  openWindow,
  isProjectDetailPage,
  projectSlug
}: {
  openWindow: WindowType;
  isProjectDetailPage: boolean;
  projectSlug: string | null;
}) {
  const tProjects = useTranslations('pages.projects');
  const tAbout = useTranslations('pages.about');
  const tContact = useTranslations('pages.contact');
  const tPrinciples = useTranslations('principles');
  const tColophon = useTranslations('colophon');

  return (
    <AnimatePresence mode="wait">
      {openWindow === 'projects' && (
        <Window
          key="projects"
          id="projects"
          title={tProjects('title')}
          icon={<IconFolder className="w-full h-full" />}
        >
          {/* Show project detail if on detail page, otherwise show projects grid */}
          {isProjectDetailPage && projectSlug ? (
            <ProjectDetailWindow slug={projectSlug} />
          ) : (
            <ProjectsWindow />
          )}
        </Window>
      )}

      {openWindow === 'about' && (
        <Window
          key="about"
          id="about"
          title={tAbout('title')}
          icon={<IconUser className="w-full h-full" />}
        >
          <AboutWindow />
        </Window>
      )}

      {openWindow === 'contact' && (
        <Window
          key="contact"
          id="contact"
          title={tContact('title')}
          icon={<IconMail className="w-full h-full" />}
        >
          <ContactWindow />
        </Window>
      )}

      {openWindow === 'principles' && (
        <Window
          key="principles"
          id="principles"
          title={tPrinciples('title')}
          icon={<IconScale className="w-full h-full" />}
        >
          <PrinciplesWindow />
        </Window>
      )}

      {openWindow === 'colophon' && (
        <Window
          key="colophon"
          id="colophon"
          title={tColophon('title')}
          icon={<IconBook2 className="w-full h-full" />}
        >
          <ColophonWindow />
        </Window>
      )}
    </AnimatePresence>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within WindowManagerProvider');
  }
  return context;
}
