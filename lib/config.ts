export const API_URL = process.env.API_URL;
export const AUTH_API_URL = process.env.AUTH_API_URL;

// API Endpoints
export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login/",
    LOGOUT: "/auth/logout/",
    PASSWORD_CHANGE: "/auth/password/change/",
    PASSWORD_RESET: "/auth/password/reset/",
    AUTH_ME: "/auth/me/",
  },
  // Quests endpoints
  QUESTS: {
    LIST: "/api/quests/",
    BY_STATUS: (status: string) => `/api/quests/?status=${status}`,
    DETAIL: (id: string) => `/api/quests/${id}/`,
    AVAILABLE: "/api/quests/available/",
    AVAILABLE_DETAIL: (id: string) => `/api/quests/available/${id}/`,
    REGISTER: "/api/quests/register/",
  },
  // Tasks endpoints
  TASKS: {
    LIST: "/api/tasks/",
    BY_QUEST: (questId: string) => `/api/tasks/?quest=${questId}`,
  },
  // Learner endpoints
  LEARNER: {
    DASHBOARD: "/api/learner/dashboard/",
  },
};
