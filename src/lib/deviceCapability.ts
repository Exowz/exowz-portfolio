// Decides whether the live WebGL fluid sim should run on this client.
// Returns false for reduced-motion, mobile/coarse-pointer, low core counts,
// or missing WebGL — those get the static gradient fallback.
export function shouldRunLiquidSim(): boolean {
  if (typeof window === 'undefined') return false; // SSR: don't assume

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia?.('(pointer: coarse)').matches) return false;

  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores < 4) return false;

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
  } catch {
    return false;
  }

  return true;
}
