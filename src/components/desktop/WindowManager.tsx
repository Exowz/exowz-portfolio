'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { IconFolder, IconUser, IconMail } from '@tabler/icons-react';
import { Window } from './Window';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { AboutWindow } from '../windows/AboutWindow';
import { ContactWindow } from '../windows/ContactWindow';
import dynamic from 'next/dynamic';

// Dynamically import the project detail component
const ProjectDetailWindow = dynamic(
  () => import('../windows/ProjectDetailWindow'),
  { ssr: false }
);

type WindowType = 'projects' | 'about' | 'contact' | null;

interface WindowManagerContextType {
  openWindow: WindowType;
  closeWindow: () => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
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
    let newWindow: WindowType = null;

    // Match /projects or /projects/[slug] - both show projects window
    if (pathname.includes('/projects')) {
      newWindow = 'projects';
    } else if (pathname.includes('/about')) {
      newWindow = 'about';
    } else if (pathname.includes('/contact')) {
      newWindow = 'contact';
    }

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

      {/* Windows with content - no backdrop */}
      <WindowContent openWindow={openWindow} isProjectDetailPage={isProjectDetailPage} projectSlug={projectSlug} />
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
