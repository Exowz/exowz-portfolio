'use client';

import { useLocale } from 'next-intl';
import LanguageButton from './language-button';
import LanguagePanel from './language-panel';
import { Locale, languages } from './language-types';
import { DesktopMorphingMenu } from './DesktopMorphingMenu';

export default function LanguageMenu() {
  const locale = useLocale();

  // Ensure current language exists in languages object, fallback to 'en-GB' if not
  const currentLang: Locale = languages[locale as Locale] ? (locale as Locale) : 'en-GB';

  return (
    <DesktopMorphingMenu
      align="left"
      panelWidth={420}
      panelHeight={480}
      renderButton={({ isOpen, toggle }) => (
        <LanguageButton
          isActive={isOpen}
          toggleMenu={toggle}
          currentLocale={currentLang}
        />
      )}
    >
      {({ close }) => (
        <>
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-1/6 right-1/6 h-32 w-32 rounded-full bg-[#64b5f6]/10 blur-2xl" />
            <div className="absolute bottom-1/3 left-1/4 h-24 w-24 rounded-full bg-[#90a4ae]/5 blur-xl" />
            <div className="absolute top-2/3 right-1/3 h-36 w-36 rounded-full bg-gradient-to-r from-[#64b5f6]/5 to-[#90a4ae]/10 blur-3xl" />
          </div>
          <div className="relative h-full w-full">
            <LanguagePanel
              languages={languages}
              currentLang={currentLang}
              onLanguageClick={close}
            />
          </div>
        </>
      )}
    </DesktopMorphingMenu>
  );
}
