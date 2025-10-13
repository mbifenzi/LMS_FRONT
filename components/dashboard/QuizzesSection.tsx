"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { quizzesByStatus, type Quiz } from "@/lib/mock-data/quizzes";
import { Clock, Award, CheckCircle, Play, Lock, Trophy } from "lucide-react";

const ADMIN_TAB_ORDER = ["available", "locked"] as const;
const STUDENT_TAB_ORDER = ["available", "in-progress", "completed", "locked"] as const;

interface QuizzesSectionProps {
  role?: string;
}

interface QuizCardProps {
  quiz: Quiz;
}

function QuizCard({ quiz }: QuizCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <Play className="w-5 h-5 text-blue-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-orange-500" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "locked":
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <Play className="w-5 h-5 text-blue-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden bg-card transition-all duration-200 ${
      quiz.status === "locked" ? "opacity-60" : "hover:shadow-md hover:scale-[1.02]"
    }`}>
      {/* Quiz Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
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
            <span>{quiz.duration}</span>
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
        <Link href={`/quiz/${quiz.id}`} className="block">
          <button 
            className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              quiz.status === "available" 
                ? "bg-blue-500 text-white hover:bg-blue-600" 
                : quiz.status === "in-progress"
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : quiz.status === "completed"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={quiz.status === "locked"}
          >
            {quiz.status === "available" && "Start Quiz"}
            {quiz.status === "in-progress" && "Continue Quiz"}
            {quiz.status === "completed" && "Retake Quiz"}
            {quiz.status === "locked" && "🔒 Locked"}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function QuizzesSection({ role }: QuizzesSectionProps) {
  const isStudent = role === "Student";

  const TAB_ORDER = useMemo(() => (isStudent ? STUDENT_TAB_ORDER : ADMIN_TAB_ORDER) as readonly string[], [isStudent]);

  // Labels for display (matching quiz catalog exactly)
  const TAB_LABELS: Record<string, string> = {
    available: "Available",
    "in-progress": "In Progress", 
    completed: "Completed",
    locked: "Locked",
  };

  type TabKey = string;

  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ORDER[0]);

  const filtered = useMemo(() => quizzesByStatus[activeTab as keyof typeof quizzesByStatus] || [], [activeTab]);

  const renderQuizGrid = (quizList: Quiz[]) => {
    if (quizList.length === 0) {
      return (
        <div className="text-center py-12 bg-accent/50 dark:bg-old-background rounded-lg border">
          <p className="text-sm text-muted-foreground">No quizzes found in this category.</p>
        </div>
      );
    }

    // Limit to 4 quizzes maximum in dashboard
    const visible = quizList.slice(0, 4);
    const hasMore = quizList.length > 4;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
        {hasMore && (
          <div className="border rounded-md mt-6">
            <Link href="/quiz-catalog" className="w-full block text-center text-blue-500 hover:text-blue-600 text-sm font-medium py-2 hover:bg-accent/50 rounded-md transition-colors">
              Show more quizzes
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">Quizzes</h2>
        <Link href="/quiz-catalog" className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors hover:underline focus:outline-none focus:underline">
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
            {key === activeTab ? renderQuizGrid(filtered) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}