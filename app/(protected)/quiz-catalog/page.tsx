import { fetchCurrentUser } from "@/lib/api/user-api";
import QuizCatalogClient from "@/components/quiz-catalog/QuizCatalog";

export const metadata = {
  title: "Quiz Catalog",
  description: "Browse and take available quizzes",
};

export default async function QuizCatalogPage() {
  const user = await fetchCurrentUser();
  
  return (
    <div>
      <QuizCatalogClient role={user?.role} />
    </div>
  );
}