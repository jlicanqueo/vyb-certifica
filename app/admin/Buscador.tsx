"use client";

import { useState } from "react";
import { Search, Mail, Phone, Building, Clock } from "lucide-react";
import BotonLeida from "./BotonLeida";

type Consulta = {
    id: string;
    nombre: string;
    empresa: string | null;
    email: string;
    telefono: string | null;
    servicio: string;
    mensaje: string | null;
    leida: boolean;
    createdAt: Date;
};

export default function Buscador({ consultas }: { consultas: Consulta[] }) {
    const [busqueda, setBusqueda] = useState("");
    const [filtro, setFiltro] = useState<"todas" | "nuevas" | "leidas">("todas");

    const consultasFiltradas = consultas.filter((c) => {
        const coincideBusqueda =
            busqueda === "" ||
            c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            c.email.toLowerCase().includes(busqueda.toLowerCase()) ||
            c.servicio.toLowerCase().includes(busqueda.toLowerCase()) ||
            (c.empresa?.toLowerCase().includes(busqueda.toLowerCase()) ?? false);

        const coincideFiltro =
            filtro === "todas" ||
            (filtro === "nuevas" && !c.leida) ||
            (filtro === "leidas" && c.leida);

        return coincideBusqueda && coincideFiltro;
    });

    return (
        <div>
            <div style={{
                display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap",
                alignItems: "center",
            }}>
                <div style={{
                    flex: 1, minWidth: 200,
                    display: "flex", alignItems: "center", gap: 10,
                    background: "white", borderRadius: 12, padding: "10px 16px",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                }}>
                    <Search size={16} color="#94A3B8" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o servicio..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        style={{
                            border: "none", outline: "none", flex: 1,
                            fontSize: 14, color: "#1E293B", background: "transparent",
                        }}
                    />
                </div>

                {(["todas", "nuevas", "leidas"] as const).map((f) => (
                    <button key={f} onClick={() => setFiltro(f)}
                        style={{
                            padding: "10px 18px", borderRadius: 12, fontSize: 13,
                            fontWeight: 600, border: "none", cursor: "pointer",
                            background: filtro === f ? "#1B4F8A" : "white",
                            color: filtro === f ? "white" : "#64748B",
                            boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                            textTransform: "capitalize",
                        }}>
                        {f === "todas" ? "Todas" : f === "nuevas" ? "Sin leer" : "Leídas"}
                    </button>
                ))}
            </div>

            <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 12 }}>
                {consultasFiltradas.length} resultado{consultasFiltradas.length !== 1 ? "s" : ""}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {consultasFiltradas.length === 0 ? (
                    <div style={{
                        background: "white", borderRadius: 16, padding: "60px",
                        textAlign: "center", color: "#94A3B8",
                        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                    }}>
                        <p style={{ fontSize: 16, margin: 0 }}>No se encontraron consultas.</p>
                    </div>
                ) : (
                    consultasFiltradas.map((c) => (
                        <div key={c.id} style={{
                            background: "white", borderRadius: 16, padding: "24px",
                            boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                            borderLeft: `4px solid ${c.leida ? "#E2E8F0" : "#1B4F8A"}`,
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                                <div style={{ flex: 1 }}>
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
                                    {!c.leida && <BotonLeida id={c.id} />}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}