'use client';

/**
 * Lightweight mobile wallpaper inspired by the desktop LiquidEther palette.
 * CSS-only: no WebGL, no pointer listeners, no animation loop.
 */
export function MobileAmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(100,181,246,0.34),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(176,190,197,0.26),transparent_28%),linear-gradient(135deg,#f5f5f5_0%,#ffffff_48%,#d9eefc_100%)] dark:bg-[radial-gradient(circle_at_18%_12%,rgba(100,181,246,0.24),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(176,190,197,0.12),transparent_28%),linear-gradient(135deg,#1a1a1a_0%,#252525_50%,#183247_100%)]" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#64b5f6]/20 blur-3xl dark:bg-[#64b5f6]/14" />
      <div className="absolute -right-28 bottom-28 h-80 w-80 rounded-full bg-[#b0bec5]/25 blur-3xl dark:bg-[#b0bec5]/10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_42%,rgba(255,255,255,0.12))] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),rgba(255,255,255,0)_42%,rgba(255,255,255,0.02))]" />
    </div>
  );
}
