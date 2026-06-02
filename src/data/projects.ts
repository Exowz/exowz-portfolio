export interface Project {
  slug: string; // URL segment + identity
  key: string; // i18n namespace → projects.<key>.* in messages
  tags: string[];
  github: string | null;
  demo: string | null;
  date: string; // 'YYYY-MM'
}

export const projects: Project[] = [
  {
    slug: 'risk-lens',
    key: 'risk-lens',
    tags: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Mistral AI'],
    github: 'https://github.com/Exowz/risk-lens',
    demo: null,
    date: '2026-03',
  },
  {
    slug: 'thoraxai',
    key: 'ThoraxAI',
    tags: ['Python', 'PyTorch', 'Deep Learning', 'Computer Vision', 'Streamlit', 'Explainable AI'],
    github: 'https://github.com/Exowz/ThoraxAI',
    demo: 'https://thoraxai-exowz.streamlit.app',
    date: '2026-03',
  },
  {
    slug: 'blue-gold-analytics',
    key: 'blue-gold-analytics',
    tags: ['Python', 'R', 'Streamlit', 'Shiny', 'Plotly', 'Data Visualization'],
    github: 'https://github.com/Exowz/blue-gold-analytics',
    demo: null,
    date: '2026-01',
  },
  {
    slug: 'purecontrol-ml-technical-test',
    key: 'purecontrol-ml-technical-test',
    tags: ['Python', 'XGBoost', 'Pandas', 'Machine Learning', 'Control Systems'],
    github: 'https://github.com/Exowz/purecontrol-ml-technical-test',
    demo: null,
    date: '2026-01',
  },
  {
    slug: 'cancer-research-analytics',
    key: 'Cancer',
    tags: ['Python', 'Pandas', 'Streamlit', 'Plotly', 'PostgreSQL', 'Selenium'],
    github: 'https://github.com/Le-skal/Cancer',
    demo: null,
    date: '2026-01',
  },
  {
    slug: 'reviewai-platform',
    key: 'reviewai-platform',
    tags: ['Vue.js 3', 'Laravel 12', 'TypeScript', 'Mistral AI', 'Tailwind CSS'],
    github: 'https://github.com/Exowz/reviewai-platform',
    demo: null,
    date: '2026-01',
  },
  {
    slug: 'ascord-appwrite',
    key: 'ascord-appwrite',
    tags: ['Next.js 14', 'TypeScript', 'Appwrite', 'Tailwind CSS', 'Real-time'],
    github: 'https://github.com/Exowz/ascord-appwrite',
    demo: null,
    date: '2024-12',
  },
  {
    slug: 'shiatsu-guyane',
    key: 'shiatsuGuyane',
    tags: ['Next.js 15', 'TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/Exowz/shiatsu-guyane',
    demo: 'https://www.shiatsu-guyane.com/fr',
    date: '2025-07',
  },
  {
    slug: 'portfolio-projects-ai',
    key: 'portfolio-projects-ai',
    tags: ['Python', 'RAG', 'LangChain', 'ChromaDB', 'Gemini API', 'AI/ML'],
    github: 'https://github.com/Exowz/portfolio-projects-ai',
    demo: null,
    date: '2025-01',
  },
  {
    slug: 'wine-cultivar-classification',
    key: 'wine-cultivar-classification',
    tags: ['Python', 'Machine Learning', 'Scikit-learn', 'Data Analysis', 'Classification'],
    github: 'https://github.com/Exowz/wine-cultivar-classification',
    demo: null,
    date: '2024-11',
  },
  {
    slug: 'b2javaece',
    key: 'B2javaECE',
    tags: ['Java', 'OOP', 'JDBC', 'JUnit', 'Maven'],
    github: 'https://github.com/Exowz/B2javaECE',
    demo: null,
    date: '2025-02',
  },
  {
    slug: 'rib',
    key: 'RIB',
    tags: ['Python', 'Tkinter', 'API Integration', 'Financial Algorithms'],
    github: 'https://github.com/Exowz/RIB',
    demo: null,
    date: '2025-09',
  },
  {
    slug: 'dna',
    key: 'DNA',
    tags: ['Python', 'Bioinformatics', 'Matplotlib', 'Tkinter', 'Data Analysis'],
    github: 'https://github.com/Exowz/DNA',
    demo: null,
    date: '2024-01',
  },
  {
    slug: 'mots-fleches',
    key: 'mots-fleches',
    tags: ['C', 'Algorithms', 'Console Application', 'Academic Project'],
    github: 'https://github.com/Exowz/mots-fleches',
    demo: null,
    date: '2024-05',
  },
  {
    slug: 'scraping',
    key: 'Scraping',
    tags: ['Python', 'Web Scraping', 'BeautifulSoup', 'Automation'],
    github: 'https://github.com/Exowz/Scraping',
    demo: null,
    date: '2024-03',
  },
  {
    slug: 'trip-hackathon',
    key: 'TripHackathon',
    tags: ['Hackathon', 'Team Project', 'Innovation', 'Travel Tech'],
    github: null,
    demo: null,
    date: '2024-06',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
