export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export interface ValidationError {
  field: 'name' | 'email' | 'message' | '_body';
  message: string;
}

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ValidationError[] };

// Pragmatic email shape check; not RFC-perfect by design.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (typeof input !== 'object' || input === null) {
    return { ok: false, errors: [{ field: '_body', message: 'Invalid request body' }] };
  }

  const body = input as Record<string, unknown>;
  const rawName = typeof body.name === 'string' ? body.name : '';
  // Strip control chars (e.g. CR/LF) to prevent email header injection in the subject line.
  const name = rawName.replace(/[\x00-\x1f\x7f]/g, '').trim();
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 1) errors.push({ field: 'name', message: 'Name is required' });
  else if (name.length > 100) errors.push({ field: 'name', message: 'Name is too long' });

  if (email.length < 1) errors.push({ field: 'email', message: 'Email is required' });
  else if (email.length > 254) errors.push({ field: 'email', message: 'Email is too long' });
  else if (!EMAIL_RE.test(email)) errors.push({ field: 'email', message: 'Email is invalid' });

  if (message.length < 1) errors.push({ field: 'message', message: 'Message is required' });
  else if (message.length > 5000) errors.push({ field: 'message', message: 'Message is too long' });

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, message } };
}
