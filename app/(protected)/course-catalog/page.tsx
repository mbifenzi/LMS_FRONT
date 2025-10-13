import { fetchCurrentUser } from "@/lib/api/user-api";
import CourseContent from "@/components/course-catalog/CourseContent";

export const metadata = {
  title: "Course Catalog",
  description: "Browse available courses",
};

export default async function CourseCatalogPage() {
  const user = await fetchCurrentUser();
  
  return (
    <div>
      <CourseContent role={user?.role} />
    </div>
  );
}