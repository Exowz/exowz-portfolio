'use client';

import { FormEvent, useState } from 'react';
import { IconSparkles, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import type { UseTailor } from './useTailor';
import { AiTailoredExplainer } from './AiTailoredExplainer';

export function TailorBar({ tailor }: { tailor: UseTailor }) {
  const t = useTranslations('cv.tailor');
  const [role, setRole] = useState('');
  const { status, result } = tailor;
  const disabled = status === 'unavailable';

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (role.trim().length >= 3 && status !== 'loading') void tailor.tailor(role);
  };

  // Title + "how does this work?" explainer, shown above every state.
  const header = (
    <div className="flex items-center justify-between gap-3">
      <p className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
        {t('title')}
      </p>
      <AiTailoredExplainer />
    </div>
  );

  if (status === 'ready' && result) {
    return (
      <div className="space-y-2">
        {header}
        <div
          className="glass-card flex flex-wrap items-center gap-2 rounded-2xl px-4 py-3"
          style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)' }}
        >
          <IconSparkles className="h-4 w-4" style={{ color: 'var(--accent-text)' }} />
          <span className="text-sm" style={{ color: 'var(--foreground)' }}>
            {t('tailoredFor')}: <strong>{result.label || role}</strong>
          </span>
          <button
            type="button"
            onClick={tailor.reset}
            className="ml-auto flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-secondary)' }}
          >
            <IconX className="h-3.5 w-3.5" /> {t('reset')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      {header}
      <div
        className="glass-card flex items-end gap-2 rounded-2xl px-4 py-3"
        style={{ background: 'var(--window-content-bg)' }}
      >
        <IconSparkles className="mb-1.5 h-5 w-5 shrink-0" style={{ color: 'var(--accent-text)' }} />
        <textarea
          value={role}
          onChange={(event) => setRole(event.target.value)}
          maxLength={2000}
          rows={2}
          disabled={disabled || status === 'loading'}
          placeholder={t('placeholder')}
          aria-label={t('title')}
          className="min-w-0 flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:opacity-60 disabled:opacity-60"
          style={{ color: 'var(--foreground)' }}
        />
        <button
          type="submit"
          disabled={disabled || status === 'loading' || role.trim().length < 3}
          className="shrink-0 rounded-full px-5 py-2 text-xs font-semibold transition hover:brightness-110 disabled:opacity-40"
          style={{ background: 'var(--accent)', color: 'white', boxShadow: '0 2px 10px color-mix(in srgb, var(--accent) 40%, transparent)' }}
        >
          {status === 'loading' ? t('loading') : t('button')}
        </button>
      </div>
      {status === 'unavailable' && (
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {t('unavailable')}
        </p>
      )}
      {status === 'rate_limited' && (
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {t('rateLimited')}
        </p>
      )}
      {status === 'error' && (
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {t('error')}
        </p>
      )}
      {status === 'empty' && (
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {t('noMatches')}
        </p>
      )}
    </form>
  );
}
