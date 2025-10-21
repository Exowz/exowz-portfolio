'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { IconWorld } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { LanguageButtonProps } from './language-types';

export default function LanguageButton({ isActive, toggleMenu, currentLocale }: LanguageButtonProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 md:w-[100px] h-12 rounded-2xl bg-white/5 backdrop-blur-md animate-pulse" />
    );
  }

  const displayLocale = currentLocale.split('-')[0].toUpperCase();

  const getStyles = () => {
    if (theme === 'dark') {
      return {
        background: isHovered ? 'rgba(51, 51, 51, 0.7)' : 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: isHovered || isActive ? '1px solid rgba(100, 181, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isHovered || isActive
          ? '0 4px 16px rgba(100, 181, 246, 0.3), 0 0 20px rgba(100, 181, 246, 0.2)'
          : '0 4px 12px rgba(0, 0, 0, 0.3)'
      };
    } else {
      return {
        background: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: isHovered || isActive ? '1px solid rgba(100, 181, 246, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isHovered || isActive
          ? '0 4px 16px rgba(100, 181, 246, 0.25), 0 0 20px rgba(100, 181, 246, 0.15)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)'
      };
    }
  };

  return (
    <motion.button
      onClick={toggleMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative rounded-2xl cursor-pointer transition-all duration-300 w-12 md:w-[100px]"
      style={{
        ...getStyles(),
        height: '48px',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Glow effect */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-2xl blur-lg scale-150 opacity-100 transition-opacity duration-700"
          style={{ background: 'rgba(100, 181, 246, 0.2)', pointerEvents: 'none' }}
        />
      )}

      {/* Content with AnimatePresence */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {!isActive ? (
            <motion.div
              key="closed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              <IconWorld
                size={18}
                className={theme === 'dark' ? 'text-white' : 'text-[#333333]'}
              />
              <span
                className={`hidden md:inline text-base font-medium uppercase tracking-wide ${
                  theme === 'dark' ? 'text-white' : 'text-[#333333]'
                }`}
              >
                {displayLocale}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span
                className={`text-base font-medium tracking-wide ${
                  theme === 'dark' ? 'text-white' : 'text-[#333333]'
                }`}
              >
                Close
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
