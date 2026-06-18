export interface CvContact {
  email: string;
  location: string;
  availability: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface CvExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  detail?: string;
}

export interface CvEducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  note?: string;
  detail?: string;
  /** Institution logo(s), rendered on a neutral chip so they survive dark mode. */
  logos?: string[];
  /** Credential ids shown as badges beside the entry. */
  badges?: string[];
}

export interface CvCredential {
  id: string;
  image: string;
  title: string;
  body: string;
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
  credentials: CvCredential[];
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
      id: 'purecontrol',
      company: 'Purecontrol',
      role: 'AI Engineer — Data Science (Intern)',
      period: 'Apr. 2026 — Sep. 2026',
      location: 'Rennes, France',
      highlights: [
        'Tuning and optimization of ML forecasting models on IoT time series, integrated into a production architecture.',
        'Anomaly-detection algorithm (water-leak) comparing actual vs predicted, with visual dashboard alerts.',
        'ETL pipelines on industrial data, integrated into production (PostgreSQL).',
      ],
      detail: `Purecontrol is a French GreenTech startup in Rennes that uses AI to cut the energy consumption of industrial sites. As a Data Science intern I worked on machine-learning forecasts over IoT sensor time series, an anomaly-detection algorithm for water leaks, and ETL pipelines feeding a production PostgreSQL database. It's where I learned the real gap between a model that runs once in a notebook and one that runs reliably in production. It confirmed data engineering as my direction.`,
    },
    {
      id: 'freelance',
      company: 'Freelance',
      role: 'Full-Stack Web Developer',
      period: 'Since Jul. 2025',
      location: 'Paris, France',
      highlights: [
        'Custom websites (Next.js, Node.js, SQL) and business automation via n8n.',
        'Deployment on Infomaniak VPS via Dokploy (European-sovereign approach).',
      ],
      detail: `Since July 2025 I've worked as an independent full-stack web developer, building custom websites (Next.js, Node.js, SQL) and business-automation workflows for clients, deployed on European infrastructure (an Infomaniak VPS via Dokploy). One public example is shiatsu-guyane.fr, a multilingual site for a practitioner. It keeps my product sense sharp: I own a project from design to deployment, which is exactly what lets me take a data model all the way to a usable application.`,
    },
    {
      id: 'body-iron',
      company: 'Body Iron Guyane',
      role: 'Sales Advisor — Sports Nutrition',
      period: 'Jul. — Sep. 2025',
      location: 'Rémire-Montjoly, FG',
      highlights: ['Sales-data analysis for KPI tracking and inventory optimization.'],
      detail: `Body Iron is a sports-nutrition shop in French Guiana, where I worked as a sales advisor over the summer of 2025. Beyond advising customers, I analysed sales data to track KPIs and optimise stock. It's a modest role, but it kept me close to the commercial reality behind the numbers and reinforced a habit I value in data work: always asking what a figure actually means for the person who has to make a decision with it.`,
    },
    {
      id: 'rem',
      company: 'REM Cutting Edge Nutrition Ltd',
      role: 'Manager — E-commerce & Operations',
      period: '2021 — 2022',
      location: 'Curepipe, Mauritius',
      highlights: ['Commercial operations, CRM and e-commerce channel development.'],
      detail: `REM Cutting Edge Nutrition is a nutrition retail and e-commerce company in Mauritius, which I managed for about two years (2021–2022) while helping my family. I ran day-to-day operations, the CRM, and the growth of the online sales channel. Taking that on so young taught me responsibility and decision-making under real constraints. It's the root of my product- and business-minded approach to data, and a big reason I'm comfortable owning things end to end.`,
    },
  ],
  education: [
    {
      id: 'msc-albert-mines',
      institution: 'Albert School × Mines de Paris - PSL',
      logos: ['/images/logos/mines-psl.png', '/images/logos/albert-school.png'],
      degree: 'MSc Data & AI for Finance — Admitted (Sep. 2026 start, work-study)',
      period: '2026 — 2028',
      detail: `This is the master's I start in September 2026, by work-study: an MSc in Data & AI for Finance delivered jointly by Mines de Paris - PSL, one of France's most prestigious engineering schools, and Albert School. It pairs a strong technical core (data engineering, machine learning, MLOps) with finance and business. I was admitted to three master's programmes and chose this one, both for the Mines name and because applying data and AI to finance is the direction I want.`,
      badges: ['grade-master'],
    },
    {
      id: 'bsc-ece',
      institution: 'ECE Paris',
      logos: ['/images/logos/ece.png'],
      degree: 'BSc in Computer Science — Data & AI specialization',
      period: '2024 — 2026',
      detail: `ECE Paris is a French general engineering school (grande école). I'm finishing its computer-science bachelor's with a Data & AI specialisation. The teaching is heavily project-based, and that's where my interest in computer science really clicked, after a more traditional start: building real applications rather than just following lectures. It gave me my foundations in Python, data and machine learning, and most of the projects in my portfolio grew out of it.`,
      badges: ['rncp'],
    },
    {
      id: 'datascientest',
      institution: 'DataScientest',
      degree: 'Python for Data Science Certification',
      period: '2024',
      detail: `DataScientest is a well-known French online training provider specialised in data. I completed its Python for Data Science certification alongside my degree, to consolidate the practical foundations: Python, data manipulation and the core libraries used in analysis and machine learning. It was a way to make sure my self-driven learning rested on solid, structured fundamentals rather than scattered tutorials.`,
      logos: ['/images/logos/liora.png'],
    },
    {
      id: 'prep-ece',
      institution: 'ECE Paris',
      logos: ['/images/logos/ece.png'],
      degree: 'Integrated Preparatory Cycle',
      period: '2023 — 2024',
      detail: `Before the bachelor's I did ECE Paris's integrated preparatory cycle, the two-year science foundation that precedes the engineering track, which I joined through an accelerated semester. It rebuilt the maths, physics and computer-science base I needed after a non-linear start. It's the stage where I resumed engineering studies in France and found my footing again, and it set up the bachelor's that followed.`,    },
    {
      id: 'cpge-pothier',
      institution: 'Lycée Pothier',
      logos: ['/images/logos/lycee-pothier.png'],
      degree: 'CPGE PCSI (intensive science prep)',
      period: '2020 — 2021',
      detail: `CPGE PCSI is France's intensive two-year class that prepares for the competitive engineering-school entrance exams, one of the most demanding tracks in the French system, with a physics, chemistry and engineering-science focus. I did my first year at Lycée Pothier in Orléans. It didn't go as planned and I didn't continue, but it gave me real work capacity and resilience, and it's an honest part of a path that later found its direction.`,
    },
    {
      id: 'bac-bourdonnais',
      institution: 'Lycée La Bourdonnais',
      logos: ['/images/logos/lycee-labourdonnais.png'],
      degree: 'Scientific Baccalaureate — Highest Honors',
      period: '2020',
      detail: `This is the French scientific high-school diploma (Baccalauréat), which I earned with highest honours (mention très bien) at Lycée La Bourdonnais, a French school in Mauritius, where I grew up. My specialisation was physics and chemistry. It marks where my path started, in a French education far from Paris, and the early scientific grounding that pointed me toward engineering and, eventually, data and AI.`,
      badges: ['baccalaureat'],
    },
  ],
  credentials: [
    {
      id: 'grade-master',
      image: '/images/credentials/grade-master.png',
      title: `State-conferred Master's grade`,
      body: `In France, a degree "conferring the grade of Master" is one the State officially recognises as equivalent to a national Master's (bac+5). The grade is granted and controlled by the French Ministry of Higher Education, after an evaluation of the programme's academic quality. For my MSc it's a guarantee that the diploma isn't just a private-school title: it meets a recognised national standard, valid in France and across the European higher-education area.`,
    },
    {
      id: 'rncp',
      image: '/images/credentials/rncp.webp',
      title: `RNCP level 6 (Bachelor's / bac+3)`,
      body: `RNCP is France's national register of professional certifications, maintained by the State. A registered title guarantees that a qualification matches defined, verified skills recognised across the job market. The levels run from 3 to 8; level 6 corresponds to the Bachelor's / licence tier (bac+3, EQF level 6). My ECE Paris BSc is registered at RNCP level 6, which means it is officially recognised at Bachelor level, with a competency framework employers can rely on.`,
    },
    {
      id: 'baccalaureat',
      image: '/images/credentials/baccalaureat.png',
      title: `State-certified Baccalauréat`,
      body: `The Baccalauréat is France's national secondary-school diploma, set and certified by the French Ministry of National Education. That certification guarantees a common national standard across every school that delivers it — including French schools abroad, such as Lycée La Bourdonnais in Mauritius, where I sat it. I earned it with highest honours (mention très bien), specialising in physics and chemistry.`,
    },
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
      id: 'purecontrol',
      company: 'Purecontrol',
      role: 'Ingénieur IA — Data Science (Stagiaire)',
      period: 'Avr. 2026 — Sept. 2026',
      location: 'Rennes, France',
      highlights: [
        'Optimisation et paramétrage de modèles ML de prévision sur séries temporelles IoT, avec intégration en architecture de production.',
        "Algorithme de détection d'anomalies (fuite d'eau) par comparaison réel/prédit, avec alertes visuelles sur tableau de bord.",
        'Pipelines ETL sur données industrielles, intégration en architecture de production (PostgreSQL).',
      ],
      detail: `Purecontrol est une startup GreenTech française, à Rennes, qui utilise l'IA pour réduire la consommation énergétique de sites industriels. Comme stagiaire Data Science, j'ai travaillé sur des prévisions par machine learning sur des séries temporelles de capteurs IoT, un algorithme de détection d'anomalies (fuites d'eau) et des pipelines ETL alimentant une base PostgreSQL en production. C'est là que j'ai mesuré l'écart entre un modèle qui tourne une fois dans un notebook et un modèle fiable en production. Ça a confirmé ma direction vers le data engineering.`,
    },
    {
      id: 'freelance',
      company: 'Indépendant',
      role: 'Développeur Web Full-Stack',
      period: 'Depuis juil. 2025',
      location: 'Paris, France',
      highlights: [
        'Sites web sur mesure (Next.js, Node.js, SQL) et automatisation métier via n8n.',
        'Déploiement sur VPS Infomaniak via Dokploy (approche souveraine européenne).',
      ],
      detail: `Depuis juillet 2025, je travaille comme développeur web full-stack indépendant : sites sur mesure (Next.js, Node.js, SQL) et automatisations métier pour des clients, déployés sur une infrastructure européenne (VPS Infomaniak via Dokploy). Un exemple public est shiatsu-guyane.fr, un site multilingue pour une praticienne. Ça entretient mon sens produit : je gère un projet de la conception au déploiement, ce qui me permet justement d'amener un modèle data jusqu'à une application utilisable.`,
    },
    {
      id: 'body-iron',
      company: 'Body Iron Guyane',
      role: 'Conseiller de Vente — Nutrition Sportive',
      period: 'Juil. — Sept. 2025',
      location: 'Rémire-Montjoly, GF',
      highlights: ['Analyse des données de vente pour suivi des KPI et optimisation des stocks.'],
      detail: `Body Iron est un magasin de nutrition sportive en Guyane, où j'ai été conseiller de vente durant l'été 2025. Au-delà du conseil client, j'analysais les données de vente pour suivre les KPI et optimiser les stocks. C'est un poste modeste, mais il m'a gardé au contact de la réalité commerciale derrière les chiffres et a renforcé un réflexe qui compte dans mon travail data : toujours me demander ce qu'un chiffre veut vraiment dire pour celui qui doit décider avec.`,
    },
    {
      id: 'rem',
      company: 'REM Cutting Edge Nutrition Ltd',
      role: 'Gérant — E-commerce & Opérations',
      period: '2021 — 2022',
      location: 'Curepipe, Maurice',
      highlights: ['Gestion des opérations commerciales, CRM et développement du canal e-commerce.'],
      detail: `REM Cutting Edge Nutrition est une entreprise de nutrition et d'e-commerce à l'île Maurice, que j'ai gérée pendant environ deux ans (2021–2022) en aidant ma famille. J'y pilotais les opérations quotidiennes, le CRM et le développement du canal de vente en ligne. Prendre ça en charge aussi jeune m'a appris la responsabilité et la décision sous contraintes réelles. C'est la racine de mon approche produit et métier de la donnée, et une grande raison pour laquelle je suis à l'aise pour gérer les choses de bout en bout.`,
    },
  ],
  education: [
    {
      id: 'msc-albert-mines',
      institution: 'Mines de Paris - PSL × Albert School',
      logos: ['/images/logos/mines-psl.png', '/images/logos/albert-school.png'],
      degree: 'MSc Data & AI for Finance — Admis (rentrée sept. 2026, en alternance)',
      period: '2026 — 2028',
      detail: `C'est le master que je commence en septembre 2026, en alternance : un MSc Data & AI for Finance délivré conjointement par les Mines de Paris - PSL, l'une des plus prestigieuses écoles d'ingénieurs françaises, et l'Albert School. Il associe un socle technique solide (data engineering, machine learning, MLOps) à la finance et au business. J'ai été admis dans trois masters et j'ai choisi celui-ci, pour le nom des Mines et parce qu'appliquer la data et l'IA à la finance est la direction que je veux.`,
      badges: ['grade-master'],
    },
    {
      id: 'bsc-ece',
      institution: 'ECE Paris',
      logos: ['/images/logos/ece.png'],
      degree: 'Bachelor en Informatique — Spécialisation Data & IA',
      period: '2024 — 2026',
      note: 'Cycle classique axé Data et IA',
      detail: `ECE Paris est une grande école d'ingénieurs généraliste. J'y termine mon Bachelor en informatique, spécialisation Data & IA. L'enseignement est très orienté projets, et c'est là que mon intérêt pour l'informatique a vraiment pris, après un début plus classique : construire de vraies applications plutôt que seulement suivre des cours. Ça m'a donné mes bases en Python, data et machine learning, et la plupart des projets de mon portfolio en sont nés.`,
      badges: ['rncp'],
    },
    {
      id: 'datascientest',
      institution: 'DataScientest',
      degree: 'Certification Python pour la Data Science',
      period: '2024',
      detail: `DataScientest est un organisme de formation français en ligne, reconnu, spécialisé dans la data. J'ai validé sa certification Python pour la Data Science en parallèle de mes études, pour consolider les bases pratiques : Python, manipulation de données et les bibliothèques clés de l'analyse et du machine learning. C'était une façon de m'assurer que mon apprentissage autonome reposait sur des fondamentaux solides et structurés, et non sur des tutoriels épars.`,
      logos: ['/images/logos/liora.png'],
    },
    {
      id: 'prep-ece',
      institution: 'ECE Paris',
      logos: ['/images/logos/ece.png'],
      degree: 'Cycle Préparatoire Intégré',
      period: '2023 — 2024',
      detail: `Avant le Bachelor, j'ai suivi le cycle préparatoire intégré de l'ECE Paris, les deux années de socle scientifique qui précèdent le cycle ingénieur, que j'ai rejoint via un semestre accéléré. Il m'a permis de reconstruire les bases en maths, physique et informatique dont j'avais besoin après un parcours non linéaire. C'est l'étape où j'ai repris mes études d'ingénieur en France et retrouvé mon équilibre, et qui a préparé le Bachelor qui a suivi.`,    },
    {
      id: 'cpge-pothier',
      institution: 'Lycée Pothier',
      logos: ['/images/logos/lycee-pothier.png'],
      degree: 'CPGE PCSI',
      period: '2020 — 2021',
      note: "Physique, Chimie et Sciences de l'Ingénieur",
      detail: `La CPGE PCSI est la classe préparatoire intensive de deux ans aux concours des écoles d'ingénieurs, l'une des voies les plus exigeantes du système français, à dominante physique, chimie et sciences de l'ingénieur. J'ai fait ma première année au Lycée Pothier, à Orléans. Ça ne s'est pas passé comme prévu et je n'ai pas poursuivi, mais ça m'a donné une vraie capacité de travail et de la résilience, et c'est une partie assumée d'un parcours qui a ensuite trouvé sa direction.`,
    },
    {
      id: 'bac-bourdonnais',
      institution: 'Lycée La Bourdonnais',
      logos: ['/images/logos/lycee-labourdonnais.png'],
      degree: 'Baccalauréat Scientifique',
      period: '2020',
      note: 'Mention Très Bien',
      detail: `C'est le Baccalauréat scientifique français, que j'ai obtenu avec mention très bien au Lycée La Bourdonnais, un établissement français à l'île Maurice, où j'ai grandi. Ma spécialité était physique-chimie. Il marque le point de départ de mon parcours, dans une scolarité française loin de Paris, et la première formation scientifique qui m'a orienté vers l'ingénierie puis, plus tard, vers la data et l'IA.`,
      badges: ['baccalaureat'],
    },
  ],
  credentials: [
    {
      id: 'grade-master',
      image: '/images/credentials/grade-master.png',
      title: `Diplôme conférant le grade de Master`,
      body: `En France, un diplôme « conférant le grade de Master » est officiellement reconnu par l'État comme équivalent à un Master national (bac+5). Ce grade est accordé et contrôlé par le Ministère de l'Enseignement supérieur, après évaluation de la qualité académique du programme. Pour mon MSc, c'est la garantie que le diplôme n'est pas qu'un titre d'école privée : il répond à un standard national reconnu, valable en France et dans l'espace européen de l'enseignement supérieur.`,
    },
    {
      id: 'rncp',
      image: '/images/credentials/rncp.webp',
      title: `RNCP niveau 6 (Licence / bac+3)`,
      body: `Le RNCP est le Répertoire national des certifications professionnelles, tenu par l'État français. Un titre enregistré garantit qu'une qualification correspond à des compétences définies et vérifiées, reconnues sur le marché du travail. Les niveaux vont de 3 à 8 ; le niveau 6 correspond à la Licence / au grade de licence (bac+3, niveau 6 du cadre européen). Mon BSc de l'ECE Paris est enregistré au niveau RNCP 6, ce qui signifie qu'il est officiellement reconnu au niveau Licence, avec un référentiel de compétences fiable pour les employeurs.`,
    },
    {
      id: 'baccalaureat',
      image: '/images/credentials/baccalaureat.png',
      title: `Baccalauréat certifié par l'État`,
      body: `Le Baccalauréat est le diplôme national français de fin d'études secondaires, défini et certifié par le Ministère de l'Éducation nationale. Cette certification garantit un standard national commun à tous les établissements qui le délivrent — y compris les écoles françaises à l'étranger, comme le Lycée La Bourdonnais à l'île Maurice, où je l'ai passé. Je l'ai obtenu avec mention très bien, spécialité physique-chimie.`,
    },
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
