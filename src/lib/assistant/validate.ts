export const MAX_MESSAGE_CHARS = 500;
export const MAX_ASSISTANT_HISTORY_CHARS = 2000;
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

  const validMessages: AssistantMessage[] = [];
  for (const message of (body as { messages: unknown[] }).messages) {
    if (!message || typeof message !== 'object') continue;

    const role = (message as { role?: unknown }).role;
    const content = (message as { content?: unknown }).content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;

    validMessages.push({ role, content });
  }

  const messages = validMessages.slice(-MAX_MESSAGES).map((message) => {
    if (message.role === 'assistant' && message.content.length > MAX_ASSISTANT_HISTORY_CHARS) {
      return {
        ...message,
        content: `...${message.content.slice(-MAX_ASSISTANT_HISTORY_CHARS)}`,
      };
    }

    return message;
  });

  for (const message of messages) {
    if (message.role === 'user' && message.content.length > MAX_MESSAGE_CHARS) {
      return { ok: false, error: 'message too long' };
    }
  }

  const last = messages[messages.length - 1];
  if (!last || last.role !== 'user' || last.content.trim() === '') {
    return { ok: false, error: 'last message must be a non-empty user message' };
  }

  return { ok: true, messages };
}
