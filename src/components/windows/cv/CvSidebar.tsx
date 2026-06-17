'use client';

import Image from 'next/image';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconDownload,
  IconMail,
  IconMapPin,
  IconWorld,
} from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { cvFor } from '@/data/cv';
import { Link } from '@/i18n/routing';
import { resumeHref } from '@/lib/resume';
import { ContactEmail } from './ContactInfo';

export function CvSidebar() {
  const locale = useLocale();
  const t = useTranslations('cv');
  const c = cvFor(locale);
  const [user, domain] = c.contact.email.split('@');

  return (
    <aside className="flex flex-col gap-4 md:sticky md:top-6 md:h-fit md:w-64">
      <div className="flex items-center gap-3 md:flex-col md:items-start">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl md:h-24 md:w-24">
          <Image src="/images/about/profile.jpeg" alt="Ewan Kapoor" fill className="object-cover" sizes="96px" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Ewan Kapoor</h1>
          <p className="text-sm" style={{ color: 'var(--accent-text)' }}>
            {c.title}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <span className="flex items-center gap-2">
          <IconMapPin className="h-4 w-4" /> {c.contact.location}
        </span>
        <span className="flex items-center gap-2">
          <IconMail className="h-4 w-4" /> <ContactEmail user={user} domain={domain} />
        </span>
        <a
          className="flex items-center gap-2 hover:text-foreground"
          href={`https://${c.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandLinkedin className="h-4 w-4" /> LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:text-foreground"
          href={`https://${c.contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandGithub className="h-4 w-4" /> GitHub
        </a>
        <a
          className="flex items-center gap-2 hover:text-foreground"
          href={`https://${c.contact.website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWorld className="h-4 w-4" /> {c.contact.website}
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={resumeHref(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium"
          style={{ background: 'var(--accent-solid)', color: 'white' }}
        >
          <IconDownload className="h-4 w-4" /> {t('actions.downloadPdf')}
        </a>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm"
          style={{
            border: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--foreground) 5%, transparent)',
            color: 'var(--foreground)',
          }}
        >
          {t('actions.contact')}
        </Link>
      </div>
    </aside>
  );
}
