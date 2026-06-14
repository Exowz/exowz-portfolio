'use client';

import { useCallback, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { normalizeAssistantDisplayText } from '@/lib/assistant/displayText';
import type { AssistantMessage } from '@/lib/assistant/validate';

export type ChatStatus = 'idle' | 'streaming' | 'error' | 'rate_limited' | 'unavailable';

const REVEAL_INTERVAL_MS = 24;
const MIN_REVEAL_CHARS = 2;
const MAX_REVEAL_CHARS = 9;

function revealSize(remaining: number): number {
  if (remaining > 600) return MAX_REVEAL_CHARS;
  if (remaining > 240) return 6;
  if (remaining > 80) return 4;
  return MIN_REVEAL_CHARS;
}

export function useAssistant() {
  const locale = useLocale();
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const abortRef = useRef<AbortController | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearRevealTimer = useCallback(() => {
    if (revealTimerRef.current) {
      clearInterval(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  }, []);

  const send = useCallback(async (text: string) => {
    const content = text.trim();
    if (!content || status === 'streaming') return;
    clearRevealTimer();

    const history: AssistantMessage[] = [...messages, { role: 'user', content }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setStatus('streaming');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, locale }),
        signal: controller.signal,
      });

      if (response.status === 429) {
        setMessages(history);
        setStatus('rate_limited');
        return;
      }

      if (response.status === 503) {
        setMessages(history);
        setStatus('unavailable');
        return;
      }

      if (!response.ok || !response.body) {
        setMessages(history);
        setStatus('error');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let rawBuffer = '';
      let visibleLength = 0;
      let streamDone = false;

      const renderVisibleText = () => {
        const displayBuffer = normalizeAssistantDisplayText(rawBuffer);
        visibleLength = Math.min(displayBuffer.length, visibleLength + revealSize(displayBuffer.length - visibleLength));

        setMessages((current) => {
          const next = current.slice();
          next[next.length - 1] = { role: 'assistant', content: displayBuffer.slice(0, visibleLength) };
          return next;
        });

        if (streamDone && visibleLength >= displayBuffer.length) {
          clearRevealTimer();
          setStatus('idle');
        }
      };

      revealTimerRef.current = setInterval(renderVisibleText, REVEAL_INTERVAL_MS);

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;

        rawBuffer += decoder.decode(value, { stream: true });
      }

      const tail = decoder.decode();
      if (tail) rawBuffer += tail;
      streamDone = true;
      renderVisibleText();
    } catch (error) {
      clearRevealTimer();
      if ((error as Error)?.name !== 'AbortError') {
        setMessages(history);
        setStatus('error');
      }
    } finally {
      abortRef.current = null;
    }
  }, [clearRevealTimer, locale, messages, status]);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    clearRevealTimer();
    setMessages((current) => {
      const last = current[current.length - 1];
      if (last?.role === 'assistant' && last.content.trim() === '') return current.slice(0, -1);
      return current;
    });
    setStatus('idle');
  }, [clearRevealTimer]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    clearRevealTimer();
    setMessages([]);
    setStatus('idle');
  }, [clearRevealTimer]);

  return { messages, status, send, abort, reset };
}
