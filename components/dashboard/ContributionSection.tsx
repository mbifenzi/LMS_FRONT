"use client";

import React from "react";
import { ContributionData } from "@/lib/dashboard-data";

interface ContributionActivityProps {
  contributions: ContributionData;
}

export default function ContributionActivity({ contributions }: ContributionActivityProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold">Contribution activity</h3>

      <div className="space-y-6 px-2 pt-4">
        {/* Month header */}
        <div className="text-sm font-medium text-muted-foreground">{contributions.month}</div>

        {/* Activities Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9-3a1 1 0 11-2 0 1 1 0 012 0zM8 7.5A1.5 1.5 0 107 9v3a.5.5 0 001 0V9a1.5 1.5 0 00.5-1.5z"
              />
            </svg>
            <span className="font-medium">
              Completed {contributions.activities.total} learning activities in {contributions.activities.categories.length} categories
            </span>
            <div className="ml-auto">
              <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
          </div>

          <div className="ml-6 space-y-2">
            {contributions.activities.categories.map((category) => (
              <div key={category.name} className="flex items-center gap-3">
                <span className="text-blue-500 font-medium min-w-0 flex-shrink-0">{category.name}</span>
                <span className="text-muted-foreground text-sm">{category.count} activities</span>
                <div className="flex-1 ml-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${category.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Submissions Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.5 1.5H4.75a.25.25 0 00-.25.25V6.5h6.5V2.25a.25.25 0 00-.25-.25zM11 8H5v5.25c0 .138.112.25.25.25h5.5a.25.25 0 00.25-.25V8zM4.75 0A1.75 1.75 0 003 1.75v12.5c0 .966.784 1.75 1.75 1.75h6.5A1.75 1.75 0 0013 14.25V1.75A1.75 1.75 0 0011.25 0H4.75z"
              />
            </svg>
            <span className="font-medium">
              Submitted {contributions.submissions.total} tasks in {contributions.submissions.questName} quest
            </span>
            <div className="ml-auto">
              <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
          </div>

          <div className="ml-6 space-y-2">
            <div className="text-muted-foreground text-sm mb-3">
              <span className="font-medium">{contributions.submissions.questName}</span>
              <span className="ml-4 inline-flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-1.5 py-0.5 rounded text-xs">
                {contributions.submissions.completed}
                <span className="ml-1">completed</span>
              </span>
            </div>

            {contributions.submissions.items.map((item, index) => (
              <div key={index} className="flex items-center gap-2 py-1">
                {item.type === "completed" ? (
                  <svg className="w-4 h-4 text-green-500" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-orange-500" viewBox="0 0 16 16" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1.5a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25V8.5h-.75a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"
                    />
                  </svg>
                )}
                <span className="font-medium">{item.title}</span>
                <span className="ml-auto text-muted-foreground text-sm">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Show more activity button */}
        <div className="border rounded-md mt-10">
          <button className="w-full text-center text-blue-500 hover:text-blue-600 text-sm font-medium py-2 hover:bg-accent/50 rounded-md transition-colors">Show more activity</button>
        </div>
      </div>
    </div>
  );
}
