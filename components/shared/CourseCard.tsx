'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Pause,
  Play,
  Star,
  Trophy,
} from 'lucide-react';

import { Course } from '@/lib/mock-data/courses';
import { createSlugWithId } from '@/lib/utils/slug';

interface CourseCardProps {
  course: Course;
  variant?: 'dashboard' | 'catalog';
}

export default function CourseCard({
  course,
  variant = 'catalog',
}: CourseCardProps) {
  const [error, setError] = useState(false);
  const hasUrl = course.coverImage && course.coverImage.trim().length > 0;
  const showPlaceholder = !hasUrl || error;
  const courseSlug = createSlugWithId(course.name, course.id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Expert':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inProgress':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-orange-500" />;
      case 'available':
      case 'notStarted':
        return <BookOpen className="h-4 w-4 text-gray-500" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  if (variant === 'dashboard') {
    return (
      <Link href={`/course-catalog/${courseSlug}`} className="block h-full">
        <div className="bg-card flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
          {/* Course Image */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
            {showPlaceholder ? (
              <div className="flex h-full items-center justify-center">
                <BookOpen className="text-muted-foreground h-12 w-12" />
              </div>
            ) : (
              <Image
                src={course.coverImage || '/images/placeholder-course.jpg'}
                alt={course.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                onError={() => setError(true)}
              />
            )}
          </div>

          {/* Course Header */}
          <div className="flex h-[140px] flex-col overflow-hidden border-b bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="mb-3 flex flex-shrink-0 items-start justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                {getStatusIcon(course.status)}
                <span className="text-muted-foreground truncate text-xs font-medium tracking-wide uppercase">
                  {course.category}
                </span>
              </div>
              <span
                className={`inline-block flex-shrink-0 rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(course.difficulty)}`}
              >
                {course.difficulty}
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
              <h3 className="mb-2 truncate text-lg font-semibold">
                {course.name}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {course.description}
              </p>
            </div>
          </div>

          {/* Course Stats */}
          <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <span>{course.duration}h</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-muted-foreground h-4 w-4" />
                <span>{course.points} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="text-muted-foreground h-4 w-4" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-muted-foreground h-4 w-4" />
                <span>{course.category}</span>
              </div>
            </div>

            {/* Progress for in-progress courses */}
            {(course.status === 'inProgress' || course.status === 'paused') &&
              course.progress && (
                <div className="rounded-md bg-blue-50 p-2 dark:bg-blue-900/20">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-blue-700 dark:text-blue-400">
                      Progress:
                    </span>
                    <span className="font-bold text-blue-800 dark:text-blue-300">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-blue-200 dark:bg-blue-800">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all duration-500 dark:bg-blue-400"
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
    <Link href={`/course-catalog/${courseSlug}`} className="group block h-full">
      <div className="bg-card flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
        {/* Course Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
          {showPlaceholder ? (
            <div className="flex h-full items-center justify-center">
              <BookOpen className="text-muted-foreground h-12 w-12" />
            </div>
          ) : (
            <Image
              src={course.coverImage || '/images/placeholder-course.jpg'}
              alt={course.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setError(true)}
            />
          )}
        </div>

        {/* Course Content */}
        <div className="flex flex-1 flex-col space-y-3 p-4">
          {/* Title and Difficulty */}
          <div className="space-y-2">
            <h3 className="line-clamp-2 text-lg font-semibold transition-colors group-hover:text-blue-600">
              {course.name}
            </h3>
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium capitalize ${getDifficultyColor(course.difficulty)}`}
            >
              {course.difficulty.toLowerCase()}
            </span>
          </div>

          {/* Description */}
          {course.description && (
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {course.description}
            </p>
          )}

          {/* Stats */}
          <div className="text-muted-foreground mt-auto flex items-center justify-between border-t pt-2 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}h</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{course.points} pts</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
