export const MAX_MESSAGE_CHARS = 500;
export const MAX_MESSAGES = 8;

export type AssistantRole = 'user' | 'assistant';

export interface AssistantMessage {
  role: AssistantRole;
  content: string;
}

export type ValidationResult =
  | { ok: true; messages: AssistantMessage[] }
  | { ok: false; error: string };

export function validateAssistantRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object' || !Array.isArray((body as { messages?: unknown }).messages)) {
    return { ok: false, error: 'malformed body' };
  }

  const cleaned: AssistantMessage[] = [];
  for (const message of (body as { messages: unknown[] }).messages) {
    if (!message || typeof message !== 'object') continue;

    const role = (message as { role?: unknown }).role;
    const content = (message as { content?: unknown }).content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;
    if (content.length > MAX_MESSAGE_CHARS) return { ok: false, error: 'message too long' };

    cleaned.push({ role, content });
  }

  const messages = cleaned.slice(-MAX_MESSAGES);
  const last = messages[messages.length - 1];
  if (!last || last.role !== 'user' || last.content.trim() === '') {
    return { ok: false, error: 'last message must be a non-empty user message' };
  }

  return { ok: true, messages };
}
