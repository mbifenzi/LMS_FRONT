"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { coursesByStatus, type Course } from "@/lib/mock-data/courses";
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

    // Responsive limits: 1 on mobile, 2 on tablet, 3 on desktop
    const getLimit = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) return 1; // mobile
        if (window.innerWidth < 1024) return 2; // tablet
        return 3; // desktop
      }
      return 3; // default for SSR
    };

    const [limit, setLimit] = useState(getLimit());
    
    React.useEffect(() => {
      const handleResize = () => setLimit(getLimit());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const visible = courseList.slice(0, limit);
    const hasMore = courseList.length > limit;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((course) => (
            <CourseCard key={course.id} course={course} variant="dashboard" />
          ))}
        </div>
        {hasMore && (
          <div className="border rounded-md mt-6">
            <Link href="/course-catalog" className="w-full block text-center text-blue-500 hover:text-blue-600 text-sm font-medium py-2 hover:bg-accent/50 rounded-md transition-colors">
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