import {
  BookOpen,
  Calendar,
  Clock,
  Code,
  Database,
  Globe,
  type LucideIcon,
  Star,
  Trophy,
} from 'lucide-react';

export interface Course {
  id: number;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string; // in hours
  points: number;
  status:
    | 'available'
    | 'inProgress'
    | 'notStarted'
    | 'paused'
    | 'abandoned'
    | 'completed';
  category: string;
  instructor: string;
  coverImage?: string;
  tags: string[];
  progress?: number; // percentage for enrolled/active courses
}

export interface CoursesByStatus {
  available: Course[];
  inProgress: Course[];
  notStarted: Course[];
  paused: Course[];
  abandoned: Course[];
  completed: Course[];
}

export const mockCourses: Course[] = [
  // Not Started courses
  {
    id: 1,
    name: 'Introduction to Web Development',
    description:
      'Learn the fundamentals of web development including HTML, CSS, and basic JavaScript concepts.',
    difficulty: 'Beginner',
    duration: '40',
    points: 2500,
    status: 'notStarted',
    category: 'Web Development',
    instructor: 'Sarah Johnson',
    tags: ['HTML', 'CSS', 'JavaScript', 'Frontend'],
    progress: 0,
  },
  {
    id: 2,
    name: 'Python Programming Basics',
    description:
      'Master Python programming from scratch with hands-on exercises and real-world projects.',
    difficulty: 'Beginner',
    duration: '35',
    points: 3000,
    status: 'notStarted',
    category: 'Programming',
    instructor: 'Mike Chen',
    tags: ['Python', 'Programming', 'Beginner'],
    progress: 0,
  },
  {
    id: 3,
    name: 'Database Design Fundamentals',
    description:
      'Learn database design principles, SQL queries, and database management concepts.',
    difficulty: 'Intermediate',
    duration: '45',
    points: 3500,
    status: 'notStarted',
    category: 'Database',
    instructor: 'Emma Wilson',
    tags: ['SQL', 'Database', 'Design'],
    progress: 0,
  },

  // In Progress courses
  {
    id: 4,
    name: 'React.js Mastery',
    description:
      'Build modern web applications with React.js, hooks, state management, and routing.',
    difficulty: 'Intermediate',
    duration: '60',
    points: 4500,
    status: 'inProgress',
    category: 'Frontend',
    instructor: 'Alex Rodriguez',
    tags: ['React', 'JavaScript', 'Frontend', 'SPA'],
    progress: 65,
  },
  {
    id: 5,
    name: 'Docker & Containerization',
    description:
      'Master containerization with Docker, docker-compose, and deployment strategies.',
    difficulty: 'Intermediate',
    duration: '30',
    points: 4000,
    status: 'inProgress',
    category: 'DevOps',
    instructor: 'David Kim',
    tags: ['Docker', 'DevOps', 'Containers'],
    progress: 40,
  },
  {
    id: 6,
    name: 'Node.js Backend Development',
    description:
      'Build scalable backend applications with Node.js, Express, and MongoDB.',
    difficulty: 'Intermediate',
    duration: '55',
    points: 4200,
    status: 'inProgress',
    category: 'Backend',
    instructor: 'Lisa Zhang',
    tags: ['Node.js', 'Express', 'MongoDB', 'Backend'],
    progress: 80,
  },

  // Paused courses
  {
    id: 7,
    name: 'Machine Learning with Python',
    description:
      'Introduction to machine learning algorithms and implementation with Python libraries.',
    difficulty: 'Advanced',
    duration: '80',
    points: 6000,
    status: 'paused',
    category: 'AI/ML',
    instructor: 'Dr. James Smith',
    tags: ['Python', 'Machine Learning', 'AI', 'Data Science'],
    progress: 25,
  },
  {
    id: 8,
    name: 'AWS Cloud Fundamentals',
    description:
      'Learn AWS cloud services, deployment, and cloud architecture best practices.',
    difficulty: 'Intermediate',
    duration: '50',
    points: 4800,
    status: 'paused',
    category: 'Cloud',
    instructor: 'Maria Garcia',
    tags: ['AWS', 'Cloud', 'Infrastructure'],
    progress: 15,
  },

  // Completed courses
  {
    id: 9,
    name: 'Git & Version Control',
    description:
      'Master Git version control, branching strategies, and collaborative development.',
    difficulty: 'Beginner',
    duration: '20',
    points: 2000,
    status: 'completed',
    category: 'Tools',
    instructor: 'John Doe',
    tags: ['Git', 'Version Control', 'Collaboration'],
    progress: 100,
  },
  {
    id: 10,
    name: 'Responsive Web Design',
    description:
      'Create responsive websites that work perfectly on all devices and screen sizes.',
    difficulty: 'Beginner',
    duration: '25',
    points: 2800,
    status: 'completed',
    category: 'Web Development',
    instructor: 'Anna Brown',
    tags: ['CSS', 'Responsive', 'Mobile-First'],
    progress: 100,
  },
  {
    id: 11,
    name: 'JavaScript ES6+ Features',
    description:
      'Modern JavaScript features including arrow functions, promises, async/await, and modules.',
    difficulty: 'Intermediate',
    duration: '30',
    points: 3200,
    status: 'completed',
    category: 'Programming',
    instructor: 'Tom Wilson',
    tags: ['JavaScript', 'ES6', 'Modern JS'],
    progress: 100,
  },

  // Available courses
  {
    id: 12,
    name: 'Vue.js Complete Guide',
    description:
      'Learn Vue.js from basics to advanced concepts including Vuex and Vue Router.',
    difficulty: 'Intermediate',
    duration: '50',
    points: 4200,
    status: 'available',
    category: 'Frontend',
    instructor: 'Sophie Martin',
    tags: ['Vue.js', 'JavaScript', 'Frontend'],
  },
  {
    id: 13,
    name: 'TypeScript Mastery',
    description:
      'Master TypeScript for better JavaScript development with type safety and modern features.',
    difficulty: 'Intermediate',
    duration: '40',
    points: 3800,
    status: 'available',
    category: 'Programming',
    instructor: 'Chris Lee',
    tags: ['TypeScript', 'JavaScript', 'Type Safety'],
  },
  {
    id: 14,
    name: 'GraphQL API Development',
    description:
      'Build efficient APIs with GraphQL, including queries, mutations, and subscriptions.',
    difficulty: 'Advanced',
    duration: '45',
    points: 5000,
    status: 'available',
    category: 'Backend',
    instructor: 'Rachel Green',
    tags: ['GraphQL', 'API', 'Backend'],
  },
  {
    id: 15,
    name: 'Cybersecurity Fundamentals',
    description:
      'Learn essential cybersecurity concepts, threat assessment, and security best practices.',
    difficulty: 'Intermediate',
    duration: '60',
    points: 4500,
    status: 'available',
    category: 'Security',
    instructor: 'Mark Davis',
    tags: ['Security', 'Cybersecurity', 'Best Practices'],
  },
  {
    id: 16,
    name: 'Data Structures & Algorithms',
    description:
      'Master fundamental data structures and algorithms essential for software development.',
    difficulty: 'Advanced',
    duration: '70',
    points: 5500,
    status: 'available',
    category: 'Computer Science',
    instructor: 'Dr. Amy Chen',
    tags: ['Algorithms', 'Data Structures', 'Computer Science'],
  },
  {
    id: 17,
    name: 'Mobile App Development with React Native',
    description:
      'Build cross-platform mobile apps using React Native and JavaScript.',
    difficulty: 'Advanced',
    duration: '65',
    points: 5200,
    status: 'available',
    category: 'Mobile Development',
    instructor: 'Kevin Park',
    tags: ['React Native', 'Mobile', 'Cross-Platform'],
  },
];

export const coursesByStatus: CoursesByStatus = {
  available: mockCourses.filter((course) => course.status === 'available'),
  inProgress: mockCourses.filter((course) => course.status === 'inProgress'),
  notStarted: mockCourses.filter((course) => course.status === 'notStarted'),
  paused: mockCourses.filter((course) => course.status === 'paused'),
  abandoned: mockCourses.filter((course) => course.status === 'abandoned'),
  completed: mockCourses.filter((course) => course.status === 'completed'),
};
