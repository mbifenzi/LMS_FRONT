import { cookies } from 'next/headers';

import { ApiQuest } from '@/types/types';

import { API_URL, ENDPOINTS } from '../config';

export async function fetchQuestsByStatus(status: string): Promise<ApiQuest[]> {
  const baseUrl = API_URL;
  const url = `${baseUrl}${ENDPOINTS.QUESTS.BY_STATUS(status)}`;
  const cookiess = await cookies();
  const sessionId = await cookiess.get('session_id')?.value;
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
      throw new Error(`Failed to fetch quests: ${response.status}`);
    }
    const apiQuests: ApiQuest[] = await response.json();
    return apiQuests;
  } catch (error) {
    console.error(`Error fetching quests with status ${status}:`, error);
    return [];
  }
}

//fetch single quest by id
export async function fetchQuestById(id: string): Promise<ApiQuest | null> {
  const baseUrl = API_URL;
  const url = `${baseUrl}${ENDPOINTS.QUESTS.DETAIL(id)}`;
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
      throw new Error(`Failed to fetch quest ${id}: ${response.status}`);
    }
    const quest: ApiQuest = await response.json();
    return quest;
  } catch (error) {
    console.error(`Error fetching quest with id ${id}:`, error);
    return null;
  }
}
