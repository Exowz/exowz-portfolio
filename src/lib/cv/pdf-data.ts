import type { CvContent } from '@/data/cv';

export interface PdfProject {
  name: string;
  techs: string[];
  description: string;
}

const PDF_META = {
  fr: {
    target:
      'Chef de projet digital Automatisation & IA en alternance chez Prosper Conseil depuis septembre 2026, en parallèle de mon MSc Data & AI for Finance.',
    program: 'MSc Mines de Paris - PSL × Albert School',
    rhythm: '4 jours entreprise / 1 jour école',
    duration: '2026 — 2028',
    start_date: 'Depuis sept. 2026',
    soft_skills: [
      'Autonomie',
      'Adaptabilité',
      "Esprit d'analyse",
      'Polyvalence',
      'Travail en équipe',
      'Fiabilité',
      'Méthode Agile (tous projets ECE Paris)',
    ],
    interests: 'Fitness & Kickboxing, Guitare, Littérature, Nutrition, Cuisine',
  },
  en: {
    target:
      'Apprentice Digital Project Manager, Automation & AI, at Prosper Conseil since September 2026, alongside my MSc Data & AI for Finance.',
    program: 'MSc Mines de Paris - PSL × Albert School',
    rhythm: '4 days company / 1 day school',
    duration: '2026 — 2028',
    start_date: 'Since Sept. 2026',
    soft_skills: ['Autonomy', 'Adaptability', 'Analytical mindset', 'Versatility', 'Teamwork', 'Reliability', 'Agile method'],
    interests: 'Fitness & Kickboxing, Guitar, Literature, Nutrition, Cooking',
  },
} as const;

/** Build the data dict the vendored Jinja templates expect. Prose is from cv, never client input. */
export function buildCvPdfData(locale: string, cv: CvContent, projects: PdfProject[]) {
  const language = locale.startsWith('fr') ? 'fr' : 'en';
  const contact = cv.contact;
  const contact_bits = [contact.email, contact.linkedin, contact.website, contact.location].filter(Boolean);

  return {
    language,
    name: 'Mathew Kristoffer Ewan KAPOOR',
    title: cv.title,
    objective: cv.objective,
    summary: cv.summary,
    contact,
    contact_bits,
    experience: cv.experience,
    education: cv.education,
    skills: cv.skills,
    languages: cv.languages,
    projects,
    ...PDF_META[language],
  };
}
