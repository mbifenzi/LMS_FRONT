export const API_URL = process.env.API_URL;
export const AUTH_API_URL = process.env.AUTH_API_URL;

// API Endpoints
export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login/',
    LOGOUT: '/auth/logout/',
    PASSWORD_CHANGE: '/auth/password/change/',
    PASSWORD_RESET: '/auth/password/reset/',
    AUTH_ME: '/auth/me/',
  },
  // Quests endpoints
  QUESTS: {
    LIST: '/api/quests/',
    BY_STATUS: (status: string) => `/api/quests/?status=${status}`,
    DETAIL: (id: string) => `/api/quests/${id}/`,
    AVAILABLE: '/api/quests/available/',
    AVAILABLE_DETAIL: (id: string) => `/api/quests/available/${id}/`,
    REGISTER: '/api/quests/register/',
  },
  // Courses endpoints
  COURSES: {
    LIST: '/api/courses/',
    BY_STATUS: (status: string) => `/api/courses/?status=${status}`,
    BY_ID: (id: string) => `/api/courses/${id}/`,
    AVAILABLE: '/api/courses/available/',
    AVAILABLE_DETAIL: (id: string) => `/api/courses/available/${id}/`,
    REGISTER: (id: string) => `/api/courses/${id}/register/`,
  },
  // Tasks endpoints
  TASKS: {
    LIST: '/api/tasks/',
    BY_QUEST: (questId: string) => `/api/tasks/?quest=${questId}`,
  },
  // Quizzes endpoints
  QUIZZES: {
    LIST: '/api/quizzes/',
    BY_COURSE: (courseId: string) => `/api/quizzes/?course=${courseId}`,
    BY_ID: (id: string) => `/api/quizzes/${id}/`,
  },
  // Learner endpoints
  LEARNER: {
    DASHBOARD: '/api/learner/dashboard/',
  },
};
