'use client';

import { IconChevronLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

interface MobileNavBarProps {
  title: string;
  onBack: () => void;
}

/** iOS-style nav bar for an app sheet: back chevron + centered title. */
export function MobileNavBar({ title, onBack }: MobileNavBarProps) {
  const t = useTranslations('common');

  return (
    <div
      className="relative flex items-center border-b px-2 py-2"
      style={{ borderColor: 'var(--window-border)' }}
    >
      <button
        type="button"
        onClick={onBack}
        aria-label={t('back')}
        className="flex h-9 w-9 items-center justify-center rounded-full active:scale-95"
        style={{ color: 'var(--accent-text)' }}
      >
        <IconChevronLeft className="h-6 w-6" />
      </button>
      <span
        className="absolute left-1/2 max-w-[60%] -translate-x-1/2 truncate text-base font-medium"
        style={{ color: 'var(--foreground)' }}
      >
        {title}
      </span>
    </div>
  );
}
