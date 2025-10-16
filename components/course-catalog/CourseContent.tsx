import React from 'react';

import { type Course, coursesByStatus } from '@/lib/mock-data/courses';

import CourseCatalogClient from './CourseCatalog';

interface CourseContentProps {
  role?: string;
}

export default function CourseContent({ role }: CourseContentProps) {
  // Use mock data directly - same structure as dashboard
  console.log('-------------- Courses by status:', coursesByStatus);

  return (
    <CourseCatalogClient
      coursesByStatus={coursesByStatus as unknown as Record<string, Course[]>}
      role={role}
    />
  );
}
