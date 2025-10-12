'use client';

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import LanguageButton from "./LanguageButton";
import LanguagePanel from './LanguagePanel';
import { LanguageOption } from './languageTypes';

// Define Locale type for Fin Gourmet supported languages
type Locale = 'en-GB' | 'fr';

const languages: Record<Locale, LanguageOption> = {
  'en-GB': { name: 'English', flag: '🇬🇧', code: 'GB', region: 'United Kingdom', locale: 'en-GB' },
  'fr': { name: 'Français', flag: '🇫🇷', code: 'FR', region: 'France', locale: 'fr' }
};

// EXACT copy of menu variants - optimized width for language grid layout
const menu: Variants = {
    open: {
        width: "460px",
        height: "380px",
        top: "0px",
        left: "0px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
    },
    closed: {
        width: "112px",
        height: "44px",
        top: "0px",
        left: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
    }
}

interface LanguageSwitcherProps {
  lang?: Locale;
  lightMode?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const LanguageSwitcher = ({ lang = 'en-GB', isOpen, onToggle }: LanguageSwitcherProps) => {
  const [internalIsActive, setInternalIsActive] = useState<boolean>(false);
  const isActive = isOpen !== undefined ? isOpen : internalIsActive;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Ensure current language exists in languages object, fallback to 'en-GB' if not
  const currentLang: Locale = languages[lang as Locale] ? (lang as Locale) : 'en-GB';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper function to toggle state
  const toggleActive = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsActive(!internalIsActive);
    }
  };

  // Close menu on route change
  useEffect(() => {
    if (onToggle) {
      // External state management - don't auto-close on route change
    } else {
      setInternalIsActive(false);
    }
  }, [pathname, onToggle]);

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
        if (onToggle) {
          onToggle();
        } else {
          setInternalIsActive(false);
        }
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, onToggle]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isActive) {
        if (onToggle) {
          onToggle();
        } else {
          setInternalIsActive(false);
        }
      }
    };

    if (isActive) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isActive, onToggle]);

  if (!isMounted) {
    return null;
  }

  const getContainerStyle = () => {
    const baseStyle = {
      borderRadius: isActive ? '1.5rem' : '0.75rem',
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
        {/* Morphing Container with sophisticated luxury styling - Fixed positioning like the menu */}
        <div className="fixed top-6 left-6 z-40">
          <motion.div
            className="absolute"
            variants={menu}
            animate={isActive ? "open" : "closed"}
            initial="closed"
            style={getContainerStyle()}
        >
          {/* Enhanced background for open menu */}
          {isActive && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/6 right-1/6 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-2/3 right-1/3 w-36 h-36 bg-gradient-to-r from-accent/5 to-primary/10 rounded-full blur-3xl"></div>
            </div>
          )}

          <AnimatePresence>
            {isActive && (
              <LanguagePanel
                languages={languages}
                currentLang={currentLang}
                onLanguageClick={() => {
                  if (onToggle) {
                    onToggle();
                  } else {
                    setInternalIsActive(false);
                  }
                }}
              />
            )}
          </AnimatePresence>
          </motion.div>
          
          {/* Enhanced Button */}
          <div className="relative z-50">
            <LanguageButton
              isActive={isActive}
              toggleMenu={toggleActive}
              currentLocale={currentLang}
            />
          </div>
        </div>
    </div>
  );
};