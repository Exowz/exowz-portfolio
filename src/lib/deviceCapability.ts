function canUseWebGL(): boolean {
  if (typeof window === 'undefined') return false; // SSR: don't assume

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
  } catch {
    return false;
  }

  return true;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// Decides whether the live WebGL fluid sim should run on this client.
// Returns false for reduced-motion, mobile/coarse-pointer, low core counts,
// or missing WebGL — those get the static gradient fallback.
export function shouldRunLiquidSim(): boolean {
  if (prefersReducedMotion()) return false;
  if (window.matchMedia?.('(pointer: coarse)').matches) return false;

  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores < 4) return false;

  return canUseWebGL();
}

// Mobile springboard variant: allow touch devices, but keep the important
// battery/accessibility/low-end guards and use a lighter LiquidEther config.
export function shouldRunMobileLiquidSim(): boolean {
  if (prefersReducedMotion()) return false;

  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores < 4) return false;

  const navWithMemory = navigator as Navigator & { deviceMemory?: number };
  if (typeof navWithMemory.deviceMemory === 'number' && navWithMemory.deviceMemory < 4) return false;

  return canUseWebGL();
}
