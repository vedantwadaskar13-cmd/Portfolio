export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI/ML' | 'Full-Stack' | 'Data & BI' | 'Robotics & CAD';
  period?: string;
  image: string;
  techStack: string[];
  summary: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Internship' | 'Project';
  description: string[];
  skillsUsed: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: { name: string; level: 'Expert' | 'Advanced' | 'Intermediate'; tags: string[] }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  field: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export const RESUME_DATA = {
  personal: {
    name: 'Vedant Wadaskar',
    title: 'AI/ML Engineer | Machine Learning & Data Analytics',
    tagline: 'Mechanical Engineering Student (2027 Passout) | Full-Stack AI & Data Systems Developer',
    location: 'Pune, Maharashtra, India',
    phone: '+91 7057174952',
    email: 'vedantwadaskar13@gmail.com',
    linkedin: 'https://linkedin.com/in/vedantwadaskar',
    github: 'https://github.com/vedantwadaskar13-cmd',
    summary: 'AI/ML Engineer with hands-on experience building machine learning models, chatbots, and full-stack data-driven applications. Skilled in Python, exploratory data analysis, and Generative AI, with a strong foundation in classification, NLP, and recommendation systems. Quick to learn new tools and adapt to emerging technologies, with a track record of translating data into actionable insights and functional AI-powered solutions. Seeking an entry-level AI/ML Engineer or Machine Learning Engineer role to apply technical skills and deliver measurable impact.',
    academicFocus: 'Bachelor of Engineering (B.E.) in Mechanical Engineering (2023-2027) combining CAD Engineering (SolidWorks, ANSYS, CATIA) with advanced AI/ML algorithms and data analytics (SQL, Python, Power BI).',
  },
  skills: [
    {
      category: 'ML & Artificial Intelligence',
      iconName: 'Brain',
      skills: [
        { name: 'Machine Learning', level: 'Advanced', tags: ['Scikit-Learn', 'Classification', 'Regression'] },
        { name: 'Generative AI', level: 'Advanced', tags: ['Mistral LLM', 'LangChain', 'Prompting'] },
        { name: 'Chatbot Development', level: 'Advanced', tags: ['Dialogflow', 'FastAPI Webhooks', 'NLP'] },
        { name: 'Recommendation Systems', level: 'Intermediate', tags: ['Destination Clustering', 'Ranking'] },
        { name: 'TensorFlow', level: 'Intermediate', tags: ['Neural Nets', 'Deep Learning'] },
      ]
    },
    {
      category: 'Data Analytics & Business Intelligence',
      iconName: 'BarChart3',
      skills: [
        { name: 'Python Data Stack', level: 'Expert', tags: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
        { name: 'SQL & Databases', level: 'Advanced', tags: ['MySQL', 'SQLite', 'Stored Procedures', 'Queries'] },
        { name: 'Power BI & Excel', level: 'Advanced', tags: ['DAX', 'Dashboards', 'Google Sheets', 'Pivot Tables'] },
        { name: 'Exploratory Data Analysis (EDA)', level: 'Expert', tags: ['Data Cleaning', 'Insight Extraction'] },
      ]
    },
    {
      category: 'Mechanical Engineering & CAD',
      iconName: 'Cpu',
      skills: [
        { name: 'SolidWorks', level: 'Advanced', tags: ['3D Modeling', 'Assembly', 'Blueprint CAD'] },
        { name: 'ANSYS', level: 'Intermediate', tags: ['FEA Simulation', 'Thermal & Stress Analysis'] },
        { name: 'CATIA', level: 'Intermediate', tags: ['Surface Design', 'Part Modeling'] },
        { name: 'Robotics & Automation', level: 'Advanced', tags: ['Autonomous Field Robotics', 'Agricultural Bots'] },
      ]
    },
    {
      category: 'Languages & Core Technologies',
      iconName: 'Code',
      skills: [
        { name: 'Python', level: 'Expert', tags: ['FastAPI', 'Data Science', 'Automation'] },
        { name: 'C++', level: 'Advanced', tags: ['Algorithms', 'Data Structures'] },
        { name: 'SQL', level: 'Advanced', tags: ['Relational Schemas', 'Queries'] },
        { name: 'Full-Stack Web', level: 'Advanced', tags: ['React', 'Node.js', 'Firebase', 'Leaflet'] },
      ]
    },
    {
      category: 'Frameworks, DBs & Tools',
      iconName: 'Wrench',
      skills: [
        { name: 'Scikit-Learn & TensorFlow', level: 'Advanced', tags: ['Model Evaluation', 'Training'] },
        { name: 'FastAPI & Node.js', level: 'Advanced', tags: ['REST APIs', 'Async Webhooks'] },
        { name: 'Firebase & MySQL & SQLite', level: 'Advanced', tags: ['Auth', 'Databases'] },
        { name: 'Jupyter & GitHub', level: 'Expert', tags: ['Version Control', 'Notebook Analysis'] },
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: 'safar-ai',
      title: 'Safar — AI-Powered Travel Planning Platform',
      subtitle: 'Multi-Tool LLM Agent, Route Sequencing & Personalization Engine',
      category: 'AI/ML',
      image: '/assets/images/safar.jpg',
      techStack: ['React', 'Node.js', 'FastAPI', 'LangChain', 'Mistral AI', 'Firebase', 'SQLite', 'Leaflet'],
      summary: 'Full-stack AI trip-planning platform using LangChain & Mistral LLM to match, rank, and cluster travel destinations into personalized multi-city itineraries.',
      highlights: [
        'Built a full-stack travel planning platform with a React frontend, Node.js server, and Python/FastAPI backend, using Firebase Authentication for secure user login and SQLite for persistent trip storage.',
        'Designed an AI trip-planning agent using LangChain with a Mistral LLM that matches, ranks, and clusters destinations by user preferences and location to generate personalized itineraries.',
        'Implemented a multi-tool agent pipeline (place matching, ranking, route generation, and plan creation) with OpenStreetMap based routing to sequence multi-city trip stops.',
        'Added a budget estimator, user profile and trip history tracking, interactive map visualization, and one-click itinerary export to PDF.'
      ],
      githubUrl: 'https://github.com/vedantwadaskar13-cmd',
      liveUrl: '#',
      featured: true,
    },
    {
      id: 'vira-chatbot',
      title: 'Vira — Food Eatery Chatbot',
      subtitle: 'Conversational Ordering Assistant with Stored Procedures',
      category: 'AI/ML',
      image: '/assets/images/vira.jpg',
      techStack: ['Python', 'FastAPI', 'Dialogflow', 'MySQL'],
      summary: 'Conversational AI order assistant for food eateries leveraging Dialogflow NLU and FastAPI webhooks connected to real-time MySQL database stored procedures.',
      highlights: [
        'Developed an AI-powered conversational ordering assistant for a food eatery, using Dialogflow for natural language understanding and a FastAPI webhook to handle intent fulfillment.',
        'Implemented core ordering workflows — add to order, remove from order, complete order, and track order status — driven entirely through natural language conversation.',
        'Integrated a MySQL database with stored procedures to persist order items, compute order totals, and track order status in real time.',
        'Maintained session-based in-progress orders to support multi-turn conversations, allowing users to build up an order across multiple messages.'
      ],
      githubUrl: 'https://github.com/vedantwadaskar13-cmd',
      liveUrl: '#',
      featured: true,
    },
    {
      id: 'agri-bot-robotics',
      title: 'Agricultural Bot — Autonomous Field Robotics',
      subtitle: 'Robotics Engineering & Farming Automation Blueprint',
      category: 'Robotics & CAD',
      image: '/assets/images/robotics.jpg',
      techStack: ['SolidWorks', 'ANSYS', 'CATIA', 'Autonomous Robotics', 'CAD Modeling'],
      summary: 'Mini-internship project at PVG Robotics Club designing agricultural robotics, analyzing field mechanics, and modeling CAD components for automated farming.',
      highlights: [
        'Completed a Mini-Internship Program on an Agricultural Bot, applying robotics and automation principles to farming use cases.',
        'Explored the intersection of robotics and agriculture, researching automation techniques to improve farming efficiency.',
        'Investigated technical challenges in autonomous field robotics and proposed innovative automation approaches using SolidWorks & ANSYS.'
      ],
      githubUrl: 'https://github.com/vedantwadaskar13-cmd',
      liveUrl: '#',
      featured: true,
    }
  ] as ProjectItem[],

  experience: [
    {
      id: 'exp-shamgar',
      role: 'AI/ML Engineer',
      company: 'Shamgar Software Solutions',
      location: 'Vishakhapatnam, India',
      period: 'Oct 2025 – Present',
      type: 'Full-time',
      description: [
        'Collaborated on AI/ML projects at a software solutions company specializing in artificial intelligence and machine learning, contributing to data analysis and model development workflows.',
        'Built and evaluated machine learning models to support data-driven decision-making, applying algorithms across structured datasets.',
        'Partnered with the engineering team to translate business requirements into working ML solutions.'
      ],
      skillsUsed: ['Python', 'Machine Learning', 'Data Analysis', 'Model Evaluation', 'Scikit-Learn', 'Feature Engineering']
    },
    {
      id: 'exp-pvg-robotics',
      role: 'Project Intern',
      company: "PVG's Robotics Club",
      location: 'Pune, India',
      period: 'Mar 2025 – Apr 2025',
      type: 'Internship',
      description: [
        'Completed a Mini-Internship Program on an Agricultural Bot, applying robotics and automation principles to farming use cases.',
        'Explored the intersection of robotics and agriculture, researching automation techniques to improve farming efficiency.',
        'Investigated technical challenges in autonomous field robotics and proposed innovative automation approaches.'
      ],
      skillsUsed: ['Robotics', 'SolidWorks', 'ANSYS', 'CATIA', 'Autonomous Systems', 'Automation Design']
    }
  ] as ExperienceItem[],

  education: [
    {
      id: 'edu-pvg',
      degree: 'Bachelor of Engineering (B.E.)',
      institution: "Pune Vidyarthi Griha's College of Engineering and Technology",
      location: 'Pune, India',
      period: 'Aug 2023 – Jun 2027',
      field: 'Mechanical Engineering (Combining Engineering Mechanics & AI/ML Data Analytics)'
    },
    {
      id: 'edu-hsc',
      degree: 'Higher Secondary Education',
      institution: 'New English High School & Junior College',
      location: 'Akola, India',
      period: 'Jul 2021 – May 2023',
      field: 'Science & Physics/Mathematics Stream'
    }
  ] as EducationItem[],

  certifications: [
    {
      id: 'cert-ibm',
      title: 'Machine Learning with Python',
      issuer: 'IBM',
      date: 'Verified Certificate',
    },
    {
      id: 'cert-tata',
      title: 'GenAI Powered Data Analytics',
      issuer: 'Tata (Forage)',
      date: 'Verified Simulation Certificate',
    }
  ] as CertificationItem[]
};
