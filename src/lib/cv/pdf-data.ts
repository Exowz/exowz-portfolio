import type { CvContent } from '@/data/cv';

export interface PdfProject {
  name: string;
  techs: string[];
  description: string;
}

const PDF_META = {
  fr: {
    target:
      'Recherche une alternance en Data Science / Data Engineering / IA à partir de septembre 2026, en lien avec mon MSc Data & AI for Finance. Ouvert aux secteurs finance, industrie et tech.',
    program: 'Admis : MSc Mines de Paris - PSL × Albert School',
    rhythm: '4 jours entreprise / 1 jour école',
    duration: '12 à 24 mois',
    start_date: 'Septembre 2026',
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
      'Seeking a work-study (alternance) role in Data Science / Data Engineering / AI from September 2026, aligned with my MSc Data & AI for Finance. Open to finance, industry and tech.',
    program: 'Admitted: MSc Mines de Paris - PSL × Albert School',
    rhythm: '4 days company / 1 day school',
    duration: '12 to 24 months',
    start_date: 'September 2026',
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
