'use client';

import React, { useMemo, useState } from 'react';

import Link from 'next/link';

import QuizCard from '@/components/shared/QuizCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { type Quiz, quizzesByStatus } from '@/lib/mock-data/quizzes';

const ADMIN_TAB_ORDER = ['available', 'locked'] as const;
const STUDENT_TAB_ORDER = [
  'available',
  'in-progress',
  'completed',
  'locked',
] as const;

interface QuizzesSectionProps {
  role?: string;
}

export default function QuizzesSection({ role }: QuizzesSectionProps) {
  const isStudent = role === 'Student';

  const TAB_ORDER = useMemo(
    () =>
      (isStudent ? STUDENT_TAB_ORDER : ADMIN_TAB_ORDER) as readonly string[],
    [isStudent]
  );

  // Labels for display (matching quiz catalog exactly)
  const TAB_LABELS: Record<string, string> = {
    available: 'Available',
    'in-progress': 'In Progress',
    completed: 'Completed',
    locked: 'Locked',
  };

  type TabKey = string;

  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ORDER[0]);

  const filtered = useMemo(
    () => quizzesByStatus[activeTab as keyof typeof quizzesByStatus] || [],
    [activeTab]
  );

  const renderQuizGrid = (quizList: Quiz[]) => {
    if (quizList.length === 0) {
      return (
        <div className="bg-accent/50 dark:bg-old-background rounded-lg border py-12 text-center">
          <p className="text-muted-foreground text-sm">
            No quizzes found in this category.
          </p>
        </div>
      );
    }

    // Show different amounts based on screen size using Tailwind
    const hasMoreMobile = quizList.length > 1;
    const hasMoreTablet = quizList.length > 2;
    const hasMoreDesktop = quizList.length > 3;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quizList.map((quiz, index) => (
            <div
              key={quiz.id}
              className={
                index === 0
                  ? '' // Always show first item
                  : index === 1
                    ? 'hidden md:block' // Show 2nd item on md+
                    : index === 2
                      ? 'hidden lg:block' // Show 3rd item on lg+
                      : 'hidden' // Hide 4th+ items
              }
            >
              <QuizCard quiz={quiz} variant="dashboard" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold sm:text-xl">Quizzes</h2>
        <Link
          href="/quiz-catalog"
          className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-600 hover:underline focus:underline focus:outline-none"
        >
          View all
        </Link>
      </div>

      <Tabs
        className="w-full px-2"
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabKey)}
      >
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
