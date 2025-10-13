import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardData } from "@/lib/dashboard-data";
import ContributionActivity from "./ContributionSection";
import CoursesSection from "./CoursesSection";
import QuizzesSection from "./QuizzesSection";
import { coursesByStatus } from "@/lib/mock-data/courses";

interface DashboardContentProps {
  role?: string;
}

  export default function DashboardContent({ role }: DashboardContentProps) {
  return (
    <Card className="h-full dark:bg-black">
      <CardContent className="p-3 sm:p-4 h-full flex flex-col">
        <div className="space-y-4 sm:space-y-6 flex-1">
          {/* Courses Tabs */}
          <CoursesSection coursesByStatus={coursesByStatus} role={role} />
          {/* Quizzes Section - now independent */}
          <QuizzesSection role={role} />
          {/* Contribution activity (static/mock) */}
          <ContributionActivity contributions={dashboardData.contributions} />
        </div>
      </CardContent>
    </Card>
  );
}
