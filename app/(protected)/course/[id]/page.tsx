import { notFound } from "next/navigation";
import Course from "@/components/course/Course";
import { fetchCourseById } from "@/lib/api/course-api";

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  
  try {
    const course = await fetchCourseById(id);
    
    if (!course) {
      notFound();
    }

    return <Course course={course} />;
  } catch (error) {
    console.error("Error fetching course:", error);
    notFound();
  }
}