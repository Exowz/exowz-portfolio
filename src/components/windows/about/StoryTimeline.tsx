'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CHAPTERS, type AboutChapter } from './chapters';
import { EducationCard } from './EducationCard';
import { ImageMoment } from './ImageMoment';
import { PersonalDetails } from './PersonalDetails';

function Chapter({ chapter, last }: { chapter: AboutChapter; last: boolean }) {
  const t = useTranslations('pages.about');
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative flex gap-4 pb-10 md:gap-6"
    >
      <div className="relative flex w-3 shrink-0 flex-col items-center md:w-12">
        <span className="mt-1.5 h-3 w-3 rounded-full" style={{ background: 'var(--accent)' }} />
        {!last && <span className="absolute bottom-[-2.5rem] top-5 w-px" style={{ background: 'var(--window-border)' }} />}
        {chapter.year && (
          <span className="mt-2 hidden text-[10px] md:block" style={{ color: 'var(--text-secondary)' }}>
            {chapter.year}
          </span>
        )}
      </div>

      <div className="flex-1 space-y-4">
        <h2 className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
          {t(`chapters.${chapter.id}`)}
          {chapter.year && (
            <span className="md:hidden" style={{ color: 'var(--text-secondary)' }}>
              {' '}
              · {chapter.year}
            </span>
          )}
        </h2>
        {chapter.beats.map((b) => (
          <p key={b} className="leading-relaxed text-foreground/90">
            {t(`story.${b}`)}
          </p>
        ))}
        {chapter.media === 'mauritius' && <ImageMoment src="/images/about/mauritius.jpg" caption={t('captions.mauritius')} />}
        {chapter.media === 'personal' && <PersonalDetails />}
        {chapter.media === 'education' && <EducationCard />}
      </div>
    </motion.div>
  );
}

export function StoryTimeline() {
  return (
    <section className="mx-auto w-full max-w-3xl">
      {CHAPTERS.map((ch, i) => (
        <Chapter key={ch.id} chapter={ch} last={i === CHAPTERS.length - 1} />
      ))}
    </section>
  );
}
