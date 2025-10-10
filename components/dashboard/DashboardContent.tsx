import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardData } from "@/lib/dashboard-data";
import ContributionActivity from "./ContributionSection";
import QuestsSection from "./QuestsSection";
import TasksSection from "./TasksSection";
import { fetchQuestsByStatus } from "@/lib/api/quest-api";
import { fetchLearnerDashboard } from "@/lib/api/learner-dashboard-api";
import { ApiQuest } from "@/types/types";

export type QuestsByStatus = Record<string, ApiQuest[]>;
interface DashboardContentProps {
  role?: string;
}

export default async function DashboardContent({ role }: DashboardContentProps) {
  const isStudent = role === "Student";

  async function fetchAdminQuests() {
    const [draft, published, archived, underReview, rejected] = await Promise.all([
      fetchQuestsByStatus("DRAFT"),
      fetchQuestsByStatus("PUBLISHED"),
      fetchQuestsByStatus("ARCHIVED"),
      fetchQuestsByStatus("UNDER_REVIEW"),
      fetchQuestsByStatus("REJECTED"),
    ]);
    return {
      draft,
      published,
      archived,
      underReview,
      rejected,
    } as QuestsByStatus;
  }

  async function fetchStudentQuests() {
    const data = await fetchLearnerDashboard();
    const mapEnrollmentsToQuests = (enrollments?: Array<{ quest: ApiQuest }>) => (enrollments ?? []).map((e) => e.quest);
    return {
      inProgress: mapEnrollmentsToQuests(data?.in_progress_quests),
      notStarted: mapEnrollmentsToQuests(data?.not_started_quests),
      paused: mapEnrollmentsToQuests(data?.paused_quests),
      abandoned: mapEnrollmentsToQuests(data?.abandoned_quests),
      completed: mapEnrollmentsToQuests(data?.completed_quests),
    } as QuestsByStatus;
  }

  // Fetch quests depending on role
  const questsByStatus = isStudent ? await fetchStudentQuests() : await fetchAdminQuests();
  console.log("-------------- Quests by status:", questsByStatus);

  // Source list for TasksSection (use published for Admin, inProgress for Student)
  const tasksBaseQuests: ApiQuest[] = isStudent ? questsByStatus.inProgress : questsByStatus.published;

  return (
    <Card className="h-full dark:bg-black">
      <CardContent className="p-3 sm:p-4 h-full flex flex-col">
        <div className="space-y-4 sm:space-y-6 flex-1">
          {/* Quests Tabs */}
          <QuestsSection questsByStatus={questsByStatus} role={role} />
          {/* Tasks Section */}
          <TasksSection publishedQuests={tasksBaseQuests} />
          {/* Contribution activity (static/mock) */}
          <ContributionActivity contributions={dashboardData.contributions} />
        </div>
      </CardContent>
    </Card>
  );
}
