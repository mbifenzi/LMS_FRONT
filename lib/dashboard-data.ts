import { Zap, Calendar, Trophy, type LucideIcon } from "lucide-react";

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

export interface Task {
  id: number;
  name: string;
  questId: number;
  questName: string;
  completed: boolean;
  description?: string;
}

export interface Quest {
  id: number;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  xp: number;
  icon?: string;
  status?: "enrolled" | "active" | "paused" | "completed";
}

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
    questName: string;
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
  quests: Quest[];
  tasks: Task[];
  contributions: ContributionData;
}

// Sample data
export const dashboardData: DashboardData = {
  profile: {
    name: "Johny Smith",
    avatar: "/images/hogwarts-legacy.png",
    exp: 0,
    stars: 0,
    achievements: [
      { id: 1, title: "Fast Learner", description: "Completed 5 courses in 1 month", icon: Zap, earned: true },
      { id: 2, title: "Streak Master", description: "7-day learning streak", icon: Calendar, earned: true },
      { id: 3, title: "High Achiever", description: "90%+ average score", icon: Trophy, earned: true },
    ],
    skills: ["React", "TypeScript", "Node.js"],
    highlights: ["Open Source Contributor", "Hackathon Winner"],
    location: "Morocco",
    email: "user@um6p.ma",
  },
  quests: [
    // Enrolled quests
    {
      id: 1,
      name: "transcendence",
      difficulty: "Easy",
      duration: "3 days",
      xp: 3000,
      status: "enrolled",
    },
    {
      id: 5,
      name: "css-animations",
      difficulty: "Easy",
      duration: "2 days",
      xp: 2500,
      status: "enrolled",
    },
    {
      id: 6,
      name: "git-fundamentals",
      difficulty: "Easy",
      duration: "4 days",
      xp: 2800,
      status: "enrolled",
    },
    {
      id: 7,
      name: "html5-semantic",
      difficulty: "Medium",
      duration: "6 days",
      xp: 3500,
      status: "enrolled",
    },
    // Active quests
    {
      id: 2,
      name: "react-mastery",
      difficulty: "Hard",
      duration: "7 days",
      xp: 5000,
      status: "active",
    },
    {
      id: 8,
      name: "docker-containers",
      difficulty: "Medium",
      duration: "8 days",
      xp: 4200,
      status: "active",
    },
    {
      id: 9,
      name: "javascript-es6",
      difficulty: "Medium",
      duration: "5 days",
      xp: 3800,
      status: "active",
    },
    {
      id: 10,
      name: "mongodb-basics",
      difficulty: "Easy",
      duration: "4 days",
      xp: 3200,
      status: "active",
    },
    // Paused quests
    {
      id: 3,
      name: "nodejs-fundamentals",
      difficulty: "Medium",
      duration: "5 days",
      xp: 4000,
      status: "paused",
    },
    {
      id: 11,
      name: "python-django",
      difficulty: "Hard",
      duration: "12 days",
      xp: 6500,
      status: "paused",
    },
    {
      id: 12,
      name: "aws-cloud-basics",
      difficulty: "Medium",
      duration: "9 days",
      xp: 4800,
      status: "paused",
    },
    {
      id: 13,
      name: "sql-database-design",
      difficulty: "Medium",
      duration: "7 days",
      xp: 4100,
      status: "paused",
    },
    // Completed quests
    {
      id: 4,
      name: "typescript-advanced",
      difficulty: "Hard",
      duration: "10 days",
      xp: 6000,
      status: "completed",
    },
    {
      id: 14,
      name: "web-security",
      difficulty: "Hard",
      duration: "8 days",
      xp: 5500,
      status: "completed",
    },
    {
      id: 15,
      name: "api-development",
      difficulty: "Medium",
      duration: "6 days",
      xp: 4300,
      status: "completed",
    },
    {
      id: 16,
      name: "unit-testing",
      difficulty: "Easy",
      duration: "3 days",
      xp: 2900,
      status: "completed",
    },
    {
      id: 17,
      name: "responsive-design",
      difficulty: "Easy",
      duration: "4 days",
      xp: 3100,
      status: "completed",
    },
  ],
  tasks: [
    // Tasks for react-mastery quest
    {
      id: 1,
      name: "Set up React project structure",
      questId: 2,
      questName: "react-mastery",
      completed: true,
      description: "Initialize the project with proper folder structure",
    },
    {
      id: 2,
      name: "Implement authentication flow",
      questId: 2,
      questName: "react-mastery",
      completed: true,
      description: "Create login and registration components",
    },
    {
      id: 3,
      name: "Build dashboard interface",
      questId: 2,
      questName: "react-mastery",
      completed: false,
      description: "Design and implement the main dashboard",
    },
    {
      id: 4,
      name: "Add state management",
      questId: 2,
      questName: "react-mastery",
      completed: false,
      description: "Implement Redux or Context API",
    },
    {
      id: 5,
      name: "Setup routing system",
      questId: 2,
      questName: "react-mastery",
      completed: false,
      description: "Configure React Router for navigation",
    },
    // Tasks for docker-containers quest
    {
      id: 6,
      name: "Docker basics overview",
      questId: 8,
      questName: "docker-containers",
      completed: true,
      description: "Learn Docker fundamentals",
    },
    {
      id: 7,
      name: "Create Dockerfile",
      questId: 8,
      questName: "docker-containers",
      completed: false,
      description: "Write a Dockerfile for the application",
    },
    {
      id: 8,
      name: "Docker compose setup",
      questId: 8,
      questName: "docker-containers",
      completed: false,
      description: "Create docker-compose.yml file",
    },
    // Tasks for javascript-es6 quest
    {
      id: 9,
      name: "Arrow functions practice",
      questId: 9,
      questName: "javascript-es6",
      completed: true,
      description: "Master arrow function syntax",
    },
    {
      id: 10,
      name: "Destructuring assignment",
      questId: 9,
      questName: "javascript-es6",
      completed: false,
      description: "Learn object and array destructuring",
    },
    {
      id: 11,
      name: "Async/await patterns",
      questId: 9,
      questName: "javascript-es6",
      completed: false,
      description: "Handle asynchronous operations",
    },
  ],
  contributions: {
    month: "September 2025",
    activities: {
      total: 47,
      categories: [
        { name: "Quest Completions", count: 28, progress: 60 },
        { name: "Task Submissions", count: 12, progress: 25 },
        { name: "Learning Activities", count: 7, progress: 15 },
      ],
    },
    submissions: {
      total: 8,
      questName: "react-mastery",
      completed: 6,
      items: [
        { title: "Completed: Set up React project structure", date: "Sep 23", type: "completed" },
        { title: "Completed: Implement authentication flow", date: "Sep 21", type: "completed" },
        { title: "Completed: Docker basics overview", date: "Sep 19", type: "completed" },
        { title: "Completed: Arrow functions practice", date: "Sep 18", type: "completed" },
        { title: "In Progress: Build dashboard interface", date: "Sep 16", type: "progress" },
        { title: "In Progress: Add state management", date: "Sep 14", type: "progress" },
      ],
    },
  },
};
