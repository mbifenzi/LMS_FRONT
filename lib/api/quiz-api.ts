import { type Quiz, quizzesByStatus } from '@/lib/mock-data/quizzes';

import { quizApiClient } from './quiz-api-client';

// Helper functions to interact with quiz data
// Currently using mock data, but can be switched to API calls

export async function fetchAllQuizzes(): Promise<Quiz[]> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await quizApiClient.getQuizzes();
    // return result.quizzes;

    // For now, return mock data
    return [
      ...quizzesByStatus.available,
      ...quizzesByStatus.enrolled,
      ...quizzesByStatus.active,
      ...quizzesByStatus.completed,
    ];
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    // Fallback to mock data
    return [
      ...quizzesByStatus.available,
      ...quizzesByStatus.enrolled,
      ...quizzesByStatus.active,
      ...quizzesByStatus.completed,
    ];
  }
}

export async function fetchQuizzesByStatus(status: string): Promise<Quiz[]> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await quizApiClient.getQuizzes({ status });
    // return result.quizzes;

    // For now, return mock data
    return quizzesByStatus[status as keyof typeof quizzesByStatus] || [];
  } catch (error) {
    console.error(`Error fetching quizzes by status ${status}:`, error);
    // Fallback to mock data
    return quizzesByStatus[status as keyof typeof quizzesByStatus] || [];
  }
}

export async function fetchQuizById(id: string): Promise<Quiz | null> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // return await quizApiClient.getQuizById(id);

    // For now, search through mock data
    const allQuizzes = await fetchAllQuizzes();
    return allQuizzes.find((quiz) => quiz.id === id) || null;
  } catch (error) {
    console.error(`Error fetching quiz ${id}:`, error);
    return null;
  }
}

export async function fetchUserQuizzes(): Promise<{
  enrolled: Quiz[];
  active: Quiz[];
  completed: Quiz[];
  available: Quiz[];
}> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // return await quizApiClient.getUserQuizzes();

    // For now, return mock data organized by status
    return quizzesByStatus;
  } catch (error) {
    console.error('Error fetching user quizzes:', error);
    // Fallback to mock data
    return quizzesByStatus;
  }
}

export async function enrollInQuiz(quizId: string): Promise<boolean> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await quizApiClient.enrollInQuiz(quizId);
    // return result.success;

    // For now, just return true (mock enrollment)
    console.log(`Mock enrollment in quiz: ${quizId}`);
    return true;
  } catch (error) {
    console.error(`Error enrolling in quiz ${quizId}:`, error);
    return false;
  }
}

export async function unenrollFromQuiz(quizId: string): Promise<boolean> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await quizApiClient.unenrollFromQuiz(quizId);
    // return result.success;

    // For now, just return true (mock unenrollment)
    console.log(`Mock unenrollment from quiz: ${quizId}`);
    return true;
  } catch (error) {
    console.error(`Error unenrolling from quiz ${quizId}:`, error);
    return false;
  }
}

export async function submitQuizAttempt(
  quizId: string,
  answers: { [questionId: string]: number }
): Promise<{
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
} | null> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // return await quizApiClient.submitQuizAttempt(quizId, answers);

    // For now, calculate mock score
    const quiz = await fetchQuizById(quizId);
    if (!quiz) return null;

    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index.toString()] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    return {
      score,
      passed,
      correctAnswers,
      totalQuestions: quiz.questions.length,
    };
  } catch (error) {
    console.error(`Error submitting quiz attempt for ${quizId}:`, error);
    return null;
  }
}

export async function searchQuizzes(
  searchTerm: string,
  filters?: {
    category?: string;
    difficulty?: string;
    status?: string;
  }
): Promise<Quiz[]> {
  try {
    // TODO: Replace with actual API call when backend is ready
    // const result = await quizApiClient.getQuizzes({
    //   ...filters,
    //   search: searchTerm
    // });
    // return result.quizzes;

    // For now, filter mock data
    let allQuizzes = await fetchAllQuizzes();

    // Apply search term filter
    if (searchTerm) {
      allQuizzes = allQuizzes.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.category && filters.category !== 'All') {
      allQuizzes = allQuizzes.filter(
        (quiz) => quiz.category === filters.category
      );
    }

    if (filters?.difficulty && filters.difficulty !== 'All') {
      allQuizzes = allQuizzes.filter(
        (quiz) => quiz.difficulty === filters.difficulty
      );
    }

    if (filters?.status && filters.status !== 'All') {
      allQuizzes = allQuizzes.filter((quiz) => quiz.status === filters.status);
    }

    return allQuizzes;
  } catch (error) {
    console.error('Error searching quizzes:', error);
    return [];
  }
}
