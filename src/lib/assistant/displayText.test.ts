import { describe, expect, it } from 'vitest';
import { normalizeAssistantDisplayText } from './displayText';

describe('normalizeAssistantDisplayText', () => {
  it('removes structural Markdown artifacts while keeping inline emphasis renderable', () => {
    expect(normalizeAssistantDisplayText('- **RiskLens**: see [GitHub](https://example.com)\n## Details')).toBe(
      '**RiskLens**: see [GitHub](https://example.com)\nDetails',
    );
  });
});
