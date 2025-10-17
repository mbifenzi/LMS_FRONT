import { cookies } from 'next/headers';

import { ApiCourse } from '@/types/types';

import { API_URL, ENDPOINTS } from '../config';

export interface AvailableCoursesResponse {
  available_courses: ApiCourse[];
  total_count: number;
}

export async function fetchAvailableCourses(): Promise<AvailableCoursesResponse | null> {
  const baseUrl = API_URL;
  const url = `${baseUrl}${ENDPOINTS.COURSES.AVAILABLE}`;
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
      throw new Error(`Failed to fetch available courses: ${response.status}`);
    }

    const data: AvailableCoursesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching available courses:', error);
    return null;
  }
}
