import React from "react";
import { ApiQuest, ApiTask } from "@/types/types";
import { fetchTasksByQuest } from "@/lib/api/task-api";

interface TasksSectionProps {
  publishedQuests: ApiQuest[];
}

export default async function TasksSection({ publishedQuests }: TasksSectionProps) {
  const limitedQuests = publishedQuests.slice(0, 3);

  // Fetch tasks for each quest (in parallel)
  const tasksArrays = await Promise.all(limitedQuests.map((q) => fetchTasksByQuest(q.id)));

  // Build mapping questName -> tasks
  const tasksByQuest: Record<string, ApiTask[]> = {};
  limitedQuests.forEach((quest, idx) => {
    tasksByQuest[quest.name] = tasksArrays[idx];
  });

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">Tasks</h2>
        <button type="button" className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors hover:underline focus:outline-none focus:underline self-start sm:self-auto">
          Manage
        </button>
      </div>

      <div className="px-2">
        {Object.keys(tasksByQuest).length === 0 ? (
          <div className="text-sm text-muted-foreground py-4 sm:py-6">No tasks yet for published quests.</div>
        ) : (
          <>
            <div className="flex flex-col divide-y divide-border">
              {Object.entries(tasksByQuest).map(([questName, questTasks]) => (
                <div key={questName} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg text-blue-600">{questName}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {(() => {
                        const quest = limitedQuests.find((q) => q.name === questName);
                        return quest ? (
                          <>
                            <span className="px-2 py-0.5 text-xs rounded-lg border text-muted-foreground flex-shrink-0">{quest.difficulty}</span>
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-blue-500" />
                              <span>{quest.estimated_duration}m</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
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
                    {questTasks.length === 0 && <div className="text-xs text-muted-foreground">No tasks for this quest.</div>}
                    {questTasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-2 py-1">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{task.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-md mt-10">
              <button className="w-full text-center text-blue-500 hover:text-blue-600 text-sm font-medium py-2 hover:bg-accent/50 rounded-md transition-colors">Show more tasks</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
