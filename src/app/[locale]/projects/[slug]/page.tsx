import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/projects';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();
  return null;
}
