'use client';

import { useEffect, useRef } from 'react';

function createOverlayToken(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `overlay-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * While `open`, push a history entry so phone/browser Back closes the overlay.
 * Escape and programmatic closes unwind only the overlay entry we pushed.
 */
export function useHistoryOverlay(open: boolean, onClose: () => void): void {
  const onCloseRef = useRef(onClose);
  const tokenRef = useRef<string | null>(null);
  const closingFromPopRef = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open || tokenRef.current) return;

    closingFromPopRef.current = false;

    const existing = window.history.state?.overlay;
    if (typeof existing === 'string') {
      tokenRef.current = existing;
      return;
    }

    const token = createOverlayToken();
    tokenRef.current = token;
    window.history.pushState({ ...window.history.state, overlay: token }, '');
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePop = () => {
      closingFromPopRef.current = true;
      tokenRef.current = null;
      onCloseRef.current();
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };

    window.addEventListener('popstate', handlePop);
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('popstate', handlePop);
      window.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) return;

    const token = tokenRef.current;
    if (!token) {
      closingFromPopRef.current = false;
      return;
    }

    tokenRef.current = null;
    if (!closingFromPopRef.current && window.history.state?.overlay === token) {
      window.history.back();
    }
    closingFromPopRef.current = false;
  }, [open]);
}
