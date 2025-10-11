'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import { ExternalLink, GithubIcon } from 'lucide-react';

// Sample project data - replace with your actual projects
const projects = [
  {
    slug: 'ai-portfolio-analyzer',
    title: 'AI Portfolio Analyzer',
    description: 'Machine learning tool for analyzing investment portfolios using Python and TensorFlow',
    tags: ['Python', 'TensorFlow', 'Data Science'],
    image: '/projects/placeholder-1.jpg',
    github: 'https://github.com/exowz/project-1',
    demo: null
  },
  {
    slug: 'interactive-data-viz',
    title: 'Interactive Data Visualization',
    description: 'Real-time data visualization dashboard built with React and D3.js',
    tags: ['React', 'D3.js', 'TypeScript'],
    image: '/projects/placeholder-2.jpg',
    github: 'https://github.com/exowz/project-2',
    demo: 'https://demo.example.com'
  },
  {
    slug: 'ml-classification-system',
    title: 'ML Classification System',
    description: 'Advanced classification system using ensemble learning methods',
    tags: ['Python', 'Scikit-learn', 'AI'],
    image: '/projects/placeholder-3.jpg',
    github: 'https://github.com/exowz/project-3',
    demo: null
  }
];

export default function ProjectsPage() {
  const t = useTranslations('pages.projects');


  return (
    <div className="min-h-screen p-6 md:p-12 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
              {t('title')}
            </h1>
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
                      {project.title.charAt(0)}
                    </div>
                  </Link>

                  {/* Project Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <Link href={`/projects/${project.slug}`}>
                        <h2 className="text-2xl font-semibold mb-2 text-foreground group-hover:text-foreground/80 transition-colors">
                          {project.title}
                        </h2>
                      </Link>
                      <p className="text-muted-foreground line-clamp-2">
                        {project.description}
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
                          <GithubIcon className="w-4 h-4" />
                          Code
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
                          Demo
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
