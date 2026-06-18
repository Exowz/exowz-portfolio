import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Keep the headless-Chrome packages out of the bundle so @sparticuz/chromium can
  // resolve its own bin/*.br assets via __dirname at runtime (bundling breaks that).
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  // The Chromium brotli blobs are read from disk at runtime (not `require`d), so the
  // file tracer misses them — force them into the /api/cv/pdf serverless function.
  outputFileTracingIncludes: {
    '/api/cv/pdf': ['./node_modules/@sparticuz/chromium/bin/**'],
  },
};

export default withNextIntl(nextConfig);
