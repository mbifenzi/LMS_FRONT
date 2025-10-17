'use client';

import React from 'react';

import { ArrowUpDown, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface QuestFiltersProps {
  selectedDifficulties: string[]; // empty = ALL
  onDifficultiesChange: (d: string[]) => void;
  sortOption: string;
  onSortChange: (v: string) => void;
}

const ALL_DIFFICULTIES = [
  'BEGINNER',
  'INTERMEDIATE',
  'ADVANCED',
  'EXPERT',
] as const;

export default function QuestFilters({
  selectedDifficulties,
  onDifficultiesChange,
  sortOption,
  onSortChange,
}: QuestFiltersProps) {
  const isAll = selectedDifficulties.length === 0;

  const toggleDifficulty = (diff: string, checked: boolean | string) => {
    const isChecked = checked === true; // Radix returns boolean | 'indeterminate'
    if (isAll) {
      if (isChecked) {
        // Start new selection only with this difficulty
        onDifficultiesChange([diff]);
      }
      // Unchecking while ALL does nothing
      return;
    }
    if (isChecked) {
      const next = Array.from(new Set([...selectedDifficulties, diff]));
      if (next.length === ALL_DIFFICULTIES.length) {
        onDifficultiesChange([]); // collapse to ALL
      } else {
        onDifficultiesChange(next);
      }
    } else {
      const next = selectedDifficulties.filter((d) => d !== diff);
      if (next.length === 0) {
        onDifficultiesChange([]); // back to ALL
      } else {
        onDifficultiesChange(next);
      }
    }
  };

  const badgeLabel = isAll
    ? 'all'
    : selectedDifficulties.length === 1
      ? selectedDifficulties[0].toLowerCase()
      : `${selectedDifficulties.length} selected`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="bg-muted rounded-md border px-2 py-1 text-[10px] font-medium tracking-wide uppercase">
        {badgeLabel}
      </span>

      {/* Difficulty Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-3.5 w-3.5" /> Difficulty
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="flex w-full items-center justify-between">
            <span>Difficulty</span>
            {!isAll && (
              <button
                type="button"
                onClick={() => onDifficultiesChange([])}
                className="text-muted-foreground hover:text-foreground text-[10px] font-normal transition"
              >
                Reset
              </button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={isAll}
            onCheckedChange={(val) => {
              if (val) onDifficultiesChange([]);
            }}
          >
            All
          </DropdownMenuCheckboxItem>
          {ALL_DIFFICULTIES.map((diff) => (
            <DropdownMenuCheckboxItem
              key={diff}
              checked={!isAll && selectedDifficulties.includes(diff)}
              onCheckedChange={(val) => toggleDifficulty(diff, val)}
            >
              {diff.charAt(0) + diff.slice(1).toLowerCase()}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowUpDown className="h-3.5 w-3.5" /> Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={sortOption}
            onValueChange={onSortChange}
          >
            <DropdownMenuRadioItem value="POINTS_DESC">
              Points (High → Low)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="POINTS_ASC">
              Points (Low → High)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="DURATION_DESC">
              Duration (Long → Short)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="DURATION_ASC">
              Duration (Short → Long)
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
