'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { IconMail, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Language from '@/components/header/Language';
import LiquidEther from '@/components/desktop/LiquidEther';
import { useState } from 'react';

export default function HoldingPage() {
  const t = useTranslations('HoldingPage');
  const { theme } = useTheme();

  // Theme-aware colors for LiquidEther
  const colors = theme === 'dark'
    ? ['#1a1a1a', '#2a2a2a', '#64b5f6'] // Dark mode - darker colors
    : ['#f5f5f5', '#ffffff', '#64b5f6']; // Light mode - lighter colors

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background text-foreground transition-colors">
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

      {/* Top Left - Language Switcher */}
      <Language />

      {/* Top Right - Theme Toggle */}
      <div className="fixed top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Content - Centered on screen */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mt-32 pointer-events-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              className="font-stanley text-6xl md:text-7xl lg:text-8xl font-bold leading-none"
              style={{
                textShadow: '0 4px 20px rgba(100, 181, 246, 0.3), 0 2px 8px rgba(0, 0, 0, 0.5)',
                filter: 'drop-shadow(0 0 30px rgba(100, 181, 246, 0.2))'
              }}
            >
              {t('name')}
            </h1>
          </motion.div>

          {/* Content below title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            <div className="space-y-3">
              <p className="text-base md:text-lg leading-relaxed">
                {t('intro1')}
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                {t('intro2')}
              </p>
            </div>

            <p className="text-sm md:text-base text-foreground/70 dark:text-muted-foreground">
              {t('construction')}{' '}
              <a
                href={`mailto:${t('email')}`}
                className="transition-all duration-300 underline hover:opacity-70"
                style={{ color: 'var(--accent)' }}
              >
                {t('email')}
              </a>
            </p>

            {/* Social Links */}
            <div className="flex gap-3 items-center justify-center pt-2">
              <SocialLink
                href="https://linkedin.com/in/mke-kapoor"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={20} />
              </SocialLink>
              <SocialLink
                href="https://github.com/exowz"
                aria-label="GitHub"
              >
                <IconBrandGithub size={20} />
              </SocialLink>
              <SocialLink
                href={`mailto:${t('email')}`}
                aria-label="Email"
              >
                <IconMail size={20} />
              </SocialLink>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, children, 'aria-label': ariaLabel }: { href: string; children: React.ReactNode; 'aria-label': string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-full p-2.5 transition-all duration-300"
      style={{
        background: isHovered ? 'var(--dock-item-hover-bg)' : 'var(--dock-item-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: isHovered
          ? '1px solid var(--dock-item-hover-border)'
          : '1px solid var(--dock-item-border)',
        boxShadow: isHovered
          ? 'var(--dock-item-hover-shadow)'
          : 'var(--dock-item-shadow)',
        color: isHovered ? 'var(--accent)' : 'var(--dock-text)',
        filter: isHovered ? 'drop-shadow(0 0 8px var(--accent))' : 'none'
      }}
    >
      {children}
    </motion.a>
  );
}
