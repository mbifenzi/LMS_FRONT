'use client';

import React from 'react';

import Link from 'next/link';

import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Lock,
  Play,
  Trophy,
} from 'lucide-react';

import { Quiz } from '@/lib/mock-data/quizzes';
import { createSlugWithId } from '@/lib/utils/slug';

interface QuizCardProps {
  quiz: Quiz;
  variant?: 'dashboard' | 'catalog';
}

export default function QuizCard({ quiz, variant = 'catalog' }: QuizCardProps) {
  const quizSlug = createSlugWithId(quiz.title, quiz.id);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard':
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
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'locked':
        return <Lock className="h-4 w-4 text-gray-500" />;
      case 'available':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  if (variant === 'dashboard') {
    return (
      <Link href={`/quiz-catalog/${quizSlug}`} className="block h-full">
        <div className="bg-card flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
          {/* Quiz Image */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30">
            <div className="flex h-full items-center justify-center">
              <Trophy className="text-muted-foreground h-12 w-12" />
            </div>
          </div>

          {/* Quiz Header */}
          <div className="flex h-[140px] flex-col overflow-hidden border-b bg-gradient-to-r from-green-50 to-blue-50 p-4 dark:from-green-900/20 dark:to-blue-900/20">
            <div className="mb-3 flex flex-shrink-0 items-start justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                {getStatusIcon(quiz.status)}
                <span className="text-muted-foreground truncate text-xs font-medium tracking-wide uppercase">
                  {quiz.category}
                </span>
              </div>
              <span
                className={`inline-block flex-shrink-0 rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}
              >
                {quiz.difficulty}
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
              <h3 className="mb-2 truncate text-lg font-semibold">
                {quiz.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {quiz.description}
              </p>
            </div>
          </div>

          {/* Quiz Stats */}
          <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <span>{quiz.duration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-muted-foreground h-4 w-4" />
                <span>{quiz.points} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="text-muted-foreground h-4 w-4" />
                <span>{quiz.questions} questions</span>
              </div>
              <div className="text-muted-foreground text-xs">
                Pass: {quiz.passingScore}%
              </div>
            </div>

            {/* Best Score for completed quizzes */}
            {quiz.status === 'completed' && quiz.bestScore && (
              <div className="rounded-md bg-green-50 p-2 dark:bg-green-900/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700 dark:text-green-400">
                    Best Score:
                  </span>
                  <span className="font-bold text-green-800 dark:text-green-300">
                    {quiz.bestScore}%
                  </span>
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
    <div className="bg-card flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Quiz Header */}
      <div className="flex h-[140px] flex-col overflow-hidden border-b bg-gradient-to-r from-green-50 to-blue-50 p-4 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="mb-3 flex flex-shrink-0 items-start justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {getStatusIcon(quiz.status)}
            <span className="text-muted-foreground truncate text-xs font-medium tracking-wide uppercase">
              {quiz.category}
            </span>
          </div>
          <span
            className={`inline-block flex-shrink-0 rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}
          >
            {quiz.difficulty}
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
          <h3 className="mb-2 truncate text-lg font-semibold">{quiz.title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {quiz.description}
          </p>
        </div>
      </div>

      {/* Quiz Stats */}
      <div className="flex flex-1 flex-col space-y-3 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground h-4 w-4" />
            <span>{quiz.duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="text-muted-foreground h-4 w-4" />
            <span>{quiz.points} pts</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="text-muted-foreground h-4 w-4" />
            <span>{quiz.questions} questions</span>
          </div>
          <div className="text-muted-foreground text-xs">
            Pass: {quiz.passingScore}%
          </div>
        </div>

        {/* Progress/Score for completed quizzes */}
        {quiz.status === 'completed' && quiz.bestScore && (
          <div className="rounded-md bg-green-50 p-2 dark:bg-green-900/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700 dark:text-green-400">
                Best Score:
              </span>
              <span className="font-bold text-green-800 dark:text-green-300">
                {quiz.bestScore}%
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto">
          {quiz.status === 'locked' ? (
            <button
              className="w-full cursor-not-allowed rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-500"
              disabled
            >
              🔒 Locked
            </button>
          ) : (
            <Link href={`/quiz-catalog/${quizSlug}`}>
              <button
                className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  quiz.status === 'available'
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : quiz.status === 'in-progress'
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : quiz.status === 'completed'
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-300 text-gray-500'
                }`}
              >
                {quiz.status === 'available' && 'Start Quiz'}
                {quiz.status === 'in-progress' && 'Continue Quiz'}
                {quiz.status === 'completed' && 'Retake Quiz'}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
