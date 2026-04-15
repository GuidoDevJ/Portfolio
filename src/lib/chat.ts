export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  has_info: boolean;
  answer: string;
  confidence: number;
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message } satisfies ChatRequest),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return (await res.json()) as ChatResponse;
  } finally {
    clearTimeout(timeout);
  }
}
