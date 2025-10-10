"use server";
import { cookies } from "next/headers";
import { API_URL, ENDPOINTS } from "../config";
import { LearnerQuestEnrollment } from "@/types/types";

export type RegisterQuestResponse =
  | {
      message: string;
      quest_progress: LearnerQuestEnrollment;
    }
  | {
      detail?: string;
      message?: string;
      status?: string | number;
    };

// register learner to a quest
export async function registerQuest(questId: string): Promise<RegisterQuestResponse> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;
  const url = `${API_URL}${ENDPOINTS.QUESTS.REGISTER}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionId}`,
      },
      body: JSON.stringify({ quest_id: questId }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`Register failed (${response.status}): ${errorText}`);
    }
  

    try {
      const data = (await response.json()) as RegisterQuestResponse;
      return data;
    } catch {
      return { status: response.status } as RegisterQuestResponse;
    }
  } catch (error) {
    console.error(`Error registering for quest with id ${questId}:`, error);
    throw error;
  }
}
