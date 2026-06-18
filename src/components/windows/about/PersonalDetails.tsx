'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function PersonalDetails() {
  const t = useTranslations('pages.about.captions');

  return (
    <div className="my-1 grid grid-cols-3 gap-3">
      <div className="relative col-span-2 h-56 overflow-hidden rounded-xl">
        <Image
          src="/images/about/guitar.jpg"
          alt="Guitar"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 66vw, 480px"
        />
      </div>
      <figure className="space-y-1.5">
        <div className="relative h-40 overflow-hidden rounded-xl">
          <Image
            src="/images/about/cooking.jpeg"
            alt={t('cooking')}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, 240px"
          />
        </div>
        <figcaption className="text-[10px] leading-tight" style={{ color: 'var(--text-secondary)' }}>
          {t('cooking')}
        </figcaption>
      </figure>
      <div className="relative col-span-3 h-44 overflow-hidden rounded-xl">
        <Image
          src="/images/about/profile.jpeg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
    </div>
  );
}
