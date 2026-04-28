import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

const CHAT_API_URL = process.env.CHAT_API_URL ?? '';
const CHAT_API_KEY = process.env.CHAT_API_KEY;

function json(body: object, status = 200): APIGatewayProxyResultV2 {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function parseBody(event: APIGatewayProxyEventV2): string {
  return event.isBase64Encoded
    ? Buffer.from(event.body ?? '', 'base64').toString('utf-8')
    : event.body ?? '';
}

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  if (event.requestContext.http.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let body: { message?: string };
  try {
    body = JSON.parse(parseBody(event));
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  if (!body.message?.trim()) {
    return json({ error: 'message is required' }, 400);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${CHAT_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(CHAT_API_KEY ? { 'X-API-Key': CHAT_API_KEY } : {}),
      },
      body: JSON.stringify({ message: body.message.trim() }),
      signal: controller.signal,
    });

    if (!res.ok) {
      return json({ error: `Upstream error: ${res.status}` }, 502);
    }

    const data = await res.json();
    return json(data);
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    return json(
      { error: isTimeout ? 'Request timed out' : 'Failed to reach chat API' },
      isTimeout ? 504 : 502
    );
  } finally {
    clearTimeout(timeout);
  }
};
