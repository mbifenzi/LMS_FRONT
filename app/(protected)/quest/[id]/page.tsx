import { fetchAvailableQuestById } from "@/lib/api/available-quests-api";
import Quest from "@/components/quest/Quest";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApiQuest } from "@/types/types";

export default async function QuestPage({ params }: { params: { id: string } }) {
  const { id } = params;
  let quest: ApiQuest | null = null;
  try {
    quest = await fetchAvailableQuestById(id);
    console.log("----------- Fetched quest data:", quest);
  } catch (e) {
    console.error("Failed to fetch quest", e);
  }

  if (!quest) {
    return (
      <div className="p-8 space-y-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link href="/quest-catalog" className="inline-flex items-center gap-1 hover:text-foreground transition">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Quest Not Found</span>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">The quest you are looking for does not exist or you do not have access.</p>
        </div>
      </div>
    );
  }

  return <Quest quest={quest} />;
}
