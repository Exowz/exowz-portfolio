'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { IconArrowRight } from '@tabler/icons-react';
import LiquidEther from '@/components/desktop/LiquidEther';
import parisienne from 'tegaki/fonts/parisienne';

// Lazy-load the renderer (and, with it, Tegaki's runtime) — boot-only, never SSR.
const TegakiRenderer = dynamic(
  () => import('tegaki/react').then((m) => m.TegakiRenderer),
  { ssr: false },
);

const LOOP_WORDS = ['hello', 'salut', 'hola', 'ciao'];

interface TegakiTextProps {
  mode: 'loop' | 'once';
  /** Required for `once`; ignored for `loop`. */
  word?: string;
  /** `loop`: fired by the arrow button. `once`: fired after the single word finishes. */
  onComplete: () => void;
}

export default function TegakiText({ mode, word, onComplete }: TegakiTextProps) {
  const [index, setIndex] = useState(0);
  const [fontSize, setFontSize] = useState(72);

  useEffect(() => {
    const w = window.innerWidth;
    setFontSize(w < 700 ? 32 : w < 1200 ? 56 : 72);
  }, []);

  const currentWord = mode === 'once' ? (word ?? 'hello') : LOOP_WORDS[index];

  const handleWordComplete = useCallback(() => {
    if (mode === 'once') {
      onComplete();
    } else {
      setIndex((i) => (i + 1) % LOOP_WORDS.length);
    }
  }, [mode, onComplete]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* LiquidEther background (capability-gated internally) */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          className="absolute inset-0 z-0 pointer-events-none"
          colors={['#1a1a1a', '#2a2a2a', '#64b5f6']}
          autoDemo
          mouseForce={20}
          resolution={0.5}
          cursorSize={100}
        />
      </div>

      {/* Blur overlay */}
      <div className="absolute inset-0 z-[1] backdrop-blur-xl bg-black/50" />

      {/* Handwriting + (loop only) arrow */}
      <div className="relative flex flex-col items-center justify-center h-full z-10">
        <TegakiRenderer
          // Remount per word so each word re-animates from scratch.
          key={`${mode}-${currentWord}-${index}`}
          font={parisienne}
          time={{ mode: 'uncontrolled', loop: false }}
          onComplete={handleWordComplete}
          // Tegaki reads stroke color + size from the container's CSS, not props.
          style={{ color: '#FFFFFF', fontSize }}
        >
          {currentWord}
        </TegakiRenderer>

        {mode === 'loop' && (
          <button
            type="button"
            onClick={onComplete}
            className="mt-10 cursor-pointer hover:opacity-75 transition-opacity duration-200"
            aria-label="Enter site"
          >
            <IconArrowRight className="text-white" size={64} stroke={1.5} />
          </button>
        )}
      </div>
    </div>
  );
}
