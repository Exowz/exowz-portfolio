export interface CvContact {
  email: string;
  location: string;
  availability: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface CvExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface CvEducationEntry {
  institution: string;
  degree: string;
  period: string;
  note?: string;
}

export interface CvSkillGroup {
  category: string;
  techs: string[];
}

export interface CvLanguage {
  language: string;
  level: string;
}

export interface CvContent {
  title: string;
  objective: string;
  summary: string;
  contact: CvContact;
  experience: CvExperience[];
  education: CvEducationEntry[];
  skills: CvSkillGroup[];
  languages: CvLanguage[];
}

const contact: CvContact = {
  email: 'ewan@mke-kapoor.com',
  location: 'Paris (75017)',
  availability: 'Remote or on-site',
  website: 'mke-kapoor.com',
  linkedin: 'linkedin.com/in/mke-kapoor',
  github: 'github.com/Exowz',
};

const en: CvContent = {
  title: 'Data & AI Student · Admitted to MSc Data & AI for Finance (Albert × Mines Paris-PSL)',
  objective:
    'Data & AI engineer building data pipelines and ML products end to end — seeking a work-study apprenticeship from September 2026.',
  summary:
    'Final-year BSc Data & AI student at ECE Paris, admitted to the MSc Data & AI for Finance (Albert School × Mines Paris-PSL). I build end-to-end data solutions, from data engineering to ML models and generative AI, always focused on making data useful for decisions.',
  contact: { ...contact, availability: 'Remote or on-site' },
  experience: [
    {
      company: 'Purecontrol',
      role: 'AI Engineer — Data Science (Intern)',
      period: 'Apr. 2026 — Sep. 2026',
      location: 'Rennes, France',
      highlights: [
        'Tuning and optimization of ML forecasting models on IoT time series, integrated into a production architecture.',
        'Anomaly-detection algorithm (water-leak) comparing actual vs predicted, with visual dashboard alerts.',
        'ETL pipelines on industrial data, integrated into production (PostgreSQL).',
      ],
    },
    {
      company: 'Freelance',
      role: 'Full-Stack Web Developer',
      period: 'Since Jul. 2025',
      location: 'Paris, France',
      highlights: [
        'Custom websites (Next.js, Node.js, SQL) and business automation via n8n.',
        'Deployment on Infomaniak VPS via Dokploy (European-sovereign approach).',
      ],
    },
    {
      company: 'Body Iron Guyane',
      role: 'Sales Advisor — Sports Nutrition',
      period: 'Jul. — Sep. 2025',
      location: 'Rémire-Montjoly, FG',
      highlights: ['Sales-data analysis for KPI tracking and inventory optimization.'],
    },
    {
      company: 'REM Cutting Edge Nutrition Ltd',
      role: 'Manager — E-commerce & Operations',
      period: '2021 — 2022',
      location: 'Curepipe, Mauritius',
      highlights: ['Commercial operations, CRM and e-commerce channel development.'],
    },
  ],
  education: [
    {
      institution: 'Albert School × Mines de Paris - PSL',
      degree: 'MSc Data & AI for Finance — Admitted (Sep. 2026 start, work-study)',
      period: '2026 — 2028',
    },
    { institution: 'ECE Paris', degree: 'BSc in Computer Science — Data & AI specialization', period: '2024 — 2026' },
    { institution: 'DataScientest', degree: 'Python for Data Science Certification', period: '2024' },
    { institution: 'ECE Paris', degree: 'Integrated Preparatory Cycle', period: '2023 — 2024' },
    { institution: 'Lycée Pothier', degree: 'CPGE PCSI (intensive science prep)', period: '2020 — 2021' },
    { institution: 'Lycée La Bourdonnais', degree: 'Scientific Baccalaureate — Highest Honors', period: '2020' },
  ],
  skills: [
    { category: 'Data & AI', techs: ['Python', 'Scikit-learn', 'PyTorch', 'Pandas', 'XGBoost', 'R'] },
    { category: 'Data Engineering', techs: ['SQL', 'PostgreSQL', 'ETL', 'IoT Pipelines', 'Streamlit'] },
    { category: 'MLOps & Production', techs: ['Docker', 'Docker Compose', 'Git', 'Linux', 'FastAPI'] },
    { category: 'Generative AI & LLMs', techs: ['LangChain', 'ChromaDB', 'RAG', 'Embeddings', 'Mistral AI'] },
    { category: 'Web & Cloud', techs: ['Next.js', 'React', 'TypeScript', 'AWS Foundation', 'Power BI'] },
  ],
  languages: [
    { language: 'French', level: 'Native' },
    { language: 'English', level: 'Fluent — C1 IELTS' },
    { language: 'Spanish', level: 'Intermediate — B2 DELE' },
  ],
};

const fr: CvContent = {
  title: 'Étudiant Data & IA · Admis au MSc Data & AI for Finance (Albert × Mines Paris-PSL)',
  objective:
    "Développeur Data & IA — pipelines de données et industrialisation de modèles ML de bout en bout. En recherche d'alternance dès septembre 2026.",
  summary:
    "Étudiant en dernière année de Bachelor Data & IA à l'ECE Paris, admis au MSc Data & AI for Finance (Albert School × Mines Paris-PSL). Je conçois des solutions data de bout en bout, de l'ingénierie des données aux modèles ML et à l'IA générative, avec le souci de rendre la donnée utile à la décision.",
  contact: { ...contact, availability: 'Télétravail ou présentiel' },
  experience: [
    {
      company: 'Purecontrol',
      role: 'Ingénieur IA — Data Science (Stagiaire)',
      period: 'Avr. 2026 — Sept. 2026',
      location: 'Rennes, France',
      highlights: [
        'Optimisation et paramétrage de modèles ML de prévision sur séries temporelles IoT, avec intégration en architecture de production.',
        "Algorithme de détection d'anomalies (fuite d'eau) par comparaison réel/prédit, avec alertes visuelles sur tableau de bord.",
        'Pipelines ETL sur données industrielles, intégration en architecture de production (PostgreSQL).',
      ],
    },
    {
      company: 'Indépendant',
      role: 'Développeur Web Full-Stack',
      period: 'Depuis juil. 2025',
      location: 'Paris, France',
      highlights: [
        'Sites web sur mesure (Next.js, Node.js, SQL) et automatisation métier via n8n.',
        'Déploiement sur VPS Infomaniak via Dokploy (approche souveraine européenne).',
      ],
    },
    {
      company: 'Body Iron Guyane',
      role: 'Conseiller de Vente — Nutrition Sportive',
      period: 'Juil. — Sept. 2025',
      location: 'Rémire-Montjoly, GF',
      highlights: ['Analyse des données de vente pour suivi des KPI et optimisation des stocks.'],
    },
    {
      company: 'REM Cutting Edge Nutrition Ltd',
      role: 'Gérant — E-commerce & Opérations',
      period: '2021 — 2022',
      location: 'Curepipe, Maurice',
      highlights: ['Gestion des opérations commerciales, CRM et développement du canal e-commerce.'],
    },
  ],
  education: [
    {
      institution: 'Mines de Paris - PSL × Albert School',
      degree: 'MSc Data & AI for Finance — Admis (rentrée sept. 2026, en alternance)',
      period: '2026 — 2028',
    },
    {
      institution: 'ECE Paris',
      degree: 'Bachelor en Informatique — Spécialisation Data & IA',
      period: '2024 — 2026',
      note: 'Cycle classique axé Data et IA',
    },
    { institution: 'DataScientest', degree: 'Certification Python pour la Data Science', period: '2024' },
    { institution: 'ECE Paris', degree: 'Cycle Préparatoire Intégré', period: '2023 — 2024' },
    {
      institution: 'Lycée Pothier',
      degree: 'CPGE PCSI',
      period: '2020 — 2021',
      note: "Physique, Chimie et Sciences de l'Ingénieur",
    },
    { institution: 'Lycée La Bourdonnais', degree: 'Baccalauréat Scientifique', period: '2020', note: 'Mention Très Bien' },
  ],
  skills: [
    { category: 'Data & IA', techs: ['Python', 'Scikit-learn', 'PyTorch', 'Pandas', 'XGBoost', 'R'] },
    { category: 'Data Engineering', techs: ['SQL', 'PostgreSQL', 'ETL', 'Pipelines IoT', 'Streamlit'] },
    { category: 'MLOps & Production', techs: ['Docker', 'Docker Compose', 'Git', 'Linux', 'FastAPI'] },
    { category: 'IA Générative & LLMs', techs: ['LangChain', 'ChromaDB', 'RAG', 'Embeddings', 'Mistral AI'] },
    { category: 'Développement & Cloud', techs: ['Next.js', 'React', 'TypeScript', 'AWS Foundation', 'Power BI'] },
  ],
  languages: [
    { language: 'Français', level: 'Langue maternelle' },
    { language: 'Anglais', level: 'Courant — C1 IELTS' },
    { language: 'Espagnol', level: 'Intermédiaire — B2 DELE' },
  ],
};

export const cv = { en, fr } as const;

/** Pick CV content for a locale. French uses FR copy; every other locale falls back to EN. */
export function cvFor(locale: string): CvContent {
  return locale.startsWith('fr') ? cv.fr : cv.en;
}
