export function normalizeAssistantDisplayText(text: string): string {
  return text
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[ \t]+\n/g, '\n');
}
