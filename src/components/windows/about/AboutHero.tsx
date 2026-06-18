'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Chip } from './Chip';

export function AboutHero() {
  const t = useTranslations('pages.about');

  return (
    <header className="flex flex-col items-center gap-4 pt-2 text-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-2xl md:h-32 md:w-32">
        <Image
          src="/images/about/headshot.jpg"
          alt={t('displayName')}
          fill
          className="object-cover"
          priority
          sizes="128px"
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{t('displayName')}</h1>
        <p className="text-base md:text-lg" style={{ color: 'var(--accent-text)' }}>
          {t('jobTitle')}
        </p>
      </div>
      <p className="max-w-xl text-base leading-relaxed text-foreground/80">{t('pitch')}</p>
      <div className="flex flex-wrap justify-center gap-2">
        <Chip>{t('status.degree')}</Chip>
        <Chip>{t('status.seeking')}</Chip>
      </div>
    </header>
  );
}
