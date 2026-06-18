'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Nearest scrollable ancestor — in the OS metaphor content scrolls inside a
 *  window, not the page, so the beam can't rely on page/viewport scroll. */
function findScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement ?? null;
  while (el) {
    const { overflowY } = getComputedStyle(el);
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) return el;
    el = el.parentElement;
  }
  return null;
}

/**
 * Aceternity's tracing beam — a vertical track whose gradient fill descends as
 * you scroll the content — adapted to our system: tokenized gradient, and a
 * manual scroll-progress value bound to the auto-detected scroll container
 * (instead of page-bound `useScroll`). The animated path hides under
 * prefers-reduced-motion, leaving the faint static track.
 */
export function TracingBeam({ children, className }: { children: ReactNode; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const scroller = findScrollParent(wrapperRef.current);

    const measure = () => setSvgHeight(content.offsetHeight);
    const update = () => {
      const rect = content.getBoundingClientRect();
      const viewTop = scroller ? scroller.getBoundingClientRect().top : 0;
      const viewHeight = scroller ? scroller.clientHeight : window.innerHeight;
      // 0 when the content top reaches the viewport centre, 1 when its bottom does.
      const p = (viewTop + viewHeight / 2 - rect.top) / (rect.height || 1);
      progress.set(Math.min(Math.max(p, 0), 1));
    };

    measure();
    update();

    const onResize = () => {
      measure();
      update();
    };
    const target: HTMLElement | Window = scroller ?? window;
    target.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', onResize);
    const observer = new ResizeObserver(onResize);
    observer.observe(content);

    return () => {
      target.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, [progress]);

  const y1 = useSpring(useTransform(progress, [0, 0.8], [50, svgHeight]), { stiffness: 500, damping: 90 });
  const y2 = useSpring(useTransform(progress, [0, 1], [50, Math.max(svgHeight - 200, 0)]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div ref={wrapperRef} className={cn('relative', className)}>
      <div
        className="pointer-events-none absolute top-0 left-[6px] md:left-[24px]"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="block">
          <path d={`M 1 0 V ${svgHeight}`} fill="none" strokeWidth="1" style={{ stroke: 'var(--window-border)' }} />
          <motion.path
            d={`M 1 0 V ${svgHeight}`}
            fill="none"
            strokeWidth="1.5"
            stroke="url(#tracing-beam-gradient)"
            className="motion-reduce:hidden"
          />
          <defs>
            <motion.linearGradient id="tracing-beam-gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop style={{ stopColor: 'var(--accent)' }} stopOpacity="0" />
              <stop style={{ stopColor: 'var(--accent)' }} />
              <stop offset="0.5" style={{ stopColor: 'var(--accent-text)' }} />
              <stop offset="1" style={{ stopColor: 'var(--accent)' }} stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
