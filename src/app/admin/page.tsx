import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Clock, Mail, Phone, Building } from "lucide-react";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function PanelAdmin({
    searchParams,
}: {
    searchParams: { key?: string };
}) {
    // Protección simple por URL key
    // Acceso: /admin?key=vyb2024secure
    const KEY = process.env.ADMIN_PASSWORD ?? "vyb2024secure";

    if (searchParams.key !== KEY) {
        redirect("/");
    }

    const consultas = await prisma.consulta.findMany({
        orderBy: { createdAt: "desc" },
    });

    const total = consultas.length;
    const noLeidas = consultas.filter((c) => !c.leida).length;

    return (
        <main className="min-h-screen p-8" style={{ background: "var(--color-vyb-gris-claro)" }}>
            <div className="max-w-6xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-1"
                        style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                        Panel de Administración
                    </h1>
                    <p style={{ color: "var(--color-vyb-gris-medio)" }}>
                        V&B Certifica — Consultas recibidas
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: "Total consultas", valor: total, color: "var(--color-vyb-azul)" },
                        { label: "Sin leer", valor: noLeidas, color: "#DC2626" },
                        { label: "Leídas", valor: total - noLeidas, color: "#16A34A" },
                    ].map((stat) => (
                        <div key={stat.label} className="p-6 rounded-2xl"
                            style={{ background: "white", boxShadow: "var(--shadow-vyb-card)" }}>
                            <p className="text-sm mb-1" style={{ color: "var(--color-vyb-gris-medio)" }}>
                                {stat.label}
                            </p>
                            <p className="text-4xl font-bold"
                                style={{ color: stat.color, fontFamily: "var(--font-titulo)" }}>
                                {stat.valor}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    {consultas.length === 0 ? (
                        <div className="text-center py-20 rounded-3xl"
                            style={{ background: "white" }}>
                            <p style={{ color: "var(--color-vyb-gris-medio)" }}>
                                No hay consultas aún.
                            </p>
                        </div>
                    ) : (
                        consultas.map((c) => (
                            <div key={c.id} className="p-6 rounded-2xl"
                                style={{
                                    background: "white",
                                    boxShadow: "var(--shadow-vyb-card)",
                                    borderLeft: c.leida ? "4px solid #E2E8F0" : "4px solid var(--color-vyb-azul)",
                                }}>
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <h3 className="font-bold text-lg"
                                                style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                                                {c.nombre}
                                            </h3>
                                            {!c.leida && (
                                                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                                    style={{ background: "var(--color-vyb-azul-claro)", color: "var(--color-vyb-azul)" }}>
                                                    Nueva
                                                </span>
                                            )}
                                            <span className="text-xs px-3 py-1 rounded-full"
                                                style={{ background: "#F1F5F9", color: "var(--color-vyb-gris-medio)" }}>
                                                {c.servicio}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm mb-3">
                                            <span className="flex items-center gap-1.5"
                                                style={{ color: "var(--color-vyb-gris-medio)" }}>
                                                <Mail size={13} /> {c.email}
                                            </span>
                                            {c.telefono && (
                                                <span className="flex items-center gap-1.5"
                                                    style={{ color: "var(--color-vyb-gris-medio)" }}>
                                                    <Phone size={13} /> {c.telefono}
                                                </span>
                                            )}
                                            {c.empresa && (
                                                <span className="flex items-center gap-1.5"
                                                    style={{ color: "var(--color-vyb-gris-medio)" }}>
                                                    <Building size={13} /> {c.empresa}
                                                </span>
                                            )}
                                        </div>

                                        {c.mensaje && (
                                            <p className="text-sm p-3 rounded-xl"
                                                style={{ background: "var(--color-vyb-gris-claro)", color: "var(--color-vyb-gris-oscuro)" }}>
                                                {c.mensaje}
                                            </p>
                                        )}
                                    </div>

                                    <div className="text-right flex flex-col gap-2 items-end">
                                        <span className="flex items-center gap-1 text-xs"
                                            style={{ color: "var(--color-vyb-gris-medio)" }}>
                                            <Clock size={12} />
                                            {new Date(c.createdAt).toLocaleDateString("es-CL", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                        <a href={`mailto:${c.email}`}
                                            className="text-xs px-3 py-1.5 rounded-full font-semibold"
                                            style={{ background: "var(--color-vyb-azul)", color: "white" }}>
                                            Responder
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}