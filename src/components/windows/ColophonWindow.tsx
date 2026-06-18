'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface ColophonSection {
  heading: string;
  body: string;
}

export function ColophonWindow() {
  const t = useTranslations('colophon');
  const sections = t.raw('sections') as ColophonSection[];

  return (
    <div className="p-5 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl space-y-6 md:space-y-8"
      >
        <p className="text-base md:text-xl text-foreground/80">{t('intro')}</p>
        <div className="space-y-5 md:space-y-6">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-1.5 text-base md:text-lg font-semibold text-accent-text">{section.heading}</h2>
              <p className="text-sm leading-relaxed text-foreground/80 md:text-base">{section.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
