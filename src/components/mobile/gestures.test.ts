import { describe, it, expect } from 'vitest';
import { shouldDismissDownward, shouldGoBackRightward, shouldUnlockUpward } from './gestures';

describe('shouldDismissDownward', () => {
  it('dismisses on a long downward drag', () => {
    expect(shouldDismissDownward(130, 0)).toBe(true);
  });

  it('dismisses on a fast downward flick', () => {
    expect(shouldDismissDownward(40, 700)).toBe(true);
  });

  it('does not dismiss on a small slow drag', () => {
    expect(shouldDismissDownward(50, 100)).toBe(false);
  });

  it('does not dismiss on an upward gesture', () => {
    expect(shouldDismissDownward(-200, -900)).toBe(false);
  });
});

describe('shouldUnlockUpward', () => {
  it('unlocks on a long upward drag', () => {
    expect(shouldUnlockUpward(-120, 0)).toBe(true);
  });

  it('unlocks on a fast upward flick', () => {
    expect(shouldUnlockUpward(-40, -600)).toBe(true);
  });

  it('does not unlock on a small slow drag', () => {
    expect(shouldUnlockUpward(-50, -100)).toBe(false);
  });

  it('does not unlock on a downward gesture', () => {
    expect(shouldUnlockUpward(200, 900)).toBe(false);
  });
});

describe('shouldGoBackRightward', () => {
  it('goes back on a long rightward drag', () => {
    expect(shouldGoBackRightward(130, 0)).toBe(true);
  });

  it('goes back on a fast rightward flick', () => {
    expect(shouldGoBackRightward(40, 700)).toBe(true);
  });

  it('does not go back on a small slow drag', () => {
    expect(shouldGoBackRightward(50, 100)).toBe(false);
  });

  it('does not go back on a leftward gesture', () => {
    expect(shouldGoBackRightward(-200, -900)).toBe(false);
  });
});
