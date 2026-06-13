'use client';

import { IconBook2, IconScale } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { NowWidgetBody } from '@/components/mobile/NowWidgetBody';

const cardStyle = {
  background: 'var(--window-bg)',
  border: '1px solid var(--window-border)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  boxShadow: 'var(--window-shadow)',
} as const;

/** macOS-style desktop widget stack, shown on the empty desktop only. */
export function DesktopWidgets() {
  const tPrinciples = useTranslations('principles');
  const tColophon = useTranslations('colophon');

  return (
    <div className="pointer-events-auto absolute right-8 top-24 z-10 hidden w-64 flex-col gap-4 md:flex">
      <div className="h-56 rounded-3xl px-5 py-4" style={cardStyle}>
        <NowWidgetBody />
      </div>

      <Link href="/principles" className="rounded-3xl px-5 py-4 transition-transform hover:scale-[1.02]" style={cardStyle}>
        <div className="mb-1 flex items-center gap-2">
          <IconScale className="h-4 w-4" style={{ color: 'var(--accent)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            {tPrinciples('title')}
          </span>
        </div>
        <p className="line-clamp-3 text-xs leading-snug" style={{ color: 'var(--text-secondary)' }}>
          {tPrinciples('intro')}
        </p>
      </Link>

      <Link href="/colophon" className="rounded-3xl px-5 py-4 transition-transform hover:scale-[1.02]" style={cardStyle}>
        <div className="mb-1 flex items-center gap-2">
          <IconBook2 className="h-4 w-4" style={{ color: 'var(--accent)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            {tColophon('title')}
          </span>
        </div>
        <p className="line-clamp-3 text-xs leading-snug" style={{ color: 'var(--text-secondary)' }}>
          {tColophon('intro')}
        </p>
      </Link>
    </div>
  );
}
