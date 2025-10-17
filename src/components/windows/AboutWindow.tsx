'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function AboutWindow() {
  const t = useTranslations('pages.about');

  return (
    <div className="p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto w-full"
      >
        <div className="space-y-6">
          <div>
            <p className="text-lg md:text-xl text-foreground/80">
              {t('description')}
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <div className="grid gap-8 mt-12">
              <section>
                <h2 className="text-3xl font-semibold mb-4 text-foreground">{t('backgroundTitle')}</h2>
                <p className="text-lg leading-relaxed text-foreground/80">
                  {t('backgroundText')}
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold mb-4 text-foreground">{t('skillsTitle')}</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-lg border border-accent/20 bg-card/80 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{t('skills.dataAI.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('skills.dataAI.description')}
                    </p>
                  </div>
                  <div className="p-6 rounded-lg border border-accent/20 bg-card/80 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{t('skills.webDev.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('skills.webDev.description')}
                    </p>
                  </div>
                  <div className="p-6 rounded-lg border border-accent/20 bg-card/80 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{t('skills.uiux.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('skills.uiux.description')}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
