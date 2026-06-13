'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconBrandGithub, IconBrandLinkedin, IconRefresh, IconX } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';
import { useHistoryOverlay } from '@/components/hooks/useHistoryOverlay';

const LOCALES = [
  { code: 'en-GB', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

interface ControlCenterProps {
  open: boolean;
  onClose: () => void;
}

export function ControlCenter({ open, onClose }: ControlCenterProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('controlCenter');
  const tCommon = useTranslations('common');
  const panelRef = useRef<HTMLDivElement>(null);

  useHistoryOverlay(open, onClose);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const replayIntro = () => {
    onClose();
    localStorage.removeItem('hasSeenBoot');
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[80] flex items-start justify-center px-4 pt-16 backdrop-blur-xl"
          style={{ background: 'rgba(0,0,0,0.25)' }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
            tabIndex={-1}
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="w-full max-w-sm rounded-3xl p-4"
            style={{
              background: 'var(--window-bg)',
              border: '1px solid var(--window-border)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: 'var(--window-shadow)',
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative mb-4 flex items-center">
              <button
                type="button"
                onClick={onClose}
                aria-label={tCommon('close')}
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: 'var(--window-close-btn)' }}
              >
                <IconX className="h-4 w-4" style={{ color: 'var(--window-btn-icon)' }} />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>
                {t('title')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border p-3" style={{ borderColor: 'var(--window-border)' }}>
                <p className="mb-2 text-xs" style={{ color: 'var(--text-secondary)' }}>{t('theme')}</p>
                <ThemeToggle />
              </div>

              <div className="rounded-2xl border p-3" style={{ borderColor: 'var(--window-border)' }}>
                <p className="mb-2 text-xs" style={{ color: 'var(--text-secondary)' }}>{t('language')}</p>
                <div className="flex gap-2">
                  {LOCALES.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => router.replace(pathname, { locale: item.code })}
                      aria-pressed={locale === item.code}
                      className="flex h-10 flex-1 items-center justify-center rounded-xl text-lg"
                      style={{
                        border: locale === item.code ? '1px solid var(--accent)' : '1px solid var(--window-border)',
                        background: locale === item.code ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
                      }}
                    >
                      {item.flag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={replayIntro}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border px-3 py-2.5 text-sm"
              style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}
            >
              <IconRefresh className="h-4 w-4" />
              <span>{t('replayIntro')}</span>
            </button>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href="https://github.com/exowz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border px-3 py-2.5 text-sm"
                style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}
              >
                <IconBrandGithub className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/mke-kapoor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border px-3 py-2.5 text-sm"
                style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}
              >
                <IconBrandLinkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
