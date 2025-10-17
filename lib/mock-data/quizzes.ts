export interface Quiz {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  duration: number; // in minutes
  points: number;
  questions: number;
  category: string;
  status: 'available' | 'in-progress' | 'completed' | 'locked';
  attempts?: number;
  bestScore?: number;
  lastAttempt?: string;
  tags: string[];
  passingScore: number; // percentage needed to pass
}

export interface QuizzesByStatus {
  available: Quiz[];
  'in-progress': Quiz[];
  completed: Quiz[];
  locked: Quiz[];
}

export const mockQuizzes: Quiz[] = [
  // Available quizzes
  {
    id: 1,
    title: 'HTML & CSS Fundamentals Quiz',
    description:
      'Test your knowledge of HTML tags, CSS selectors, and basic web styling concepts.',
    difficulty: 'Easy',
    duration: 15,
    points: 100,
    questions: 10,
    category: 'Web Development',
    status: 'available',
    tags: ['HTML', 'CSS', 'Basics'],
    passingScore: 70,
  },
  {
    id: 2,
    title: 'JavaScript Basics Assessment',
    description:
      'Evaluate your understanding of JavaScript variables, functions, and control structures.',
    difficulty: 'Easy',
    duration: 20,
    points: 150,
    questions: 15,
    category: 'Programming',
    status: 'available',
    tags: ['JavaScript', 'Programming', 'Fundamentals'],
    passingScore: 70,
  },
  {
    id: 3,
    title: 'Python Data Types & Functions',
    description:
      'Quiz covering Python data types, functions, and basic object-oriented concepts.',
    difficulty: 'Medium',
    duration: 25,
    points: 200,
    questions: 20,
    category: 'Programming',
    status: 'available',
    tags: ['Python', 'Data Types', 'Functions'],
    passingScore: 75,
  },
  {
    id: 4,
    title: 'Database Design Principles',
    description:
      'Test your knowledge of database normalization, relationships, and SQL queries.',
    difficulty: 'Medium',
    duration: 30,
    points: 250,
    questions: 18,
    category: 'Database',
    status: 'available',
    tags: ['Database', 'SQL', 'Design'],
    passingScore: 75,
  },
  {
    id: 5,
    title: 'React Components & Props',
    description:
      'Advanced quiz on React components, props, state management, and hooks.',
    difficulty: 'Hard',
    duration: 35,
    points: 300,
    questions: 25,
    category: 'Frontend',
    status: 'available',
    tags: ['React', 'Components', 'Props', 'Hooks'],
    passingScore: 80,
  },
  {
    id: 6,
    title: 'API Design & REST Principles',
    description:
      'Comprehensive quiz on RESTful API design, HTTP methods, and best practices.',
    difficulty: 'Hard',
    duration: 40,
    points: 350,
    questions: 22,
    category: 'Backend',
    status: 'available',
    tags: ['API', 'REST', 'HTTP', 'Backend'],
    passingScore: 80,
  },

  // In-progress quizzes
  {
    id: 7,
    title: 'Git Version Control Quiz',
    description:
      'Test your understanding of Git commands, branching, and collaborative workflows.',
    difficulty: 'Medium',
    duration: 20,
    points: 180,
    questions: 12,
    category: 'Tools',
    status: 'in-progress',
    attempts: 1,
    tags: ['Git', 'Version Control', 'Collaboration'],
    passingScore: 75,
    lastAttempt: '2025-10-10',
  },
  {
    id: 8,
    title: 'Docker Containerization Basics',
    description:
      'Quiz covering Docker concepts, containers, images, and basic deployment.',
    difficulty: 'Medium',
    duration: 25,
    points: 220,
    questions: 16,
    category: 'DevOps',
    status: 'in-progress',
    attempts: 1,
    tags: ['Docker', 'Containers', 'DevOps'],
    passingScore: 75,
    lastAttempt: '2025-10-11',
  },

  // Completed quizzes
  {
    id: 9,
    title: 'Web Security Fundamentals',
    description:
      'Quiz on web security threats, HTTPS, authentication, and security best practices.',
    difficulty: 'Medium',
    duration: 30,
    points: 240,
    questions: 18,
    category: 'Security',
    status: 'completed',
    attempts: 2,
    bestScore: 89,
    tags: ['Security', 'Web Security', 'Authentication'],
    passingScore: 75,
    lastAttempt: '2025-10-08',
  },
  {
    id: 10,
    title: 'Responsive Design Quiz',
    description:
      'Test your knowledge of responsive web design, media queries, and mobile-first approach.',
    difficulty: 'Easy',
    duration: 18,
    points: 120,
    questions: 12,
    category: 'Web Development',
    status: 'completed',
    attempts: 1,
    bestScore: 95,
    tags: ['Responsive Design', 'CSS', 'Mobile'],
    passingScore: 70,
    lastAttempt: '2025-10-05',
  },
  {
    id: 11,
    title: 'JavaScript ES6+ Features',
    description:
      'Advanced quiz on modern JavaScript features including async/await, destructuring, and modules.',
    difficulty: 'Hard',
    duration: 35,
    points: 320,
    questions: 24,
    category: 'Programming',
    status: 'completed',
    attempts: 3,
    bestScore: 78,
    tags: ['JavaScript', 'ES6', 'Modern JavaScript'],
    passingScore: 80,
    lastAttempt: '2025-10-03',
  },

  // Locked quizzes (require prerequisites)
  {
    id: 12,
    title: 'Advanced React Patterns',
    description:
      'Expert-level quiz on advanced React patterns, performance optimization, and architecture.',
    difficulty: 'Expert',
    duration: 45,
    points: 400,
    questions: 30,
    category: 'Frontend',
    status: 'locked',
    tags: ['React', 'Advanced', 'Patterns', 'Performance'],
    passingScore: 85,
  },
  {
    id: 13,
    title: 'Machine Learning Algorithms',
    description:
      'Comprehensive quiz on ML algorithms, model evaluation, and implementation strategies.',
    difficulty: 'Expert',
    duration: 50,
    points: 450,
    questions: 35,
    category: 'AI/ML',
    status: 'locked',
    tags: ['Machine Learning', 'Algorithms', 'AI'],
    passingScore: 85,
  },
  {
    id: 14,
    title: 'System Design Fundamentals',
    description:
      'Quiz on distributed systems, scalability, and architectural design patterns.',
    difficulty: 'Expert',
    duration: 60,
    points: 500,
    questions: 40,
    category: 'System Design',
    status: 'locked',
    tags: ['System Design', 'Architecture', 'Scalability'],
    passingScore: 85,
  },
  {
    id: 15,
    title: 'Cloud Architecture Patterns',
    description:
      'Advanced quiz on cloud computing patterns, microservices, and serverless architecture.',
    difficulty: 'Expert',
    duration: 55,
    points: 480,
    questions: 38,
    category: 'Cloud',
    status: 'locked',
    tags: ['Cloud', 'Architecture', 'Microservices'],
    passingScore: 85,
  },
];

export const quizzesByStatus: QuizzesByStatus = {
  available: mockQuizzes.filter((quiz) => quiz.status === 'available'),
  'in-progress': mockQuizzes.filter((quiz) => quiz.status === 'in-progress'),
  completed: mockQuizzes.filter((quiz) => quiz.status === 'completed'),
  locked: mockQuizzes.filter((quiz) => quiz.status === 'locked'),
};
