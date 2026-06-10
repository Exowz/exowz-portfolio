import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildRouteMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.projects' });
  return buildRouteMetadata({
    locale,
    path: 'projects',
    title: t('title'),
    description: t('description'),
    badge: 'Projects',
  });
}

export default function ProjectsPage() {
  // This page exists ONLY for SEO and direct links.
  // The actual content is rendered by WindowManager — render nothing here.
  return null;
}
