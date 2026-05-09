"use client";

import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TurismoPage() {
    return (
        <main className="min-h-screen pt-20">
            <section
                className="py-20 px-6 text-white"
                style={{ background: "linear-gradient(135deg, var(--color-vyb-azul) 0%, #1a3a6b 100%)" }}
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-2 text-sm mb-8"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <span>/</span>
                        <span style={{ color: "var(--color-vyb-acento)" }}>Calidad Turística</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                style={{ background: "rgba(255,255,255,0.15)" }}>
                                <Award size={28} color="white" />
                            </div>
                            <span className="text-sm font-semibold tracking-widest uppercase"
                                style={{ color: "var(--color-vyb-acento)", fontFamily: "var(--font-titulo)" }}>
                                Servicios
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
                            style={{ fontFamily: "var(--font-titulo)" }}>
                            Certificación de<br />
                            <span style={{ color: "var(--color-vyb-acento)" }}>Calidad Turística</span>
                        </h1>
                        <p className="text-lg max-w-2xl leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.75)" }}>
                            Certificamos establecimientos turísticos bajo estándares nacionales, 
                            ayudándote a diferenciarte y atraer más clientes.
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}