import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getProjectBySlug, projects } from '@/data/projects';
import { buildRouteMetadata } from '@/lib/seo';

// Valid slugs are a finite, build-time-known set. Enumerating them and
// disallowing dynamic params makes Next reject unknown slugs at the router
// level (a real 404), instead of a soft-404 from notFound() mid-stream.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
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
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!getProjectBySlug(slug)) notFound();
  return null;
}
