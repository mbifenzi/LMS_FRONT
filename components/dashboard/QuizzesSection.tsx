"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { quizzesByStatus, type Quiz } from "@/lib/mock-data/quizzes";
import QuizCard from "@/components/shared/QuizCard";

const ADMIN_TAB_ORDER = ["available", "locked"] as const;
const STUDENT_TAB_ORDER = ["available", "in-progress", "completed", "locked"] as const;

interface QuizzesSectionProps {
  role?: string;
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
    
    useEffect(() => {
      const handleResize = () => setLimit(getLimit());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const visible = quizList.slice(0, limit);
    const hasMore = quizList.length > limit;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} variant="dashboard" />
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