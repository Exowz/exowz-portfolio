export type ChapterMedia = 'mauritius' | 'personal' | 'education' | 'cohort';

export interface AboutChapter {
  /** Matches `pages.about.chapters.<id>` label key. */
  id: string;
  /** Keys under `pages.about.story` rendered in order. */
  beats: string[];
  /** Optional spine year marker, only where known. */
  year?: string;
  /** Optional media block rendered after the beats. */
  media?: ChapterMedia;
}

// Existing story beats, regrouped into titled chapters. Text stays in i18n.
export const CHAPTERS: AboutChapter[] = [
  { id: 'origins', beats: ['intro1', 'intro2', 'origins1', 'family'], media: 'mauritius' },
  { id: 'dream', beats: ['computer', 'dream'] },
  { id: 'fall', beats: ['challenge', 'struggle'] },
  { id: 'return', beats: ['introspection', 'return'], media: 'personal' },
  { id: 'dataAI', beats: ['revelation', 'webdev', 'dataAI', 'building', 'philosophy'], media: 'education' },
  { id: 'sovereignty', beats: ['sovereignty1', 'sovereignty2', 'comeback'], year: '2026', media: 'cohort' },
];
