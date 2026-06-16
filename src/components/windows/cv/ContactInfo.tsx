'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/** Renders the email only after mount, assembled from parts, so the static HTML
 * carries no scrapeable mailto. Deliberately light. */
export function ContactEmail({ user, domain }: { user: string; domain: string }) {
  const t = useTranslations('cv.actions');
  const [addr, setAddr] = useState<string | null>(null);

  useEffect(() => setAddr(`${user}@${domain}`), [user, domain]);

  if (!addr) return <span style={{ color: 'var(--text-secondary)' }}>{t('email')}</span>;

  return (
    <a href={`mailto:${addr}`} className="underline-offset-2 hover:underline" style={{ color: 'var(--accent-text)' }}>
      {addr}
    </a>
  );
}
