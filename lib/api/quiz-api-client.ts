import { type Quiz } from '@/lib/mock-data/quizzes';

// API client for quiz-related operations
export class QuizApiClient {
  private baseUrl: string;
  private token?: string;

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  ) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `Quiz API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  // Quiz CRUD operations
  async getQuizzes(params?: {
    category?: string;
    difficulty?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ quizzes: Quiz[]; total: number }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    return this.request<{ quizzes: Quiz[]; total: number }>(
      `/api/v1/quizzes?${queryParams.toString()}`
    );
  }

  async getQuizById(id: string): Promise<Quiz> {
    return this.request<Quiz>(`/api/v1/quizzes/${id}`);
  }

  async enrollInQuiz(
    quizId: string
  ): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/v1/quizzes/${quizId}/enroll`,
      { method: 'POST' }
    );
  }

  async unenrollFromQuiz(
    quizId: string
  ): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/v1/quizzes/${quizId}/unenroll`,
      { method: 'DELETE' }
    );
  }

  async submitQuizAttempt(
    quizId: string,
    answers: { [questionId: string]: number }
  ): Promise<{
    score: number;
    passed: boolean;
    correctAnswers: number;
    totalQuestions: number;
    feedback?: string;
  }> {
    return this.request<{
      score: number;
      passed: boolean;
      correctAnswers: number;
      totalQuestions: number;
      feedback?: string;
    }>(`/api/v1/quizzes/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  async getQuizAttempts(quizId: string): Promise<
    Array<{
      id: string;
      score: number;
      passed: boolean;
      submittedAt: string;
      duration: string;
    }>
  > {
    return this.request<
      Array<{
        id: string;
        score: number;
        passed: boolean;
        submittedAt: string;
        duration: string;
      }>
    >(`/api/v1/quizzes/${quizId}/attempts`);
  }

  async getUserQuizzes(userId?: string): Promise<{
    enrolled: Quiz[];
    completed: Quiz[];
    active: Quiz[];
    available: Quiz[];
  }> {
    const endpoint = userId
      ? `/api/v1/users/${userId}/quizzes`
      : '/api/v1/me/quizzes';
    return this.request<{
      enrolled: Quiz[];
      completed: Quiz[];
      active: Quiz[];
      available: Quiz[];
    }>(endpoint);
  }

  // Quiz management (for instructors/admins)
  async createQuiz(
    quizData: Omit<Quiz, 'id' | 'status' | 'progress'>
  ): Promise<Quiz> {
    return this.request<Quiz>('/api/v1/quizzes', {
      method: 'POST',
      body: JSON.stringify(quizData),
    });
  }

  async updateQuiz(id: string, quizData: Partial<Quiz>): Promise<Quiz> {
    return this.request<Quiz>(`/api/v1/quizzes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(quizData),
    });
  }

  async deleteQuiz(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/v1/quizzes/${id}`,
      { method: 'DELETE' }
    );
  }

  async getQuizAnalytics(id: string): Promise<{
    totalAttempts: number;
    averageScore: number;
    passRate: number;
    completionRate: number;
    difficultyRating: number;
  }> {
    return this.request<{
      totalAttempts: number;
      averageScore: number;
      passRate: number;
      completionRate: number;
      difficultyRating: number;
    }>(`/api/v1/quizzes/${id}/analytics`);
  }
}

// Singleton instance
export const quizApiClient = new QuizApiClient();
