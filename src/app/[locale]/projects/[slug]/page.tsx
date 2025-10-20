'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { IconArrowLeft, IconBrandGithub, IconExternalLink, IconCalendar } from '@tabler/icons-react';

// Defines the shape of a project object for type safety
interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  demo: string | null;
  date: string;
  features: string[];
}

// Your project data with the correct type applied
const projectsData: Record<string, Project> = {
  'ai-portfolio-analyzer': {
    title: 'AI Portfolio Analyzer',
    description: 'Machine learning tool for analyzing investment portfolios using Python and TensorFlow',
    longDescription: `This project leverages advanced machine learning algorithms to analyze investment portfolios
    and provide insights on risk, diversification, and potential returns. Built with Python and TensorFlow,
    it processes large datasets and generates actionable recommendations for portfolio optimization.`,
    tags: ['Python', 'TensorFlow', 'Data Science', 'Machine Learning'],
    github: 'https://github.com/exowz/ai-portfolio-analyzer',
    demo: null,
    date: '2024-03',
    features: [
      'Real-time portfolio analysis',
      'Risk assessment using ML models',
      'Diversification recommendations',
      'Historical performance tracking',
      'Interactive visualization dashboard'
    ]
  },
  'interactive-data-viz': {
    title: 'Interactive Data Visualization',
    description: 'Real-time data visualization dashboard built with React and D3.js',
    longDescription: `An interactive dashboard that brings data to life through dynamic visualizations.
    Built with React and D3.js, this project demonstrates the power of modern web technologies in
    creating engaging data experiences. Users can explore datasets through various chart types and
    interactive filters.`,
    tags: ['React', 'D3.js', 'TypeScript', 'Data Visualization'],
    github: 'https://github.com/exowz/interactive-data-viz',
    demo: 'https://demo.example.com',
    date: '2024-01',
    features: [
      'Multiple chart types (bar, line, scatter, pie)',
      'Real-time data updates',
      'Interactive filtering and sorting',
      'Responsive design',
      'Export functionality'
    ]
  },
  'ml-classification-system': {
    title: 'ML Classification System',
    description: 'Advanced classification system using ensemble learning methods',
    longDescription: `A sophisticated machine learning system that combines multiple classification
    algorithms to achieve superior accuracy. This project explores ensemble learning techniques
    including Random Forests, Gradient Boosting, and Neural Networks to solve complex classification problems.`,
    tags: ['Python', 'Scikit-learn', 'AI', 'Machine Learning'],
    github: 'https://github.com/exowz/ml-classification-system',
    demo: null,
    date: '2023-11',
    features: [
      'Ensemble learning implementation',
      'Model performance comparison',
      'Hyperparameter tuning',
      'Cross-validation',
      'Detailed metrics and reporting'
    ]
  }
};

// Props type where 'params' is correctly typed as a Promise
interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // 'use' hook to correctly unwrap the params promise
  const { slug } = use(params);
  const project = projectsData[slug];

  // State and effect to prevent hydration errors from framer-motion
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-primary hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12">
      {/* Conditionally render motion component only on the client */}
      {isClient && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <IconArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="space-y-8">
            {/* Project Header */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {project.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconCalendar className="w-4 h-4" />
                  {new Date(project.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-card hover:bg-accent transition-colors"
                  >
                    <IconBrandGithub className="w-4 h-4" />
                    View Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <IconExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Image Placeholder */}
            <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-6xl font-bold opacity-20">
                {project.title.charAt(0)}
              </div>
            </div>

            {/* Long Description */}
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-semibold mb-4">Overview</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {project.longDescription}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card"
                  >
                    <span className="text-primary mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h2 className="text-3xl font-semibold mb-4">Technologies Used</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.tags.map((tech) => (
                  <div
                    key={tech}
                    className="p-4 rounded-lg border bg-card text-center"
                  >
                    <p className="font-medium">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}