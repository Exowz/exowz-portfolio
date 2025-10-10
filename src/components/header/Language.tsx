'use client';

import LanguageMenu from './language-menu';

/**
 * Language Switcher Wrapper
 *
 * This component wraps the language menu with fixed positioning
 * to prevent it from affecting other header elements when it morphs open.
 *
 * Positioned at pt-4 (16px) to match the dock's pb-4 spacing.
 */
export default function Language() {
  return (
    <div className="fixed top-4 left-4 z-50">
      <LanguageMenu />
    </div>
  );
}
