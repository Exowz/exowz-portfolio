'use client';

import { IconWorld } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { LanguageButtonProps } from './language-types';

export default function LanguageButtonMobile({ isActive, toggleMenu, currentLocale }: LanguageButtonProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md animate-pulse" />
    );
  }

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
    <button
      onClick={toggleMenu}
      className="relative rounded-2xl cursor-pointer transition-all duration-200 w-12 h-12 flex items-center justify-center active:scale-95"
      style={getStyles()}
    >
      {/* Glow effect when active */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-2xl blur-lg scale-150 opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(100, 181, 246, 0.2)', pointerEvents: 'none' }}
        />
      )}

      {/* Globe icon only */}
      <IconWorld
        size={20}
        className={theme === 'dark' ? 'text-white' : 'text-[#333333]'}
      />
    </button>
  );
}
