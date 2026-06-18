import { createHash } from 'node:crypto';
import { Mistral } from '@mistralai/mistralai';
import { QdrantClient } from '@qdrant/js-client-rest';

export const DEFAULT_QDRANT_COLLECTION = 'portfolio_assistant';
export const DEFAULT_EMBEDDING_MODEL = 'mistral-embed';
export const DEFAULT_EMBEDDING_DIMENSION = 1024;
export const DEFAULT_CHAT_MODEL = 'mistral-medium-latest';
export const DEFAULT_CHUNK_CHARS = 1200;
export const DEFAULT_CHUNK_OVERLAP = 180;
export const DEFAULT_RETRIEVAL_LIMIT = 7;

export interface AssistantSourceChunk {
  id: string;
  text: string;
  source: string;
  title: string;
  chunkIndex: number;
  totalChunks: number;
}

export interface AssistantRetrievalHit {
  id: string | number;
  score: number;
  text: string;
  source: string;
  title: string;
  chunkIndex: number;
}

type AssistantEnv = Pick<NodeJS.ProcessEnv, 'NODE_ENV'> & Record<string, string | undefined>;

interface RagEnv {
  qdrantUrl?: string;
  qdrantApiKey?: string;
  qdrantCollection: string;
  embeddingModel: string;
  embeddingDimension: number;
}

interface QdrantPayload {
  text?: unknown;
  source?: unknown;
  title?: unknown;
  chunkIndex?: unknown;
}

export function getAssistantRagEnv(env: Partial<AssistantEnv> = process.env): RagEnv {
  const embeddingDimension = Number(env.MISTRAL_EMBEDDING_DIMENSION || DEFAULT_EMBEDDING_DIMENSION);

  return {
    qdrantUrl: env.QDRANT_URL,
    qdrantApiKey: env.QDRANT_API_KEY,
    qdrantCollection: env.QDRANT_COLLECTION || DEFAULT_QDRANT_COLLECTION,
    embeddingModel: env.MISTRAL_EMBEDDING_MODEL || DEFAULT_EMBEDDING_MODEL,
    embeddingDimension: Number.isFinite(embeddingDimension) ? embeddingDimension : DEFAULT_EMBEDDING_DIMENSION,
  };
}

export function isAssistantRagConfigured(env: Partial<AssistantEnv> = process.env): boolean {
  const config = getAssistantRagEnv(env);
  return Boolean(env.MISTRAL_API_KEY && config.qdrantUrl);
}

export function createAssistantQdrantClient(env: Partial<AssistantEnv> = process.env): QdrantClient {
  const config = getAssistantRagEnv(env);
  if (!config.qdrantUrl) throw new Error('Missing QDRANT_URL');

  return new QdrantClient({
    url: config.qdrantUrl,
    apiKey: config.qdrantApiKey,
  });
}

export async function ensureAssistantCollection(
  client: QdrantClient,
  collectionName: string,
  dimension = DEFAULT_EMBEDDING_DIMENSION,
) {
  const exists = await client.collectionExists(collectionName);
  if (exists.exists) return;

  await client.createCollection(collectionName, {
    vectors: {
      size: dimension,
      distance: 'Cosine',
    },
  });
}

export function stableChunkId(input: string): string {
  const hash = createHash('sha256').update(input).digest('hex').slice(0, 32);
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20)}`;
}

export function titleFromPath(filePath: string): string {
  const fileName = filePath.split('/').at(-1) || filePath;
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function chunkMarkdown({
  text,
  source,
  title = titleFromPath(source),
  maxChars = DEFAULT_CHUNK_CHARS,
  overlapChars = DEFAULT_CHUNK_OVERLAP,
}: {
  text: string;
  source: string;
  title?: string;
  maxChars?: number;
  overlapChars?: number;
}): AssistantSourceChunk[] {
  const normalized = text
    .replace(/\r\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();

  if (!normalized) return [];

  const blocks = normalized.split(/\n{2,}/);
  const chunks: string[] = [];
  let current = '';

  for (const block of blocks) {
    const candidate = current ? `${current}\n\n${block}` : block;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) chunks.push(current);

    if (block.length <= maxChars) {
      current = block;
      continue;
    }

    for (let start = 0; start < block.length; start += maxChars - overlapChars) {
      chunks.push(block.slice(start, start + maxChars));
    }
    current = '';
  }

  if (current) chunks.push(current);

  return chunks.map((chunk, index) => ({
    id: stableChunkId(`${source}:${index}:${chunk}`),
    text: chunk,
    source,
    title,
    chunkIndex: index,
    totalChunks: chunks.length,
  }));
}

export async function embedTexts(client: Mistral, texts: string[], model: string): Promise<number[][]> {
  if (!texts.length) return [];

  const response = await client.embeddings.create({
    model,
    inputs: texts,
  });

  return response.data.map((item) => {
    if (!item.embedding) throw new Error('Mistral embedding response missing vector');
    return item.embedding;
  });
}

export async function retrieveAssistantContext({
  query,
  mistral,
  qdrant,
  env = process.env,
  limit = DEFAULT_RETRIEVAL_LIMIT,
}: {
  query: string;
  mistral: Mistral;
  qdrant: QdrantClient;
  env?: Partial<AssistantEnv>;
  limit?: number;
}): Promise<AssistantRetrievalHit[]> {
  const config = getAssistantRagEnv(env);
  const [vector] = await embedTexts(mistral, [query], config.embeddingModel);
  if (!vector) return [];

  const results = await qdrant.search(config.qdrantCollection, {
    vector,
    limit,
    with_payload: true,
    with_vector: false,
  });

  return results.flatMap((result) => {
    const payload = (result.payload || {}) as QdrantPayload;
    if (typeof payload.text !== 'string') return [];

    return [{
      id: result.id,
      score: result.score,
      text: payload.text,
      source: typeof payload.source === 'string' ? payload.source : 'unknown',
      title: typeof payload.title === 'string' ? payload.title : 'Untitled',
      chunkIndex: typeof payload.chunkIndex === 'number' ? payload.chunkIndex : 0,
    }];
  });
}

export function formatRetrievedContext(hits: AssistantRetrievalHit[]): string {
  if (!hits.length) return 'No relevant portfolio context was retrieved.';

  return hits.map((hit, index) => (
    [
      `[${index + 1}] ${hit.title} (${hit.source}, chunk ${hit.chunkIndex + 1}, score ${hit.score.toFixed(3)})`,
      hit.text,
    ].join('\n')
  )).join('\n\n---\n\n');
}
