import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildRouteMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'settings' });

  return buildRouteMetadata({
    locale,
    path: 'settings',
    title: t('title'),
    description: t('description'),
    badge: 'Settings',
  });
}

export default function SettingsPage() {
  // SEO/deep-link only; WindowManager and MobileAppSheet render the content.
  return null;
}
