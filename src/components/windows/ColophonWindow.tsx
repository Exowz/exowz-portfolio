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
    <div className="p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl space-y-8"
      >
        <p className="text-lg md:text-xl text-foreground/80">{t('intro')}</p>
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-1.5 text-base md:text-lg font-semibold text-accent">{section.heading}</h2>
              <p className="leading-relaxed text-foreground/80">{section.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
