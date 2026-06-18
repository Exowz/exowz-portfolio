import { describe, expect, it } from 'vitest';
import {
  DEFAULT_EMBEDDING_DIMENSION,
  chunkMarkdown,
  formatRetrievedContext,
  getAssistantRagEnv,
  isAssistantRagConfigured,
  stableChunkId,
  titleFromPath,
} from './rag';

describe('assistant RAG helpers', () => {
  it('creates stable chunk ids', () => {
    expect(stableChunkId('same input')).toBe(stableChunkId('same input'));
    expect(stableChunkId('same input')).not.toBe(stableChunkId('different input'));
  });

  it('builds readable titles from file paths', () => {
    expect(titleFromPath('/tmp/risk-lens.md')).toBe('Risk Lens');
    expect(titleFromPath('portfolio_projects_ai.yaml')).toBe('Portfolio Projects Ai');
  });

  it('chunks markdown while preserving source metadata', () => {
    const chunks = chunkMarkdown({
      source: 'projects/risk-lens.md',
      text: ['# RiskLens', 'A portfolio risk product.', '## Stack', 'FastAPI and Next.js.'].join('\n\n'),
      maxChars: 36,
      overlapChars: 6,
    });

    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0]).toMatchObject({
      source: 'projects/risk-lens.md',
      title: 'Risk Lens',
      chunkIndex: 0,
      totalChunks: chunks.length,
    });
  });

  it('reads RAG defaults from environment', () => {
    const env = getAssistantRagEnv({});

    expect(env.qdrantCollection).toBe('portfolio_assistant');
    expect(env.embeddingModel).toBe('mistral-embed');
    expect(env.embeddingDimension).toBe(DEFAULT_EMBEDDING_DIMENSION);
  });

  it('requires both Mistral and Qdrant for runtime retrieval', () => {
    expect(isAssistantRagConfigured({ MISTRAL_API_KEY: 'key' })).toBe(false);
    expect(isAssistantRagConfigured({ QDRANT_URL: 'https://example.com' })).toBe(false);
    expect(isAssistantRagConfigured({ MISTRAL_API_KEY: 'key', QDRANT_URL: 'https://example.com' })).toBe(true);
  });

  it('formats retrieved context for the system prompt', () => {
    expect(formatRetrievedContext([])).toContain('No relevant portfolio context');
    expect(formatRetrievedContext([{
      id: '1',
      score: 0.81234,
      text: 'RiskLens summary',
      source: 'risk-lens.md',
      title: 'RiskLens',
      chunkIndex: 0,
    }])).toContain('[1] RiskLens (risk-lens.md, chunk 1, score 0.812)');
  });
});
