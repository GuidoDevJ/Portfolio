import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL ?? '';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

  let body: { name?: string; email?: string; message?: string };
  try {
    body = JSON.parse(parseBody(event));
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { name, email, message } = body;

  if (!name?.trim() || name.trim().length < 2) return json({ error: 'Invalid name' }, 400);
  if (!email?.trim() || !isValidEmail(email)) return json({ error: 'Invalid email' }, 400);
  if (!message?.trim() || message.trim().length < 10) return json({ error: 'Message too short' }, 400);

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: [RECIPIENT_EMAIL],
    replyTo: email.trim(),
    subject: `Portfolio — Mensaje de ${name.trim()}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #facf0f; border-bottom: 2px solid #facf0f; padding-bottom: 8px;">
          Nuevo mensaje desde tu portfolio
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px; font-weight: bold; width: 80px; color: #666;">Nombre</td>
            <td style="padding: 8px;">${name.trim()}</td>
          </tr>
          <tr style="background: #f5f5f5;">
            <td style="padding: 8px; font-weight: bold; color: #666;">Email</td>
            <td style="padding: 8px;">
              <a href="mailto:${email.trim()}" style="color: #facf0f;">${email.trim()}</a>
            </td>
          </tr>
        </table>
        <div style="background: #f9f9f9; border-left: 4px solid #facf0f; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; white-space: pre-wrap;">${message.trim()}</p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">Enviado desde guidogauna.dev</p>
      </div>
    `,
  });

  if (error) {
    console.error('[Resend] Error:', error);
    return json({ error: 'Failed to send email' }, 500);
  }

  return json({ ok: true });
};
