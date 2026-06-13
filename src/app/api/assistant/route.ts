import { Mistral } from '@mistralai/mistralai';
import { NextRequest, NextResponse } from 'next/server';
import { allowAssistantRequest } from '@/lib/assistant/rateLimit';
import { type AssistantMessage, validateAssistantRequest } from '@/lib/assistant/validate';

export const runtime = 'nodejs';

interface AssistantRequestBody {
  messages?: unknown;
  locale?: unknown;
}

interface TextChunk {
  type?: string;
  text?: string;
}

interface MistralStreamEvent {
  event?: string;
  data?: {
    type?: string;
    content?: string | TextChunk;
    message?: string;
  };
}

function getIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function getLocale(body: AssistantRequestBody | null): string {
  return typeof body?.locale === 'string' && body.locale.trim() ? body.locale : 'en-GB';
}

function toConversationInput(messages: AssistantMessage[], locale: string): string {
  const lines = messages.map((message) => {
    const speaker = message.role === 'user' ? 'Visitor' : 'Assistant';
    return `${speaker}: ${message.content}`;
  });

  return [
    `Visitor locale hint: ${locale}. Reply in this language when natural.`,
    'Conversation so far:',
    ...lines,
  ].join('\n');
}

function extractText(event: MistralStreamEvent): string | null {
  if (event.event === 'conversation.response.error' || event.data?.type === 'conversation.response.error') {
    throw new Error(event.data?.message || 'assistant_stream_failed');
  }

  if (event.event !== 'message.output.delta' && event.data?.type !== 'message.output.delta') {
    return null;
  }

  const content = event.data?.content;
  if (typeof content === 'string') return content;
  if (content?.type === 'text' && typeof content.text === 'string') return content.text;

  return null;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.MISTRAL_API_KEY;
  const agentId = process.env.MISTRAL_AGENT_ID;

  if (!apiKey || !agentId) {
    return NextResponse.json({ error: 'assistant_unavailable' }, { status: 503 });
  }

  const body = await request.json().catch(() => null) as AssistantRequestBody | null;
  const valid = validateAssistantRequest(body);
  if (!valid.ok) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  if (!(await allowAssistantRequest(getIp(request)))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const client = new Mistral({ apiKey });
  const input = toConversationInput(valid.messages, getLocale(body));
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const events = await client.beta.conversations.startStream({
          agentId,
          inputs: input,
          store: false,
        });

        for await (const event of events) {
          const text = extractText(event as MistralStreamEvent);
          if (text) controller.enqueue(encoder.encode(text));
        }

        controller.close();
      } catch (error) {
        console.error('Assistant stream failed', error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
