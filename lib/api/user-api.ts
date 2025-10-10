import { cookies } from "next/headers";
import { AUTH_API_URL, ENDPOINTS } from "../config";
import type { ApiCurrentUser } from "@/types/types";

export async function fetchCurrentUser(): Promise<ApiCurrentUser | null> {
  const baseUrl = AUTH_API_URL;
  const url = `${baseUrl}${ENDPOINTS.AUTH.AUTH_ME}`;
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Cookie: `session_id=${sessionId}`,
      },
      credentials: "include",
    });
    if (!response.ok) return null;
    const data: ApiCurrentUser = await response.json();
    console.log("DATA FROM fetchCurrentUser: ", data);
    return data;
  } catch (e) {
    console.error("Failed to fetch current user:", e);
    return null;
  }
}
