'use client';

import { useLocale, useTranslations } from 'next-intl';
import { cvFor } from '@/data/cv';
import { CvSkills } from './CvSkills';
import { CvSummary } from './CvSummary';
import { EducationRow } from './EducationRow';
import { ExperienceCard } from './ExperienceCard';
import { FeaturedProjects } from './FeaturedProjects';
import { TailorBar } from './TailorBar';
import type { UseTailor } from './useTailor';

export function CvBento({ tailor }: { tailor: UseTailor }) {
  const locale = useLocale();
  const t = useTranslations('cv.sections');
  const c = cvFor(locale);
  const tailored = tailor.result;
  const heading = (text: string) => (
    <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
      {text}
    </h2>
  );

  return (
    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
      <div className="md:col-span-3">
        <TailorBar tailor={tailor} />
      </div>
      <div className="md:col-span-3">
        <CvSummary tailored={tailored} />
      </div>
      <div className="md:col-span-3">
        <CvSkills tailored={tailored} />
      </div>
      <div className="md:col-span-3">
        <FeaturedProjects tailored={tailored} />
      </div>
      <div className="space-y-3 md:col-span-3">
        {heading(t('experience'))}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {c.experience.map((entry) => (
            <ExperienceCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
      <div className="space-y-3 md:col-span-3">
        {heading(t('education'))}
        {c.education.map((entry) => (
          <EducationRow key={entry.id} entry={entry} credentials={c.credentials} />
        ))}
      </div>
    </div>
  );
}
