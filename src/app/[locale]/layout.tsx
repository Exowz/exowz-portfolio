import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/theme-provider';
import { PageTransition } from '@/components/transitions/PageTransition';
import { Dock } from '@/components/dock/Dock';
import { Header } from '@/components/header/Header';
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

export const metadata: Metadata = {
  title: "Exowz - Portfolio",
  description: "Portfolio of Exowz - Developer passionate about Data, AI, and web experiences",
};

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
            <Header />
            <PageTransition>
              {children}
            </PageTransition>
            <Dock />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
