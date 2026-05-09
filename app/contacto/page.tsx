"use client";

import { motion } from "framer-motion";
import { Shield, Award, Users, Target, Eye, Heart } from "lucide-react";

const valores = [
    {
        icono: Shield,
        titulo: "Integridad",
        descripcion: "Actuamos con transparencia y ética en cada proceso de certificación.",
    },
    {
        icono: Target,
        titulo: "Excelencia",
        descripcion: "Nos exigimos los más altos estándares en cada evaluación que realizamos.",
    },
    {
        icono: Users,
        titulo: "Compromiso",
        descripcion: "Acompañamos a cada cliente durante todo su proceso, sin abandonarlos.",
    },
    {
        icono: Heart,
        titulo: "Vocación",
        descripcion: "Creemos genuinamente que la calidad transforma organizaciones y personas.",
    },
];

const hitos = [
    { año: "2013", evento: "Fundación de V&B Certifica en Santiago" },
    { año: "2015", evento: "Primera acreditación como organismo certificador" },
    { año: "2017", evento: "Expansión al sector de calidad turística" },
    { año: "2019", evento: "Superamos las 200 empresas certificadas" },
    { año: "2022", evento: "Incorporación de ISO 27001 e ISO 50001" },
    { año: "2024", evento: "Más de 500 organizaciones certificadas en Chile" },
];

export default function PaginaNosotros() {
    return (
        <main className="min-h-screen pt-20">

            {/* HERO */}
            <section className="py-20 px-6 text-white"
                style={{ background: "linear-gradient(135deg, var(--color-vyb-azul) 0%, #1a3a6b 100%)" }}>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm mb-8"
                        style={{ color: "rgba(255,255,255,0.6)" }}>
                        <a href="/" className="hover:text-white transition-colors">Inicio</a>
                        <span>/</span>
                        <span style={{ color: "var(--color-vyb-acento)" }}>Nosotros</span>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}>
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
                            style={{ fontFamily: "var(--font-titulo)" }}>
                            Más de 10 años<br />
                            <span style={{ color: "var(--color-vyb-acento)" }}>
                                certificando Chile
                            </span>
                        </h1>
                        <p className="text-lg max-w-2xl leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.75)" }}>
                            Somos un organismo de certificación independiente, comprometido
                            con elevar los estándares de calidad en empresas y personas a lo
                            largo de todo el país.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* MISIÓN Y VISIÓN */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl"
                        style={{ background: "var(--color-vyb-azul)", boxShadow: "var(--shadow-vyb-hover)" }}>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                            style={{ background: "rgba(255,255,255,0.15)" }}>
                            <Target size={22} color="white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4"
                            style={{ fontFamily: "var(--font-titulo)" }}>
                            Nuestra misión
                        </h2>
                        <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                            Evaluar y certificar la conformidad de productos, procesos y
                            sistemas de gestión, contribuyendo al mejoramiento continuo
                            de las organizaciones chilenas y su competitividad nacional
                            e internacional.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl"
                        style={{ background: "var(--color-vyb-gris-claro)", boxShadow: "var(--shadow-vyb-card)" }}>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                            style={{ background: "var(--color-vyb-azul-claro)" }}>
                            <Eye size={22} style={{ color: "var(--color-vyb-azul)" }} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4"
                            style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                            Nuestra visión
                        </h2>
                        <p className="leading-relaxed" style={{ color: "var(--color-vyb-gris-medio)" }}>
                            Ser el organismo de certificación de referencia en Chile,
                            reconocido por su rigor técnico, cercanía con los clientes
                            y contribución al desarrollo de una cultura de calidad en
                            el país.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* VALORES */}
            <section className="py-20 px-6" style={{ background: "var(--color-vyb-gris-claro)" }}>
                <div className="max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4"
                            style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                            Nuestros valores
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {valores.map((v, i) => (
                            <motion.div key={v.titulo}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="p-6 rounded-3xl text-center transition-all duration-300"
                                style={{ background: "white", boxShadow: "var(--shadow-vyb-card)" }}>
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    style={{ background: "var(--color-vyb-azul-claro)" }}>
                                    <v.icono size={22} style={{ color: "var(--color-vyb-azul)" }} />
                                </div>
                                <h3 className="font-bold mb-2"
                                    style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                                    {v.titulo}
                                </h3>
                                <p className="text-sm leading-relaxed"
                                    style={{ color: "var(--color-vyb-gris-medio)" }}>
                                    {v.descripcion}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LÍNEA DE TIEMPO */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4"
                            style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                            Nuestra historia
                        </h2>
                    </motion.div>

                    <div className="relative">
                        {/* Línea vertical */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5"
                            style={{ background: "var(--color-vyb-azul-claro)" }} />

                        <div className="flex flex-col gap-8">
                            {hitos.map((hito, i) => (
                                <motion.div key={hito.año}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 items-start pl-4">
                                    {/* Punto en la línea */}
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                                        style={{ background: "var(--color-vyb-azul)", marginLeft: "-4px" }}>
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                    <div className="pb-2">
                                        <span className="text-sm font-bold block mb-1"
                                            style={{ color: "var(--color-vyb-acento)", fontFamily: "var(--font-titulo)" }}>
                                            {hito.año}
                                        </span>
                                        <p className="text-sm" style={{ color: "var(--color-vyb-gris-oscuro)" }}>
                                            {hito.evento}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6"
                style={{ background: "linear-gradient(135deg, var(--color-vyb-azul), var(--color-vyb-azul-medio))" }}>
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-4"
                        style={{ fontFamily: "var(--font-titulo)" }}>
                        ¿Quieres ser parte de nuestra historia?
                    </h2>
                    <p className="mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
                        Únete a las más de 500 organizaciones que confían en V&B Certifica.
                    </p>
                    <a href="/contacto"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                        style={{ background: "white", color: "var(--color-vyb-azul)", fontFamily: "var(--font-titulo)" }}>
                        Contáctanos hoy
                    </a>
                </div>
            </section>
        </main>
    );
}