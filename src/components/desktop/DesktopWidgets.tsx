'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconBook2, IconScale, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { NowWidgetBody } from '@/components/mobile/NowWidgetBody';
import { NowExpandedContent } from '@/components/widgets/NowExpandedContent';

const cardStyle = {
  background: 'var(--window-bg)',
  border: '1px solid var(--window-border)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  boxShadow: 'var(--window-shadow)',
} as const;

interface PrincipleItem {
  title: string;
  body: string;
}

interface ColophonSection {
  heading: string;
  body: string;
}

/** macOS-style desktop widget stack, shown on the empty desktop only. */
export function DesktopWidgets() {
  const [nowOpen, setNowOpen] = useState(false);
  const tPrinciples = useTranslations('principles');
  const tColophon = useTranslations('colophon');
  const tNow = useTranslations('now');
  const tCommon = useTranslations('common');
  const principles = tPrinciples.raw('items') as PrincipleItem[];
  const colophonSections = tColophon.raw('sections') as ColophonSection[];
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const openNowFromClick = (clientX: number, clientY: number) => {
    const start = startRef.current;
    startRef.current = null;
    if (!start) return;

    const distance = Math.hypot(clientX - start.x, clientY - start.y);
    if (distance < 8) setNowOpen(true);
  };

  return (
    <>
      <div className="pointer-events-auto absolute left-8 top-28 z-10 hidden w-72 md:block">
        <div
          role="button"
          tabIndex={0}
          aria-label={tNow('title')}
          className="h-60 cursor-pointer overflow-hidden rounded-3xl px-5 py-4 transition-transform hover:scale-[1.015]"
          style={cardStyle}
          onPointerDown={(event) => {
            startRef.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerUp={(event) => openNowFromClick(event.clientX, event.clientY)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setNowOpen(true);
            }
          }}
        >
          <NowWidgetBody />
        </div>
      </div>

      <div className="pointer-events-auto absolute right-8 top-28 z-10 hidden w-72 flex-col gap-4 md:flex">
        <Link href="/principles" className="rounded-3xl px-5 py-4 transition-transform hover:scale-[1.02]" style={cardStyle}>
          <div className="mb-3 flex items-center gap-2">
            <IconScale className="h-4 w-4" style={{ color: 'var(--accent-text)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              {tPrinciples('title')}
            </span>
          </div>
          <div className="space-y-2">
            {principles.slice(0, 5).map((item) => (
              <div key={item.title} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent-text)' }} />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </Link>

        <Link href="/colophon" className="rounded-3xl px-5 py-4 transition-transform hover:scale-[1.02]" style={cardStyle}>
          <div className="mb-3 flex items-center gap-2">
            <IconBook2 className="h-4 w-4" style={{ color: 'var(--accent-text)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              {tColophon('title')}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {colophonSections.slice(0, 5).map((section) => (
              <span
                key={section.heading}
                className="rounded-full border px-2.5 py-1 text-[11px]"
                style={{ color: 'var(--text-secondary)', borderColor: 'var(--window-border)' }}
              >
                {section.heading}
              </span>
            ))}
          </div>
        </Link>
      </div>

      <AnimatePresence>
        {nowOpen && (
          <motion.div
            key="desktop-now-window"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto fixed inset-x-16 top-24 z-[46] mx-auto hidden max-h-[68vh] w-[min(42rem,calc(100vw-8rem))] flex-col overflow-hidden rounded-2xl md:flex"
            style={cardStyle}
          >
            <div
              className="relative flex items-center justify-between border-b px-4 py-3"
              style={{ background: 'var(--window-titlebar-bg)', borderColor: 'var(--window-border)' }}
            >
              <button
                type="button"
                onClick={() => setNowOpen(false)}
                aria-label={tCommon('close')}
                className="group flex h-3 w-3 items-center justify-center rounded-full transition-transform hover:scale-110"
                style={{ background: 'var(--window-close-btn)' }}
              >
                <IconX className="h-2 w-2 opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--window-btn-icon)' }} />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                {tNow('title')}
              </span>
              <div className="h-3 w-3" />
            </div>
            <div className="overflow-y-auto p-8" style={{ background: 'var(--window-content-bg)' }}>
              <NowExpandedContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
