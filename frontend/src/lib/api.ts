export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export type ChatEvent = { delta: string } | { done: true };

export type CreateSessionResult =
  | { ok: true; sessionId: string }
  | { ok: false; reason: "not_found" | "error" | string };

export async function createChatSession(userId: string): Promise<CreateSessionResult> {
  const res = await fetch(`${API_BASE_URL}/chat/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });
  if (!res.ok) return { ok: false, reason: res.statusText || "error" };

  const data = await res.json();
  if (data.error) {
    return {
      ok: false,
      reason: data.error === "User not found" ? "not_found" : typeof data.error === "string" ? data.error : "error",
    };
  }

  const sessionId = data.chat_room?.session_id ?? data.chat_room?.id ?? null;
  return sessionId ? { ok: true, sessionId } : { ok: false, reason: "error" };
}

export async function* streamChatMessage(
  sessionId: string,
  userId: string,
  content: string,
): AsyncGenerator<ChatEvent> {
  const res = await fetch(`${API_BASE_URL}/chat/messages/${sessionId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { user_id: userId }, content }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Chat request failed with status ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const jsonStr = trimmed.slice(5).trim();
      if (!jsonStr) continue;
      yield JSON.parse(jsonStr) as ChatEvent;
    }
  }
}
