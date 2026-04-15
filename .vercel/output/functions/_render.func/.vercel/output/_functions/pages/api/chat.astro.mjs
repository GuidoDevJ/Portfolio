export { renderers } from '../../renderers.mjs';

const prerender = false;
const CHAT_API_URL = "http://localhost:8001";
const CHAT_API_KEY = "your_api_key_here";
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!body.message?.trim()) {
    return new Response(JSON.stringify({ error: "message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15e3);
  try {
    const res = await fetch(`${CHAT_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...CHAT_API_KEY ? { "X-API-Key": CHAT_API_KEY } : {}
      },
      body: JSON.stringify({ message: body.message.trim() }),
      signal: controller.signal
    });
    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Upstream error: ${res.status}` }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    const isTimeout = err?.name === "AbortError";
    return new Response(
      JSON.stringify({ error: isTimeout ? "Request timed out" : "Failed to reach chat API" }),
      {
        status: isTimeout ? 504 : 502,
        headers: { "Content-Type": "application/json" }
      }
    );
  } finally {
    clearTimeout(timeout);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
