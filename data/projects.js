export const projects = [
  {
    slug: 'aura-ai',
    title: 'AURA AI',
    expandedTitle:
      'Adaptive Understanding, Retrieval, and Automated Summarization for Scientific Research Publications Using Natural Language Processing',
    subtitle: 'Scientific document processing and question-answering system',
    summary:
      'AURA AI helps users retrieve, understand, and summarize information from scientific research publications.',
    problem:
      'Research documents are long, dense, and difficult to search manually when users need grounded answers across sections and multiple papers.',
    solution:
      'The system structures documents, combines lexical and semantic retrieval, reranks candidate evidence, and produces adaptive responses with verification-oriented steps.',
    role:
      'Backend development, document processing workflow, retrieval logic, database design, and AI integration.',
    client: 'Pasig Knowledge Center',
    status: 'In development',
    year: '2026',
    buildType: 'collaborative',
    buildTypeLabel: 'Collaborative Project Build',
    projectCategory: 'ai-system',
    projectCategoryLabel: 'AI System',
    categories: ['AI', 'Full Stack', 'Backend', 'Data'],
    technologies: ['Python', 'NLP', 'LLM Integration', 'BM25', 'BGE-M3', 'FAISS', 'MySQL'],
    image: '/assets/AURA.png',
    repositoryUrl: 'https://github.com/Sese-Brazil/AURA.git',
    liveUrl: '',
    featured: true,
    architecture: [
      'User Interface',
      'API',
      'Document Validation and Extraction',
      'NLP Processing',
      'Hierarchical Parsing',
      'Hybrid Retrieval',
      'Reranking',
      'Answerability',
      'Summarization',
      'Claim Verification',
      'Adaptive Response'
    ],
    xrayNodes: [
      { id: 'ui', label: 'User Interface' },
      { id: 'api', label: 'API' },
      { id: 'extract', label: 'Validation + Extraction' },
      { id: 'parse', label: 'NLP + Hierarchical Parsing' },
      { id: 'retrieval', label: 'BM25 + BGE-M3 + FAISS' },
      { id: 'fusion', label: 'RRF + Reranker' },
      { id: 'answer', label: 'Answerability + Summary' },
      { id: 'verify', label: 'Claim Verification' }
    ],
    features: [
      'Scientific document validation',
      'Text extraction',
      'Structure-aware document parsing',
      'Section-aware retrieval',
      'Hierarchical chunking',
      'BM25 sparse retrieval',
      'BGE-M3 dense embeddings',
      'FAISS vector indexing',
      'Reciprocal rank fusion',
      'Reranking',
      'Answerability detection',
      'Adaptive explanation levels',
      'Summarization',
      'Claim-level verification'
    ],
    inDevelopment: [
      'Multi-document balancing',
      'Paper comparison',
      'Related research exploration',
      'Research gap assistance',
      'Text-similarity checking'
    ],
    decisions: [
      'Use hybrid retrieval so exact scientific terms and semantic matches can both contribute evidence.',
      'Preserve section context to avoid treating all document chunks as equal.',
      'Add answerability checks before generating responses so the system can avoid unsupported answers.'
    ],
    challenges: [
      'Processing long scientific documents without losing section-level meaning.',
      'Balancing sparse and dense retrieval signals.',
      'Keeping generated responses tied to retrieved evidence.'
    ],
    tradeoffs: [
      'Hybrid retrieval adds complexity but improves retrieval coverage.',
      'Hierarchical parsing requires more preprocessing but gives cleaner context for answer generation.'
    ],
    limitations: [
      'Evaluation metrics are not yet published.',
      'Some advanced research assistance features are still in development.'
    ],
    screenshots: [{ src: '/assets/AURA.png', label: 'AURA AI interface' }],
    metrics: {},
    metadata: {
      type: 'AI document system',
      primaryLanguage: 'Python',
      database: 'MySQL',
      challenge: 'Grounded retrieval over scientific documents'
    }
  },
  {
    slug: 'bonbon',
    title: 'BonBon Online Cake and Pastry Shop',
    expandedTitle: 'Laravel E-commerce System for Cake and Pastry Ordering',
    subtitle: 'E-commerce and inventory management system',
    summary:
      'A Laravel web system for ordering cakes and pastries, tracking inventory, and supporting admin workflows.',
    problem:
      'Small shops need a structured way to manage orders, product listings, and inventory without scattering work across manual records.',
    solution:
      'BonBon centralizes product browsing, ordering, cart workflows, inventory tracking, and admin management in one Laravel application.',
    role: 'Laravel development, database structure, admin workflows, and e-commerce feature implementation.',
    client: 'Academic project',
    status: 'Completed academic system',
    year: '',
    buildType: 'collaborative',
    buildTypeLabel: 'Collaborative Project Build',
    projectCategory: 'e-commerce',
    projectCategoryLabel: 'E-commerce',
    categories: ['Full Stack', 'Backend', 'Data'],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'XAMPP'],
    image: '/assets/BonBon.png',
    repositoryUrl: 'https://github.com/ashooo/bonbon-ecom.git',
    liveUrl: '',
    featured: true,
    architecture: ['Customer UI', 'Laravel Controllers', 'Order Workflow', 'Inventory Module', 'MySQL Database', 'Admin Dashboard'],
    xrayNodes: [
      { id: 'shop', label: 'Storefront' },
      { id: 'cart', label: 'Cart + Checkout' },
      { id: 'orders', label: 'Order Management' },
      { id: 'inventory', label: 'Inventory' },
      { id: 'admin', label: 'Admin Dashboard' },
      { id: 'db', label: 'MySQL' }
    ],
    features: ['Authentication', 'Product catalog', 'Cart and checkout', 'Inventory tracking', 'Admin dashboard', 'Order management'],
    inDevelopment: [],
    decisions: [
      'Use Laravel conventions to keep routing, controller logic, and database access maintainable.',
      'Separate customer and admin workflows to protect management actions.'
    ],
    challenges: ['Designing role-based e-commerce workflows.', 'Keeping inventory and order data consistent.'],
    tradeoffs: ['Server-rendered Laravel flows are practical for a small shop system and easier to maintain in an academic setting.'],
    limitations: ['No public live demo is currently available.'],
    screenshots: [{ src: '/assets/BonBon.png', label: 'BonBon storefront' }],
    metrics: {},
    metadata: {
      type: 'E-commerce system',
      primaryLanguage: 'PHP',
      database: 'MySQL',
      challenge: 'Order and inventory workflow design'
    }
  },
  {
    slug: 'alumni-tracer',
    title: 'Alumni Tracer and Employability System',
    expandedTitle: 'Node.js and MariaDB Alumni Tracking Platform',
    subtitle: 'Graduate tracking and reporting platform',
    summary:
      'A Node.js and MariaDB platform for recording alumni profiles, employability information, and graduate outcome reports.',
    problem:
      'Academic institutions need organized alumni and employability records to understand graduate outcomes and generate usable reports.',
    solution:
      'The system organizes alumni data, employment information, import workflows, role-based access, and report generation.',
    role: 'Backend routes, database logic, reporting workflows, and system integration.',
    client: 'Academic project',
    status: 'Completed academic system',
    year: '',
    buildType: 'collaborative',
    buildTypeLabel: 'Collaborative Project Build',
    projectCategory: 'web-data-system',
    projectCategoryLabel: 'Web / Data System',
    categories: ['Full Stack', 'Backend', 'Data'],
    technologies: ['Node.js', 'Express', 'MariaDB', 'SQL', 'Reports'],
    image: '',
    repositoryUrl: 'https://github.com/ashooo/alumni-employability.git',
    liveUrl: '',
    featured: true,
    architecture: ['Admin UI', 'Express API', 'Import Validation', 'Alumni Records', 'MariaDB', 'Reports'],
    xrayNodes: [
      { id: 'admin', label: 'Admin UI' },
      { id: 'api', label: 'Express API' },
      { id: 'import', label: 'Data Import' },
      { id: 'records', label: 'Alumni Records' },
      { id: 'reports', label: 'Reports' },
      { id: 'db', label: 'MariaDB' }
    ],
    features: ['Authentication', 'Alumni profiles', 'Employment tracking', 'Data import', 'Admin dashboard', 'Reports'],
    inDevelopment: [],
    decisions: [
      'Use a relational schema for structured alumni and employment data.',
      'Keep reporting tied to validated records so output remains traceable.'
    ],
    challenges: ['Importing and validating structured alumni data.', 'Producing useful downloadable reports.'],
    tradeoffs: ['Relational modeling requires careful schema design but improves reporting clarity.'],
    limitations: ['Project screenshots are not yet available in the repository.'],
    screenshots: [],
    metrics: {},
    metadata: {
      type: 'Data management system',
      primaryLanguage: 'JavaScript',
      database: 'MariaDB',
      challenge: 'Structured records and reporting'
    }
  },
  {
    slug: 'ucart',
    title: 'UCART: Smart E-commerce Aggregator',
    expandedTitle: 'AI Recommendation System for Product Discovery',
    subtitle: 'Product comparison and recommendation workflow',
    summary:
      'An AI-oriented product discovery system that helps users compare options and find relevant items faster.',
    problem:
      'Users often spend too much time comparing products across sources before deciding which options fit their needs.',
    solution:
      'UCART aggregates product options and uses recommendation workflows to support more focused product discovery.',
    role: 'Recommendation workflow, product comparison logic, interface structure, and system testing.',
    client: 'Academic project',
    status: 'Completed academic system',
    year: '',
    buildType: 'collaborative',
    buildTypeLabel: 'Collaborative Project Build',
    projectCategory: 'ai-system',
    projectCategoryLabel: 'AI System',
    categories: ['AI', 'Full Stack', 'Data'],
    technologies: ['Python', 'PHP', 'Recommendations', 'Web', 'MySQL'],
    image: '/assets/UCART.png',
    repositoryUrl: 'https://github.com/ValenteGerald/ia-smart-ecommerce-aggregator.git',
    liveUrl: '',
    featured: true,
    architecture: ['Search UI', 'Product Aggregation', 'Comparison Logic', 'Recommendation Layer', 'Storage'],
    xrayNodes: [
      { id: 'search', label: 'Search UI' },
      { id: 'aggregate', label: 'Aggregation' },
      { id: 'compare', label: 'Comparison' },
      { id: 'recommend', label: 'Recommendation' },
      { id: 'db', label: 'Storage' }
    ],
    features: ['Product aggregation', 'Recommendations', 'Comparison workflow', 'Search', 'User-focused discovery'],
    inDevelopment: [],
    decisions: ['Keep recommendations tied to product signals rather than decorative AI claims.'],
    challenges: ['Designing comparison workflows that stay useful and understandable.'],
    tradeoffs: ['Aggregation simplifies discovery but depends on clean product data.'],
    limitations: ['No public live demo is currently available.'],
    screenshots: [{ src: '/assets/UCART.png', label: 'UCART interface' }],
    metrics: {},
    metadata: {
      type: 'Recommendation system',
      primaryLanguage: 'Python / PHP',
      database: 'MySQL',
      challenge: 'Product discovery and comparison'
    }
  },
  {
    slug: 'java-mobile-applications',
    title: 'Java Mobile Applications',
    expandedTitle: 'Android Studio APK and MIT App Inventor Mobile Projects',
    subtitle: 'Academic mobile app collection',
    summary:
      'A collection of mobile applications built with Android Studio APK workflows and MIT App Inventor using Java-based logic.',
    problem:
      'Course projects required practical mobile applications that demonstrate interface design, logic handling, and interactive user workflows.',
    solution:
      'The apps implement mobile screens, utility flows, learning interactions, and input-driven behavior across multiple concepts.',
    role: 'Designed app screens, implemented Java-based logic, tested APK behavior, and prepared mobile project outputs.',
    client: 'Academic project',
    status: 'Completed academic projects',
    year: '',
    buildType: 'solo',
    buildTypeLabel: 'Solo Project Build',
    projectCategory: 'mobile-application',
    projectCategoryLabel: 'Mobile Application',
    categories: ['Full Stack'],
    technologies: ['Java', 'Android Studio', 'APK', 'MIT App Inventor'],
    image: '/assets/Java.png',
    repositoryUrl: '',
    liveUrl: '',
    featured: false,
    architecture: ['Mobile UI', 'Input Logic', 'Local Interaction', 'APK Output'],
    xrayNodes: [
      { id: 'screen', label: 'Mobile Screens' },
      { id: 'logic', label: 'Java Logic' },
      { id: 'interaction', label: 'Interaction' },
      { id: 'apk', label: 'APK Output' }
    ],
    features: ['Mobile screens', 'Interactive controls', 'Input validation', 'Java-based logic', 'APK development'],
    inDevelopment: [],
    decisions: ['Use project-appropriate mobile tooling for fast academic app delivery.'],
    challenges: ['Building clear mobile interactions with constrained project tooling.'],
    tradeoffs: ['MIT App Inventor supports fast prototyping while Android Studio gives more direct APK development control.'],
    limitations: ['Repository link is not currently available.'],
    screenshots: [
      { src: '/assets/OroPeso.jpg', label: 'OroPeso' },
      { src: '/assets/OroPeso1.jpg', label: 'OroPeso' },
      { src: '/assets/WeightRight.jpg', label: 'Weight Right' },
      { src: '/assets/WeightRight1.jpg', label: 'Weight Right' },
      { src: '/assets/WeightRight2.jpg', label: 'Weight Right' },
      { src: '/assets/ChineseHoroscope.jpg', label: 'Chinese Horoscope' },
      { src: '/assets/ChineseHoroscope1.jpg', label: 'Chinese Horoscope' },
      { src: '/assets/PhrasePop.jpg', label: 'Phrase Pop' },
      { src: '/assets/PhrasePop1.jpg', label: 'Phrase Pop' }
    ],
    metrics: {},
    metadata: {
      type: 'Mobile applications',
      primaryLanguage: 'Java',
      database: 'Local app data',
      challenge: 'Mobile interaction design'
    }
  }
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export const projectBuildFilters = [
  { id: 'all', label: 'All Builds' },
  { id: 'collaborative', label: 'Collaborative Project Builds' },
  { id: 'solo', label: 'Solo Project Builds' }
];

export const projectCategoryFilters = [
  { id: 'all', label: 'All Categories' },
  { id: 'mobile-application', label: 'Mobile Application' },
  { id: 'e-commerce', label: 'E-commerce' },
  { id: 'ai-system', label: 'AI System' },
  { id: 'web-data-system', label: 'Web / Data System' }
];
