"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Course } from "@/lib/mock-data/courses";
import CourseCard from "@/components/shared/CourseCard";

const ADMIN_TAB_ORDER = ["published", "draft", "underReview", "rejected", "archived"] as const;
const STUDENT_TAB_ORDER = ["available", "inProgress", "notStarted", "paused", "abandoned", "completed"] as const;

interface CoursesSectionProps {
  coursesByStatus: Record<string, Course[]>;
  role?: string;
}



export default function CoursesSection({ coursesByStatus, role }: CoursesSectionProps) {
  const isStudent = role === "Student";

  const TAB_ORDER = useMemo(() => (isStudent ? STUDENT_TAB_ORDER : ADMIN_TAB_ORDER) as readonly string[], [isStudent]);

  // Labels for display (matching course catalog exactly)
  const TAB_LABELS: Record<string, string> = {
    underReview: "Under Review",
    inProgress: "In Progress",
    notStarted: "Not Started", 
    paused: "Paused",
    abandoned: "Abandoned",
    completed: "Completed",
    published: "Published",
    draft: "Draft",
    rejected: "Rejected",
    archived: "Archived",
    available: "Available",
  };

  type TabKey = string; // using a broad type since we unify dynamic keys

  // Initialize with first available tab for current role
  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ORDER[0]);

  const filtered = useMemo(() => coursesByStatus[activeTab] || [], [coursesByStatus, activeTab]);

  const renderCourseGrid = (courseList: Course[]) => {
    if (courseList.length === 0) {
      return (
        <div className="text-center py-12 bg-accent/50 dark:bg-old-background rounded-lg border">
          <p className="text-sm text-muted-foreground">No courses found in this category.</p>
        </div>
      );
    }

    // Show different amounts based on screen size using Tailwind
    const hasMoreMobile = courseList.length > 1;
    const hasMoreTablet = courseList.length > 2;
    const hasMoreDesktop = courseList.length > 3;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseList.map((course, index) => (
            <div
              key={course.id}
              className={
                index === 0 ? '' : // Always show first item
                index === 1 ? 'hidden md:block' : // Show 2nd item on md+
                index === 2 ? 'hidden lg:block' : // Show 3rd item on lg+
                'hidden' // Hide 4th+ items
              }
            >
              <CourseCard course={course} variant="dashboard" />
            </div>
          ))}
        </div>
        {/* Show "Show more" conditionally based on screen size */}
        {(hasMoreMobile || hasMoreTablet || hasMoreDesktop) && (
          <div className="border rounded-md mt-6">
            <Link 
              href="/course-catalog" 
              className={`w-full block text-center text-blue-500 hover:text-blue-600 text-sm font-medium py-2 hover:bg-accent/50 rounded-md transition-colors ${
                hasMoreDesktop ? '' : hasMoreTablet ? 'lg:hidden' : 'md:hidden'
              }`}
            >
              Show more courses
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">Courses</h2>
        <Link href="/course-catalog" className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors hover:underline focus:outline-none focus:underline">
          View all
        </Link>
      </div>

      <Tabs className="w-full px-2" value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
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