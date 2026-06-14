'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconChevronUp } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import { usePrefersReducedMotion } from '@/components/hooks/usePrefersReducedMotion';
import { shouldUnlockUpward } from '@/components/mobile/gestures';

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
  const [showUnlock, setShowUnlock] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const locale = useLocale();
  const t = useTranslations('boot');
  const greeting = locale.startsWith('fr') ? 'salut' : 'hello';

  const finish = useCallback(() => {
    setStep('done');
    onComplete();
  }, [onComplete]);

  // Reveal init lines one by one; both motion paths now stop at the unlock greeting.
  useEffect(() => {
    if (step !== 'init') return;

    if (reducedMotion) {
      // Static splash: show every line at once, hold briefly, then the unlock greeting.
      setVisibleLines(INIT_LINES.length);
      const t = setTimeout(() => {
        setShowUnlock(true);
        setStep('greeting');
      }, 1000);
      return () => clearTimeout(t);
    }

    if (visibleLines < INIT_LINES.length) {
      const t = setTimeout(() => setVisibleLines((n) => n + 1), 400);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setShowUnlock(false);
      setStep('greeting');
    }, 600);
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
        onClick={() => {
          setShowUnlock(false);
          setStep('init');
        }}
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
        <motion.div
          drag={reducedMotion ? false : 'y'}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.6, bottom: 0 }}
          onDragEnd={(_, info) => {
            if (shouldUnlockUpward(info.offset.y, info.velocity.y)) finish();
          }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          {reducedMotion ? (
            <span className={`${takenByVultures.className} text-5xl text-stone-200`}>{greeting}</span>
          ) : (
            <TegakiText mode="once" word={greeting} onWordComplete={() => setShowUnlock(true)} onComplete={() => {}} />
          )}

          {showUnlock && (
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                finish();
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              aria-label={t('enterSite')}
              className="absolute bottom-14 flex flex-col items-center gap-2 text-stone-400"
            >
              {!reducedMotion && <IconChevronUp className="h-6 w-6 animate-bounce" />}
              <span className="rounded-full border border-stone-700 px-4 py-1.5 text-xs tracking-wide">
                {reducedMotion ? t('tapToEnter') : t('swipeUpToEnter')}
              </span>
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
}
