'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { ThemeToggle } from '@/components/theme-toggle';
import Language from './Language';
import { useTheme } from 'next-themes';

export function Header() {
  const locale = useLocale();
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [isClockHovered, setIsClockHovered] = useState(false);
  const { theme } = useTheme();

  // Update time every second
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();

      // Different format based on locale
      if (locale === 'en-GB') {
        // English: 12-hour AM/PM format
        setTime(
          now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // Shows AM/PM
          })
        );
      } else {
        // French: 24-hour format
        setTime(
          now.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 24-hour format
          })
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [locale]); // Re-run when locale changes

  const getGlassStyle = (isHovered = false) => {
    if (theme === 'dark') {
      return {
        background: isHovered ? 'rgba(51, 51, 51, 0.7)' : 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: isHovered ? '1px solid rgba(100, 181, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isHovered
          ? '0 4px 16px rgba(100, 181, 246, 0.3), 0 0 20px rgba(100, 181, 246, 0.2)'
          : '0 4px 12px rgba(0, 0, 0, 0.3)',
      };
    }
    return {
      background: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      border: isHovered ? '1px solid rgba(100, 181, 246, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: isHovered
        ? '0 4px 16px rgba(100, 181, 246, 0.25), 0 0 20px rgba(100, 181, 246, 0.15)'
        : '0 4px 12px rgba(0, 0, 0, 0.08)',
    };
  };

  if (!mounted) {
    return (
      <>
        {/* Language Switcher Loading */}
        <div className="fixed top-4 left-4 z-50">
          <div className="w-[100px] h-12 rounded-2xl animate-pulse" style={getGlassStyle()} />
        </div>

        <header className="fixed top-0 left-0 right-0 z-40 pt-4 px-4">
          <div className="w-full flex items-center justify-between">
            {/* Spacer */}
            <div className="flex-shrink-0 w-[100px]"></div>
            {/* Clock Loading */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[140px] h-12 rounded-2xl animate-pulse" style={getGlassStyle()} />
            {/* Theme Toggle Loading */}
            <div className="w-12 h-12 rounded-2xl animate-pulse flex-shrink-0" style={getGlassStyle()} />
          </div>
        </header>
      </>
    );
  }

  return (
    <>
      {/* Language Switcher - Fixed Position */}
      <Language />

      <header className="fixed top-0 left-0 right-0 z-40 pt-4 px-4">
        <div className="w-full flex items-center justify-between">
          {/* Spacer for left side to maintain center alignment */}
          <div className="flex-shrink-0 w-[100px]"></div>

          {/* Live Clock - Absolute Center with Glassmorphism */}
          <div className="absolute left-1/2 -translate-x-1/2">
          <div
            onMouseEnter={() => setIsClockHovered(true)}
            onMouseLeave={() => setIsClockHovered(false)}
            className="rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              ...getGlassStyle(isClockHovered),
              width: '140px',     // Fixed width
              height: '48px',     // Same height as language button
              padding: 0
            }}
          >
            <time
              className={`text-base font-mono font-medium tracking-wider ${
                theme === 'dark' ? 'text-white' : 'text-[#333333]'
              }`}
            >
              {time}
            </time>
          </div>
        </div>

        {/* Theme Toggle - Far Right */}
        <div className="flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
    </>
  );
}
