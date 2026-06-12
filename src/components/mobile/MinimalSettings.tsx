'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { IconX, IconCheck } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';

const LOCALES = [
  { code: 'en-GB', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

interface MinimalSettingsProps {
  open: boolean;
  onClose: () => void;
}

/** Minimal temporary Settings for P0a: theme (existing toggle) + an inline locale switcher. */
export function MinimalSettings({ open, onClose }: MinimalSettingsProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[70] flex items-end justify-center"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="m-4 w-full max-w-sm rounded-3xl p-5"
            style={{
              background: 'var(--window-bg)',
              border: '1px solid var(--window-border)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: 'var(--window-shadow)',
              paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.25rem)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-base font-medium" style={{ color: 'var(--foreground)' }}>
                Settings
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: 'var(--window-close-btn)' }}
              >
                <IconX className="h-4 w-4" style={{ color: 'var(--window-btn-icon)' }} />
              </button>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm" style={{ color: 'var(--foreground)' }}>Theme</span>
              <ThemeToggle />
            </div>

            {/* Language */}
            <div className="py-2">
              <span className="text-sm" style={{ color: 'var(--foreground)' }}>Language</span>
              <div className="mt-2 flex gap-2">
                {LOCALES.map((l) => {
                  const active = locale === l.code;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => switchLocale(l.code)}
                      aria-pressed={active}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm"
                      style={{
                        color: 'var(--foreground)',
                        border: active ? '1px solid var(--accent)' : '1px solid var(--window-border)',
                        background: active ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
                      }}
                    >
                      <span className="text-lg">{l.flag}</span>
                      <span>{l.label}</span>
                      {active && <IconCheck className="h-4 w-4" style={{ color: 'var(--accent)' }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
