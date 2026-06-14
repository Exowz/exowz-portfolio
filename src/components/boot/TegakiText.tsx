'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import amiri from 'tegaki/fonts/amiri';
import kleeOne from 'tegaki/fonts/klee-one';
import tillana from 'tegaki/fonts/tillana';
import LiquidEther from '@/components/desktop/LiquidEther';
import bumbbled from './tegaki-fonts/bumbbled';
import koreanHandwriting from './tegaki-fonts/korean';
import maShanZheng from './tegaki-fonts/ma-shan-zheng';

// Lazy-load the renderer (and, with it, Tegaki's runtime) — boot-only, never SSR.
const TegakiRenderer = dynamic(
  () => import('tegaki/react').then((m) => m.TegakiRenderer),
  { ssr: false },
);

// Pause a written word stays on screen before the next language (ms).
const HOLD_MS = 1500;

const LOOP_WORDS = [
  { text: 'Hello, World!', font: bumbbled, scale: 1 },
  { text: 'Salut, le monde !', font: bumbbled, scale: 0.92 },
  { text: '¡Hola, mundo!', font: bumbbled, scale: 1 },
  { text: 'Olá, mundo!', font: bumbbled, scale: 1 },
  { text: 'Hallo, Welt!', font: bumbbled, scale: 1 },
  { text: 'Ciao, mondo!', font: bumbbled, scale: 1 },
  // Russian/Chinese: Tegaki's handwriting renders these scripts poorly, so they
  // show as a static styled fade instead of stroke animation.
  { text: 'Привет мир', fontFamily: 'TegakiRussian, system-ui, sans-serif', scale: 0.92 },
  { text: 'नमस्ते दुनिया', font: tillana, scale: 0.88 },
  { text: '你好世界', font: maShanZheng, scale: 1.02 },
  { text: 'こんにちはせかい', font: kleeOne, scale: 0.88 },
  { text: '헬로 월드', font: koreanHandwriting, scale: 0.9 },
  { text: 'مرحبا بالعالم', font: amiri, scale: 0.84, direction: 'rtl' },
] as const;

interface TegakiTextProps {
  mode: 'loop' | 'once';
  /** Required for `once`; ignored for `loop`. */
  word?: string;
  /** Fired when the handwriting animation for the current word finishes. */
  onWordComplete?: () => void;
  /** `loop`: fired by the arrow button. `once`: fired after the single word finishes. */
  onComplete: () => void;
  /** `loop` only: render the built-in arrow button. Set false when the parent
   *  supplies its own enter control (e.g. mobile tap-to-continue). */
  showArrow?: boolean;
}

export default function TegakiText({ mode, word, onWordComplete, onComplete, showArrow = true }: TegakiTextProps) {
  const [index, setIndex] = useState(0);
  const [fontSize, setFontSize] = useState(96);
  const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const w = window.innerWidth;
    setFontSize(w < 700 ? 58 : w < 1200 ? 82 : 104);
  }, []);

  const currentEntry = mode === 'once'
    ? { text: word ?? 'Hello, World!', font: bumbbled, scale: 1, direction: 'ltr' }
    : LOOP_WORDS[index];
  const currentDirection = 'direction' in currentEntry && currentEntry.direction === 'rtl' ? 'rtl' : 'ltr';
  const isTegakiEntry = 'font' in currentEntry;

  const advance = useCallback(() => setIndex((i) => (i + 1) % LOOP_WORDS.length), []);

  // Handwriting finished → hold the word, then move to the next language.
  const handleWordComplete = useCallback(() => {
    onWordComplete?.();
    if (mode === 'once') return;
    holdRef.current = setTimeout(advance, HOLD_MS);
  }, [mode, onWordComplete, advance]);

  // Static entries (Russian/Chinese) don't fire onComplete — show, hold, advance.
  useEffect(() => {
    if (mode !== 'loop' || isTegakiEntry) return;
    const t = setTimeout(advance, HOLD_MS);
    return () => clearTimeout(t);
  }, [index, isTegakiEntry, mode, advance]);

  // Clear any pending hold on word change / unmount (e.g. tap-to-continue).
  useEffect(() => () => { if (holdRef.current) clearTimeout(holdRef.current); }, [index]);

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
        {isTegakiEntry ? (
          <TegakiRenderer
            // Remount per word so each word re-animates from scratch.
            key={`${mode}-${currentEntry.text}-${index}`}
            font={currentEntry.font}
            time={{ mode: 'uncontrolled', loop: false, speed: 4 }}
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
        ) : (
          <motion.span
            key={`${mode}-${currentEntry.text}-${index}`}
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              color: '#FFFFFF',
              fontFamily: currentEntry.fontFamily,
              fontSize: Math.round(fontSize * currentEntry.scale),
              lineHeight: 1.15,
              textAlign: 'center',
              direction: currentDirection,
              unicodeBidi: currentDirection === 'rtl' ? 'plaintext' : 'normal',
            }}
          >
            {currentEntry.text}
          </motion.span>
        )}

        {mode === 'loop' && showArrow && (
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
