'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface LanguageButtonProps {
  isActive: boolean;
  toggleMenu: () => void;
  currentLocale: string;
}

export default function LanguageButton({ isActive, toggleMenu, currentLocale }: LanguageButtonProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[100px] h-12 rounded-2xl bg-white/5 backdrop-blur-md animate-pulse" />
    );
  }

  const displayLocale = currentLocale.split('-')[0].toUpperCase();

  const getStyles = () => {
    if (theme === 'dark') {
      return {
        background: 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: `1px solid ${isActive ? 'rgba(100, 181, 246, 0.4)' : 'rgba(255, 255, 255, 0.15)'}`,
        boxShadow: isActive
          ? '0 8px 25px -8px rgba(100, 181, 246, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.3)'
      };
    } else {
      return {
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: `1px solid ${isActive ? 'rgba(100, 181, 246, 0.3)' : 'rgba(0, 0, 0, 0.08)'}`,
        boxShadow: isActive
          ? '0 8px 25px -8px rgba(100, 181, 246, 0.25)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)'
      };
    }
  };

  return (
    <motion.button
      onClick={toggleMenu}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        ...getStyles(),
        width: '100px',      // Fixed width
        height: '48px',      // Match clock height exactly
        padding: 0,          // Remove padding
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

      {/* Content */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ y: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Closed state */}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <Globe
            size={18}
            className={theme === 'dark' ? 'text-white' : 'text-[#333333]'}
          />
          <span
            className={`text-base font-medium uppercase tracking-wide ${
              theme === 'dark' ? 'text-white' : 'text-[#333333]'
            }`}
          >
            {displayLocale}
          </span>
        </div>

        {/* Open state */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ top: '100%' }}
        >
          <span
            className={`text-base font-medium tracking-wide ${
              theme === 'dark' ? 'text-white' : 'text-[#333333]'
            }`}
          >
            Close
          </span>
        </div>
      </motion.div>
    </motion.button>
  );
}
