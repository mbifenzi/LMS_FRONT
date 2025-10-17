export interface ApiQuest {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'UNDER_REVIEW' | 'REJECTED';
  estimated_duration: number;
  prerequicite_points: number;
  prerequisite_quests: string[];
  cover_image_url: string;
  intro_video_url: string;
  resources: Record<string, unknown>;
  reward_points: number;
  reward_badges: string[];
  reward_certificates: string[];
  total_points: number;
  total_duration: number;
}

export interface ApiCourse {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'UNDER_REVIEW' | 'REJECTED';
  estimated_duration: number;
  prerequicite_points: number;
  prerequisite_courses: string[];
  cover_image_url: string;
  intro_video_url: string;
  resources: Record<string, unknown>;
  reward_points: number;
  reward_badges: string[];
  reward_certificates: string[];
  total_points: number;
  total_duration: number;
}

export interface ApiTask {
  id: string;
  quest: string; // quest id (UUID)
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sub_learning_outcomes: string[];
  type: string;
  estimated_duration: number;
  prerequicite_points: number;
  points: number;
  order: number;
  prerequisite_tasks: string[];
  cover_image_url: string;
  intro_video_url: string;
  resources: Record<string, unknown>;
}

export interface ApiQuiz {
  id: string;
  course: string; // course id (UUID)
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  sub_learning_outcomes: string[];
  type: string;
  estimated_duration: number;
  prerequicite_points: number;
  points: number;
  order: number;
  prerequisite_quizzes: string[];
  cover_image_url: string;
  intro_video_url: string;
  resources: Record<string, unknown>;
}

export interface ApiCurrentUser {
  id: number;
  email: string;
  username: string;
  name: string;
  role: string;
  is_active: boolean;
}

export interface LearnerQuestEnrollment {
  id: string;
  quest: ApiQuest;
  quest_name: string;
  quest_difficulty: ApiQuest['difficulty'];
  start_time: string | null;
  close_time: string | null;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'PAUSED' | 'ABANDONED' | 'COMPLETED';
  tasks_completed?: number;
  quest_total_tasks: number;
  total_points_earned: number;
  total_stars_earned: number;
  is_completed: boolean;
  completion_time: string | null;
  rewards_granted: boolean;
  progress_percentage: number;
  next_task?: ApiTask | null;
  completed_tasks?: string[];
  created_at: string;
  updated_at: string;
}

export interface LearnerDashboardResponse {
  user_profile: {
    id: number;
    email: string;
    name: string;
    role: string;
    total_points: number;
    total_stars: number;
    badges_earned: string[];
    certificates_earned: string[];
    quests_completed: number;
    experience_level: number;
    experience_points: number;
    current_level_progress: number;
  };
  not_started_quests: LearnerQuestEnrollment[];
  in_progress_quests: LearnerQuestEnrollment[];
  paused_quests: LearnerQuestEnrollment[];
  abandoned_quests: LearnerQuestEnrollment[];
  completed_quests: LearnerQuestEnrollment[];
  recent_activity: string[];
  stats: {
    total_quests_registered: number;
    quests_in_progress: number;
    quests_paused: number;
    quests_abandoned: number;
    quests_completed: number;
    total_points_earned: number; // added total points earned
  };
}

export interface AvailableQuestsResponse {
  available_quests: ApiQuest[];
  total_count: number;
}
