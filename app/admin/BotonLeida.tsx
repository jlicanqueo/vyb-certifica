"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BotonLeida({ id }: { id: string }) {
    const [cargando, setCargando] = useState(false);
    const router = useRouter();

    async function marcarLeida() {
        setCargando(true);
        await fetch(`/api/consultas/${id}`, { method: "PATCH" });
        router.refresh(); // Recarga los datos sin recargar la página completa
        setCargando(false);
    }

    return (
        <button
            onClick={marcarLeida}
            disabled={cargando}
            style={{
                fontSize: 12, padding: "6px 14px", borderRadius: 20,
                background: "#F1F5F9", color: "#64748B",
                border: "none", cursor: "pointer", fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
                opacity: cargando ? 0.6 : 1,
            }}
        >
            <CheckCircle size={13} />
            {cargando ? "Guardando..." : "Marcar leída"}
        </button>
    );
}