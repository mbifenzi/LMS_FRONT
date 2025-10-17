import React from 'react';

import { fetchTasksByQuest } from '@/lib/api/task-api';

import { ApiQuest, ApiTask } from '@/types/types';

interface TasksSectionProps {
  publishedQuests: ApiQuest[];
}

export default async function TasksSection({
  publishedQuests,
}: TasksSectionProps) {
  const limitedQuests = publishedQuests.slice(0, 3);

  // Fetch tasks for each quest (in parallel)
  const tasksArrays = await Promise.all(
    limitedQuests.map((q) => fetchTasksByQuest(q.id))
  );

  // Build mapping questName -> tasks
  const tasksByQuest: Record<string, ApiTask[]> = {};
  limitedQuests.forEach((quest, idx) => {
    tasksByQuest[quest.name] = tasksArrays[idx];
  });

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold sm:text-xl">Tasks</h2>
        <button
          type="button"
          className="self-start text-sm font-medium text-blue-500 transition-colors hover:text-blue-600 hover:underline focus:underline focus:outline-none sm:self-auto"
        >
          Manage
        </button>
      </div>

      <div className="px-2">
        {Object.keys(tasksByQuest).length === 0 ? (
          <div className="text-muted-foreground py-4 text-sm sm:py-6">
            No tasks yet for published quests.
          </div>
        ) : (
          <>
            <div className="divide-border flex flex-col divide-y">
              {Object.entries(tasksByQuest).map(([questName, questTasks]) => (
                <div key={questName} className="py-6 first:pt-0 last:pb-0">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-blue-600">
                        {questName}
                      </h3>
                    </div>

                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      {(() => {
                        const quest = limitedQuests.find(
                          (q) => q.name === questName
                        );
                        return quest ? (
                          <>
                            <span className="text-muted-foreground flex-shrink-0 rounded-lg border px-2 py-0.5 text-xs">
                              {quest.difficulty}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <div className="h-3 w-3 rounded-full bg-blue-500" />
                              <span>{quest.estimated_duration}m</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <svg
                                className="h-3 w-3"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.402 8.168L12 18.896l-7.336 3.868 1.402-8.168L.132 9.21l8.2-1.192L12 .587z" />
                              </svg>
                              <span>{quest.reward_points}xp</span>
                            </div>
                          </>
                        ) : null;
                      })()}
                    </div>
                  </div>

                  <div className="space-y-1">
                    {questTasks.length === 0 && (
                      <div className="text-muted-foreground text-xs">
                        No tasks for this quest.
                      </div>
                    )}
                    {questTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-2 py-1"
                      >
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                        <div className="min-w-0 flex-1">
                          <p className="text-foreground text-sm">{task.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-md border">
              <button className="hover:bg-accent/50 w-full rounded-md py-2 text-center text-sm font-medium text-blue-500 transition-colors hover:text-blue-600">
                Show more tasks
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
