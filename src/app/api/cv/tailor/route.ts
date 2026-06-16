import { Mistral } from '@mistralai/mistralai';
import { getTranslations } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/data/projects';
import { cvFor } from '@/data/cv';
import { routing } from '@/i18n/routing';
import { allowCvTailorRequest } from '@/lib/assistant/rateLimit';
import { DEFAULT_CHAT_MODEL } from '@/lib/assistant/rag';
import { TAILOR_LIMITS, groundTailorResult, type TailorVocab } from '@/lib/cv/tailor';

export const runtime = 'nodejs';

interface TailorRequestBody {
  role?: unknown;
  locale?: unknown;
}

interface TextContentChunk {
  text?: string;
}

function getIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function normalizeLocale(input: unknown): string {
  return typeof input === 'string' && (routing.locales as readonly string[]).includes(input) ? input : routing.defaultLocale;
}

function contentToText(content: unknown): string {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content.map((chunk: TextContentChunk) => chunk.text || '').join('');
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as TailorRequestBody | null;
  const role = typeof body?.role === 'string' ? body.role.trim() : '';
  if (role.length < TAILOR_LIMITS.roleInputMin || role.length > TAILOR_LIMITS.roleInputMax) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  if (!(await allowCvTailorRequest(getIp(request)))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'unavailable' }, { status: 503 });

  const locale = normalizeLocale(body?.locale);
  const cv = cvFor(locale);
  const tProjects = await getTranslations({ locale, namespace: 'projects' });

  const projectInventory = projects.map((project) => ({
    slug: project.slug,
    title: tProjects(`${project.key}.title`),
    description: tProjects(`${project.key}.description`),
    tags: project.tags,
    facets: project.facets,
  }));
  const skillTokens = cv.skills.flatMap((group) => group.techs);
  const experienceInventory = cv.experience.map((entry) => ({
    id: entry.id,
    role: entry.role,
    company: entry.company,
    highlights: entry.highlights,
  }));

  const vocab: TailorVocab = {
    slugs: new Set(projects.map((project) => project.slug)),
    skills: new Set(skillTokens),
    experienceIds: new Set(cv.experience.map((entry) => entry.id)),
  };

  const system = [
    'You tailor a candidate CV to a target role. Rank only the most relevant items.',
    'Rules:',
    '- Use ONLY the provided project slugs, skill tokens, and experience ids. Never invent items.',
    '- Return STRICT JSON matching: {"label":string,"summary":string,"projects":[{"slug":string,"reason":string}],"skillHighlights":string[],"experienceHighlights":string[]}.',
    '- Plain text only: no markdown, no **, no bullets, no headings, no inflated/marketing wording.',
    `- Limits: label<=${TAILOR_LIMITS.label} chars, summary<=${TAILOR_LIMITS.summary}, projects<=${TAILOR_LIMITS.projects}, each reason<=${TAILOR_LIMITS.reason}, skillHighlights<=${TAILOR_LIMITS.skillHighlights}, experienceHighlights<=${TAILOR_LIMITS.experienceHighlights}.`,
    '- "label" is a short role title you infer (e.g. "Data Engineer"), never the raw input.',
    `- Reply in this locale: ${locale}.`,
    '- If the role is vague/low-signal, return a conservative generic Data/AI tailoring rather than overreaching.',
  ].join('\n');

  const user = JSON.stringify({
    role,
    projects: projectInventory,
    skills: skillTokens,
    experience: experienceInventory,
  });

  try {
    const mistral = new Mistral({ apiKey });
    const completion = await mistral.chat.complete({
      model: process.env.MISTRAL_CHAT_MODEL || DEFAULT_CHAT_MODEL,
      temperature: 0.3,
      maxTokens: 700,
      responseFormat: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    });

    const text = contentToText(completion.choices?.[0]?.message?.content);
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = null;
    }

    return NextResponse.json(groundTailorResult(parsed, vocab));
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 502 });
  }
}
