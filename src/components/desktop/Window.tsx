'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconX, IconMinus, IconMaximize } from '@tabler/icons-react';
import { useWindowManager } from './WindowManager';

type WindowProps = {
  id: 'projects' | 'about' | 'contact';
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Window({ id, title, icon, children, className = '' }: WindowProps) {
  const { openWindow, closeWindow } = useWindowManager();
  const isOpen = openWindow === id;
  const [windowSpacing, setWindowSpacing] = useState({ top: '80px', bottom: '100px', left: '1rem', right: '1rem' });

  // Update spacing based on screen size
  useEffect(() => {
    const updateSpacing = () => {
      const width = window.innerWidth;
      if (width >= 1024) { // lg breakpoint
        setWindowSpacing({ top: '80px', bottom: '100px', left: '4rem', right: '4rem' });
      } else if (width >= 768) { // md breakpoint
        setWindowSpacing({ top: '80px', bottom: '100px', left: '2rem', right: '2rem' });
      } else {
        setWindowSpacing({ top: '80px', bottom: '100px', left: '1rem', right: '1rem' });
      }
    };

    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow();
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Minimize just closes for now
    closeWindow();
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Could implement fullscreen toggle
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] // Custom easing for smooth feel
      }}
      className={`fixed z-[45] flex flex-col rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'var(--window-bg)',
        border: '1px solid var(--window-border)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: 'var(--window-shadow)',
        // Proper spacing: top for header, bottom for dock, sides for margins (responsive)
        ...windowSpacing,
      }}
      onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking window
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          background: 'var(--window-titlebar-bg)',
          borderColor: 'var(--window-border)',
        }}
      >
        {/* Traffic Lights (macOS style) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleClose}
            className="group w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110"
            style={{
              background: 'var(--window-close-btn)',
            }}
            aria-label="Close"
          >
            <IconX
              className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--window-btn-icon)' }}
            />
          </button>
          <button
            onClick={handleMinimize}
            className="group w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110"
            style={{
              background: 'var(--window-minimize-btn)',
            }}
            aria-label="Minimize"
          >
            <IconMinus
              className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--window-btn-icon)' }}
            />
          </button>
          <button
            onClick={handleMaximize}
            className="group w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110"
            style={{
              background: 'var(--window-maximize-btn)',
            }}
            aria-label="Maximize"
          >
            <IconMaximize
              className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--window-btn-icon)' }}
            />
          </button>
        </div>

        {/* Title */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div
            className="w-4 h-4"
            style={{ color: 'var(--accent)' }}
          >
            {icon}
          </div>
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--foreground)' }}
          >
            {title}
          </span>
        </div>

        {/* Right spacer for symmetry */}
        <div className="w-[52px]" />
      </div>

      {/* Content Area */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar"
        style={{
          background: 'var(--window-content-bg)',
        }}
      >
        {children}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 4px;
          opacity: 0.5;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
          opacity: 0.8;
        }
      `}</style>
    </motion.div>
  );
}
