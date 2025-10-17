'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import { ExternalLink, Github } from 'lucide-react';

// Project slugs and metadata
const projects = [
  {
    slug: 'ascord-appwrite',
    key: 'ascord-appwrite',
    tags: ['Next.js 14', 'TypeScript', 'Appwrite', 'Tailwind CSS', 'Real-time'],
    github: 'https://github.com/Exowz/ascord-appwrite',
    demo: null
  },
  {
    slug: 'shiatsu-guyane',
    key: 'shiatsuGuyane',
    tags: ['Next.js 15', 'TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/Exowz/shiatsu-guyane',
    demo: 'https://www.shiatsu-guyane.com/fr'
  },
  {
    slug: 'b2javaece',
    key: 'B2javaECE',
    tags: ['Java', 'OOP', 'JDBC', 'JUnit', 'Maven'],
    github: 'https://github.com/Exowz/B2javaECE',
    demo: null
  },
  {
    slug: 'rib',
    key: 'RIB',
    tags: ['Python', 'Tkinter', 'API Integration', 'Financial Algorithms'],
    github: 'https://github.com/Exowz/RIB',
    demo: null
  },
  {
    slug: 'mots-fleches',
    key: 'mots-fleches',
    tags: ['C', 'Algorithms', 'Console Application', 'Academic Project'],
    github: 'https://github.com/Exowz/mots-fleches',
    demo: null
  },
  {
    slug: 'dna',
    key: 'DNA',
    tags: ['Project'],
    github: 'https://github.com/Exowz/DNA',
    demo: null
  }
];

export function ProjectsWindow() {
  const t = useTranslations('pages.projects');
  const tProjects = useTranslations('projects');

  return (
    <div className="p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="space-y-8">
          <div>
            <p className="text-lg md:text-xl text-foreground/80">
              {t('description')}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group rounded-lg border border-accent/20 bg-card/80 backdrop-blur-sm overflow-hidden hover:shadow-xl hover:shadow-accent/20 hover:border-accent/40 transition-all">
                  {/* Project Image - Clickable to detail page */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex aspect-video bg-gradient-to-br from-accent/10 to-accent/5 items-center justify-center"
                  >
                    <div className="text-4xl font-bold text-muted-foreground/30">
                      {tProjects(`${project.key}.title`).charAt(0)}
                    </div>
                  </Link>

                  {/* Project Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <Link href={`/projects/${project.slug}`}>
                        <h2 className="text-2xl font-semibold mb-2 text-foreground group-hover:text-foreground/80 transition-colors">
                          {tProjects(`${project.key}.title`)}
                        </h2>
                      </Link>
                      <p className="text-muted-foreground line-clamp-2">
                        {tProjects(`${project.key}.description`)}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-background text-foreground border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links - Separate anchors, not nested */}
                    <div className="flex gap-3 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-foreground hover:text-foreground/70 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                          {tProjects('viewCode')}
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-foreground hover:text-foreground/70 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                          {tProjects('liveDemo')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
