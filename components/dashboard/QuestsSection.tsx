'use client';

import React, { useMemo, useState } from 'react';

import Link from 'next/link';

import { Clock, Star } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ApiQuest } from '@/types/types';

const ADMIN_TAB_ORDER = [
  'published',
  'draft',
  'underReview',
  'rejected',
  'archived',
] as const;
const STUDENT_TAB_ORDER = [
  'inProgress',
  'notStarted',
  'paused',
  'abandoned',
  'completed',
] as const;

interface QuestsSectionProps {
  questsByStatus: Record<string, ApiQuest[]>;
  role?: string;
}

export default function QuestsSection({
  questsByStatus,
  role,
}: QuestsSectionProps) {
  const isStudent = role === 'Student';

  const TAB_ORDER = useMemo(
    () =>
      (isStudent ? STUDENT_TAB_ORDER : ADMIN_TAB_ORDER) as readonly string[],
    [isStudent]
  );

  // Labels for display (fallback to the raw key if not found)
  const TAB_LABELS: Record<string, string> = {
    underReview: 'Under Review',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    paused: 'Paused',
    abandoned: 'Abandoned',
    completed: 'Completed',
    published: 'Published',
    draft: 'Draft',
    rejected: 'Rejected',
    archived: 'Archived',
  };

  type TabKey = string; // using a broad type since we unify dynamic keys

  // Initialize with first available tab for current role
  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ORDER[0]);

  const filtered = useMemo(
    () => questsByStatus[activeTab] || [],
    [questsByStatus, activeTab]
  );

  const renderQuestGrid = (questList: ApiQuest[]) => {
    if (questList.length === 0) {
      return (
        <div className="bg-accent/50 dark:bg-old-background rounded-lg border py-12 text-center">
          <p className="text-muted-foreground text-sm">
            No quests found in this category.
          </p>
        </div>
      );
    }

    const visible = questList.slice(0, 6);
    const hasMore = questList.length > 6;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {visible.map((quest) => (
            <div
              key={quest.id}
              className="bg-card hover:bg-accent/50 dark:hover:bg-old-background flex min-h-[100px] flex-col justify-between rounded-lg border p-3 transition-colors dark:bg-black"
            >
              <div className="space-y-2">
                <div className="flex gap-2.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 flex-shrink-0 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <Link
                        href={`/quest-catalog/${quest.id}`}
                        className="truncate text-sm font-medium text-blue-600 hover:underline"
                      >
                        {quest.name}
                      </Link>
                      {quest.difficulty && (
                        <span className="text-muted-foreground flex-shrink-0 rounded-md border px-1.5 py-0.5 text-[10px]">
                          {quest.difficulty}
                        </span>
                      )}
                    </div>
                    {quest.description && (
                      <p className="text-muted-foreground mt-0.5 line-clamp-2 text-[11px] leading-snug">
                        {quest.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-muted-foreground mt-2 flex items-center gap-3 text-[11px]">
                {typeof quest.estimated_duration !== 'undefined' && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    <span>{quest.estimated_duration}h</span>
                  </div>
                )}
                {typeof quest.reward_points !== 'undefined' && (
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3 w-3" />
                    <span>{quest.reward_points}pts</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-10 rounded-md border">
            <Link
              href="/quest-catalog"
              className="hover:bg-accent/50 block w-full rounded-md py-2 text-center text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
            >
              Show more quests
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold sm:text-xl">Quests</h2>
        <Link
          href="/quest-catalog"
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
            {key === activeTab ? renderQuestGrid(filtered) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
