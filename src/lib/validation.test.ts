import { describe, it, expect } from 'vitest';
import { validateContact } from './validation';

describe('validateContact', () => {
  const valid = { name: 'Ada', email: 'ada@example.com', message: 'Hello there' };

  it('accepts valid input and returns trimmed data', () => {
    const r = validateContact({ name: '  Ada  ', email: ' ada@example.com ', message: '  Hi  ' });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toEqual({ name: 'Ada', email: 'ada@example.com', message: 'Hi' });
    }
  });

  it('rejects a non-object body', () => {
    const r = validateContact(null);
    expect(r.ok).toBe(false);
  });

  it('rejects missing fields', () => {
    const r = validateContact({ name: '', email: '', message: '' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.length).toBe(3);
  });

  it('rejects malformed email', () => {
    const r = validateContact({ ...valid, email: 'not-an-email' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.some(e => e.field === 'email')).toBe(true);
  });

  it('rejects name over 100 chars', () => {
    const r = validateContact({ ...valid, name: 'a'.repeat(101) });
    expect(r.ok).toBe(false);
  });

  it('rejects message over 5000 chars', () => {
    const r = validateContact({ ...valid, message: 'a'.repeat(5001) });
    expect(r.ok).toBe(false);
  });

  it('rejects email over 254 chars', () => {
    const local = 'a'.repeat(255 - '@x.com'.length); // total length 255
    const r = validateContact({ ...valid, email: local + '@x.com' });
    expect(r.ok).toBe(false);
  });

  it('accepts email at exactly 254 chars', () => {
    const local = 'a'.repeat(254 - '@x.com'.length); // total length 254
    const r = validateContact({ ...valid, email: local + '@x.com' });
    expect(r.ok).toBe(true);
  });
});
