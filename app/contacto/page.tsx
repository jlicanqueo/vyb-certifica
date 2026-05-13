"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import Link from "next/link";

// Estado del formulario — TypeScript nos obliga a definir
// la forma exacta de los datos. Esto evita errores silenciosos.
type FormData = {
    nombre: string;
    empresa: string;
    email: string;
    telefono: string;
    servicio: string;
    mensaje: string;
};

const serviciosOpciones = [
    "Calidad Turística",
    "ISO 9001:2015 - Gestión de Calidad",
    "ISO 14001:2015 - Gestión Ambiental",
    "ISO 45001:2018 - Seguridad Ocupacional",
    "ISO 27001:2022 - Seguridad de la Información",
    "ISO 50001:2018 - Gestión de Energía",
    "Guías de Turismo",
    "No sé cuál necesito — quiero orientación",
];

export default function PaginaContacto() {
    const [form, setForm] = useState<FormData>({
        nombre: "", empresa: "", email: "",
        telefono: "", servicio: "", mensaje: "",
    });
    const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);

    function handleChange(campo: keyof FormData, valor: string) {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    }

    async function handleSubmit() {
        if (!form.nombre || !form.email || !form.servicio) return;
        setEnviando(true);

        try {
            const res = await fetch("/api/contacto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.status === 429) {
                alert("Has enviado demasiados mensajes. Por favor espera un momento antes de intentar nuevamente.");
                return;
            }

            if (!res.ok) throw new Error(data.error);

            setEnviado(true);

        } catch (error) {
            alert("Hubo un problema al enviar. Por favor intenta de nuevo o contáctanos directamente.");
        } finally {
            setEnviando(false);
        }
    }

    const inputStyle = {
        background: "var(--color-vyb-gris-claro)",
        border: "1.5px solid rgba(27,79,138,0.12)",
        borderRadius: 12,
        color: "var(--color-vyb-gris-oscuro)",
        fontFamily: "var(--font-cuerpo)",
        fontSize: 14,
        padding: "12px 16px",
        width: "100%",
        outline: "none",
        transition: "border-color 0.2s",
    };

    return (
        <main className="min-h-screen pt-20">

            {/* HERO */}
            <section className="py-20 px-6 text-white"
                style={{ background: "linear-gradient(135deg, var(--color-vyb-azul) 0%, #1a3a6b 100%)" }}>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-2 text-sm mb-8"
                            style={{ color: "rgba(255,255,255,0.6)" }}>
                            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                            <span>/</span>
                            <span style={{ color: "var(--color-vyb-acento)" }}>Contacto</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4"
                            style={{ fontFamily: "var(--font-titulo)" }}>
                            Hablemos
                        </h1>
                        <p className="text-lg" style={{ color: "rgba(255,255,255,0.75)" }}>
                            Cuéntanos sobre tu proyecto y te orientamos sin compromiso.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTENIDO PRINCIPAL */}
            <section className="py-20 px-6" style={{ background: "var(--color-vyb-gris-claro)" }}>
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Info de contacto — columna izquierda */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6"
                    >
                        <div>
                            <h2 className="text-2xl font-bold mb-2"
                                style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                                Información de contacto
                            </h2>
                            <p className="text-sm" style={{ color: "var(--color-vyb-gris-medio)" }}>
                                Respondemos en menos de 24 horas hábiles.
                            </p>
                        </div>

                        {[
                            { icono: MapPin, titulo: "Dirección", texto: "Ahumada #254 of. 608\nSantiago, Chile" },
                            { icono: Phone, titulo: "Teléfonos", texto: "+56 9 29910646\n+56 9 92144113" },
                            { icono: Mail, titulo: "Email", texto: "contacto@vybcertifica.cl" },
                        ].map((item) => (
                            <div key={item.titulo} className="flex gap-4 p-5 rounded-2xl"
                                style={{ background: "white", boxShadow: "var(--shadow-vyb-card)" }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: "var(--color-vyb-azul-claro)" }}>
                                    <item.icono size={18} style={{ color: "var(--color-vyb-azul)" }} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold mb-1 uppercase tracking-wide"
                                        style={{ color: "var(--color-vyb-gris-medio)", fontFamily: "var(--font-titulo)" }}>
                                        {item.titulo}
                                    </p>
                                    <p className="text-sm whitespace-pre-line"
                                        style={{ color: "var(--color-vyb-gris-oscuro)" }}>
                                        {item.texto}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* WhatsApp directo */}
                        <a href="https://wa.me/56929910646" target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-3 px-6 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                            style={{ background: "#25D366", color: "white", fontFamily: "var(--font-titulo)" }}>
                            Escribir por WhatsApp
                        </a>
                    </motion.div>

                    {/* Formulario — columna derecha (2/3 del ancho) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-2 p-8 rounded-3xl"
                        style={{ background: "white", boxShadow: "var(--shadow-vyb-hover)" }}
                    >
                        {enviado ? (
                            // Estado de éxito — se muestra tras enviar
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-full py-12 text-center gap-4"
                            >
                                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{ background: "var(--color-vyb-azul-claro)" }}>
                                    <CheckCircle size={32} style={{ color: "var(--color-vyb-azul)" }} />
                                </div>
                                <h3 className="text-2xl font-bold"
                                    style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                                    ¡Mensaje enviado!
                                </h3>
                                <p style={{ color: "var(--color-vyb-gris-medio)" }}>
                                    Te contactaremos en menos de 24 horas hábiles.
                                </p>
                                <button
                                    onClick={() => { setEnviado(false); setForm({ nombre: "", empresa: "", email: "", telefono: "", servicio: "", mensaje: "" }); }}
                                    className="mt-4 px-6 py-2 rounded-full text-sm font-semibold"
                                    style={{ background: "var(--color-vyb-azul-claro)", color: "var(--color-vyb-azul)", fontFamily: "var(--font-titulo)" }}>
                                    Enviar otro mensaje
                                </button>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col gap-5">
                                <h3 className="text-xl font-bold mb-2"
                                    style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                                    Formulario de contacto
                                </h3>

                                {/* Fila de dos columnas */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wide"
                                            style={{ color: "var(--color-vyb-gris-medio)", fontFamily: "var(--font-titulo)" }}>
                                            Nombre *
                                        </label>
                                        <input
                                            style={inputStyle}
                                            placeholder="Tu nombre completo"
                                            value={form.nombre}
                                            onChange={(e) => handleChange("nombre", e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wide"
                                            style={{ color: "var(--color-vyb-gris-medio)", fontFamily: "var(--font-titulo)" }}>
                                            Empresa
                                        </label>
                                        <input
                                            style={inputStyle}
                                            placeholder="Nombre de tu empresa"
                                            value={form.empresa}
                                            onChange={(e) => handleChange("empresa", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wide"
                                            style={{ color: "var(--color-vyb-gris-medio)", fontFamily: "var(--font-titulo)" }}>
                                            Email *
                                        </label>
                                        <input
                                            style={inputStyle}
                                            type="email"
                                            placeholder="tu@email.com"
                                            value={form.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wide"
                                            style={{ color: "var(--color-vyb-gris-medio)", fontFamily: "var(--font-titulo)" }}>
                                            Teléfono
                                        </label>
                                        <input
                                            style={inputStyle}
                                            placeholder="+56 9 xxxxxxxx"
                                            value={form.telefono}
                                            onChange={(e) => handleChange("telefono", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wide"
                                        style={{ color: "var(--color-vyb-gris-medio)", fontFamily: "var(--font-titulo)" }}>
                                        Servicio de interés *
                                    </label>
                                    <select
                                        style={inputStyle}
                                        value={form.servicio}
                                        onChange={(e) => handleChange("servicio", e.target.value)}
                                    >
                                        <option value="">Selecciona una opción...</option>
                                        {serviciosOpciones.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold uppercase tracking-wide"
                                        style={{ color: "var(--color-vyb-gris-medio)", fontFamily: "var(--font-titulo)" }}>
                                        Mensaje
                                    </label>
                                    <textarea
                                        style={{ ...inputStyle, resize: "none" }}
                                        rows={4}
                                        placeholder="Cuéntanos sobre tu empresa y lo que necesitas..."
                                        value={form.mensaje}
                                        onChange={(e) => handleChange("mensaje", e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={enviando || !form.nombre || !form.email || !form.servicio}
                                    className="flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    style={{ background: "var(--color-vyb-azul)", fontFamily: "var(--font-titulo)" }}
                                >
                                    {enviando ? (
                                        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                    ) : (
                                        <><Send size={18} /> Enviar mensaje</>
                                    )}
                                </button>

                                <p className="text-xs text-center" style={{ color: "var(--color-vyb-gris-medio)" }}>
                                    * Campos obligatorios. Tu información es confidencial.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </main>
    );
}