'use client';

import { useTranslations } from 'next-intl';
import type { CvFacet } from '@/data/projects';

export const FACETS: CvFacet[] = ['data-eng', 'ml', 'ai-rag', 'finance', 'web', 'sovereignty'];

export function FacetFilter({ active, onChange }: { active: CvFacet | null; onChange: (f: CvFacet | null) => void }) {
  const t = useTranslations('cv.facets');

  const item = (key: string, value: CvFacet | null, label: string) => {
    const on = active === value;
    return (
      <button
        key={key}
        type="button"
        onClick={() => onChange(value)}
        aria-pressed={on}
        className="rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
        style={{
          color: on ? 'white' : 'var(--text-secondary)',
          background: on ? 'var(--accent)' : 'transparent',
          border: '1px solid var(--window-border)',
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {item('all', null, t('all'))}
      {FACETS.map((f) => item(f, f, t(f)))}
    </div>
  );
}
