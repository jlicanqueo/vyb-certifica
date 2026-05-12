import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Clock, Mail, Phone, Building, LogOut, LayoutDashboard } from "lucide-react";
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
    <div style={{ minHeight: "100vh", background: "#F1F5F9", fontFamily: "'Inter', sans-serif" }}>

      {/* SIDEBAR */}
      <div style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
        background: "#1B4F8A", display: "flex", flexDirection: "column",
        padding: "32px 0", zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ padding: "0 24px 32px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "white", display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: 700, fontSize: 13,
              color: "#1B4F8A",
            }}>VB</div>
            <div>
              <p style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>V&B Certifica</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: 0 }}>Panel Admin</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ padding: "24px 12px", flex: 1 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 8,
            background: "rgba(255,255,255,0.12)", color: "white",
            fontSize: 14, fontWeight: 500, cursor: "pointer",
          }}>
            <LayoutDashboard size={16} />
            Consultas
          </div>
        </div>

        {/* Cerrar sesión */}
        <div style={{ padding: "0 12px" }}>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 8,
            color: "rgba(255,255,255,0.6)", fontSize: 14,
            textDecoration: "none", cursor: "pointer",
          }}>
            <LogOut size={16} />
            Volver al sitio
          </Link>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ marginLeft: 240, padding: "40px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1E293B", margin: "0 0 4px 0" }}>
            Consultas recibidas
          </h1>
          <p style={{ color: "#64748B", margin: 0, fontSize: 14 }}>
            Gestiona las consultas de clientes potenciales
          </p>
        </div>

        {/* Stats */}
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

        {/* Lista consultas */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {consultas.length === 0 ? (
            <div style={{
              background: "white", borderRadius: 16, padding: "60px",
              textAlign: "center", color: "#94A3B8",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
            }}>
              <p style={{ fontSize: 16, margin: 0 }}>No hay consultas aún.</p>
              <p style={{ fontSize: 13, margin: "8px 0 0 0" }}>
                Las consultas del formulario aparecerán aquí.
              </p>
            </div>
          ) : (
            consultas.map((c) => (
              <div key={c.id} style={{
                background: "white", borderRadius: 16, padding: "24px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                borderLeft: `4px solid ${c.leida ? "#E2E8F0" : "#1B4F8A"}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ flex: 1 }}>

                    {/* Nombre + badges */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1E293B", margin: 0 }}>
                        {c.nombre}
                      </h3>
                      {!c.leida && (
                        <span style={{
                          fontSize: 11, padding: "2px 8px", borderRadius: 20,
                          background: "#DBEAFE", color: "#1B4F8A", fontWeight: 600,
                        }}>Nueva</span>
                      )}
                      <span style={{
                        fontSize: 11, padding: "2px 10px", borderRadius: 20,
                        background: "#F1F5F9", color: "#64748B",
                      }}>{c.servicio}</span>
                    </div>

                    {/* Datos contacto */}
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 12 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748B" }}>
                        <Mail size={13} /> {c.email}
                      </span>
                      {c.telefono && (
                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748B" }}>
                          <Phone size={13} /> {c.telefono}
                        </span>
                      )}
                      {c.empresa && (
                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748B" }}>
                          <Building size={13} /> {c.empresa}
                        </span>
                      )}
                    </div>

                    {c.mensaje && (
                      <p style={{
                        fontSize: 13, padding: "10px 14px", borderRadius: 8,
                        background: "#F8FAFC", color: "#1E293B", margin: 0, lineHeight: 1.6,
                      }}>
                        {c.mensaje}
                      </p>
                    )}
                  </div>

                  {/* Fecha + acción */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#94A3B8" }}>
                      <Clock size={12} />
                      {new Date(c.createdAt).toLocaleDateString("es-CL", {
                        day: "2-digit", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                    <a href={`mailto:${c.email}`} style={{
                      fontSize: 12, padding: "6px 14px", borderRadius: 20,
                      background: "#1B4F8A", color: "white",
                      textDecoration: "none", fontWeight: 600,
                    }}>
                      Responder →
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}