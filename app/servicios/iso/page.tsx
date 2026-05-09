"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const normas = [
    {
        codigo: "ISO 9001:2015",
        nombre: "Gestión de Calidad",
        descripcion: "La norma más reconocida mundialmente. Mejora tus procesos internos, reduce errores y aumenta la satisfacción de tus clientes.",
        beneficios: ["Acceso a nuevos mercados", "Reducción de costos operativos", "Mayor confianza de clientes"],
        color: "#1B4F8A",
    },
    {
        codigo: "ISO 14001:2015",
        nombre: "Gestión Ambiental",
        descripcion: "Demuestra tu compromiso con el medioambiente. Cada vez más empresas y licitaciones lo exigen.",
        beneficios: ["Cumplimiento legal ambiental", "Imagen corporativa sustentable", "Reducción de impacto ambiental"],
        color: "#059669",
    },
    {
        codigo: "ISO 45001:2018",
        nombre: "Seguridad y Salud Ocupacional",
        descripcion: "Protege a tu equipo. Reduce accidentes laborales y cumple con la normativa chilena vigente.",
        beneficios: ["Reducción de accidentes", "Cumplimiento Ley 16.744", "Mejor clima laboral"],
        color: "#D97706",
    },
    {
        codigo: "ISO 27001:2022",
        nombre: "Seguridad de la Información",
        descripcion: "Protege los datos de tu empresa y clientes. Fundamental en la era digital.",
        beneficios: ["Protección de datos críticos", "Cumplimiento LGPD", "Confianza digital"],
        color: "#7C3AED",
    },
    {
        codigo: "ISO 50001:2018",
        nombre: "Gestión de Energía",
        descripcion: "Optimiza el consumo energético de tu organización y reduce costos en electricidad y combustibles.",
        beneficios: ["Ahorro en costos energéticos", "Huella de carbono reducida", "Eficiencia operacional"],
        color: "#0EA5E9",
    },
];

const pasos = [
    { numero: "01", titulo: "Diagnóstico inicial", descripcion: "Evaluamos el estado actual de tu organización sin costo." },
    { numero: "02", titulo: "Plan de implementación", descripcion: "Diseñamos una hoja de ruta realista adaptada a tu empresa." },
    { numero: "03", titulo: "Acompañamiento", descripcion: "Te guiamos en cada etapa de la implementación." },
    { numero: "04", titulo: "Auditoría y certificación", descripcion: "Realizamos la auditoría y emitimos tu certificado." },
];

export default function PaginaISO() {
    return (
        <main className="min-h-screen pt-20">

            {/* HERO de página interna — más compacto que el homepage */}
            <section
                className="py-20 px-6 text-white"
                style={{ background: "linear-gradient(135deg, var(--color-vyb-azul) 0%, #1a3a6b 100%)" }}
            >
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb — le dice al usuario dónde está */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-2 text-sm mb-8"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <span>/</span>
                        <span style={{ color: "var(--color-vyb-acento)" }}>Normas ISO</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                style={{ background: "rgba(255,255,255,0.15)" }}>
                                <Shield size={28} color="white" />
                            </div>
                            <span className="text-sm font-semibold tracking-widest uppercase"
                                style={{ color: "var(--color-vyb-acento)", fontFamily: "var(--font-titulo)" }}>
                                Sistemas de Gestión
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
                            style={{ fontFamily: "var(--font-titulo)" }}>
                            Certificación en<br />
                            <span style={{ color: "var(--color-vyb-acento)" }}>Normas ISO</span>
                        </h1>
                        <p className="text-lg max-w-2xl leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.75)" }}>
                            Implementamos y certificamos sistemas de gestión ISO para que tu organización
                            mejore sus procesos, reduzca riesgos y acceda a nuevos mercados.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* NORMAS DISPONIBLES */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4"
                            style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                            Normas que certificamos
                        </h2>
                        <p className="text-lg" style={{ color: "var(--color-vyb-gris-medio)" }}>
                            Selecciona la norma que necesitas o contáctanos para orientarte
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {normas.map((norma, i) => (
                            <motion.div
                                key={norma.codigo}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="p-6 rounded-3xl transition-all duration-300"
                                style={{ background: "var(--color-vyb-gris-claro)", boxShadow: "var(--shadow-vyb-card)" }}
                            >
                                {/* Badge de código */}
                                <span className="text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block"
                                    style={{ background: norma.color + "15", color: norma.color, fontFamily: "var(--font-titulo)" }}>
                                    {norma.codigo}
                                </span>

                                <h3 className="text-lg font-bold mb-2"
                                    style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                                    {norma.nombre}
                                </h3>
                                <p className="text-sm leading-relaxed mb-4"
                                    style={{ color: "var(--color-vyb-gris-medio)" }}>
                                    {norma.descripcion}
                                </p>

                                <ul className="flex flex-col gap-2">
                                    {norma.beneficios.map((b) => (
                                        <li key={b} className="flex items-center gap-2 text-sm"
                                            style={{ color: "var(--color-vyb-gris-oscuro)" }}>
                                            <CheckCircle size={14} style={{ color: norma.color, flexShrink: 0 }} />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESO */}
            <section className="py-20 px-6" style={{ background: "var(--color-vyb-gris-claro)" }}>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4"
                            style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                            ¿Cómo es el proceso?
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pasos.map((paso, i) => (
                            <motion.div
                                key={paso.numero}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-5 p-6 rounded-2xl"
                                style={{ background: "white", boxShadow: "var(--shadow-vyb-card)" }}
                            >
                                <span className="text-3xl font-extrabold flex-shrink-0"
                                    style={{ color: "var(--color-vyb-azul-claro)", fontFamily: "var(--font-titulo)" }}>
                                    {paso.numero}
                                </span>
                                <div>
                                    <h4 className="font-bold mb-1"
                                        style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                                        {paso.titulo}
                                    </h4>
                                    <p className="text-sm leading-relaxed"
                                        style={{ color: "var(--color-vyb-gris-medio)" }}>
                                        {paso.descripcion}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6"
                style={{ background: "linear-gradient(135deg, var(--color-vyb-azul), var(--color-vyb-azul-medio))" }}>
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-4"
                        style={{ fontFamily: "var(--font-titulo)" }}>
                        ¿Cuál norma necesitas?
                    </h2>
                    <p className="mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
                        Cuéntanos sobre tu empresa y te orientamos sin compromiso.
                    </p>
                    <Link href="/contacto"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                        style={{ background: "white", color: "var(--color-vyb-azul)", fontFamily: "var(--font-titulo)" }}>
                        Cotizar ahora <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

        </main>
    );
}