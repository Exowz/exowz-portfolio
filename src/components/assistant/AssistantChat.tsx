'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { IconRefresh, IconSend, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useHistoryOverlay } from '@/components/hooks/useHistoryOverlay';
import { useAssistant, type ChatStatus } from './useAssistant';

interface AssistantChatProps {
  open: boolean;
  onClose: () => void;
  variant: 'desktop' | 'mobile';
}

function statusMessage(status: ChatStatus, t: ReturnType<typeof useTranslations<'assistant'>>) {
  if (status === 'rate_limited') return t('errorRateLimited');
  if (status === 'unavailable') return t('unavailable');
  if (status === 'error') return t('errorGeneric');
  return null;
}

export function AssistantChat({ open, onClose, variant }: AssistantChatProps) {
  const t = useTranslations('assistant');
  const prefersReducedMotion = useReducedMotion();
  const { messages, status, send, abort, reset } = useAssistant();
  const [draft, setDraft] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const examples = t.raw('examples') as string[];
  const title = t('title');
  const error = statusMessage(status, t);

  const close = useCallback(() => {
    abort();
    onClose();
  }, [abort, onClose]);

  useHistoryOverlay(open, close);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [messages, open, prefersReducedMotion]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || status === 'streaming') return;
    setDraft('');
    void send(content);
  };

  const panelMotion = variant === 'desktop'
    ? {
        initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 },
      }
    : {
        initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 44 },
        animate: { opacity: 1, y: 0 },
        exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 44 },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[90] flex backdrop-blur-xl ${
            variant === 'desktop' ? 'items-end justify-center px-6 pb-24' : 'items-end justify-center px-3'
          }`}
          style={{ background: 'rgba(0,0,0,0.24)' }}
          onClick={close}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            {...panelMotion}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className={`flex min-h-0 flex-col overflow-hidden rounded-3xl border ${
              variant === 'desktop'
                ? 'h-[min(36rem,calc(100vh-8rem))] w-[min(30rem,calc(100vw-2rem))]'
                : 'h-[min(40rem,calc(100dvh-4rem))] w-full max-w-md rounded-b-none'
            }`}
            style={{
              background: 'var(--window-bg)',
              borderColor: 'var(--window-border)',
              boxShadow: 'var(--window-shadow)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              paddingBottom: variant === 'mobile' ? 'env(safe-area-inset-bottom)' : undefined,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex h-14 shrink-0 items-center border-b px-4" style={{ borderColor: 'var(--window-border)' }}>
              <button
                type="button"
                onClick={close}
                aria-label={t('close')}
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: 'var(--window-close-btn)' }}
              >
                <IconX className="h-4 w-4" style={{ color: 'var(--window-btn-icon)' }} />
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {title}
              </span>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  aria-label={t('clear')}
                  className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--window-border)' }}
                >
                  <IconRefresh className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="flex min-h-full flex-col justify-center">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                    {t('greeting')}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {examples.map((example) => (
                      <button
                        key={example}
                        type="button"
                        onClick={() => void send(example)}
                        className="rounded-full border px-3 py-1.5 text-xs"
                        style={{
                          color: 'var(--foreground)',
                          borderColor: 'var(--window-border)',
                          background: 'color-mix(in srgb, var(--accent) 7%, transparent)',
                        }}
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className="max-w-[82%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed"
                        style={{
                          color: message.role === 'user' ? 'white' : 'var(--foreground)',
                          background: message.role === 'user'
                            ? 'var(--accent)'
                            : 'color-mix(in srgb, var(--foreground) 7%, transparent)',
                          border: message.role === 'user' ? '1px solid transparent' : '1px solid var(--window-border)',
                        }}
                      >
                        {message.content || (status === 'streaming' && index === messages.length - 1 ? '...' : '')}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {error && (
                <div className="mt-3 rounded-2xl border px-3 py-2 text-sm" style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}>
                  {error}
                </div>
              )}
            </div>

            <form onSubmit={submit} className="flex shrink-0 items-center gap-2 border-t p-3" style={{ borderColor: 'var(--window-border)' }}>
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={t('inputPlaceholder')}
                disabled={status === 'streaming'}
                className="h-10 min-w-0 flex-1 rounded-full border bg-transparent px-4 text-sm outline-none disabled:opacity-60"
                style={{ color: 'var(--foreground)', borderColor: 'var(--window-border)' }}
              />
              <button
                type="submit"
                disabled={!draft.trim() || status === 'streaming'}
                aria-label={t('send')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full disabled:opacity-50"
                style={{ color: 'white', background: 'var(--accent)' }}
              >
                <IconSend className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
