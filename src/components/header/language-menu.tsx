'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import LanguageButton from './language-button';
import LanguagePanel from './language-panel';
import { LanguageOption } from './language-types';

// Define Locale type for supported languages
type Locale = 'en-GB' | 'fr';

const languages: Record<Locale, LanguageOption> = {
  'en-GB': { name: 'English', flag: '🇬🇧', code: 'GB', region: 'United Kingdom', locale: 'en-GB' },
  'fr': { name: 'Français', flag: '🇫🇷', code: 'FR', region: 'France', locale: 'fr' }
};

// Menu morphing animation - smoother transitions
const menu: Variants = {
    open: {
        width: "380px",
        height: "280px",
        top: "0px",
        left: "0px",
        transition: {
          duration: 0.6,
          type: "tween",
          ease: [0.76, 0, 0.24, 1]
        }
    },
    closed: {
        width: "100px",
        height: "48px",
        top: "0px",
        left: "0px",
        transition: {
          duration: 0.5,
          delay: 0.2,
          type: "tween",
          ease: [0.76, 0, 0.24, 1]
        }
    }
}

export default function LanguageMenu() {
  const locale = useLocale();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Ensure current language exists in languages object, fallback to 'en-GB' if not
  const currentLang: Locale = languages[locale as Locale] ? (locale as Locale) : 'en-GB';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper function to toggle state
  const toggleActive = () => {
    setIsActive(!isActive);
  };

  // Close menu on route change
  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isActive]);

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

  const getContainerStyle = () => {
    const baseStyle = {
      borderRadius: isActive ? '1.5rem' : '1rem',
      overflow: 'hidden' as const,
      transition: 'all 0.3s ease',
    };

    if (isActive) {
      if (theme === 'dark') {
        return {
          ...baseStyle,
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        };
      }
      return {
        ...baseStyle,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      };
    }

    // Closed state - glass effect
    if (theme === 'dark') {
      return {
        ...baseStyle,
        background: 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(15px) saturate(150%)',
        WebkitBackdropFilter: 'blur(15px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
      };
    }
    return {
      ...baseStyle,
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(15px) saturate(150%)',
      WebkitBackdropFilter: 'blur(15px) saturate(150%)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    };
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Morphing Container */}
      <div className="relative">
        <motion.div
          className="relative"
          variants={menu}
          animate={isActive ? "open" : "closed"}
          initial="closed"
          style={getContainerStyle()}
        >
          {/* Enhanced background for open menu */}
          {isActive && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/6 right-1/6 w-32 h-32 bg-[#64b5f6]/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-[#90a4ae]/5 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-2/3 right-1/3 w-36 h-36 bg-gradient-to-r from-[#64b5f6]/5 to-[#90a4ae]/10 rounded-full blur-3xl"></div>
            </div>
          )}

          <AnimatePresence>
            {isActive && (
              <LanguagePanel
                languages={languages}
                currentLang={currentLang}
                onLanguageClick={() => setIsActive(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Button */}
        <div className="absolute top-0 left-0 z-50">
          <LanguageButton
            isActive={isActive}
            toggleMenu={toggleActive}
            currentLocale={currentLang}
          />
        </div>
      </div>
    </div>
  );
}
