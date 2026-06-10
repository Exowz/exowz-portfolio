import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    server: {
      // Route next-intl through Vite's resolver so its `next/navigation`
      // import resolves under Node ESM during tests.
      deps: { inline: ['next-intl'] },
    },
  },
});
