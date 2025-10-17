import { notFound } from 'next/navigation';

import Course from '@/components/course/Course';

import {
  type Course as CourseType,
  coursesByStatus,
} from '@/lib/mock-data/courses';
import { extractIdFromSlug } from '@/lib/utils/slug';

export const metadata = {
  title: 'Course',
  description: 'Take a course',
};

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
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

  return allCourses.find((course) => course.id === parseInt(id)) || null;
}

export default async function CoursePage({ params }: CoursePageProps) {
  // Await params in Next.js 15
  const { slug } = await params;

  // Extract the ID from the slug
  const courseId = extractIdFromSlug(slug);

  // Find the course by ID
  const course = findCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Course course={course} />
    </div>
  );
}
