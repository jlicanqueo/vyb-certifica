"use client";

import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, ArrowRight, MapPin, Users, Clock, Star } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">

      <section
        className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--color-vyb-azul) 0%, #1a3a6b 50%, var(--color-vyb-azul-medio) 100%)" }}
      >
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "var(--color-vyb-acento)" }} />
        <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "white" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "var(--font-titulo)" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Organismo acreditado en Chile
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white mb-6"
            style={{ fontFamily: "var(--font-titulo)" }}
          >
            Certificamos la
            <span className="block" style={{ color: "var(--color-vyb-acento)" }}>excelencia</span>
            de tu empresa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Más de 10 años acompañando a empresas y personas en su camino
            hacia la calidad y sustentabilidad en Chile.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#servicios"
              className="px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 justify-center transition-all duration-300 hover:scale-105"
              style={{ background: "white", color: "var(--color-vyb-azul)", fontFamily: "var(--font-titulo)" }}
            >
              Ver servicios <ArrowRight size={18} />
            </a>
            <Link href="/contacto"
              className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.25)", fontFamily: "var(--font-titulo)" }}
            >
              Cotizar ahora
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { numero: "+500", label: "Empresas certificadas" },
              { numero: "10+", label: "Años de experiencia" },
              { numero: "5", label: "Normas ISO activas" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-white mb-1"
                  style={{ fontFamily: "var(--font-titulo)" }}>{stat.numero}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="servicios" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: "var(--color-vyb-acento)", fontFamily: "var(--font-titulo)" }}>
              Lo que hacemos
            </span>
            <h2 className="text-4xl md:text-5xl mb-4" style={{ color: "var(--color-vyb-gris-oscuro)" }}>
              Nuestros servicios
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--color-vyb-gris-medio)" }}>
              Soluciones de certificación adaptadas a cada tipo de organización
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicios.map((s, i) => (
              <motion.div
                key={s.titulo}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-3xl cursor-pointer transition-all duration-300"
                style={{ background: "var(--color-vyb-gris-claro)", boxShadow: "var(--shadow-vyb-card)" }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "var(--color-vyb-azul-claro)" }}>
                  <s.icono size={26} style={{ color: "var(--color-vyb-azul)" }} />
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                  {s.titulo}
                </h3>
                <p className="leading-relaxed mb-6 text-sm" style={{ color: "var(--color-vyb-gris-medio)" }}>
                  {s.descripcion}
                </p>

                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: "var(--color-vyb-azul-claro)", color: "var(--color-vyb-azul)", fontFamily: "var(--font-titulo)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: "var(--color-vyb-gris-claro)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold tracking-widest uppercase mb-4 block"
              style={{ color: "var(--color-vyb-acento)", fontFamily: "var(--font-titulo)" }}>
              Nuestra diferencia
            </span>
            <h2 className="text-4xl md:text-5xl" style={{ color: "var(--color-vyb-gris-oscuro)" }}>
              ¿Por qué elegirnos?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {razones.map((r, i) => (
              <motion.div
                key={r.titulo}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 rounded-3xl"
                style={{ background: "white", boxShadow: "var(--shadow-vyb-card)" }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "var(--color-vyb-azul-claro)" }}>
                  <r.icono size={22} style={{ color: "var(--color-vyb-azul)" }} />
                </div>
                <h4 className="font-bold mb-2 text-base" style={{ color: "var(--color-vyb-gris-oscuro)", fontFamily: "var(--font-titulo)" }}>
                  {r.titulo}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-vyb-gris-medio)" }}>
                  {r.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6"
        style={{ background: "linear-gradient(135deg, var(--color-vyb-azul) 0%, var(--color-vyb-azul-medio) 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6"
              style={{ fontFamily: "var(--font-titulo)" }}>
              ¿Listo para certificar tu empresa?
            </h2>
            <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
              Conversemos sin compromiso. Nuestro equipo te guiará en cada paso del proceso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:contacto@vybcertifica.cl"
                className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{ background: "white", color: "var(--color-vyb-azul)", fontFamily: "var(--font-titulo)" }}>
                Escribirnos por email
              </a>
              <a href="https://wa.me/56929910646" target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", fontFamily: "var(--font-titulo)" }}>
                WhatsApp directo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}

const servicios = [
  {
    titulo: "Calidad Turística",
    descripcion: "Certificamos establecimientos turísticos bajo estándares nacionales, ayudándote a diferenciarte y atraer más clientes.",
    icono: Award,
    tags: ["Alojamiento", "Agencias", "Tour Operador"],
  },
  {
    titulo: "Normas ISO",
    descripcion: "Implementamos y certificamos sistemas de gestión ISO para mejorar procesos, reducir riesgos y abrir nuevos mercados.",
    icono: Shield,
    tags: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001"],
  },
  {
    titulo: "Guías de Turismo",
    descripcion: "Certificamos las competencias de guías turísticos nacionales, locales y de sitio, validando su profesionalismo.",
    icono: MapPin,
    tags: ["Guías Nacionales", "Guías Locales", "Guías de Sitio"],
  },
];

const razones = [
  {
    titulo: "Experiencia comprobada",
    descripcion: "Más de 10 años certificando empresas y personas en todo Chile.",
    icono: Star,
  },
  {
    titulo: "Equipo profesional",
    descripcion: "Auditores certificados con amplia experiencia en cada sector.",
    icono: Users,
  },
  {
    titulo: "Proceso ágil",
    descripcion: "Metodología clara y acompañamiento en cada etapa del proceso.",
    icono: Clock,
  },
  {
    titulo: "Resultados reales",
    descripcion: "Más de 500 organizaciones certificadas con éxito en el país.",
    icono: CheckCircle,
  },
];