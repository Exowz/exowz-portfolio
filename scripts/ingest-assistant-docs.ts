import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { config } from 'dotenv';
import { Mistral } from '@mistralai/mistralai';
import {
  chunkMarkdown,
  createAssistantQdrantClient,
  DEFAULT_EMBEDDING_DIMENSION,
  embedTexts,
  ensureAssistantCollection,
  getAssistantRagEnv,
  type AssistantSourceChunk,
} from '../src/lib/assistant/rag';

config({ path: '.env.local' });
config();

const SUPPORTED_EXTENSIONS = new Set(['.md', '.mdx', '.txt', '.json', '.yaml', '.yml']);
const BATCH_SIZE = 32;

function walk(inputPath: string): string[] {
  const stats = statSync(inputPath);
  if (stats.isFile()) return SUPPORTED_EXTENSIONS.has(path.extname(inputPath).toLowerCase()) ? [inputPath] : [];

  return readdirSync(inputPath, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.')) return [];
    const fullPath = path.join(inputPath, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (!entry.isFile()) return [];
    return SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  });
}

function relativeSource(filePath: string, roots: string[]): string {
  const root = roots
    .filter((candidate) => filePath.startsWith(candidate))
    .sort((a, b) => b.length - a.length)[0];

  return root ? path.relative(root, filePath) : filePath;
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const batches: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
}

async function main() {
  const sourcePaths = process.argv.slice(2);
  const envSourcePaths = process.env.ASSISTANT_DOC_PATHS
    ?.split(path.delimiter)
    .map((item) => item.trim())
    .filter(Boolean) || [];
  const roots = (sourcePaths.length ? sourcePaths : envSourcePaths).map((item) => path.resolve(item));
  const files = roots.flatMap(walk).sort((a, b) => a.localeCompare(b));

  if (!process.env.MISTRAL_API_KEY) throw new Error('Missing MISTRAL_API_KEY');
  if (!process.env.QDRANT_URL) throw new Error('Missing QDRANT_URL');
  if (!roots.length) throw new Error('Pass document folders as arguments or set ASSISTANT_DOC_PATHS');
  if (!files.length) throw new Error('No supported documents found');

  const ragEnv = getAssistantRagEnv(process.env);
  const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
  const qdrant = createAssistantQdrantClient(process.env);

  const chunks: AssistantSourceChunk[] = files.flatMap((filePath) => {
    const source = relativeSource(filePath, roots);
    return chunkMarkdown({
      text: readFileSync(filePath, 'utf8'),
      source,
    });
  });

  if (!chunks.length) throw new Error('No non-empty chunks generated');

  console.log(JSON.stringify({
    step: 'prepared',
    collection: ragEnv.qdrantCollection,
    embeddingModel: ragEnv.embeddingModel,
    embeddingDimension: ragEnv.embeddingDimension,
    files: files.length,
    chunks: chunks.length,
  }, null, 2));

  await ensureAssistantCollection(
    qdrant,
    ragEnv.qdrantCollection,
    ragEnv.embeddingDimension || DEFAULT_EMBEDDING_DIMENSION,
  );

  let processed = 0;
  for (const batch of chunkArray(chunks, BATCH_SIZE)) {
    const vectors = await embedTexts(mistral, batch.map((chunk) => chunk.text), ragEnv.embeddingModel);

    await qdrant.upsert(ragEnv.qdrantCollection, {
      wait: true,
      points: batch.map((chunk, index) => ({
        id: chunk.id,
        vector: vectors[index],
        payload: {
          text: chunk.text,
          source: chunk.source,
          title: chunk.title,
          chunkIndex: chunk.chunkIndex,
          totalChunks: chunk.totalChunks,
        },
      })),
    });

    processed += batch.length;
    console.log(JSON.stringify({ step: 'upserted', processed, total: chunks.length }, null, 2));
  }

  console.log(JSON.stringify({
    step: 'done',
    collection: ragEnv.qdrantCollection,
    files: files.length,
    chunks: chunks.length,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
