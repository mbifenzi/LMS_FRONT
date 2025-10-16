import { cookies } from 'next/headers';

import { ApiQuest, AvailableQuestsResponse } from '@/types/types';

import { API_URL, ENDPOINTS } from '../config';

// Fetch all available quests
export async function fetchAvailableQuests(): Promise<AvailableQuestsResponse> {
  const baseUrl = API_URL;
  const url = `${baseUrl}${ENDPOINTS.QUESTS.AVAILABLE}`;
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionId}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch available quests: ${response.status}`);
    }
    const data = await response.json();
    return {
      available_quests: (data.available_quests as ApiQuest[]) || [],
      total_count:
        data.total_count ??
        ((data.available_quests as ApiQuest[])?.length || 0),
    };
  } catch (error) {
    console.error('Error fetching available quests:', error);
    return { available_quests: [], total_count: 0 };
  }
}

export async function fetchAvailableQuestById(
  id: string
): Promise<ApiQuest | null> {
  const baseUrl = API_URL;
  const url = `${baseUrl}${ENDPOINTS.QUESTS.AVAILABLE_DETAIL(id)}`;
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionId}`,
      },
      credentials: 'include',
    });

    if (response.status === 404) {
      return null; // Quest not found
    }

    if (!response.ok) {
      return null;
      // throw new Error(`Failed to fetch available quest ${id}: ${response.status}`);
    }
    const quest: ApiQuest = await response.json();
    return quest;
  } catch (e) {
    console.error(`Error fetching available quest ${id}:`, e);
    return null;
  }
}
