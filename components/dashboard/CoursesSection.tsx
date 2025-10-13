"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { coursesByStatus, type Course } from "@/lib/mock-data/courses";
import { Clock, Star, Award, CheckCircle, Play, Lock, Trophy } from "lucide-react";

const ADMIN_TAB_ORDER = ["published", "draft", "underReview", "rejected", "archived"] as const;
const STUDENT_TAB_ORDER = ["available", "inProgress", "notStarted", "paused", "abandoned", "completed"] as const;

interface CoursesSectionProps {
  coursesByStatus: Record<string, Course[]>;
  role?: string;
}

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <Play className="w-5 h-5 text-blue-500" />;
      case "notStarted":
        return <Clock className="w-5 h-5 text-gray-500" />;
      case "inProgress":
        return <Play className="w-5 h-5 text-green-500" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "paused":
        return <Lock className="w-5 h-5 text-yellow-500" />;
      case "abandoned":
        return <Lock className="w-5 h-5 text-red-500" />;
      default:
        return <Play className="w-5 h-5 text-blue-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Hard":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      {/* Course Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getStatusIcon(course.status)}
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              {course.category}
            </span>
          </div>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2 mb-2">{course.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
      </div>

      {/* Course Stats */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-muted-foreground" />
            <span>{course.points} pts</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-muted-foreground" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-muted-foreground" />
            <span>{course.category}</span>
          </div>
        </div>

        {/* Progress for in-progress courses */}
        {(course.status === "inProgress" || course.status === "paused") && course.progress && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-blue-700 dark:text-blue-400">Progress:</span>
              <span className="font-bold text-blue-800 dark:text-blue-300">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link href={`/course/${course.id}`} className="block">
          <button className="w-full py-2 px-4 rounded-md text-sm font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600">
            {course.status === "completed" ? "View Course" : "Continue Course"}
          </button>
        </Link>
      </div>
    </div>
  );
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

    // Limit to 4 courses maximum in dashboard
    const visible = courseList.slice(0, 4);
    const hasMore = courseList.length > 4;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map((course) => (
            <CourseCard key={course.id} course={course} />
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