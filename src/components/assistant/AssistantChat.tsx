'use client';

import { FormEvent, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { IconSparkles, IconX } from '@tabler/icons-react';
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

// Soft fade so messages dissolve into the blur instead of hitting a hard clip edge.
const EDGE_FADE = 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)';
const INLINE_FORMAT_PATTERN = /(\*\*([^*\n]+)\*\*|\*([^*\n]+)\*|\[([^\]\n]+)]\((https?:\/\/[^)\s]+)\))/g;

function renderAssistantText(text: string) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_FORMAT_PATTERN)) {
    if (match.index === undefined) continue;
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    if (match[2]) {
      nodes.push(<strong key={match.index} className="font-semibold">{match[2]}</strong>);
    } else if (match[3]) {
      nodes.push(<em key={match.index} className="italic">{match[3]}</em>);
    } else if (match[4] && match[5]) {
      nodes.push(
        <a
          key={match.index}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-current/30 underline-offset-4 transition-opacity hover:opacity-80"
        >
          {match[4]}
        </a>,
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes.length ? nodes : text;
}

export function AssistantChat({ open, onClose, variant }: AssistantChatProps) {
  const t = useTranslations('assistant');
  const prefersReducedMotion = useReducedMotion();
  const { messages, status, send, abort, reset } = useAssistant();
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const examples = t.raw('examples') as string[];
  const error = statusMessage(status, t);

  // Rotating placeholder (reuse the pill's phrases).
  const prompts = useMemo(() => {
    const raw = t.raw('pillPrompts');
    return Array.isArray(raw) && raw.every((p) => typeof p === 'string') ? (raw as string[]) : [t('inputPlaceholder')];
  }, [t]);
  const [promptIndex, setPromptIndex] = useState(0);
  useEffect(() => {
    if (!open || prefersReducedMotion || prompts.length <= 1) return;
    const id = window.setInterval(() => setPromptIndex((i) => (i + 1) % prompts.length), 2800);
    return () => window.clearInterval(id);
  }, [open, prefersReducedMotion, prompts.length]);

  const close = useCallback(() => {
    abort();
    onClose();
  }, [abort, onClose]);

  useHistoryOverlay(open, close);

  useEffect(() => {
    if (!open) return;
    setPromptIndex(0);
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

  const hasMessages = messages.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center px-6"
          style={{
            background: 'color-mix(in srgb, var(--background) 38%, transparent)',
            backdropFilter: 'blur(30px) saturate(150%)',
            WebkitBackdropFilter: 'blur(30px) saturate(150%)',
          }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={t('title')}
        >
          {/* faint a11y close — Escape/Back/click-veil also close */}
          <button
            type="button"
            onClick={close}
            aria-label={t('close')}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full opacity-40 transition-opacity hover:opacity-90"
            style={{ color: 'var(--foreground)' }}
            onClickCapture={(e) => e.stopPropagation()}
          >
            <IconX className="h-5 w-5" />
          </button>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex w-full max-w-[36rem] flex-col"
            style={{ paddingBottom: variant === 'mobile' ? 'env(safe-area-inset-bottom)' : undefined }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* transcript / empty greeting — floats on the blur, fades at edges */}
            <div
              ref={listRef}
              className="max-h-[46vh] overflow-y-auto"
              style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
            >
              {hasMessages ? (
                <div className="space-y-5 py-2">
                  {messages.map((message, index) => {
                    const isUser = message.role === 'user';
                    const streamingHere = status === 'streaming' && index === messages.length - 1 && !isUser;
                    return (
                      <p
                        key={`${message.role}-${index}`}
                        className={`whitespace-pre-wrap text-[15px] leading-relaxed ${isUser ? 'text-right font-medium' : 'text-left'}`}
                        style={{ color: isUser ? 'var(--accent-text)' : 'var(--foreground)' }}
                      >
                        {isUser ? message.content : renderAssistantText(message.content)}
                        {streamingHere && (
                          <motion.span
                            aria-hidden
                            animate={prefersReducedMotion ? undefined : { opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="ml-0.5 inline-block"
                          >
                            ▍
                          </motion.span>
                        )}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p className="py-6 text-center text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t('greeting')}
                </p>
              )}
            </div>

            {/* borderless input — the centerpiece */}
            <form onSubmit={submit} className="mt-5 flex items-center gap-3">
              <IconSparkles className="h-5 w-5 shrink-0" style={{ color: 'var(--accent-text)' }} />
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={prefersReducedMotion ? prompts[0] : prompts[promptIndex]}
                disabled={status === 'streaming'}
                className="h-9 min-w-0 flex-1 border-0 bg-transparent text-lg outline-none placeholder:opacity-50 disabled:opacity-60"
                style={{ color: 'var(--foreground)' }}
              />
            </form>

            {/* examples (empty state) + reset + error — all frameless */}
            {!hasMessages && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {examples.map((example, i) => (
                  <span key={example} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="opacity-40">·</span>}
                    <button type="button" onClick={() => void send(example)} className="opacity-70 transition-opacity hover:opacity-100">
                      {example}
                    </button>
                  </span>
                ))}
              </div>
            )}

            {error && (
              <p className="mt-4 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                {error}
              </p>
            )}

            {hasMessages && (
              <button
                type="button"
                onClick={reset}
                className="mt-4 self-center text-xs opacity-50 transition-opacity hover:opacity-90"
                style={{ color: 'var(--foreground)' }}
              >
                {t('clear')}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
