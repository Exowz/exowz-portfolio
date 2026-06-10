import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getProjectBySlug } from '@/data/projects';
import { buildRouteMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: `projects.${project.key}` });
  return buildRouteMetadata({
    locale,
    path: `projects/${slug}`,
    title: t('title'),
    description: t('description'),
    badge: project.tags[0],
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();
  return null;
}
