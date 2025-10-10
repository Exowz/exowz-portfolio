'use client';

import { useTranslations } from 'next-intl';
import { Mail, Github as GitHubIcon, Linkedin as LinkedinIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

export default function HoldingPage() {
  const t = useTranslations('HoldingPage');

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 md:px-12 bg-[#ffffff] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#ffffff] transition-colors relative">
      {/* Top Left - Language Switcher */}
      <div className="fixed top-4 left-4 z-10">
        <LanguageSwitcher />
      </div>

      {/* Top Right - Theme Toggle */}
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center gap-12 text-center">
        {/* Name - Large and centered at top */}
        <div>
          <h1 className="text-[8rem] md:text-[12rem] lg:text-[14rem] italic leading-none" style={{ fontFamily: 'Seraph, serif' }}>
            {t('name')}
          </h1>
        </div>

        {/* Content - Centered with max-width */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              {t('intro1')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('intro2')}
            </p>
          </div>

          <p className="text-base text-[#1a1a1a]/70 dark:text-[#b0bec5] transition-colors">
            {t('construction')}{' '}
            <a
              href={`mailto:${t('email')}`}
              className="text-[#1a1a1a]/80 dark:text-[#ffffff]/80 hover:opacity-70 transition-all underline"
            >
              {t('email')}
            </a>
          </p>

          {/* Social Links */}
          <div className="flex gap-4 items-center justify-center">
            <a
              href="https://linkedin.com/in/mke-kapoor"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={24} />
            </a>
            <a
              href="https://github.com/exowz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="GitHub"
            >
              <GitHubIcon size={24} />
            </a>
            <a
              href={`mailto:${t('email')}`}
              className="hover:opacity-70 transition-opacity"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
