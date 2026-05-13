import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Rate limiter: máximo 3 requests por IP cada 60 minutos
// ¿Por qué 3? Un usuario real raramente envía más de 1-2 formularios.
// Si alguien envía 3+, probablemente es un bot o spam.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "60 m"),
  analytics: true,
});

export async function POST(req: NextRequest) {
  try {
    // Obtenemos la IP del usuario
    const ip = req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "anonymous";

    // Verificamos el rate limit
    const { success, limit, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Demasiados intentos. Por favor espera antes de enviar otro mensaje." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
          }
        }
      );
    }

    const { nombre, empresa, email, telefono, servicio, mensaje } = await req.json();

    if (!nombre || !email || !servicio) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Guardamos en BD
    await prisma.consulta.create({
      data: { nombre, empresa, email, telefono, servicio, mensaje },
    });

    // Enviamos emails
    await Promise.all([
      resend.emails.send({
        from: "Andinita <onboarding@resend.dev>",
        to: ["contacto@vybcertifica.cl"],
        subject: `Nueva consulta: ${servicio}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <div style="background: #1B4F8A; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
              <h1 style="color: white; margin: 0; font-size: 20px;">Nueva consulta recibida</h1>
            </div>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Empresa:</strong> ${empresa || "No indicó"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono || "No indicó"}</p>
            <p><strong>Servicio:</strong> ${servicio}</p>
            ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ""}
            <a href="mailto:${email}" style="color: #1B4F8A;">Responder →</a>
          </div>
        `,
      }),

      resend.emails.send({
        from: "Andinita <onboarding@resend.dev>",
        to: [email],
        subject: "Recibimos tu consulta — V&B Certifica",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
            <div style="background: #1B4F8A; padding: 32px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
              <h1 style="color: white; margin: 0;">¡Hola, ${nombre}! 🐱</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 12px 0 0 0;">
                Recibimos tu consulta sobre <strong>${servicio}</strong>
              </p>
            </div>
            <p>Te contactaremos en menos de <strong>24 horas hábiles</strong>.</p>
            <p>📞 +56 9 29910646</p>
            <p>📧 contacto@vybcertifica.cl</p>
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}