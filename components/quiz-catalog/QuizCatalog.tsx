"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { quizzesByStatus, type Quiz } from "@/lib/mock-data/quizzes";
import QuizCard from "@/components/shared/QuizCard";
import QuizFilters from "./QuizFilters";

const ADMIN_TAB_ORDER = ["available", "locked"] as const;
const STUDENT_TAB_ORDER = ["available", "in-progress", "completed", "locked"] as const;

interface QuizCatalogClientProps {
  role?: string; // "Student" or other (admin)
}

export default function QuizCatalogClient({ role }: QuizCatalogClientProps) {
  const isStudent = role === "Student";

  // Memoize tab order based on role
  const TAB_ORDER = useMemo(() => (isStudent ? STUDENT_TAB_ORDER : ADMIN_TAB_ORDER) as readonly string[], [isStudent]);

  // Labels for display
  const TAB_LABELS: Record<string, string> = {
    available: "Available",
    "in-progress": "In Progress", 
    completed: "Completed",
    locked: "Locked",
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("POINTS_DESC");

  const filteredQuizzes = useMemo(() => {
    const base = quizzesByStatus[activeTab as keyof typeof quizzesByStatus] || [];
    // text search
    const byText = base.filter((quiz) => 
      quiz.title.toLowerCase().includes(search.toLowerCase()) || 
      quiz.description?.toLowerCase().includes(search.toLowerCase())
    );
    // difficulty filter
    const byDifficulty = selectedDifficulties.length === 0 ? byText : byText.filter((quiz) => selectedDifficulties.includes(quiz.difficulty));
    // category filter
    const byCategory = selectedCategories.length === 0 ? byDifficulty : byDifficulty.filter((quiz) => selectedCategories.includes(quiz.category));

    // sort
    const sorted = [...byCategory];
    switch (sortOption) {
      case "POINTS_ASC":
        sorted.sort((a, b) => a.points - b.points);
        break;
      case "POINTS_DESC":
        sorted.sort((a, b) => b.points - a.points);
        break;
      case "DURATION_ASC":
        sorted.sort((a, b) => a.duration - b.duration);
        break;
      case "DURATION_DESC":
        sorted.sort((a, b) => b.duration - a.duration);
        break;
      case "DIFFICULTY_ASC":
        sorted.sort((a, b) => {
          const order = { Easy: 0, Medium: 1, Hard: 2, Expert: 3 };
          return order[a.difficulty] - order[b.difficulty];
        });
        break;
      case "DIFFICULTY_DESC":
        sorted.sort((a, b) => {
          const order = { Easy: 0, Medium: 1, Hard: 2, Expert: 3 };
          return order[b.difficulty] - order[a.difficulty];
        });
        break;
    }

    return sorted;
  }, [activeTab, search, selectedDifficulties, selectedCategories, sortOption]);

  const renderQuizGrid = (quizList: Quiz[]) => {
    if (quizList.length === 0) {
      return (
        <div className="text-center py-12 bg-accent/50 dark:bg-old-background rounded-lg border">
          <p className="text-sm text-muted-foreground">No quizzes found in this category.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {quizList.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quiz Catalog</h1>
          <p className="text-muted-foreground text-sm">
            {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? "zes" : ""} found
          </p>
        </div>
      </div>

      {/* Filters */}
      <QuizFilters 
        search={search}
        setSearch={setSearch}
        selectedDifficulties={selectedDifficulties}
        setSelectedDifficulties={setSelectedDifficulties}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {/* Tabs */}
      <Tabs className="w-full" value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
        <TabsList className="flex flex-wrap gap-1">
          {TAB_ORDER.map((key) => (
            <TabsTrigger key={key} value={key} className="capitalize">
              {TAB_LABELS[key] || key}
            </TabsTrigger>
          ))}
        </TabsList>
        {TAB_ORDER.map((key) => (
          <TabsContent key={key} value={key} className="mt-6">
            {key === activeTab ? renderQuizGrid(filteredQuizzes) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

