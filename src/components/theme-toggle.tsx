'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  const getStyles = () => {
    if (isDark) {
      return {
        background: isHovered ? 'rgba(51, 51, 51, 0.7)' : 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: isHovered ? '1px solid rgba(100, 181, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isHovered
          ? '0 4px 16px rgba(100, 181, 246, 0.3), 0 0 20px rgba(100, 181, 246, 0.2)'
          : '0 4px 12px rgba(0, 0, 0, 0.3)'
      };
    } else {
      return {
        background: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: isHovered ? '1px solid rgba(100, 181, 246, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isHovered
          ? '0 4px 16px rgba(100, 181, 246, 0.25), 0 0 20px rgba(100, 181, 246, 0.15)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)'
      };
    }
  };

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        ...getStyles(),
        width: '48px',       // Square button
        height: '48px',      // Match height
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Moon size={20} className="text-white transition-all duration-300" />
      ) : (
        <Sun size={20} className="text-[#333333] transition-all duration-300" />
      )}
    </motion.button>
  );
}
