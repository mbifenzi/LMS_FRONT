import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

import { dashboardData } from '@/lib/dashboard-data';
import { coursesByStatus } from '@/lib/mock-data/courses';

import ContributionActivity from './ContributionSection';
import CoursesSection from './CoursesSection';
import QuizzesSection from './QuizzesSection';

interface DashboardContentProps {
  role?: string;
}

export default function DashboardContent({ role }: DashboardContentProps) {
  return (
    <Card className="h-full dark:bg-black">
      <CardContent className="flex h-full flex-col p-3 sm:p-4">
        <div className="flex-1 space-y-4 sm:space-y-6">
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
