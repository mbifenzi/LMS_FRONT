import { notFound } from "next/navigation";
import Quiz from "@/components/quiz/Quiz";
import { quizzesByStatus, type Quiz as QuizType } from "@/lib/mock-data/quizzes";

export const metadata = {
  title: "Quiz",
  description: "Take a quiz",
};

interface QuizPageProps {
  params: {
    id: string;
  };
}

// Function to find quiz by ID across all statuses
function findQuizById(id: string): QuizType | null {
  const allQuizzes = [
    ...quizzesByStatus.available,
    ...quizzesByStatus.enrolled,
    ...quizzesByStatus.completed,
    ...quizzesByStatus.active,
  ];
  
  return allQuizzes.find(quiz => quiz.id === id) || null;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const quiz = findQuizById(params.id);

  if (!quiz) {
    notFound();
  }

  return (
    <div>
      <Quiz quiz={quiz} />
    </div>
  );
}