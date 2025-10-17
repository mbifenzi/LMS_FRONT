import { cookies } from 'next/headers';

import { API_URL, ENDPOINTS } from '../config';

export async function registerCourse(
  courseId: string
): Promise<{ success: boolean; message?: string }> {
  const baseUrl = API_URL;
  const url = `${baseUrl}${ENDPOINTS.COURSES.REGISTER(courseId)}`;
  const cookiess = await cookies();
  const sessionId = await cookiess.get('session_id')?.value;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionId}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to register for course: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Successfully registered for course',
    };
  } catch (error) {
    console.error(`Error registering for course ${courseId}:`, error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to register for course',
    };
  }
}
