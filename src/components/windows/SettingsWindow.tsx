'use client';

import { IconCheck, IconRefresh, IconSettings, IconTerminal2 } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';
import { useCommandPalette } from '@/components/command/CommandPaletteProvider';
import { languageOptions } from '@/components/header/language-types';

function replayIntro() {
  localStorage.removeItem('hasSeenBoot');
  window.location.reload();
}

export function SettingsWindow() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('settings');
  const commandPalette = useCommandPalette();

  return (
    <div className="p-5 md:p-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="text-base md:text-xl" style={{ color: 'var(--foreground)' }}>
            {t('intro')}
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('description')}
          </p>
        </div>

        <section className="rounded-2xl border p-4 md:p-6" style={{ borderColor: 'var(--window-border)', background: 'var(--window-content-bg)' }}>
          <div className="mb-4 flex items-center gap-2">
            <IconSettings className="h-4 w-4" style={{ color: 'var(--accent-text)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
              {t('appearance')}
            </h2>
          </div>
          <div className="flex items-center justify-between rounded-2xl border p-3" style={{ borderColor: 'var(--window-border)' }}>
            <span className="text-sm" style={{ color: 'var(--foreground)' }}>
              {t('theme')}
            </span>
            <ThemeToggle />
          </div>
        </section>

        <section className="rounded-2xl border p-4 md:p-6" style={{ borderColor: 'var(--window-border)', background: 'var(--window-content-bg)' }}>
          <h2 className="mb-4 text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            {t('language')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {languageOptions.map((item) => {
              const active = locale === item.locale;

              return (
                <button
                  key={item.locale}
                  type="button"
                  onClick={() => router.replace(pathname, { locale: item.locale })}
                  aria-pressed={active}
                  className="grid min-w-0 grid-cols-[24px_1fr_18px] items-center gap-2 rounded-2xl border px-4 py-3 text-sm"
                  style={{
                    color: 'var(--foreground)',
                    borderColor: active ? 'var(--accent)' : 'var(--window-border)',
                    background: active ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'transparent',
                  }}
                >
                  <span className="text-lg">{item.flag}</span>
                  <span className="truncate text-left">{item.name}</span>
                  {active && <IconCheck className="h-4 w-4" style={{ color: 'var(--accent-text)' }} />}
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={replayIntro}
            className="flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm"
            style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)', background: 'var(--window-content-bg)' }}
          >
            <IconRefresh className="h-4 w-4" />
            <span>{t('replayIntro')}</span>
          </button>
          <button
            type="button"
            onClick={commandPalette.open}
            className="flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm"
            style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)', background: 'var(--window-content-bg)' }}
          >
            <IconTerminal2 className="h-4 w-4" />
            <span>{t('commandPalette')}</span>
          </button>
        </section>

        <section className="rounded-2xl border p-4 md:p-6" style={{ borderColor: 'var(--window-border)', background: 'var(--window-content-bg)' }}>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
            {t('system')}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('systemDescription')}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/colophon" className="rounded-full border px-3 py-1.5 text-xs" style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}>
              {t('colophon')}
            </Link>
            <Link href="/principles" className="rounded-full border px-3 py-1.5 text-xs" style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}>
              {t('principles')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
