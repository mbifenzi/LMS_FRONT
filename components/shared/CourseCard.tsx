"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Star, Award, Trophy, CheckCircle, Play, Pause, BookOpen } from "lucide-react";
import { Course } from "@/lib/mock-data/courses";

interface CourseCardProps {
  course: Course;
  variant?: "dashboard" | "catalog";
}

export default function CourseCard({ course, variant = "catalog" }: CourseCardProps) {
  const [error, setError] = useState(false);
  const hasUrl = course.coverImage && course.coverImage.trim().length > 0;
  const showPlaceholder = !hasUrl || error;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Advanced":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "Expert":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "inProgress":
        return <Play className="w-4 h-4 text-blue-500" />;
      case "paused":
        return <Pause className="w-4 h-4 text-orange-500" />;
      case "available":
      case "notStarted":
        return <BookOpen className="w-4 h-4 text-gray-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-500" />;
    }
  };

  if (variant === "dashboard") {
    return (
      <Link href={`/course-catalog/${course.id}`} className="block h-full">
        <div className="border rounded-lg overflow-hidden bg-card transition-all duration-200 hover:shadow-md hover:scale-[1.02] h-full flex flex-col">
          {/* Course Image */}
          <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 overflow-hidden">
            {showPlaceholder ? (
              <div className="flex items-center justify-center h-full">
                <BookOpen className="w-12 h-12 text-muted-foreground" />
              </div>
            ) : (
              <Image
                src={course.coverImage || "/images/placeholder-course.jpg"}
                alt={course.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                onError={() => setError(true)}
              />
            )}
          </div>
          
          {/* Course Header */}
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 h-[140px] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between mb-3 flex-shrink-0">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {getStatusIcon(course.status)}
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium truncate">
                  {course.category}
                </span>
              </div>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
              <h3 className="font-semibold text-lg truncate mb-2">{course.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
            </div>
          </div>

          {/* Course Stats */}
          <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{course.duration}h</span>
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
                <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                  <div 
                    className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Catalog variant
  return (
    <Link href={`/course-catalog/${course.id}`} className="block group h-full">
      <div className="border rounded-lg overflow-hidden bg-card shadow-sm transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col">
        {/* Course Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 overflow-hidden">
          {showPlaceholder ? (
            <div className="flex items-center justify-center h-full">
              <BookOpen className="w-12 h-12 text-muted-foreground" />
            </div>
          ) : (
            <Image
              src={course.coverImage || "/images/placeholder-course.jpg"}
              alt={course.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setError(true)}
            />
          )}
        </div>

        {/* Course Content */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
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
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t mt-auto">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}h</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{course.points} pts</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}