'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { IconArrowLeft, IconBrandGithub, IconExternalLink, IconBriefcase, IconFolder, IconClock } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

// Project metadata (tags, github, demo, date)
const projectsMetadata: Record<string, {key: string, tags: string[], github: string, demo: string | null, date: string}> = {
  'ascord-appwrite': {
    key: 'ascord-appwrite',
    tags: ['Next.js 14', 'TypeScript', 'Appwrite', 'Tailwind CSS', 'Real-time'],
    github: 'https://github.com/Exowz/ascord-appwrite',
    demo: null,
    date: '2024-12'
  },
  'shiatsu-guyane': {
    key: 'shiatsuGuyane',
    tags: ['Next.js 15', 'TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/Exowz/shiatsu-guyane',
    demo: 'https://www.shiatsu-guyane.com/fr',
    date: '2025-07'
  },
  'b2javaece': {
    key: 'B2javaECE',
    tags: ['Java', 'OOP', 'JDBC', 'JUnit', 'Maven'],
    github: 'https://github.com/Exowz/B2javaECE',
    demo: null,
    date: '2025-02'
  },
  'rib': {
    key: 'RIB',
    tags: ['Python', 'Tkinter', 'API Integration', 'Financial Algorithms'],
    github: 'https://github.com/Exowz/RIB',
    demo: null,
    date: '2025-09'
  },
  'mots-fleches': {
    key: 'mots-fleches',
    tags: ['C', 'Algorithms', 'Console Application', 'Academic Project'],
    github: 'https://github.com/Exowz/mots-fleches',
    demo: null,
    date: '2024-05'
  },
  'dna': {
    key: 'DNA',
    tags: ['Project'],
    github: 'https://github.com/Exowz/DNA',
    demo: null,
    date: '2024-01'
  }
};

interface ProjectDetailWindowProps {
  slug: string;
}

export default function ProjectDetailWindow({ slug }: ProjectDetailWindowProps) {
  const t = useTranslations('projects');
  const tSections = useTranslations('projects.sections');
  const tLabels = useTranslations('projects.labels');
  const projectMeta = projectsMetadata[slug];

  if (!projectMeta) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('notFound')}</h1>
          <Link href="/projects" className="text-primary hover:underline">
            ← {t('backToProjects')}
          </Link>
        </div>
      </div>
    );
  }

  // Check if this project has full case study data
  let hasMetadata = false;
  let keyFeatures: Array<{ title: string; description: string; implementation: string; challenges: string }> = [];
  let learnings: string[] = [];
  let futureEnhancements: string[] = [];

  try {
    const raw = t.raw(`${projectMeta.key}.metadata`);
    hasMetadata = raw && typeof raw === 'object' && 'role' in raw;
  } catch {
    hasMetadata = false;
  }

  // Get key features array (if available)
  if (hasMetadata) {
    try {
      const raw = t.raw(`${projectMeta.key}.keyFeatures`);
      if (Array.isArray(raw)) {
        keyFeatures = raw;
      }
    } catch {
      keyFeatures = [];
    }
  }

  // Get learnings array (if available)
  if (hasMetadata) {
    try {
      const raw = t.raw(`${projectMeta.key}.learnings`);
      if (Array.isArray(raw)) {
        learnings = raw;
      }
    } catch {
      learnings = [];
    }
  }

  // Get future enhancements array (if available)
  if (hasMetadata) {
    try {
      const raw = t.raw(`${projectMeta.key}.futureEnhancements`);
      if (Array.isArray(raw)) {
        futureEnhancements = raw;
      }
    } catch {
      futureEnhancements = [];
    }
  }

  return (
    <div className="p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
          {/* Back Button */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <IconArrowLeft className="w-4 h-4" />
            {t('backToProjects')}
          </Link>

          <div className="space-y-10">
            {/* Project Header */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {t(`${projectMeta.key}.title`)}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {t(`${projectMeta.key}.description`)}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {projectMeta.github && (
                  <a
                    href={projectMeta.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:bg-accent transition-colors"
                  >
                    <IconBrandGithub className="w-4 h-4" />
                    {t('viewCode')}
                  </a>
                )}
                {projectMeta.demo && (
                  <a
                    href={projectMeta.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <IconExternalLink className="w-4 h-4" />
                    {t('liveDemo')}
                  </a>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {projectMeta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Metadata (if available) */}
            {hasMetadata && (
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-2xl font-semibold mb-4">{tSections('metadata')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <IconBriefcase className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">{tLabels('role')}</p>
                      <p className="font-medium">{t(`${projectMeta.key}.metadata.role`)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconFolder className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">{tLabels('category')}</p>
                      <p className="font-medium">{t(`${projectMeta.key}.metadata.category`)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconClock className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">{tLabels('timeline')}</p>
                      <p className="font-medium">{t(`${projectMeta.key}.metadata.timeline`)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Project Image Placeholder */}
            <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-6xl font-bold opacity-20">
                {t(`${projectMeta.key}.title`).charAt(0)}
              </div>
            </div>

            {/* Overview */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">{tSections('overview')}</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t(`${projectMeta.key}.overview`)}
              </p>
            </section>

            {/* The Challenge (if available) */}
            {hasMetadata && (
              <section className="rounded-lg border bg-card/50 p-6">
                <h2 className="text-3xl font-semibold mb-6">{tSections('challenge')}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">{tLabels('problem')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.challenge.problem`)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">{tLabels('goal')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.challenge.goal`)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">{tLabels('constraints')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.challenge.constraints`)}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Discovery & Research (if available) */}
            {hasMetadata && (
              <section>
                <h2 className="text-3xl font-semibold mb-6">{tSections('discovery')}</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="text-lg font-semibold mb-2">{tLabels('requirements')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.discovery.requirements`)}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="text-lg font-semibold mb-2">{tLabels('competitiveAnalysis')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.discovery.competitiveAnalysis`)}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="text-lg font-semibold mb-2">{tLabels('technicalResearch')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.discovery.technicalResearch`)}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Architecture & Planning (if available) */}
            {hasMetadata && (
              <section>
                <h2 className="text-3xl font-semibold mb-6">{tSections('architecture')}</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="text-lg font-semibold mb-2">{tLabels('informationArchitecture')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.architecture.informationArchitecture`)}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="text-lg font-semibold mb-2">{tLabels('technicalDecisions')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.architecture.technicalDecisions`)}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Development Process (if available) */}
            {hasMetadata && (
              <section>
                <h2 className="text-3xl font-semibold mb-6">{tSections('developmentProcess')}</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border bg-card p-4 border-l-4 border-l-accent">
                    <h3 className="text-lg font-semibold mb-2">Phase 1</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.developmentProcess.phase1`)}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-4 border-l-4 border-l-accent">
                    <h3 className="text-lg font-semibold mb-2">Phase 2</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.developmentProcess.phase2`)}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-4 border-l-4 border-l-accent">
                    <h3 className="text-lg font-semibold mb-2">Phase 3</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.developmentProcess.phase3`)}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Key Features & Implementation */}
            {keyFeatures.length > 0 && (
              <section>
                <h2 className="text-3xl font-semibold mb-6">{tSections('keyFeatures')}</h2>
                <div className="space-y-6">
                  {keyFeatures.map((feature, index: number) => (
                    <div key={index} className="rounded-lg border bg-card p-6">
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <div className="space-y-3 pl-4 border-l-2 border-accent/30">
                        <div>
                          <p className="text-sm font-semibold text-accent mb-1">{tLabels('implementation')}</p>
                          <p className="text-sm text-muted-foreground">{feature.implementation}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-accent mb-1">{tLabels('challenges')}</p>
                          <p className="text-sm text-muted-foreground">{feature.challenges}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Testing & Iteration (if available) */}
            {hasMetadata && (
              <section>
                <h2 className="text-3xl font-semibold mb-4">{tSections('testing')}</h2>
                <div className="rounded-lg border bg-card p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`${projectMeta.key}.testing`)}
                  </p>
                </div>
              </section>
            )}

            {/* Results & Impact (if available) */}
            {hasMetadata && (
              <section className="rounded-lg border bg-gradient-to-br from-accent/10 to-primary/10 p-6">
                <h2 className="text-3xl font-semibold mb-6">{tSections('results')}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">{tLabels('technicalAchievements')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.results.technicalAchievements`)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">{tLabels('businessImpact')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.results.businessImpact`)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">{tLabels('personalGrowth')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`${projectMeta.key}.results.personalGrowth`)}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Tech Stack (if available) */}
            {hasMetadata && (
              <section>
                <h2 className="text-3xl font-semibold mb-6">{tSections('techStack')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="text-lg font-semibold mb-3">{tLabels('frontend')}</h3>
                    <p className="text-muted-foreground">{t(`${projectMeta.key}.techStack.frontend`)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="text-lg font-semibold mb-3">{tLabels('backend')}</h3>
                    <p className="text-muted-foreground">{t(`${projectMeta.key}.techStack.backend`)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="text-lg font-semibold mb-3">{tLabels('tools')}</h3>
                    <p className="text-muted-foreground">{t(`${projectMeta.key}.techStack.tools`)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <h3 className="text-lg font-semibold mb-3">{tLabels('libraries')}</h3>
                    <p className="text-muted-foreground">{t(`${projectMeta.key}.techStack.libraries`)}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Key Learnings (if available) */}
            {learnings.length > 0 && (
              <section>
                <h2 className="text-3xl font-semibold mb-6">{tSections('learnings')}</h2>
                <ul className="space-y-3">
                  {learnings.map((learning: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg border bg-card"
                    >
                      <span className="text-accent mt-1 text-lg">•</span>
                      <span className="text-muted-foreground leading-relaxed">{learning}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Future Enhancements (if available) */}
            {futureEnhancements.length > 0 && (
              <section>
                <h2 className="text-3xl font-semibold mb-6">{tSections('futureEnhancements')}</h2>
                <ul className="space-y-3">
                  {futureEnhancements.map((enhancement: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
                    >
                      <span className="text-primary mt-1">→</span>
                      <span className="text-muted-foreground leading-relaxed">{enhancement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Conclusion (if available) */}
            {hasMetadata && (
              <section className="rounded-lg border bg-card p-6">
                <h2 className="text-3xl font-semibold mb-4">{tSections('conclusion')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t(`${projectMeta.key}.conclusion`)}
                </p>
              </section>
            )}
          </div>
        </motion.div>
    </div>
  );
}
