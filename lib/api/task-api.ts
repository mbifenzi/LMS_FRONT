import { cookies } from "next/headers";
import { API_URL, ENDPOINTS } from "../config";
import { ApiTask } from "@/types/types";

export async function fetchTasksByQuest(questId: string): Promise<ApiTask[]> {
  const baseUrl = API_URL;
  const url = `${baseUrl}${ENDPOINTS.TASKS.BY_QUEST(questId)}`;
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  // console.log("----- sessionId: TASK_API ------", sessionId);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionId}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks for quest ${questId}: ${response.status}`);
    }

    const tasks: ApiTask[] = await response.json();
    return tasks;
  } catch (error) {
    console.error(`Error fetching tasks for quest ${questId}:`, error);
    return [];
  }
}
