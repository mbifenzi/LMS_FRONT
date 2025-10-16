import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import Quest from '@/components/quest/Quest';

import { fetchAvailableQuestById } from '@/lib/api/available-quests-api';

import { ApiQuest } from '@/types/types';

export default async function QuestPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  let quest: ApiQuest | null = null;
  try {
    quest = await fetchAvailableQuestById(id);
    console.log('----------- Fetched quest data:', quest);
  } catch (e) {
    console.error('Failed to fetch quest', e);
  }

  if (!quest) {
    return (
      <div className="space-y-6 p-8">
        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <Link
            href="/quest-catalog"
            className="hover:text-foreground inline-flex items-center gap-1 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Catalog
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Quest Not Found</span>
        </div>
        <div className="bg-card rounded-lg border p-6 text-center">
          <p className="text-muted-foreground text-sm">
            The quest you are looking for does not exist or you do not have
            access.
          </p>
        </div>
      </div>
    );
  }

  return <Quest quest={quest} />;
}
