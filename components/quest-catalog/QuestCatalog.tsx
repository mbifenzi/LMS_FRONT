"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ApiQuest } from "@/types/types";
import { QuestsByStatus } from "./QuestContent";
import { Clock, Star } from "lucide-react";
import QuestFilters from "./QuestFilters";
import Image from "next/image";
import Link from "next/link";

const ADMIN_TAB_ORDER = ["published", "draft", "underReview", "rejected", "archived"] as const;
const STUDENT_TAB_ORDER = ["available", "inProgress", "notStarted", "paused", "abandoned", "completed"] as const;

interface QuestCatalogClientProps {
  questsByStatus: QuestsByStatus;
  role?: string; // "Student" or other (admin)
}

export default function QuestCatalogClient({ questsByStatus, role }: QuestCatalogClientProps) {
  const isStudent = role === "Student";

  // Use provided quests directly (server already fetched 'available' for students)
  const dataByStatus = questsByStatus;

  // Memoize tab order based on role
  const TAB_ORDER = useMemo(() => (isStudent ? STUDENT_TAB_ORDER : ADMIN_TAB_ORDER) as readonly string[], [isStudent]);

  // Labels for display
  const TAB_LABELS: Record<string, string> = {
    underReview: "Under Review",
    inProgress: "In Progress",
    notStarted: "Not Started",
    paused: "Paused",
    abandoned: "Abandoned",
    completed: "Completed",
    published: "Published",
    draft: "Draft",
    rejected: "Rejected",
    archived: "Archived",
    available: "Available",
  };

  type TabKey = string;

  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ORDER[0]);
  // Ensure active tab remains valid when role changes
  useEffect(() => {
    if (!TAB_ORDER.includes(activeTab)) {
      setActiveTab(TAB_ORDER[0]);
    }
  }, [TAB_ORDER, activeTab]);

  const [search, setSearch] = useState("");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]); // multi-select (empty = ALL)
  const [sortOption, setSortOption] = useState<string>("POINTS_DESC");

  const filteredQuests = useMemo(() => {
    const base = dataByStatus[activeTab] || [];
    // text search
    let list = !search.trim()
      ? base
      : base.filter((item) => {
          const q = search.toLowerCase();
          return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
        });
    // difficulty filter (multi) -> empty array means ALL
    if (selectedDifficulties.length > 0) {
      list = list.filter((q) => selectedDifficulties.includes(q.difficulty));
    }
    // sorting
    list = [...list];
    switch (sortOption) {
      case "POINTS_ASC":
        list.sort((a, b) => a.reward_points - b.reward_points);
        break;
      case "POINTS_DESC":
        list.sort((a, b) => b.reward_points - a.reward_points);
        break;
      case "DURATION_ASC":
        list.sort((a, b) => a.estimated_duration - b.estimated_duration);
        break;
      case "DURATION_DESC":
        list.sort((a, b) => b.estimated_duration - a.estimated_duration);
        break;
    }
    return list;
  }, [dataByStatus, activeTab, search, selectedDifficulties, sortOption]);

  function QuestCard({ quest }: { quest: ApiQuest }) {
    const [error, setError] = useState(false);
    const hasUrl = quest.cover_image_url && quest.cover_image_url.trim().length > 0;
    const showPlaceholder = !hasUrl || error;

    return (
      <div className="group relative flex flex-col transition rounded-lg">
        <Link
          href={`/quest/${quest.id}`}
          aria-label={quest.name}
          className="relative w-full aspect-[4/5] bg-muted overflow-hidden rounded-lg flex items-center justify-center focus:outline-none group-hover:scale-105 duration-300 transition-transform "
        >
          {showPlaceholder ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-400 dark:text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              {/* <span className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/25 transition-colors duration-300 mix-blend-multiply pointer-events-none" /> */}
            </div>
          ) : (
            <>
              <Image
                src={quest.cover_image_url}
                alt={quest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={false}
                className="object-cover"
                onError={() => setError(true)}
              />
              {/* <span className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/25 transition-colors duration-300 mix-blend-multiply pointer-events-none" /> */}
            </>
          )}
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide bg-black/60 text-white backdrop-blur-sm">{quest.difficulty}</span>
          <span className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/25 transition-colors duration-300 mix-blend-multiply pointer-events-none" />
        </Link>
        <div className="p-4 px-0 flex flex-col gap-3">
          <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="w-3 h-3" /> {quest.reward_points} pts
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {quest.estimated_duration}h
            </span>
          </div>

          <Link href={`/quest/${quest.id}`} className="text-sm font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors focus:outline-none focus:underline">
            {quest.name}
          </Link>

          <p className="text-xs text-muted-foreground line-clamp-2">{quest.description}</p>
        </div>
      </div>
    );
  }

  const renderGrid = (list: ApiQuest[]) => {
    if (!list.length) {
      return (
        <div className="text-center py-16 border rounded-xl bg-accent/40 dark:bg-old-background/40">
          <p className="text-sm text-muted-foreground">No quests found.</p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((quest) => {
          return <QuestCard key={quest.id} quest={quest} />;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quest Catalog</h1>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quests..."
            className="w-full md:w-64 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)} className="w-full">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <TabsList className="flex flex-wrap gap-1">
            {TAB_ORDER.map((key) => (
              <TabsTrigger key={key} value={key} className="capitalize">
                {TAB_LABELS[key] || key}
              </TabsTrigger>
            ))}
          </TabsList>

          <QuestFilters selectedDifficulties={selectedDifficulties} onDifficultiesChange={setSelectedDifficulties} sortOption={sortOption} onSortChange={setSortOption} />
        </div>

        {TAB_ORDER.map((key) => (
          <TabsContent key={key} value={key} className="mt-6 focus-visible:outline-none">
            {key === activeTab ? renderGrid(filteredQuests) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
