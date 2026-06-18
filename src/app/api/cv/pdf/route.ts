import { readFileSync } from 'fs';
import path from 'path';
import chromium from '@sparticuz/chromium';
import { projects as ALL_PROJECTS } from '@/data/projects';
import { cvFor } from '@/data/cv';
import { routing } from '@/i18n/routing';
import { allowCvPdfRequest } from '@/lib/assistant/rateLimit';
import { buildCvPdfData, type PdfProject } from '@/lib/cv/pdf-data';
import { selectPdfProjects } from '@/lib/cv/select-projects';
import { getTranslations } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';
import nunjucks from 'nunjucks';
import puppeteer from 'puppeteer-core';

export const runtime = 'nodejs';
export const maxDuration = 60;

const TEMPLATES_DIR = path.join(process.cwd(), 'src/lib/cv-pdf/templates');
const FONTS_DIR = path.join(process.cwd(), 'src/lib/cv-pdf/fonts');
const njk = new nunjucks.Environment(new nunjucks.FileSystemLoader(TEMPLATES_DIR), { autoescape: true });

// PDF rendering does not need WebGL, and skipping SwiftShader reduces serverless
// cold-start work. The installed @sparticuz/chromium build expects shell mode.
chromium.setGraphicsMode = false;

function getIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function normalizeLocale(input: unknown): string {
  return typeof input === 'string' && (routing.locales as readonly string[]).includes(input) ? input : routing.defaultLocale;
}

function dataUri(file: string, mime: string): string {
  return `data:${mime};base64,${readFileSync(file).toString('base64')}`;
}

function safeLabel(input: unknown): string {
  return (typeof input === 'string' ? input : '')
    .replace(/[^\p{L}\p{N} -]/gu, '')
    .slice(0, 50)
    .trim();
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { locale?: unknown; label?: unknown; slugs?: unknown } | null;
  const locale = normalizeLocale(body?.locale);
  const slugs = Array.isArray(body?.slugs) ? body.slugs.filter((slug): slug is string => typeof slug === 'string') : [];
  const label = safeLabel(body?.label);

  if (!(await allowCvPdfRequest(getIp(request)))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  try {
    const tProjects = await getTranslations({ locale, namespace: 'projects' });
    const chosen = selectPdfProjects(slugs, ALL_PROJECTS);
    const pdfProjects: PdfProject[] = chosen.map((project) => ({
      name: tProjects(`${project.key}.title`),
      techs: project.tags,
      description: tProjects(`${project.key}.description`),
    }));

    const data = buildCvPdfData(locale, cvFor(locale), pdfProjects);
    const template = locale === 'fr' ? 'cv_print.html' : 'cv_banking.html';
    let html = njk.render(template, data);

    const bg = dataUri(path.join(TEMPLATES_DIR, 'bg.jpg'), 'image/jpeg');
    const arimo = dataUri(path.join(FONTS_DIR, 'Arimo-Regular.woff2'), 'font/woff2');
    const arimoBold = dataUri(path.join(FONTS_DIR, 'Arimo-Bold.woff2'), 'font/woff2');
    const fontFace = `<style>
      @font-face{font-family:'Helvetica Neue';src:url('${arimo}') format('woff2');font-weight:400;}
      @font-face{font-family:'Helvetica Neue';src:url('${arimoBold}') format('woff2');font-weight:700;}
    </style>`;
    html = html.replace(/url\(['"]?bg\.jpg['"]?\)/g, `url('${bg}')`).replace('</head>', `${fontFace}</head>`);

    const browser = await puppeteer.launch({
      args: await puppeteer.defaultArgs({ args: chromium.args, headless: 'shell' }),
      executablePath: await chromium.executablePath(),
      headless: 'shell',
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'load' });
      await page.waitForNetworkIdle({ idleTime: 250, timeout: 2000 }).catch(() => {});
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        const a4HeightAt96Dpi = 1122.5;
        const height = document.body.scrollHeight;
        if (height > a4HeightAt96Dpi) {
          (document.body.style as unknown as { zoom: string }).zoom = String(a4HeightAt96Dpi / height);
        }
      });

      const pdf = await page.pdf({ format: 'A4', printBackground: true, pageRanges: '1', preferCSSPageSize: true });
      const filename = `Ewan_Kapoor_CV${label ? '_' + label.replace(/\s+/g, '_') : ''}.pdf`;

      return new NextResponse(Buffer.from(pdf), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error('CV PDF generation failed', error);
    return NextResponse.json({ error: 'pdf_failed' }, { status: 502 });
  }
}
