'use client';

import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import LiquidEther from './LiquidEther';

export function Desktop() {
  const { theme } = useTheme();
  const pathname = usePathname();

  // Check if a window is open
  const isWindowOpen = pathname.includes('/projects') ||
                       pathname.includes('/about') ||
                       pathname.includes('/contact');

  // Theme-aware colors for LiquidEther
  const colors = theme === 'dark'
    ? ['#1a1a1a', '#2a2a2a', '#64b5f6'] // Dark mode - darker colors
    : ['#f5f5f5', '#ffffff', '#64b5f6']; // Light mode - lighter colors

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* LiquidEther Background with theme-aware color palette */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          className="absolute inset-0 z-0 pointer-events-auto"
          colors={colors}
          autoDemo={true}
          mouseForce={20}
          resolution={0.5}
          cursorSize={100}
        />
      </div>

      {/* Centered content - only show when no window is open */}
      {!isWindowOpen && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Main title */}
            <h1
              className="font-stanley text-black dark:text-white text-8xl font-bold"
              style={{
                textShadow: '0 4px 20px rgba(100, 181, 246, 0.3), 0 2px 8px rgba(0, 0, 0, 0.5)',
                filter: 'drop-shadow(0 0 30px rgba(100, 181, 246, 0.2))'
              }}
            >
              Exowz
            </h1>

            {/* Subtitle - italic, under title, NO boxes */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[#b0bec5] text-xl md:text-2xl italic mt-4 tracking-wide"
              style={{
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}
            >
              Code, Design, Create.
            </motion.p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
