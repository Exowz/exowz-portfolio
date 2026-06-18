import { describe, it, expect } from 'vitest';
import { formatClock } from './clock';

// 14:05 local time on a fixed date.
const at1405 = new Date(2026, 0, 1, 14, 5, 0);

describe('formatClock', () => {
  it('uses 24-hour format for French', () => {
    expect(formatClock(at1405, 'fr')).toBe('14:05');
  });

  it('uses 12-hour AM/PM format for en-GB', () => {
    const s = formatClock(at1405, 'en-GB');
    expect(s).toMatch(/(?:am|pm)/i); // has a meridiem marker
    expect(s).not.toBe('14:05');     // not 24-hour
    expect(s.startsWith('02')).toBe(true); // 2 o'clock, zero-padded
  });
});
