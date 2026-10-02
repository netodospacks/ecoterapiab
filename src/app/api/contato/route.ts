import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

// Simple in-memory rate limiter (resets on deploy)
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const timestamps = requestLog.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxRequests) return true;

  requestLog.set(ip, [...recent, now]);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas solicitações. Tente novamente em alguns minutos." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const data = contactSchema.parse(body);

    const toEmail = process.env.RESEND_TO_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (!toEmail || !apiKey || apiKey === "re_placeholder") {
      // In development or when email is not configured, just log and return success
      console.log("[CONTACT FORM] Received (email not configured):", data);
      return NextResponse.json({ success: true });
    }

    // Send via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "noreply@bemviverecoterapia.com.br",
        to: [toEmail],
        reply_to: data.email,
        subject: `[Bem Viver Ecoterapia] Nova mensagem de ${data.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #53664B;">Nova mensagem de contato</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #30372F;">Nome:</td>
                <td style="padding: 8px; color: #5A6358;">${data.name}</td>
              </tr>
              <tr style="background: #F9F7F1;">
                <td style="padding: 8px; font-weight: bold; color: #30372F;">E-mail:</td>
                <td style="padding: 8px;"><a href="mailto:${data.email}" style="color: #53664B;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #30372F; vertical-align: top;">Mensagem:</td>
                <td style="padding: 8px; color: #5A6358;">${data.message.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>
            <hr style="border-color: #E8DFD0; margin: 24px 0;" />
            <p style="color: #8A9688; font-size: 12px;">
              Esta mensagem foi enviada através do formulário de contato do site Bem Viver Ecoterapia.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[CONTACT FORM] Resend error:", err);
      return NextResponse.json({ error: "Falha ao enviar e-mail." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Dados inválidos.", details: err.issues }, { status: 400 });
    }
    console.error("[CONTACT FORM] Error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
