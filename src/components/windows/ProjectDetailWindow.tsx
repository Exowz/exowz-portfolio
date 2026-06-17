'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { IconArrowLeft, IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { getProjectBySlug } from '@/data/projects';
import { monogram } from '@/lib/projects/gallery';

interface ProjectDetailWindowProps {
  slug: string;
  /** Hide the in-content "back to projects" link (the mobile sheet provides its own back). */
  hideBackLink?: boolean;
}

const ICON_GRADIENT = 'linear-gradient(135deg, var(--accent-solid), color-mix(in srgb, var(--accent-solid) 70%, #0b2545))';

/** Highlights the section currently scrolled into the top third of the viewport. */
function useScrollSpy(ids: string[]) {
  const key = ids.join(',');
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}

export default function ProjectDetailWindow({ slug, hideBackLink = false }: ProjectDetailWindowProps) {
  const t = useTranslations('projects');
  const tSections = useTranslations('projects.sections');
  const tLabels = useTranslations('projects.labels');
  const tFacets = useTranslations('cv.facets');
  const projectMeta = getProjectBySlug(slug);

  // ---- Resolve optional case-study content ------------------------------------
  let hasMetadata = false;
  let keyFeatures: Array<{ title: string; description: string; implementation: string; challenges: string }> = [];
  let learnings: string[] = [];
  let futureEnhancements: string[] = [];
  let techStackFields: Array<'frontend' | 'backend' | 'tools' | 'libraries'> = [];

  if (projectMeta) {
    try {
      const raw = t.raw(`${projectMeta.key}.metadata`);
      hasMetadata = !!raw && typeof raw === 'object' && 'role' in raw;
    } catch {
      hasMetadata = false;
    }
    if (hasMetadata) {
      const arr = (sub: string) => {
        try {
          const raw = t.raw(`${projectMeta.key}.${sub}`);
          return Array.isArray(raw) ? raw : null;
        } catch {
          return null;
        }
      };
      keyFeatures = (arr('keyFeatures') as typeof keyFeatures) ?? [];
      learnings = (arr('learnings') as string[]) ?? [];
      futureEnhancements = (arr('futureEnhancements') as string[]) ?? [];
      try {
        const stack = t.raw(`${projectMeta.key}.techStack`) as Record<string, string | null> | undefined;
        if (stack && typeof stack === 'object') {
          techStackFields = (['frontend', 'backend', 'tools', 'libraries'] as const).filter((f) => {
            const v = stack[f];
            return v !== null && v !== undefined && v !== 'null';
          });
        }
      } catch {
        techStackFields = [];
      }
    }
  }

  // ---- Section nav model (only sections that actually render) -----------------
  const navItems = useMemo(() => {
    if (!hasMetadata) return [] as Array<{ id: string; label: string }>;
    const items: Array<{ id: string; label: string }> = [
      { id: 'overview', label: tSections('overview') },
      { id: 'challenge', label: tSections('challenge') },
      { id: 'discovery', label: tSections('discovery') },
      { id: 'architecture', label: tSections('architecture') },
      { id: 'process', label: tSections('developmentProcess') },
    ];
    if (keyFeatures.length > 0) items.push({ id: 'features', label: tSections('keyFeatures') });
    items.push({ id: 'testing', label: tSections('testing') });
    items.push({ id: 'results', label: tSections('results') });
    if (techStackFields.length > 0) items.push({ id: 'stack', label: tSections('techStack') });
    if (learnings.length > 0) items.push({ id: 'learnings', label: tSections('learnings') });
    if (futureEnhancements.length > 0) items.push({ id: 'future', label: tSections('futureEnhancements') });
    items.push({ id: 'conclusion', label: tSections('conclusion') });
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMetadata, keyFeatures.length, techStackFields.length, learnings.length, futureEnhancements.length, slug]);

  const activeId = useScrollSpy(navItems.map((n) => n.id));

  if (!projectMeta) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">{t('notFound')}</h1>
          {!hideBackLink && (
            <Link href="/projects" className="hover:underline" style={{ color: 'var(--accent-text)' }}>
              ← {t('backToProjects')}
            </Link>
          )}
        </div>
      </div>
    );
  }

  const title = t(`${projectMeta.key}.title`);
  const facetLabel = projectMeta.facets.map((f) => tFacets(f)).join(' · ');

  // ---- Reusable bits ----------------------------------------------------------
  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
      {children}
    </p>
  );
  const cardStyle = {
    background: 'var(--window-content-bg)',
  } as const;
  const body = { color: 'var(--text-secondary)' } as const;

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // ---- Sections ---------------------------------------------------------------
  const sections = hasMetadata && (
    <div className="space-y-10">
      <section id="overview" className="scroll-mt-4">
        <SectionLabel>{tSections('overview')}</SectionLabel>
        <p className="text-base leading-relaxed" style={body}>
          {t(`${projectMeta.key}.overview`)}
        </p>
      </section>

      <section id="challenge" className="scroll-mt-4">
        <SectionLabel>{tSections('challenge')}</SectionLabel>
        <div className="space-y-3">
          {(['problem', 'goal', 'constraints'] as const).map((field) => (
            <div key={field} className="glass-card rounded-xl p-4" style={cardStyle}>
              <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {tLabels(field)}
              </h3>
              <p className="text-sm leading-relaxed" style={body}>
                {t(`${projectMeta.key}.challenge.${field}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="discovery" className="scroll-mt-4">
        <SectionLabel>{tSections('discovery')}</SectionLabel>
        <div className="space-y-3">
          {(['requirements', 'competitiveAnalysis', 'technicalResearch'] as const).map((field) => (
            <div key={field} className="glass-card rounded-xl p-4" style={cardStyle}>
              <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {tLabels(field)}
              </h3>
              <p className="text-sm leading-relaxed" style={body}>
                {t(`${projectMeta.key}.discovery.${field}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="architecture" className="scroll-mt-4">
        <SectionLabel>{tSections('architecture')}</SectionLabel>
        <div className="space-y-3">
          {(['informationArchitecture', 'technicalDecisions'] as const).map((field) => (
            <div key={field} className="glass-card rounded-xl p-4" style={cardStyle}>
              <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {tLabels(field)}
              </h3>
              <p className="text-sm leading-relaxed" style={body}>
                {t(`${projectMeta.key}.architecture.${field}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="scroll-mt-4">
        <SectionLabel>{tSections('developmentProcess')}</SectionLabel>
        <div className="space-y-3">
          {(['phase1', 'phase2', 'phase3'] as const).map((phase, index) => (
            <div
              key={phase}
              className="glass-card rounded-xl border-l-2 p-4"
              style={{ ...cardStyle, borderLeftColor: 'var(--accent)' }}
            >
              <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {`Phase ${index + 1}`}
              </h3>
              <p className="text-sm leading-relaxed" style={body}>
                {t(`${projectMeta.key}.developmentProcess.${phase}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {keyFeatures.length > 0 && (
        <section id="features" className="scroll-mt-4">
          <SectionLabel>{tSections('keyFeatures')}</SectionLabel>
          <div className="space-y-4">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="glass-card rounded-xl p-5" style={cardStyle}>
                <h3 className="mb-2 text-base font-semibold" style={{ color: 'var(--foreground)' }}>
                  {feature.title}
                </h3>
                <p className="mb-3 text-sm leading-relaxed" style={body}>
                  {feature.description}
                </p>
                <div
                  className="space-y-3 border-l-2 pl-4"
                  style={{ borderLeftColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}
                >
                  <div>
                    <p className="mb-1 text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>
                      {tLabels('implementation')}
                    </p>
                    <p className="text-sm" style={body}>
                      {feature.implementation}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold" style={{ color: 'var(--accent-text)' }}>
                      {tLabels('challenges')}
                    </p>
                    <p className="text-sm" style={body}>
                      {feature.challenges}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="testing" className="scroll-mt-4">
        <SectionLabel>{tSections('testing')}</SectionLabel>
        <div className="glass-card rounded-xl p-5" style={cardStyle}>
          <p className="text-sm leading-relaxed" style={body}>
            {t(`${projectMeta.key}.testing`)}
          </p>
        </div>
      </section>

      <section id="results" className="scroll-mt-4">
        <SectionLabel>{tSections('results')}</SectionLabel>
        <div
          className="glass-card space-y-4 rounded-xl p-5"
          style={{ background: 'color-mix(in srgb, var(--accent) 7%, var(--window-content-bg))' }}
        >
          {(['technicalAchievements', 'businessImpact', 'personalGrowth'] as const).map((field) => (
            <div key={field}>
              <p className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--accent-text)' }}>
                {tLabels(field)}
              </p>
              <p className="text-sm leading-relaxed" style={body}>
                {t(`${projectMeta.key}.results.${field}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {techStackFields.length > 0 && (
        <section id="stack" className="scroll-mt-4">
          <SectionLabel>{tSections('techStack')}</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {techStackFields.map((field) => (
              <div key={field} className="glass-card rounded-xl p-4" style={cardStyle}>
                <h3 className="mb-1.5 text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                  {tLabels(field)}
                </h3>
                <p className="text-sm" style={body}>
                  {t(`${projectMeta.key}.techStack.${field}`)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {learnings.length > 0 && (
        <section id="learnings" className="scroll-mt-4">
          <SectionLabel>{tSections('learnings')}</SectionLabel>
          <ul className="space-y-2.5">
            {learnings.map((learning, index) => (
              <li key={index} className="glass-card flex items-start gap-3 rounded-xl p-4" style={cardStyle}>
                <span className="mt-0.5 text-lg leading-none" style={{ color: 'var(--accent-text)' }}>
                  •
                </span>
                <span className="text-sm leading-relaxed" style={body}>
                  {learning}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {futureEnhancements.length > 0 && (
        <section id="future" className="scroll-mt-4">
          <SectionLabel>{tSections('futureEnhancements')}</SectionLabel>
          <ul className="space-y-2.5">
            {futureEnhancements.map((enhancement, index) => (
              <li key={index} className="glass-card flex items-start gap-3 rounded-xl p-4" style={cardStyle}>
                <span className="mt-0.5" style={{ color: 'var(--accent-text)' }}>
                  →
                </span>
                <span className="text-sm leading-relaxed" style={body}>
                  {enhancement}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="conclusion" className="scroll-mt-4">
        <SectionLabel>{tSections('conclusion')}</SectionLabel>
        <p className="text-base leading-relaxed" style={body}>
          {t(`${projectMeta.key}.conclusion`)}
        </p>
      </section>
    </div>
  );

  return (
    <div className="p-5 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-5xl"
      >
        {!hideBackLink && (
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:opacity-70"
            style={{ color: 'var(--text-secondary)' }}
          >
            <IconArrowLeft className="h-4 w-4" />
            {t('backToProjects')}
          </Link>
        )}

        {/* Hero */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold tracking-wide text-white"
              style={{ background: ICON_GRADIENT, boxShadow: '0 8px 20px color-mix(in srgb, var(--accent) 35%, transparent)' }}
              aria-hidden
            >
              {monogram(title)}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--accent-text)' }}>
                {facetLabel}
              </p>
              <h1 className="mt-1 text-3xl font-bold md:text-4xl" style={{ color: 'var(--foreground)' }}>
                {title}
              </h1>
            </div>
          </div>

          <p className="max-w-3xl text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t(`${projectMeta.key}.description`)}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {projectMeta.demo && (
              <a
                href={projectMeta.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                style={{ background: 'var(--accent-solid)', boxShadow: '0 2px 10px color-mix(in srgb, var(--accent) 40%, transparent)' }}
              >
                <IconExternalLink className="h-4 w-4" />
                {t('liveDemo')}
              </a>
            )}
            {projectMeta.github && (
              <a
                href={projectMeta.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition hover:opacity-80"
                style={{
                  color: 'var(--foreground)',
                  background: 'color-mix(in srgb, var(--foreground) 5%, transparent)',
                  border: '1px solid var(--border)',
                }}
              >
                <IconBrandGithub className="h-4 w-4" />
                {t('viewCode')}
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {projectMeta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: 'color-mix(in srgb, var(--accent) 9%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                  color: 'var(--accent-text)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="my-8 h-px" style={{ background: 'var(--border)' }} />

        {/* Body */}
        {hasMetadata ? (
          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-10">
            <aside className="hidden lg:block">
              <div className="sticky top-2 space-y-5 self-start">
                {(['role', 'category', 'timeline'] as const).map((field) => (
                  <div key={field}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--text-tertiary)' }}>
                      {tLabels(field)}
                    </p>
                    <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      {t(`${projectMeta.key}.metadata.${field}`)}
                    </p>
                  </div>
                ))}
                <nav className="space-y-0.5 pt-1">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--text-tertiary)' }}>
                    {tSections('metadata')}
                  </p>
                  {navItems.map((item) => {
                    const on = activeId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => goTo(item.id)}
                        className="block w-full border-l-2 py-1 pl-3 text-left text-xs transition-colors"
                        style={{
                          color: on ? 'var(--accent-text)' : 'var(--text-secondary)',
                          borderLeftColor: on ? 'var(--accent)' : 'var(--border)',
                          fontWeight: on ? 600 : 400,
                        }}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>
            {sections}
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t(`${projectMeta.key}.overview`)}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
