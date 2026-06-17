'use client';

import { FormEvent, useRef, useState } from 'react';
import { IconDownload, IconSparkles, IconX } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { resumeHref } from '@/lib/resume';
import type { UseTailor } from './useTailor';
import { AiTailoredExplainer } from './AiTailoredExplainer';

export function TailorBar({ tailor }: { tailor: UseTailor }) {
  const locale = useLocale();
  const t = useTranslations('cv.tailor');
  const [role, setRole] = useState('');
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const { status, result } = tailor;
  const disabled = status === 'unavailable';

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  const runTailor = () => {
    if (role.trim().length >= 3 && status !== 'loading') void tailor.tailor(role);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    runTailor();
  };

  const downloadStatic = () => {
    const anchor = document.createElement('a');
    anchor.href = resumeHref(locale);
    anchor.download = '';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const downloadTailored = async () => {
    if (!result) return;
    setPdfBusy(true);
    setPdfError(false);

    try {
      const response = await fetch('/api/cv/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          label: result.label || tailor.role,
          slugs: result.projects.map((project) => project.slug),
        }),
      });

      if (!response.ok) throw new Error('pdf');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'Ewan_Kapoor_CV.pdf';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch {
      setPdfError(true);
      downloadStatic();
    } finally {
      setPdfBusy(false);
    }
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
          className="glass-card flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-2xl px-4 py-3.5"
          style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)' }}
        >
          <div className="flex items-center gap-2">
            <IconSparkles className="h-4 w-4 shrink-0" style={{ color: 'var(--accent-text)' }} />
            <span className="text-sm" style={{ color: 'var(--foreground)' }}>
              {t('tailoredFor')}: <strong>{result.label || role}</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={downloadTailored}
              disabled={pdfBusy}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition hover:brightness-110 disabled:opacity-50"
              style={{ background: 'var(--accent)', color: 'white', boxShadow: '0 2px 10px color-mix(in srgb, var(--accent) 40%, transparent)' }}
            >
              <IconDownload className="h-4 w-4" /> {pdfBusy ? t('generatingPdf') : t('downloadPdf')}
            </button>
            <button
              type="button"
              onClick={tailor.reset}
              className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              <IconX className="h-3.5 w-3.5" /> {t('reset')}
            </button>
          </div>
        </div>
        {pdfError && (
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {t('pdfFailed')}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      {header}
      <div
        className="glass-card flex items-center gap-3 rounded-2xl px-4 py-2.5"
        style={{ background: 'var(--window-content-bg)' }}
      >
        <IconSparkles className="h-5 w-5 shrink-0" style={{ color: 'var(--accent-text)' }} />
        <textarea
          ref={textareaRef}
          value={role}
          onChange={(event) => {
            setRole(event.target.value);
            autoGrow(event.target);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              runTailor();
            }
          }}
          maxLength={2000}
          rows={1}
          disabled={disabled || status === 'loading'}
          placeholder={t('placeholder')}
          aria-label={t('title')}
          className="min-w-0 flex-1 resize-none overflow-hidden bg-transparent text-sm leading-relaxed outline-none placeholder:opacity-60 disabled:opacity-60"
          style={{ color: 'var(--foreground)', maxHeight: 140 }}
        />
        <button
          type="submit"
          disabled={disabled || status === 'loading' || role.trim().length < 3}
          className="shrink-0 self-end rounded-full px-5 py-2 text-xs font-semibold transition hover:brightness-110 disabled:opacity-40"
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
