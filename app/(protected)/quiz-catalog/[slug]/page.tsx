import { notFound } from 'next/navigation';

import Quiz from '@/components/quiz/Quiz';

import {
  type Quiz as QuizType,
  quizzesByStatus,
} from '@/lib/mock-data/quizzes';
import { extractIdFromSlug } from '@/lib/utils/slug';

export const metadata = {
  title: 'Quiz',
  description: 'Take a quiz',
};

interface QuizPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Function to find quiz by ID across all statuses
function findQuizById(id: string): QuizType | null {
  const allQuizzes = [
    ...quizzesByStatus.available,
    ...quizzesByStatus['in-progress'],
    ...quizzesByStatus.completed,
    ...quizzesByStatus.locked,
  ];

  return allQuizzes.find((quiz) => quiz.id === parseInt(id)) || null;
}

export default async function QuizPage({ params }: QuizPageProps) {
  // Await params in Next.js 15
  const { slug } = await params;

  // Extract the ID from the slug
  const quizId = extractIdFromSlug(slug);

  // Find the quiz by ID
  const quiz = findQuizById(quizId);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Quiz quiz={quiz} />
    </div>
  );
}
