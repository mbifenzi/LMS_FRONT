import { Calendar, type LucideIcon, Trophy, Zap } from 'lucide-react';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
}

export interface Profile {
  name: string;
  avatar: string;
  exp: number;
  stars: number;
  achievements: Achievement[];
  skills: string[];
  highlights: string[];
  location?: string;
  email?: string;
}

// Note: Course and Quiz interfaces are now in their respective mock data files
// /lib/mock-data/courses.ts and /lib/mock-data/quizzes.ts

export interface ContributionData {
  month: string;
  activities: {
    total: number;
    categories: {
      name: string;
      count: number;
      progress: number;
    }[];
  };
  submissions: {
    total: number;
    courseName: string;
    completed: number;
    items: {
      title: string;
      date: string;
      type: string;
    }[];
  };
}

export interface DashboardData {
  profile: Profile;
  contributions: ContributionData;
}

// Sample data
export const dashboardData: DashboardData = {
  profile: {
    name: 'Johny Smith',
    avatar: '/images/hogwarts-legacy.png',
    exp: 0,
    stars: 0,
    achievements: [
      {
        id: 1,
        title: 'Fast Learner',
        description: 'Completed 5 courses in 1 month',
        icon: Zap,
        earned: true,
      },
      {
        id: 2,
        title: 'Streak Master',
        description: '7-day learning streak',
        icon: Calendar,
        earned: true,
      },
      {
        id: 3,
        title: 'High Achiever',
        description: '90%+ average score',
        icon: Trophy,
        earned: true,
      },
    ],
    skills: ['React', 'TypeScript', 'Node.js'],
    highlights: ['Open Source Contributor', 'Hackathon Winner'],
    location: 'Morocco',
    email: 'user@um6p.ma',
  },
  contributions: {
    month: 'September 2025',
    activities: {
      total: 47,
      categories: [
        { name: 'Course Completions', count: 28, progress: 60 },
        { name: 'Quiz Submissions', count: 12, progress: 25 },
        { name: 'Learning Activities', count: 7, progress: 15 },
      ],
    },
    submissions: {
      total: 8,
      courseName: 'react-mastery',
      completed: 6,
      items: [
        {
          title: 'Completed: React Components Quiz',
          date: 'Sep 23',
          type: 'completed',
        },
        {
          title: 'Completed: React Hooks Quiz',
          date: 'Sep 21',
          type: 'completed',
        },
        {
          title: 'Completed: Docker Fundamentals Quiz',
          date: 'Sep 19',
          type: 'completed',
        },
        {
          title: 'Completed: ES6 Arrow Functions Quiz',
          date: 'Sep 18',
          type: 'completed',
        },
        {
          title: 'In Progress: React Router Quiz',
          date: 'Sep 16',
          type: 'progress',
        },
        {
          title: 'In Progress: State Management Quiz',
          date: 'Sep 14',
          type: 'progress',
        },
      ],
    },
  },
};
