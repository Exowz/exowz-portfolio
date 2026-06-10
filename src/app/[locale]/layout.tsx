import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_NAME, SITE_URL, OG_LOCALE, buildAlternates, buildOgImageUrl } from '@/lib/seo';
import { ThemeProvider } from '@/components/theme-provider';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Dock } from '@/components/dock/Dock';
import { Header } from '@/components/header/Header';
import { WindowManagerProvider } from '@/components/desktop/WindowManager';
import { LayoutContent } from '@/components/layout/LayoutContent';
import BootWrapper from '@/components/boot/BootWrapper';
import { Analytics } from '@vercel/analytics/react';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const stanley = localFont({
  src: "../../../public/fonts/Stanley.otf",
  variable: "--font-stanley",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('siteTitle');
  const description = t('siteDescription');

  return {
    title: { default: title, template: `%s · ${SITE_NAME}` },
    description,
    alternates: buildAlternates(locale, ''),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      url: `${SITE_URL}/${locale}`,
      title,
      description,
      images: [buildOgImageUrl({ title: SITE_NAME, subtitle: description })],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en-GB' | 'fr')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${stanley.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <NextIntlClientProvider messages={messages}>
            <BootWrapper>
              <WindowManagerProvider>
                <Header />
                <PageTransition>
                  <LayoutContent>{children}</LayoutContent>
                </PageTransition>
                <Dock />
              </WindowManagerProvider>
            </BootWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}