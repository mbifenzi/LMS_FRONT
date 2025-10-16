import { ENDPOINTS } from '../config';

// Client-side logout function
export async function logoutUser(): Promise<{
  success: boolean;
  message?: string;
}> {
  const baseUrl =
    process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:8001';
  const url = `${baseUrl}${ENDPOINTS.AUTH.LOGOUT}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response
        .json()
        .catch(() => ({ detail: 'Logout failed' }));
      return { success: false, message: errorData.detail || 'Logout failed' };
    }
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, message: 'Network error during logout' };
  }
}
