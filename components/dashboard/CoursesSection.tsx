'use client';

import React, { useMemo, useState } from 'react';

import Link from 'next/link';

import CourseCard from '@/components/shared/CourseCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { type Course } from '@/lib/mock-data/courses';

const ADMIN_TAB_ORDER = [
  'published',
  'draft',
  'underReview',
  'rejected',
  'archived',
] as const;
const STUDENT_TAB_ORDER = [
  'available',
  'inProgress',
  'notStarted',
  'paused',
  'abandoned',
  'completed',
] as const;

interface CoursesSectionProps {
  coursesByStatus: Record<string, Course[]>;
  role?: string;
}

export default function CoursesSection({
  coursesByStatus,
  role,
}: CoursesSectionProps) {
  const isStudent = role === 'Student';

  const TAB_ORDER = useMemo(
    () =>
      (isStudent ? STUDENT_TAB_ORDER : ADMIN_TAB_ORDER) as readonly string[],
    [isStudent]
  );

  // Labels for display (matching course catalog exactly)
  const TAB_LABELS: Record<string, string> = {
    underReview: 'Under Review',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    paused: 'Paused',
    abandoned: 'Abandoned',
    completed: 'Completed',
    published: 'Published',
    draft: 'Draft',
    rejected: 'Rejected',
    archived: 'Archived',
    available: 'Available',
  };

  type TabKey = string; // using a broad type since we unify dynamic keys

  // Initialize with first available tab for current role
  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ORDER[0]);

  const filtered = useMemo(
    () => coursesByStatus[activeTab] || [],
    [coursesByStatus, activeTab]
  );

  const renderCourseGrid = (courseList: Course[]) => {
    if (courseList.length === 0) {
      return (
        <div className="bg-accent/50 dark:bg-old-background rounded-lg border py-12 text-center">
          <p className="text-muted-foreground text-sm">
            No courses found in this category.
          </p>
        </div>
      );
    }

    // Show different amounts based on screen size using Tailwind
    const hasMoreMobile = courseList.length > 1;
    const hasMoreTablet = courseList.length > 2;
    const hasMoreDesktop = courseList.length > 3;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courseList.map((course, index) => (
            <div
              key={course.id}
              className={
                index === 0
                  ? '' // Always show first item
                  : index === 1
                    ? 'hidden md:block' // Show 2nd item on md+
                    : index === 2
                      ? 'hidden lg:block' // Show 3rd item on lg+
                      : 'hidden' // Hide 4th+ items
              }
            >
              <CourseCard course={course} variant="dashboard" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold sm:text-xl">Courses</h2>
        <Link
          href="/course-catalog"
          className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-600 hover:underline focus:underline focus:outline-none"
        >
          View all
        </Link>
      </div>

      <Tabs
        className="w-full px-2"
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabKey)}
      >
        <TabsList className="flex flex-wrap gap-1">
          {TAB_ORDER.map((key) => (
            <TabsTrigger key={key} value={key} className="capitalize">
              {TAB_LABELS[key] || key}
            </TabsTrigger>
          ))}
        </TabsList>
        {TAB_ORDER.map((key) => (
          <TabsContent key={key} value={key} className="mt-4">
            {key === activeTab ? renderCourseGrid(filtered) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
