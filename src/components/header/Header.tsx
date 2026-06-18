'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import Language from './Language';
import { useTheme } from 'next-themes';
import { useClock } from '@/components/hooks/useClock';
import { SettingsMenu } from './SettingsMenu';

export function Header() {
  const locale = useLocale();
  const time = useClock(locale);
  const [mounted, setMounted] = useState(false);
  const [isClockHovered, setIsClockHovered] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    return null;
  }

  return (
    <div className="hidden md:block">
      {/* Language Switcher - Fixed Position */}
      <Language />

      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none">
        <div className="w-full flex items-center justify-between">
          {/* Spacer for left side to maintain center alignment */}
          <div className="flex-shrink-0 w-[100px]"></div>

          {/* Live Clock - Absolute Center with Glassmorphism */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
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
                'text-foreground'
              }`}
            >
              {time}
            </time>
          </div>
        </div>

        {/* Settings Menu - Far Right */}
        <div className="flex-shrink-0 pointer-events-auto">
          <SettingsMenu />
        </div>
      </div>
    </header>
    </div>
  );
}
