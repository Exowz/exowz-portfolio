'use client';

import { usePathname } from 'next/navigation';
import { Desktop } from '@/components/desktop/Desktop';
import { ReactNode } from 'react';

export function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Extract the locale-agnostic path
  const pathParts = pathname.split('/').filter(Boolean);
  const route = pathParts.length > 1 ? pathParts.slice(1).join('/') : '';

  // Check if we're on a main windowed route
  const isMainWindowRoute = route === 'projects' ||
                            route === 'about' ||
                            route === 'contact';

  // Check if we're on a detail page
  const isDetailPage = route.startsWith('projects/');

  // If on main window route, show only Desktop (WindowManager renders the window)
  if (isMainWindowRoute) {
    return <Desktop />;
  }

  // If on detail page, only show Desktop background
  // WindowManager will render the page content in a window (without Header/Dock)
  if (isDetailPage) {
    return <Desktop />;
  }

  // Otherwise show normal page content (home page)
  return <>{children}</>;
}
