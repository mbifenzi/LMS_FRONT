import CourseContent from '@/components/course-catalog/CourseContent';

export const metadata = {
  title: 'Course Catalog',
  description: 'Browse available courses',
};

export default function CourseCatalogPage() {
  // Use mock user role - you can change this as needed
  const mockUserRole = 'Student';

  return (
    <div>
      <CourseContent role={mockUserRole} />
    </div>
  );
}
