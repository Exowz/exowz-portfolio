'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';

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

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);
  return reduced;
}

interface MobileStartSequenceProps {
  onComplete: () => void;
}

export default function MobileStartSequence({ onComplete }: MobileStartSequenceProps) {
  const [step, setStep] = useState<Step>('begin');
  const [visibleLines, setVisibleLines] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const locale = useLocale();
  const greeting = locale.startsWith('fr') ? 'salut' : 'hello';

  const finish = useCallback(() => {
    setStep('done');
    onComplete();
  }, [onComplete]);

  // Reveal init lines one by one; branch to greeting (or finish, if reduced motion).
  useEffect(() => {
    if (step !== 'init') return;

    if (reducedMotion) {
      // Static splash: show every line at once (includes EXOWZ watermark + "ready"),
      // hold briefly, then straight to the interface.
      setVisibleLines(INIT_LINES.length);
      const t = setTimeout(finish, 1000);
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
        aria-label="Tap to begin"
      >
        <span className="blink">tap to begin</span>
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

      {step === 'greeting' && !reducedMotion && (
        <TegakiText mode="once" word={greeting} onComplete={finish} />
      )}
    </div>
  );
}
