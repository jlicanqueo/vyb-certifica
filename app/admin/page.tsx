import Buscador from "./Buscador";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function PanelAdmin({
    searchParams,
}: {
    searchParams: Promise<{ key?: string }>;
}) {
    const params = await searchParams;
    const KEY = process.env.ADMIN_PASSWORD ?? "vyb2024secure";
    if (params.key !== KEY) redirect("/");

    const consultas = await prisma.consulta.findMany({
        orderBy: { createdAt: "desc" },
    });

    const total = consultas.length;
    const noLeidas = consultas.filter((c) => !c.leida).length;

    return (
        <div className="admin-panel" style={{ minHeight: "100vh", background: "#F1F5F9", fontFamily: "'Inter', sans-serif" }}>

            <div style={{
                position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
                background: "#1B4F8A", display: "flex", flexDirection: "column",
                padding: "32px 0", zIndex: 10,
            }}>
                <div style={{ padding: "0 24px 32px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 8, background: "white",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 700, fontSize: 13, color: "#1B4F8A",
                        }}>VB</div>
                        <div>
                            <p style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>V&B Certifica</p>
                            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: 0 }}>Panel Admin</p>
                        </div>
                    </div>
                </div>
                <div style={{ padding: "24px 12px", flex: 1 }}>
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 12px", borderRadius: 8,
                        background: "rgba(255,255,255,0.12)", color: "white",
                        fontSize: 14, fontWeight: 500,
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <LayoutDashboard size={16} />
                            Consultas
                        </div>
                        {noLeidas > 0 && (
                            <span style={{
                                background: "#EF4444", color: "white",
                                fontSize: 11, fontWeight: 700,
                                padding: "2px 7px", borderRadius: 20,
                                minWidth: 20, textAlign: "center",
                            }}>
                                {noLeidas}
                            </span>
                        )}
                    </div>
                </div>
                <div style={{ padding: "0 12px" }}>
                    <Link href="/" style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 12px", borderRadius: 8,
                        color: "rgba(255,255,255,0.6)", fontSize: 14,
                        textDecoration: "none",
                    }}>
                        <LogOut size={16} />
                        Volver al sitio
                    </Link>
                </div>
            </div>

            <div style={{ marginLeft: 240, padding: "40px" }}>

                <div style={{ marginBottom: 32 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1E293B", margin: "0 0 4px 0" }}>
                        Consultas recibidas
                    </h1>
                    <p style={{ color: "#64748B", margin: 0, fontSize: 14 }}>
                        Gestiona las consultas de clientes potenciales
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
                    {[
                        { label: "Total consultas", valor: total, color: "#1B4F8A", bg: "#DBEAFE" },
                        { label: "Sin leer", valor: noLeidas, color: "#DC2626", bg: "#FEE2E2" },
                        { label: "Leídas", valor: total - noLeidas, color: "#16A34A", bg: "#DCFCE7" },
                    ].map((stat) => (
                        <div key={stat.label} style={{
                            background: "white", borderRadius: 16, padding: "24px",
                            boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                        }}>
                            <div style={{
                                display: "inline-block", padding: "4px 10px", borderRadius: 6,
                                background: stat.bg, color: stat.color,
                                fontSize: 11, fontWeight: 600, marginBottom: 12,
                            }}>
                                {stat.label}
                            </div>
                            <p style={{ fontSize: 40, fontWeight: 800, color: stat.color, margin: 0 }}>
                                {stat.valor}
                            </p>
                        </div>
                    ))}
                </div>

                <Buscador consultas={consultas} />

            </div>
        </div>
    );
}