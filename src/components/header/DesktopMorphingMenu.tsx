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
        background: 'rgba(26, 26, 26, 0.74)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 18px 48px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }
    : {
        background: 'rgba(255, 255, 255, 0.56)',
        border: '1px solid rgba(255, 255, 255, 0.42)',
        boxShadow: '0 18px 48px rgba(31, 38, 46, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.72)',
      };

  const close = () => setIsOpen(false);

  return (
    <div ref={rootRef} className="relative" style={{ width: buttonWidth, height: buttonHeight }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-surface"
            className="absolute top-0 overflow-hidden will-change-transform"
            initial={{ scaleX: closedScaleX, scaleY: closedScaleY, borderRadius: 16, opacity: 0.96 }}
            animate={{ scaleX: 1, scaleY: 1, borderRadius: 24, opacity: 1 }}
            exit={{ scaleX: closedScaleX, scaleY: closedScaleY, borderRadius: 16, opacity: 0 }}
            transition={{
              duration: 0.38,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              width: panelWidth,
              height: panelHeight,
              left: align === 'left' ? 0 : undefined,
              right: align === 'right' ? 0 : undefined,
              transformOrigin: align === 'left' ? 'top left' : 'top right',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              ...surfaceStyle,
            }}
          >
            <motion.div
              key="menu-content"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.18, delay: 0.1, ease: 'easeOut' }}
              className="h-full w-full"
            >
              {children({ close })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 z-50" style={{ left: align === 'left' ? 0 : undefined, right: align === 'right' ? 0 : undefined }}>
        {renderButton({ isOpen, toggle: () => setIsOpen((current) => !current), close })}
      </div>
    </div>
  );
}
