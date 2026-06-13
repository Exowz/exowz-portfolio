'use client';

import { useCallback, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import type { AssistantMessage } from '@/lib/assistant/validate';

export type ChatStatus = 'idle' | 'streaming' | 'error' | 'rate_limited' | 'unavailable';

export function useAssistant() {
  const locale = useLocale();
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(async (text: string) => {
    const content = text.trim();
    if (!content || status === 'streaming') return;

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
      let contentBuffer = '';

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;

        contentBuffer += decoder.decode(value, { stream: true });
        setMessages((current) => {
          const next = current.slice();
          next[next.length - 1] = { role: 'assistant', content: contentBuffer };
          return next;
        });
      }

      const tail = decoder.decode();
      if (tail) {
        contentBuffer += tail;
        setMessages((current) => {
          const next = current.slice();
          next[next.length - 1] = { role: 'assistant', content: contentBuffer };
          return next;
        });
      }

      setStatus('idle');
    } catch (error) {
      if ((error as Error)?.name !== 'AbortError') {
        setMessages(history);
        setStatus('error');
      }
    } finally {
      abortRef.current = null;
    }
  }, [locale, messages, status]);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages((current) => {
      const last = current[current.length - 1];
      if (last?.role === 'assistant' && last.content.trim() === '') return current.slice(0, -1);
      return current;
    });
    setStatus('idle');
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setStatus('idle');
  }, []);

  return { messages, status, send, abort, reset };
}
