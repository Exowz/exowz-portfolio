'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import { usePrefersReducedMotion } from '@/components/hooks/usePrefersReducedMotion';

// Lazy-load the finale (Tegaki + LiquidEther) so it only loads at the greeting.
const TegakiText = dynamic(() => import('@/components/boot/TegakiText'), { ssr: false });

const takenByVultures = localFont({
  src: '../../../public/fonts/TakenByVultures.otf',
});

const INIT_LINES = [
  'EXOWZ SYSTEM INIT',
  'loading identity...',
  'mounting projects...',
  'syncing languages...',
  'initializing interface...',
  'ready',
];

type Step = 'begin' | 'init' | 'greeting' | 'done';

interface MobileStartSequenceProps {
  onComplete: () => void;
}

export default function MobileStartSequence({ onComplete }: MobileStartSequenceProps) {
  const [step, setStep] = useState<Step>('begin');
  const [visibleLines, setVisibleLines] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const t = useTranslations('boot');
  const greeting = 'Hello, World!';

  const finish = useCallback(() => {
    setStep('done');
    onComplete();
  }, [onComplete]);

  // Reveal init lines one by one; both motion paths stop at the greeting finale.
  useEffect(() => {
    if (step !== 'init') return;

    if (reducedMotion) {
      // Static splash: show every line at once, hold briefly, then the greeting.
      setVisibleLines(INIT_LINES.length);
      const t = setTimeout(() => setStep('greeting'), 1000);
      return () => clearTimeout(t);
    }

    if (visibleLines < INIT_LINES.length) {
      const t = setTimeout(() => setVisibleLines((n) => n + 1), 400);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setStep('greeting'), 600);
    return () => clearTimeout(t);
  }, [step, visibleLines, reducedMotion, finish]);

  const handleSkip = useCallback(() => {
    if (step === 'init' || step === 'greeting') finish();
  }, [step, finish]);

  if (step === 'done') return null;

  if (step === 'begin') {
    return (
      <button
        type="button"
        onClick={() => setStep('init')}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black font-mono text-sm text-stone-300"
        aria-label={t('tapToBegin')}
      >
        <span className="blink">{t('tapToBegin')}</span>
      </button>
    );
  }

  return (
    <div onClick={handleSkip} className="fixed inset-0 z-[100] overflow-hidden bg-black">
      {step === 'init' && (
        <div className="relative flex h-full w-full flex-col justify-center p-6 font-mono text-sm text-stone-300">
          <div
            className={`${takenByVultures.className} pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 -rotate-12 text-4xl text-stone-700`}
          >
            EXOWZ
          </div>
          {INIT_LINES.slice(0, visibleLines).map((line, i) => (
            <p key={line} className={i === 0 ? 'mb-3' : 'mt-1'}>
              {line}
            </p>
          ))}
        </div>
      )}

      {step === 'greeting' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {reducedMotion ? (
            <span className={`${takenByVultures.className} text-5xl text-stone-200`}>{greeting}</span>
          ) : (
            // Same multilingual loop as desktop; tapping anywhere continues.
            <TegakiText mode="loop" showArrow={false} onComplete={finish} />
          )}

          {/* Tap-to-continue — persistent part of the greeting layer (like the
              desktop arrow). Eases in just after the animation is on screen and
              stays put; z-20 keeps it above the Tegaki canvas. Tapping anywhere
              also continues via the parent's handleSkip. */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.8, ease: 'easeOut' }}
            className="pointer-events-none absolute bottom-14 z-20 rounded-full border border-stone-700 px-4 py-1.5 text-xs tracking-wide text-stone-400"
          >
            {t('tapToEnter')}
          </motion.span>
        </div>
      )}
    </div>
  );
}
