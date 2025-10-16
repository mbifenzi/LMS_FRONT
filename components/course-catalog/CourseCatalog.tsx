'use client';

import React, { useEffect, useMemo, useState } from 'react';

import CourseCard from '@/components/shared/CourseCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Course } from '@/lib/mock-data/courses';

import CourseFilters from './CourseFilters';

const ADMIN_TAB_ORDER = [
  'published',
  'draft',
  'underReview',
  'rejected',
  'archived',
] as const;
const STUDENT_TAB_ORDER = ['available', 'inProgress', 'completed'] as const;

interface CourseCatalogClientProps {
  coursesByStatus: Record<string, Course[]>;
  role?: string; // "Student" or other (admin)
}

export default function CourseCatalogClient({
  coursesByStatus,
  role,
}: CourseCatalogClientProps) {
  const isStudent = role === 'Student';

  // Use provided courses directly (server already fetched 'available' for students)
  const dataByStatus = coursesByStatus;

  // Memoize tab order based on role
  const TAB_ORDER = useMemo(
    () =>
      (isStudent ? STUDENT_TAB_ORDER : ADMIN_TAB_ORDER) as readonly string[],
    [isStudent]
  );

  // Labels for display
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

  type TabKey = string;

  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ORDER[0]);
  // Ensure active tab remains valid when role changes
  useEffect(() => {
    if (!TAB_ORDER.includes(activeTab)) {
      setActiveTab(TAB_ORDER[0]);
    }
  }, [TAB_ORDER, activeTab]);

  const [search, setSearch] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  ); // multi-select (empty = ALL)
  const [sortOption, setSortOption] = useState<string>('POINTS_DESC');

  const filteredCourses = useMemo(() => {
    const base = dataByStatus[activeTab] || [];
    // text search
    const byText = base.filter(
      (course: Course) =>
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.description?.toLowerCase().includes(search.toLowerCase())
    );
    // difficulty filter
    const byDifficulty =
      selectedDifficulties.length === 0
        ? byText
        : byText.filter((course: Course) =>
            selectedDifficulties.includes(course.difficulty)
          );

    // sort
    const sorted = [...byDifficulty];
    switch (sortOption) {
      case 'POINTS_ASC':
        sorted.sort((a, b) => a.points - b.points);
        break;
      case 'POINTS_DESC':
        sorted.sort((a, b) => b.points - a.points);
        break;
      case 'DURATION_ASC':
        sorted.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case 'DURATION_DESC':
        sorted.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
        break;
      case 'DIFFICULTY_ASC':
        sorted.sort((a, b) => {
          const order = {
            Beginner: 0,
            Intermediate: 1,
            Advanced: 2,
            Expert: 3,
          };
          return order[a.difficulty] - order[b.difficulty];
        });
        break;
      case 'DIFFICULTY_DESC':
        sorted.sort((a, b) => {
          const order = {
            Beginner: 0,
            Intermediate: 1,
            Advanced: 2,
            Expert: 3,
          };
          return order[b.difficulty] - order[a.difficulty];
        });
        break;
    }

    return sorted;
  }, [dataByStatus, activeTab, search, selectedDifficulties, sortOption]);

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

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courseList.map((course) => (
          <CourseCard key={course.id} course={course} variant="dashboard" />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto space-y-6 px-4 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Course Catalog</h1>
          <p className="text-muted-foreground text-sm">
            {filteredCourses.length} course
            {filteredCourses.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Filters */}
      <CourseFilters
        search={search}
        setSearch={setSearch}
        selectedDifficulties={selectedDifficulties}
        setSelectedDifficulties={setSelectedDifficulties}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {/* Tabs */}
      <Tabs
        className="w-full"
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
          <TabsContent key={key} value={key} className="mt-6">
            {key === activeTab ? renderCourseGrid(filteredCourses) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
