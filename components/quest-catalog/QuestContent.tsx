import { fetchQuestsByStatus } from "@/lib/api/quest-api";
import QuestCatalogClient from "./QuestCatalog";
import { ApiQuest } from "@/types/types";
import { fetchLearnerDashboard } from "@/lib/api/learner-dashboard-api";
import { fetchAvailableQuests } from "@/lib/api/available-quests-api";

export type QuestsByStatus = Record<string, ApiQuest[]>;

interface QuestCatalogProps {
  role?: string;
}

export default async function QuestCatalog({ role }: QuestCatalogProps) {
  const isStudent = role === "Student";

  async function fetchAdminQuests() {
    const [draft, published, archived, underReview, rejected] = await Promise.all([
      fetchQuestsByStatus("DRAFT"),
      fetchQuestsByStatus("PUBLISHED"),
      fetchQuestsByStatus("ARCHIVED"),
      fetchQuestsByStatus("UNDER_REVIEW"),
      fetchQuestsByStatus("REJECTED"),
    ]);
    return { draft, published, archived, underReview, rejected } as QuestsByStatus;
  }

  async function fetchStudentQuests() {
    const [data, availableResp] = await Promise.all([fetchLearnerDashboard(), fetchAvailableQuests()]);
    const mapEnrollmentsToQuests = (enrollments?: Array<{ quest: ApiQuest }>) => (enrollments ?? []).map((e) => e.quest);
    return {
      available: availableResp.available_quests || [],
      inProgress: mapEnrollmentsToQuests(data?.in_progress_quests),
      notStarted: mapEnrollmentsToQuests(data?.not_started_quests),
      paused: mapEnrollmentsToQuests(data?.paused_quests),
      abandoned: mapEnrollmentsToQuests(data?.abandoned_quests),
      completed: mapEnrollmentsToQuests(data?.completed_quests),
    } as QuestsByStatus;
  }

  const questsByStatus: QuestsByStatus = isStudent ? await fetchStudentQuests() : await fetchAdminQuests();

  return <QuestCatalogClient questsByStatus={questsByStatus} role={role} />;
}
