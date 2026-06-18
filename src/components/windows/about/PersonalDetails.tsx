'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const frame = 'relative overflow-hidden rounded-xl';
const frameStyle = { border: '1px solid var(--border)' } as const;

export function PersonalDetails() {
  const t = useTranslations('pages.about.captions');

  return (
    <div className="my-1 space-y-3">
      {/* Two portraits side by side — shown at their natural 3:4 instead of cropped. */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`${frame} aspect-[3/4]`} style={frameStyle}>
          <Image
            src="/images/about/guitar.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 360px"
          />
        </div>
        <div className={`${frame} aspect-[3/4]`} style={frameStyle}>
          <Image
            src="/images/about/profile.jpeg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 360px"
          />
        </div>
      </div>

      {/* Landscape, full width. */}
      <figure className="space-y-1.5">
        <div className={`${frame} aspect-[3/2]`} style={frameStyle}>
          <Image
            src="/images/about/cooking.jpeg"
            alt={t('cooking')}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
        <figcaption className="text-[11px] leading-tight" style={{ color: 'var(--text-secondary)' }}>
          {t('cooking')}
        </figcaption>
      </figure>
    </div>
  );
}
