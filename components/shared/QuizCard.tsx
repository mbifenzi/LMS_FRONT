"use client";

import React from "react";
import Link from "next/link";
import { Clock, Award, Trophy, CheckCircle, Play, Lock, BookOpen } from "lucide-react";
import { Quiz } from "@/lib/mock-data/quizzes";

interface QuizCardProps {
  quiz: Quiz;
  variant?: "dashboard" | "catalog";
}

export default function QuizCard({ quiz, variant = "catalog" }: QuizCardProps) {
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
      <Link href={`/quiz-catalog/${quiz.id}`} className="block">
        <div className="border rounded-lg overflow-hidden bg-card transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          {/* Quiz Header */}
          <div className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(quiz.status)}
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  {quiz.category}
                </span>
              </div>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                {quiz.difficulty}
              </span>
            </div>
            <h3 className="font-semibold text-lg line-clamp-2 mb-2">{quiz.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
          </div>

          {/* Quiz Stats */}
          <div className="p-4 space-y-3">
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
    <div className="border rounded-lg overflow-hidden bg-card shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      {/* Quiz Header */}
      <div className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getStatusIcon(quiz.status)}
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              {quiz.category}
            </span>
          </div>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </span>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2 mb-2">{quiz.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
      </div>

      {/* Quiz Stats */}
      <div className="p-4 space-y-3">
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
        {quiz.status === "locked" ? (
          <button 
            className="w-full py-2 px-4 rounded-md text-sm font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
            disabled
          >
            🔒 Locked
          </button>
        ) : (
          <Link href={`/quiz-catalog/${quiz.id}`}>
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
  );
}