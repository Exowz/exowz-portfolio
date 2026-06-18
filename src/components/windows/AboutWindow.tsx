'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import { AboutHero } from './about/AboutHero';
import { PrinciplesRow } from './about/PrinciplesRow';
import { StoryTimeline } from './about/StoryTimeline';
import { ToolkitRail } from './about/ToolkitRail';

const takenByVultures = localFont({
  src: '../../../public/fonts/TakenByVultures.otf',
});

export function AboutWindow() {
  const t = useTranslations('pages.about');

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-3xl space-y-12"
      >
        <AboutHero />
        <ToolkitRail />
        <StoryTimeline />
        <PrinciplesRow />
        <div className="space-y-4 border-t pt-8" style={{ borderColor: 'var(--window-border)' }}>
          <p className="leading-relaxed text-foreground/90">{t('story.closing')}</p>
          <p className={`text-right text-3xl md:text-4xl ${takenByVultures.className}`} style={{ color: 'var(--accent-text)' }}>
            {t('story.signature')}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
