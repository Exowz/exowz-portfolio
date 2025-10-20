'use client';

import LanguageMenu from './language-menu';
import LanguageMenuMobile from './language-menu-mobile';
import { useEffect, useState } from 'react';

/**
 * Language Switcher Wrapper
 *
 * This component wraps the language menu with fixed positioning
 * to prevent it from affecting other header elements when it morphs open.
 *
 * Positioned at pt-4 (16px) to match the dock's pb-4 spacing.
 *
 * Uses a simpler mobile version below md breakpoint (768px).
 */
export default function Language() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50">
      {isMobile ? <LanguageMenuMobile /> : <LanguageMenu />}
    </div>
  );
}
