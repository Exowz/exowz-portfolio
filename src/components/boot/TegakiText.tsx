'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { IconArrowRight } from '@tabler/icons-react';
import amiri from 'tegaki/fonts/amiri';
import LiquidEther from '@/components/desktop/LiquidEther';
import bumbbled from './tegaki-fonts/bumbbled';
import chineseHandwriting from './tegaki-fonts/chinese';
import hindiHandwriting from './tegaki-fonts/hindi';
import japaneseHandwriting from './tegaki-fonts/japanese';
import koreanHandwriting from './tegaki-fonts/korean';
import russianHandwriting from './tegaki-fonts/russian';

// Lazy-load the renderer (and, with it, Tegaki's runtime) — boot-only, never SSR.
const TegakiRenderer = dynamic(
  () => import('tegaki/react').then((m) => m.TegakiRenderer),
  { ssr: false },
);

const LOOP_WORDS = [
  { text: 'Hello, World!', font: bumbbled, scale: 1 },
  { text: 'Salut, le monde !', font: bumbbled, scale: 0.92 },
  { text: '¡Hola, mundo!', font: bumbbled, scale: 1 },
  { text: 'Olá, mundo!', font: bumbbled, scale: 1 },
  { text: 'Hallo, Welt!', font: bumbbled, scale: 1 },
  { text: 'Ciao, mondo!', font: bumbbled, scale: 1 },
  { text: 'Привет, мир!', font: russianHandwriting, scale: 0.96 },
  { text: 'नमस्ते, दुनिया!', font: hindiHandwriting, scale: 0.88 },
  { text: '你好，世界！', font: chineseHandwriting, scale: 1.08 },
  { text: 'こんにちは、世界！', font: japaneseHandwriting, scale: 0.88 },
  { text: '안녕하세요, 세계!', font: koreanHandwriting, scale: 0.9 },
  { text: 'مرحبًا، أيها العالم!', font: amiri, scale: 0.84, direction: 'rtl' },
] as const;

interface TegakiTextProps {
  mode: 'loop' | 'once';
  /** Required for `once`; ignored for `loop`. */
  word?: string;
  /** Fired when the handwriting animation for the current word finishes. */
  onWordComplete?: () => void;
  /** `loop`: fired by the arrow button. `once`: fired after the single word finishes. */
  onComplete: () => void;
}

export default function TegakiText({ mode, word, onWordComplete, onComplete }: TegakiTextProps) {
  const [index, setIndex] = useState(0);
  const [fontSize, setFontSize] = useState(96);

  useEffect(() => {
    const w = window.innerWidth;
    setFontSize(w < 700 ? 58 : w < 1200 ? 82 : 104);
  }, []);

  const currentEntry = mode === 'once'
    ? { text: word ?? 'Hello, World!', font: bumbbled, scale: 1, direction: 'ltr' }
    : LOOP_WORDS[index];
  const currentDirection = 'direction' in currentEntry && currentEntry.direction === 'rtl' ? 'rtl' : 'ltr';

  const handleWordComplete = useCallback(() => {
    onWordComplete?.();
    if (mode === 'once') {
      return;
    } else {
      setIndex((i) => (i + 1) % LOOP_WORDS.length);
    }
  }, [mode, onWordComplete]);

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
          key={`${mode}-${currentEntry.text}-${index}`}
          font={currentEntry.font}
          time={{ mode: 'uncontrolled', loop: false }}
          onComplete={handleWordComplete}
          // Tegaki reads stroke color + size from the container's CSS, not props.
          style={{
            color: '#FFFFFF',
            fontSize: Math.round(fontSize * currentEntry.scale),
            lineHeight: 1.15,
            textAlign: 'center',
            direction: currentDirection,
            unicodeBidi: currentDirection === 'rtl' ? 'plaintext' : 'normal',
          }}
        >
          {currentEntry.text}
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
