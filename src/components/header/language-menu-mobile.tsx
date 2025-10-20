'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTheme } from 'next-themes';
import LanguageButtonMobile from './language-button-mobile';
import { IconCheck } from '@tabler/icons-react';

// Define Locale type for supported languages
type Locale = 'en-GB' | 'fr';

interface LanguageOption {
  name: string;
  flag: string;
  code: string;
  region: string;
  locale: string;
}

const languages: Record<Locale, LanguageOption> = {
  'en-GB': { name: 'English', flag: '🇬🇧', code: 'GB', region: 'United Kingdom', locale: 'en-GB' },
  'fr': { name: 'Français', flag: '🇫🇷', code: 'FR', region: 'France', locale: 'fr' }
};

export default function LanguageMenuMobile() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Ensure current language exists in languages object
  const currentLang: Locale = languages[locale as Locale] ? (locale as Locale) : 'en-GB';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const switchLocale = (newLocale: string) => {
    setIsActive(false);
    router.replace(pathname, { locale: newLocale });
  };

  // Close menu on route change
  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isActive) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isActive) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isActive]);

  if (!isMounted) {
    return null;
  }

  const dropdownStyle = () => {
    if (theme === 'dark') {
      return {
        background: 'rgba(26, 26, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      };
    }
    return {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    };
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <LanguageButtonMobile
        isActive={isActive}
        toggleMenu={toggleActive}
        currentLocale={currentLang}
      />

      {/* Simple dropdown menu */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-14 left-0 w-48 rounded-2xl overflow-hidden"
            style={dropdownStyle()}
          >
            {Object.entries(languages).map(([key, language]) => {
              const isActive = currentLang === key;
              return (
                <button
                  key={key}
                  onClick={() => switchLocale(language.locale)}
                  className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-[rgba(100,181,246,0.15)] text-[#64b5f6]'
                        : 'bg-[rgba(100,181,246,0.1)] text-[#64b5f6]'
                      : theme === 'dark'
                        ? 'text-white hover:bg-white/10'
                        : 'text-[#333333] hover:bg-black/5'
                  }`}
                >
                  <span className="text-xl">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-semibold">{language.name}</div>
                    <div className="text-xs opacity-70">{language.region}</div>
                  </div>
                  {isActive && (
                    <IconCheck className="h-4 w-4 text-[#64b5f6]" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
