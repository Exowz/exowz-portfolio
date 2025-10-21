'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import localFont from 'next/font/local';

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
        className="max-w-5xl mx-auto w-full space-y-8"
      >
        {/* Summary Box - Above the Fold */}
        <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl shadow-lg p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Profile Photo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px]">
                <Image
                  src="/images/about/profile.jpeg"
                  alt={t('name')}
                  fill
                  className="rounded-xl object-cover shadow-lg border-2 border-accent/20"
                  priority
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold mb-1 tracking-tight text-foreground">
                  {t('name')}
                </h1>
                <p className="text-lg md:text-xl font-light text-accent">
                  {t('jobTitle')}
                </p>
              </div>

              <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                {t('pitch')}
              </p>

              {/* Tech Skills */}
              <div className="space-y-2 bg-accent/5 p-4 rounded-xl border border-accent/10">
                <h3 className="text-sm md:text-base font-semibold text-accent">
                  {t('techSkillsTitle')}
                </h3>
                <ul className="space-y-1.5 text-xs md:text-sm text-foreground/80">
                  <li>
                    <strong className="font-semibold text-foreground">Data & IA:</strong> {t('techSkills.dataAI')}
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Web:</strong> {t('techSkills.web')}
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">Cloud & Autres:</strong> {t('techSkills.cloud')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl shadow-lg p-6 md:p-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-accent">
            {t('storyTitle')}
          </h2>

          <div className="space-y-5 text-foreground/90 text-base leading-relaxed">
            {/* Intro */}
            <p>{t('story.intro1')}</p>
            <p>{t('story.intro2')}</p>

            {/* Origins - TEXT on left, IMAGE on right */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              <div className="flex-1 space-y-4">
                <p>{t('story.origins1')}</p>
                <p>{t('story.family')}</p>
              </div>
              <div className="w-full md:w-[300px] flex-shrink-0">
                <div className="relative w-full h-[200px] md:h-[240px] rounded-lg overflow-hidden shadow-lg border-2 border-accent/20">
                  <Image
                    src="/images/about/mauritius.jpg"
                    alt="Île Maurice"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Computer Journey */}
            <div className="space-y-4">
              <p>{t('story.computer')}</p>
              <p>{t('story.dream')}</p>
              <p className="text-lg font-semibold text-accent">{t('story.challenge')}</p>
              <p>{t('story.struggle')}</p>
            </div>

            {/* Introspection with Guitar & Cooking Images */}
            <div className="space-y-4">
              <p>{t('story.introspection')}</p>

              {/* Dual Images Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full h-[350px] md:h-[400px] rounded-lg overflow-hidden shadow-lg border-2 border-accent/20">
                  <Image
                    src="/images/about/guitar.jpg"
                    alt="Guitare"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative w-full h-[350px] md:h-[400px] rounded-lg overflow-hidden shadow-lg border-2 border-accent/20">
                  <Image
                    src="/images/about/cooking.jpeg"
                    alt="Cuisine"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Return and Revelation */}
            <div className="space-y-4">
              <p>{t('story.return')}</p>
              <p>{t('story.revelation')}</p>
              <p>{t('story.webdev')}</p>
              <p className="text-lg font-semibold text-accent">{t('story.dataAI')}</p>
            </div>

            {/* Sovereignty - IMAGE on left, TEXT on right */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              <div className="w-full md:w-[300px] flex-shrink-0 md:order-first">
                <div className="relative w-full h-[200px] md:h-[240px] rounded-lg overflow-hidden shadow-lg border-2 border-accent/20">
                  <Image
                    src="/images/about/ece.jpg"
                    alt="ECE Paris"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <p>{t('story.sovereignty1')}</p>
                <p>{t('story.sovereignty2')}</p>
              </div>
            </div>

            {/* Closing */}
            <div className="space-y-4 pt-6 border-t border-accent/20">
              <p>{t('story.closing')}</p>
              <p className={`text-right text-3xl md:text-4xl text-accent ${takenByVultures.className}`}>
                {t('story.signature')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
