"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ApiCourse } from "@/types/types";
import { CoursesByStatus } from "./CourseContent";
import { Clock, Star } from "lucide-react";
import CourseFilters from "./CourseFilters";
import Image from "next/image";
import Link from "next/link";

const ADMIN_TAB_ORDER = ["published", "draft", "underReview", "rejected", "archived"] as const;
const STUDENT_TAB_ORDER = ["available", "inProgress", "notStarted", "paused", "abandoned", "completed"] as const;

interface CourseCatalogClientProps {
  coursesByStatus: CoursesByStatus;
  role?: string; // "Student" or other (admin)
}

export default function CourseCatalogClient({ coursesByStatus, role }: CourseCatalogClientProps) {
  const isStudent = role === "Student";

  // Use provided courses directly (server already fetched 'available' for students)
  const dataByStatus = coursesByStatus;

  // Memoize tab order based on role
  const TAB_ORDER = useMemo(() => (isStudent ? STUDENT_TAB_ORDER : ADMIN_TAB_ORDER) as readonly string[], [isStudent]);

  // Labels for display
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

  type TabKey = string;

  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ORDER[0]);
  // Ensure active tab remains valid when role changes
  useEffect(() => {
    if (!TAB_ORDER.includes(activeTab)) {
      setActiveTab(TAB_ORDER[0]);
    }
  }, [TAB_ORDER, activeTab]);

  const [search, setSearch] = useState("");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]); // multi-select (empty = ALL)
  const [sortOption, setSortOption] = useState<string>("POINTS_DESC");

  const filteredCourses = useMemo(() => {
    const base = dataByStatus[activeTab] || [];
    // text search
    const byText = base.filter((course) => course.name.toLowerCase().includes(search.toLowerCase()) || course.description?.toLowerCase().includes(search.toLowerCase()));
    // difficulty filter
    const byDifficulty = selectedDifficulties.length === 0 ? byText : byText.filter((course) => selectedDifficulties.includes(course.difficulty));

    // sort
    const sorted = [...byDifficulty];
    switch (sortOption) {
      case "POINTS_ASC":
        sorted.sort((a, b) => a.reward_points - b.reward_points);
        break;
      case "POINTS_DESC":
        sorted.sort((a, b) => b.reward_points - a.reward_points);
        break;
      case "DURATION_ASC":
        sorted.sort((a, b) => a.estimated_duration - b.estimated_duration);
        break;
      case "DURATION_DESC":
        sorted.sort((a, b) => b.estimated_duration - a.estimated_duration);
        break;
      case "DIFFICULTY_ASC":
        sorted.sort((a, b) => {
          const order = { BEGINNER: 0, INTERMEDIATE: 1, ADVANCED: 2, EXPERT: 3 };
          return order[a.difficulty] - order[b.difficulty];
        });
        break;
      case "DIFFICULTY_DESC":
        sorted.sort((a, b) => {
          const order = { BEGINNER: 0, INTERMEDIATE: 1, ADVANCED: 2, EXPERT: 3 };
          return order[b.difficulty] - order[a.difficulty];
        });
        break;
    }

    return sorted;
  }, [dataByStatus, activeTab, search, selectedDifficulties, sortOption]);

  const renderCourseGrid = (courseList: ApiCourse[]) => {
    if (courseList.length === 0) {
      return (
        <div className="text-center py-12 bg-accent/50 dark:bg-old-background rounded-lg border">
          <p className="text-sm text-muted-foreground">No courses found in this category.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {courseList.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Course Catalog</h1>
          <p className="text-muted-foreground text-sm">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
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
      <Tabs className="w-full" value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
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

interface CourseCardProps {
  course: ApiCourse;
}

function CourseCard({ course }: CourseCardProps) {
  const [error, setError] = useState(false);
  const hasUrl = course.cover_image_url && course.cover_image_url.trim().length > 0;
  const showPlaceholder = !hasUrl || error;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "INTERMEDIATE":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "ADVANCED":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "EXPERT":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <Link href={`/course/${course.id}`} className="block group">
      <div className="border rounded-lg overflow-hidden bg-card hover:bg-accent/30 transition-colors h-full">
        {/* Course Image */}
        <div className="relative aspect-video bg-muted overflow-hidden">
          {showPlaceholder ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-gray-400 dark:text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          ) : (
            <Image
              src={course.cover_image_url}
              alt={course.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setError(true)}
            />
          )}
        </div>

        {/* Course Content */}
        <div className="p-4 space-y-3">
          {/* Title and Difficulty */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
              {course.name}
            </h3>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full capitalize ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty.toLowerCase()}
            </span>
          </div>

          {/* Description */}
          {course.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {course.description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.estimated_duration}h</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{course.reward_points} pts</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}