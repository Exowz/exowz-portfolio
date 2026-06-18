import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildRouteMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'principles' });

  return buildRouteMetadata({
    locale,
    path: 'principles',
    title: t('title'),
    description: t('intro'),
    badge: 'Principles',
  });
}

export default function PrinciplesPage() {
  // SEO/deep-link only; WindowManager and MobileAppSheet render the content.
  return null;
}
