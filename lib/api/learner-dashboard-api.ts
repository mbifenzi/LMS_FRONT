import { cookies } from 'next/headers';

import { LearnerDashboardResponse } from '@/types/types';

import { API_URL, ENDPOINTS } from '../config';

export async function fetchLearnerDashboard(): Promise<LearnerDashboardResponse | null> {
  const baseUrl = API_URL;
  const url = `${baseUrl}${ENDPOINTS.LEARNER.DASHBOARD}`;
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
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(
        'Failed to fetch learner dashboard',
        response.status,
        response.statusText
      );
      return null;
    }

    const data: LearnerDashboardResponse = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching learner dashboard', err);
    return null;
  }
}
