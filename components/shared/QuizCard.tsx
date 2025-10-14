"use client";

import React from "react";
import Link from "next/link";
import { Clock, Award, Trophy, CheckCircle, Play, Lock, BookOpen } from "lucide-react";
import { Quiz } from "@/lib/mock-data/quizzes";
import { createSlugWithId } from "@/lib/utils/slug";

interface QuizCardProps {
  quiz: Quiz;
  variant?: "dashboard" | "catalog";
}

export default function QuizCard({ quiz, variant = "catalog" }: QuizCardProps) {
  const quizSlug = createSlugWithId(quiz.title, quiz.id);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Hard":
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
      case "in-progress":
        return <Play className="w-4 h-4 text-blue-500" />;
      case "locked":
        return <Lock className="w-4 h-4 text-gray-500" />;
      case "available":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-500" />;
    }
  };

  if (variant === "dashboard") {
    return (
      <Link href={`/quiz-catalog/${quizSlug}`} className="block h-full">
        <div className="border rounded-lg overflow-hidden bg-card transition-all duration-200 hover:shadow-md hover:scale-[1.02] h-full flex flex-col">
          {/* Quiz Image */}
          <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 overflow-hidden">
            <div className="flex items-center justify-center h-full">
              <Trophy className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>
          
          {/* Quiz Header */}
          <div className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 h-[140px] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between mb-3 flex-shrink-0">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {getStatusIcon(quiz.status)}
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium truncate">
                  {quiz.category}
                </span>
              </div>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getDifficultyColor(quiz.difficulty)}`}>
                {quiz.difficulty}
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
              <h3 className="font-semibold text-lg truncate mb-2">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
            </div>
          </div>

          {/* Quiz Stats */}
          <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{quiz.duration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span>{quiz.points} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-muted-foreground" />
                <span>{quiz.questions} questions</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Pass: {quiz.passingScore}%
              </div>
            </div>

            {/* Best Score for completed quizzes */}
            {quiz.status === "completed" && quiz.bestScore && (
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700 dark:text-green-400">Best Score:</span>
                  <span className="font-bold text-green-800 dark:text-green-300">{quiz.bestScore}%</span>
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
    <div className="border rounded-lg overflow-hidden bg-card shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      {/* Quiz Header */}
      <div className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 h-[140px] flex flex-col overflow-hidden">
        <div className="flex items-start justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {getStatusIcon(quiz.status)}
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium truncate">
              {quiz.category}
            </span>
          </div>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-center min-h-0 overflow-hidden">
          <h3 className="font-semibold text-lg truncate mb-2">{quiz.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
        </div>
      </div>

      {/* Quiz Stats */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{quiz.duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-muted-foreground" />
            <span>{quiz.points} pts</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-muted-foreground" />
            <span>{quiz.questions} questions</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Pass: {quiz.passingScore}%
          </div>
        </div>

        {/* Progress/Score for completed quizzes */}
        {quiz.status === "completed" && quiz.bestScore && (
          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700 dark:text-green-400">Best Score:</span>
              <span className="font-bold text-green-800 dark:text-green-300">{quiz.bestScore}%</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto">
          {quiz.status === "locked" ? (
            <button 
              className="w-full py-2 px-4 rounded-md text-sm font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
              disabled
            >
              🔒 Locked
            </button>
          ) : (
            <Link href={`/quiz-catalog/${quizSlug}`}>
              <button 
                className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  quiz.status === "available" 
                    ? "bg-blue-500 text-white hover:bg-blue-600" 
                    : quiz.status === "in-progress"
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : quiz.status === "completed"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {quiz.status === "available" && "Start Quiz"}
                {quiz.status === "in-progress" && "Continue Quiz"}
                {quiz.status === "completed" && "Retake Quiz"}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}