'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

interface DesktopMorphingMenuProps {
  align?: 'left' | 'right';
  buttonWidth?: number;
  buttonHeight?: number;
  panelWidth?: number;
  panelHeight?: number;
  renderButton: (props: { isOpen: boolean; toggle: () => void; close: () => void }) => ReactNode;
  children: (props: { close: () => void }) => ReactNode;
}

export function DesktopMorphingMenu({
  align = 'left',
  buttonWidth = 100,
  buttonHeight = 48,
  panelWidth = 380,
  panelHeight = 280,
  renderButton,
  children,
}: DesktopMorphingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!mounted) return null;

  const closedScaleX = buttonWidth / panelWidth;
  const closedScaleY = buttonHeight / panelHeight;
  const isDark = theme === 'dark';
  const surfaceStyle = isDark
    ? {
        background: isOpen ? 'rgba(26, 26, 26, 0.95)' : 'rgba(26, 26, 26, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: isOpen ? '0 8px 32px rgba(0, 0, 0, 0.5)' : '0 4px 16px rgba(0, 0, 0, 0.4)',
      }
    : {
        background: isOpen ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isOpen ? '0 8px 32px rgba(0, 0, 0, 0.15)' : '0 4px 16px rgba(0, 0, 0, 0.08)',
      };

  const close = () => setIsOpen(false);

  return (
    <div ref={rootRef} className="relative" style={{ width: buttonWidth, height: buttonHeight }}>
      <motion.div
        aria-hidden={!isOpen}
        className="absolute top-0 overflow-hidden will-change-transform"
        initial={false}
        animate={{
          scaleX: isOpen ? 1 : closedScaleX,
          scaleY: isOpen ? 1 : closedScaleY,
          borderRadius: isOpen ? 24 : 16,
        }}
        transition={{
          duration: isOpen ? 0.42 : 0.34,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          width: panelWidth,
          height: panelHeight,
          left: align === 'left' ? 0 : undefined,
          right: align === 'right' ? 0 : undefined,
          transformOrigin: align === 'left' ? 'top left' : 'top right',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          ...surfaceStyle,
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="menu-content"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.18, delay: 0.12, ease: 'easeOut' }}
              className="h-full w-full"
            >
              {children({ close })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="absolute top-0 z-50" style={{ left: align === 'left' ? 0 : undefined, right: align === 'right' ? 0 : undefined }}>
        {renderButton({ isOpen, toggle: () => setIsOpen((current) => !current), close })}
      </div>
    </div>
  );
}
