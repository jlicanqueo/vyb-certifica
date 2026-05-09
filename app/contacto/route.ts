// src/app/api/contacto/route.ts
// Similar a /api/chat, este endpoint vive en el servidor.
// Recibe los datos del formulario y los envía por email.

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { nombre, empresa, email, telefono, servicio, mensaje } = await req.json();

        // Validación básica en el servidor.
        // Siempre valida en el servidor aunque ya valides en el frontend —
        // cualquiera puede hacer una petición POST directa sin usar tu formulario.
        if (!nombre || !email || !servicio) {
            return NextResponse.json(
                { error: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        // Enviamos DOS emails simultáneamente con Promise.all:
        // 1. Al equipo de V&B Certifica con los datos del cliente
        // 2. Al cliente confirmando que recibimos su mensaje
        // Promise.all espera que AMBOS terminen antes de continuar
        await Promise.all([

            // Email al equipo interno
            resend.emails.send({
                from: "Andinita <notificaciones@vybcertifica.cl>",
                to: ["contacto@vybcertifica.cl"],
                subject: `Nueva consulta: ${servicio}`,
                html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #F8FAFC; border-radius: 16px;">
            <div style="background: #1B4F8A; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
              <h1 style="color: white; margin: 0; font-size: 20px;">Nueva consulta recibida</h1>
              <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0 0; font-size: 14px;">V&B Certifica — Formulario web</p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              ${[
                        ["Nombre", nombre],
                        ["Empresa", empresa || "No indicó"],
                        ["Email", email],
                        ["Teléfono", telefono || "No indicó"],
                        ["Servicio de interés", servicio],
                    ].map(([label, valor]) => `
                <tr>
                  <td style="padding: 10px 12px; background: white; border-radius: 8px; margin-bottom: 8px; font-size: 13px; color: #64748B; font-weight: 600; width: 140px;">${label}</td>
                  <td style="padding: 10px 12px; font-size: 14px; color: #1E293B;">${valor}</td>
                </tr>
              `).join("")}
            </table>

            ${mensaje ? `
              <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 12px; border-left: 4px solid #1B4F8A;">
                <p style="font-size: 13px; color: #64748B; font-weight: 600; margin: 0 0 8px 0;">MENSAJE</p>
                <p style="font-size: 14px; color: #1E293B; margin: 0; line-height: 1.6;">${mensaje}</p>
              </div>
            ` : ""}

            <div style="margin-top: 24px; padding: 16px; background: #DBEAFE; border-radius: 12px; text-align: center;">
              <a href="mailto:${email}" style="color: #1B4F8A; font-weight: 600; font-size: 14px;">
                Responder a ${nombre} →
              </a>
            </div>
          </div>
        `,
            }),

            // Email de confirmación al cliente
            resend.emails.send({
                from: "Andinita de V&B Certifica <notificaciones@vybcertifica.cl>",
                to: [email],
                subject: "Recibimos tu consulta — V&B Certifica",
                html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #F8FAFC; border-radius: 16px;">
            <div style="background: linear-gradient(135deg, #1B4F8A, #2563EB); padding: 32px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">¡Hola, ${nombre}! 🐱</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 12px 0 0 0; font-size: 15px;">
                Recibimos tu consulta sobre <strong>${servicio}</strong>
              </p>
            </div>

            <p style="font-size: 15px; color: #1E293B; line-height: 1.7;">
              Nuestro equipo revisará tu solicitud y te contactará en menos de
              <strong>24 horas hábiles</strong> para orientarte en el proceso.
            </p>

            <div style="background: white; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid rgba(27,79,138,0.1);">
              <p style="font-size: 13px; color: #64748B; margin: 0 0 12px 0; font-weight: 600;">MIENTRAS TANTO, PUEDES CONTACTARNOS EN:</p>
              <p style="font-size: 14px; color: #1E293B; margin: 4px 0;">📞 +56 9 29910646</p>
              <p style="font-size: 14px; color: #1E293B; margin: 4px 0;">📞 +56 9 92144113</p>
              <p style="font-size: 14px; color: #1E293B; margin: 4px 0;">📧 contacto@vybcertifica.cl</p>
            </div>

            <p style="font-size: 13px; color: #64748B; text-align: center; margin-top: 24px;">
              Este email fue enviado automáticamente por Andinita 🐱<br/>
              V&B Certifica · Ahumada 254 of. 608, Santiago
            </p>
          </div>
        `,
            }),
        ]);

        return NextResponse.json({ ok: true });

    } catch (error) {
        console.error("Error enviando email:", error);
        return NextResponse.json(
            { error: "Error al enviar el mensaje" },
            { status: 500 }
        );
    }
}