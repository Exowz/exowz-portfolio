import { beforeEach, describe, expect, it } from 'vitest';
import { clearCameFromFolder, consumeCameFromFolder, markCameFromFolder } from './folderNavigation';

describe('folder navigation flag', () => {
  beforeEach(() => {
    clearCameFromFolder();
  });

  it('is false by default for any slug', () => {
    expect(consumeCameFromFolder('risk-lens')).toBe(false);
  });

  it('returns true only for the marked slug, then resets', () => {
    markCameFromFolder('risk-lens');
    expect(consumeCameFromFolder('risk-lens')).toBe(true);
    expect(consumeCameFromFolder('risk-lens')).toBe(false);
  });

  it('returns false for a different slug than the one marked, and clears it', () => {
    markCameFromFolder('risk-lens');
    expect(consumeCameFromFolder('thoraxai')).toBe(false);
    expect(consumeCameFromFolder('risk-lens')).toBe(false);
  });
});
