import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildRouteMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cv' });
  return buildRouteMetadata({ locale, path: 'cv', title: t('title'), description: t('description'), badge: 'CV' });
}

export default function CvPage() {
  // Content is rendered by WindowManager / MobileAppSheet.
  return null;
}
