import { notFound } from "next/navigation";
import Course from "@/components/course/Course";
import { coursesByStatus, type Course as CourseType } from "@/lib/mock-data/courses";

export const metadata = {
  title: "Course",
  description: "Take a course",
};

interface CoursePageProps {
  params: {
    id: string;
  };
}

// Function to find course by ID across all statuses
function findCourseById(id: string): CourseType | null {
  const allCourses = [
    ...coursesByStatus.available,
    ...coursesByStatus.inProgress,
    ...coursesByStatus.notStarted,
    ...coursesByStatus.paused,
    ...coursesByStatus.abandoned,
    ...coursesByStatus.completed,
  ];
  
  return allCourses.find(course => course.id === parseInt(id)) || null;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = findCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div>
      <Course course={course} />
    </div>
  );
}