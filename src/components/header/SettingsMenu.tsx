'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCommand,
  IconExternalLink,
  IconRefresh,
  IconSettings,
  IconAdjustmentsHorizontal,
} from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useRouter } from '@/i18n/routing';
import { DesktopMorphingMenu } from './DesktopMorphingMenu';
import { ThemeToggle } from '@/components/theme-toggle';

function replayIntro() {
  localStorage.removeItem('hasSeenBoot');
  window.location.reload();
}

function SettingsButton({
  isOpen,
  toggle,
  label,
  closeLabel,
}: {
  isOpen: boolean;
  toggle: () => void;
  label: string;
  closeLabel: string;
}) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === 'dark';
  const styles = isDark
    ? {
        background: isHovered || isOpen ? 'rgba(51, 51, 51, 0.7)' : 'rgba(26, 26, 26, 0.6)',
        border: isHovered || isOpen ? '1px solid rgba(100, 181, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isHovered || isOpen
          ? '0 4px 16px rgba(100, 181, 246, 0.3), 0 0 20px rgba(100, 181, 246, 0.2)'
          : '0 4px 12px rgba(0, 0, 0, 0.3)',
        color: '#ffffff',
      }
    : {
        background: isHovered || isOpen ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)',
        border: isHovered || isOpen ? '1px solid rgba(100, 181, 246, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isHovered || isOpen
          ? '0 4px 16px rgba(100, 181, 246, 0.25), 0 0 20px rgba(100, 181, 246, 0.15)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
        color: '#333333',
      };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex h-12 w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl"
      style={{
        ...styles,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
      aria-label={label}
      aria-expanded={isOpen}
    >
      {isOpen && (
        <div
          className="pointer-events-none absolute inset-0 scale-150 rounded-2xl opacity-100 blur-lg transition-opacity duration-700"
          style={{ background: 'rgba(100, 181, 246, 0.2)' }}
        />
      )}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {!isOpen ? (
            <motion.div
              key="closed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              <IconAdjustmentsHorizontal size={18} />
              <span className="text-sm font-medium">{label}</span>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-base font-medium tracking-wide">{closeLabel}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

export function SettingsMenu() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('settings');
  const tControl = useTranslations('controlCenter');
  const tCommon = useTranslations('common');

  const openSettings = (close: () => void) => {
    close();
    router.push('/settings');
  };

  return (
    <DesktopMorphingMenu
      align="right"
      panelWidth={340}
      panelHeight={310}
      renderButton={({ isOpen, toggle }) => (
        <SettingsButton isOpen={isOpen} toggle={toggle} label={t('title')} closeLabel={tCommon('close')} />
      )}
    >
      {({ close }) => (
        <div className="relative flex h-full flex-col px-6 pt-16 pb-5">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute right-6 top-8 h-28 w-28 rounded-full bg-[#64b5f6]/10 blur-2xl" />
            <div className="absolute bottom-6 left-8 h-24 w-24 rounded-full bg-[#90a4ae]/8 blur-xl" />
          </div>

          <div className="relative space-y-3">
            <div className="flex items-center justify-between rounded-2xl border p-3" style={{ borderColor: 'var(--window-border)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                {t('theme')}
              </span>
              <ThemeToggle />
            </div>

            <button
              type="button"
              onClick={() => openSettings(close)}
              className="flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm"
              style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}
            >
              <IconSettings className="h-4 w-4" style={{ color: 'var(--accent)' }} />
              <span>{t('openSettings')}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={replayIntro}
                className="flex items-center justify-center gap-2 rounded-2xl border px-3 py-2.5 text-xs"
                style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}
              >
                <IconRefresh className="h-4 w-4" />
                <span>{t('replayIntro')}</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl border px-3 py-2.5 text-xs opacity-60"
                style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}
                disabled
              >
                <IconCommand className="h-4 w-4" />
                <span>{t('commandPalette')}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <a
                href={`/resume-${locale}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl border px-2 py-2 text-[11px]"
                style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}
              >
                <IconExternalLink className="mr-1 h-3.5 w-3.5" />
                CV
              </a>
              <a
                href="https://github.com/exowz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl border px-2 py-2 text-[11px]"
                style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}
              >
                <IconBrandGithub className="mr-1 h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/mke-kapoor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl border px-2 py-2 text-[11px]"
                style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}
              >
                <IconBrandLinkedin className="mr-1 h-3.5 w-3.5" />
                LinkedIn
              </a>
            </div>

            <p className="text-center text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              {tControl('title')}
            </p>
          </div>
        </div>
      )}
    </DesktopMorphingMenu>
  );
}
