import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface CourseFiltersProps {
  search: string;
  setSearch: (search: string) => void;
  selectedDifficulties: string[];
  setSelectedDifficulties: (difficulties: string[]) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const DIFFICULTIES = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"];

const SORT_OPTIONS = [
  { value: "POINTS_DESC", label: "Points (High to Low)" },
  { value: "POINTS_ASC", label: "Points (Low to High)" },
  { value: "DURATION_ASC", label: "Duration (Short to Long)" },
  { value: "DURATION_DESC", label: "Duration (Long to Short)" },
  { value: "DIFFICULTY_ASC", label: "Difficulty (Easy to Hard)" },
  { value: "DIFFICULTY_DESC", label: "Difficulty (Hard to Easy)" },
];

export default function CourseFilters({
  search,
  setSearch,
  selectedDifficulties,
  setSelectedDifficulties,
  sortOption,
  setSortOption,
}: CourseFiltersProps) {
  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulties.includes(difficulty)) {
      setSelectedDifficulties(selectedDifficulties.filter((d) => d !== difficulty));
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty]);
    }
  };

  const clearDifficulties = () => setSelectedDifficulties([]);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Difficulty Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Difficulty
                {selectedDifficulties.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedDifficulties.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {DIFFICULTIES.map((difficulty) => (
                <DropdownMenuCheckboxItem
                  key={difficulty}
                  checked={selectedDifficulties.includes(difficulty)}
                  onCheckedChange={() => toggleDifficulty(difficulty)}
                  className="capitalize"
                >
                  {difficulty.toLowerCase()}
                </DropdownMenuCheckboxItem>
              ))}
              {selectedDifficulties.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem onCheckedChange={clearDifficulties}>
                    Clear all
                  </DropdownMenuCheckboxItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Active Difficulty Badges */}
          {selectedDifficulties.map((difficulty) => (
            <Badge
              key={difficulty}
              variant="secondary"
              className="capitalize cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => toggleDifficulty(difficulty)}
            >
              {difficulty.toLowerCase()} ×
            </Badge>
          ))}
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort: {SORT_OPTIONS.find((opt) => opt.value === sortOption)?.label || "Default"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}