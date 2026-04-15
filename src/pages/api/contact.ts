import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = import.meta.env.RECIPIENT_EMAIL || "guidogauna10@gmail.com";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  // ── Parse body ────────────────────────────────────────────────────────
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, message } = body;

  // ── Validate ──────────────────────────────────────────────────────────
  if (!name?.trim() || name.trim().length < 2) {
    return new Response(JSON.stringify({ error: "Invalid name" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!message?.trim() || message.trim().length < 10) {
    return new Response(JSON.stringify({ error: "Message too short" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Send via Resend ───────────────────────────────────────────────────
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
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
        <p style="color: #999; font-size: 12px; margin-top: 24px;">
          Enviado desde guidogauna.dev
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("[Resend] Error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
