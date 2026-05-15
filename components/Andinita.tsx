"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Send, Minimize2 } from "lucide-react";

type Rol = "andinita" | "usuario";
type Mensaje = {
    rol: Rol;
    texto: string;
};

const respuestas: { palabras: string[]; respuesta: string }[] = [
    {
        palabras: ["hola", "buenas", "saludos", "hey"],
        respuesta: "¡Hola! Soy Andinita 🐱 la asistente de V&B Certifica. ¿En qué puedo ayudarte hoy?",
    },
    {
        palabras: ["iso", "9001", "14001", "45001", "27001", "50001"],
        respuesta: "Ofrecemos certificación en múltiples normas ISO. ¿Te gustaría saber más sobre alguna en específico, o prefieres que un ejecutivo te contacte?",
    },
    {
        palabras: ["turismo", "turística", "alojamiento", "hotel", "agencia"],
        respuesta: "Certificamos calidad turística para alojamientos, agencias y tour operadores. ¡Es un proceso más accesible de lo que crees! ¿Quieres que te cuente los pasos?",
    },
    {
        palabras: ["guía", "guias", "turístico"],
        respuesta: "Certificamos guías de turismo nacionales, locales y de sitio. ¿Eres guía o estás buscando certificar a tu equipo?",
    },
    {
        palabras: ["precio", "costo", "valor", "cuánto", "cuanto", "tarifa"],
        respuesta: "Los precios varían según el tipo de certificación. Lo mejor es que conversemos directamente — escríbenos a contacto@vybcertifica.cl o llámanos al +56 9 29910646 y te damos un presupuesto sin compromiso 😊",
    },
    {
        palabras: ["contacto", "llamar", "email", "correo", "teléfono", "telefono"],
        respuesta: "Puedes contactarnos por:\n📧 contacto@vybcertifica.cl\n📞 +56 9 29910646\n📞 +56 9 92144113\n\nO usa el formulario de contacto en la página. ¡Respondemos rápido!",
    },
    {
        palabras: ["tiempo", "plazo", "demora", "cuánto tiempo", "proceso"],
        respuesta: "El tiempo depende del tipo de certificación y el tamaño de tu organización. Un proceso ISO típico toma entre 3 y 6 meses. ¿Quieres que un ejecutivo te explique el proceso completo?",
    },
    {
        palabras: ["gracias", "muchas gracias", "perfecto", "genial"],
        respuesta: "¡Con mucho gusto! 🐱 Si tienes más preguntas, aquí estaré. ¡Que tengas un excelente día!",
    },
];

function buscarRespuesta(texto: string): string {
    const textoMin = texto.toLowerCase();
    for (const item of respuestas) {
        if (item.palabras.some((p) => textoMin.includes(p))) {
            return item.respuesta;
        }
    }
    return "Hmm, no estoy segura de cómo ayudarte con eso 🤔 Te recomiendo contactar directamente a nuestro equipo en contacto@vybcertifica.cl o al +56 9 29910646.";
}

export default function Andinita() {
    const [abierto, setAbierto] = useState(false);
    const [mensajes, setMensajes] = useState<Mensaje[]>([
        {
            rol: "andinita",
            texto: "¡Hola! Soy Andinita 🐱 ¿En qué puedo ayudarte hoy?",
        },
    ]);
    const [input, setInput] = useState("");
    const [pensando, setPensando] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    function enviarMensaje() {
        const texto = input.trim();
        if (!texto) return;

        const nuevosMensajes: Mensaje[] = [
            ...mensajes,
            { rol: "usuario", texto },
        ];
        setMensajes(nuevosMensajes);
        setInput("");
        setPensando(true);

        setTimeout(() => {
            setPensando(false);
            setMensajes((prev) => [
                ...prev,
                { rol: "andinita", texto: buscarRespuesta(texto) },
            ]);
        }, 900);
    }

    return (
        <>
            <div id="andinita-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                <AnimatePresence>
                    {!abierto && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ delay: 2, duration: 0.4 }}
                            className="px-4 py-2 rounded-2xl rounded-br-sm text-sm font-medium shadow-lg max-w-[200px] text-center"
                            style={{
                                background: "white",
                                color: "var(--color-vyb-azul)",
                                fontFamily: "var(--font-titulo)",
                                boxShadow: "var(--shadow-vyb-hover)",
                                border: "1px solid rgba(27,79,138,0.1)",
                            }}
                        >
                            ¡Hola! ¿Necesitas ayuda? 👋
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setAbierto(!abierto)}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative rounded-full overflow-hidden cursor-pointer border-4 border-white"
                    style={{
                        width: 72,
                        height: 72,
                        boxShadow: "var(--shadow-vyb-hover)",
                    }}
                    aria-label="Abrir chat con Andinita"
                >
                    <Image
                        src="/gato.gui.jpg"
                        alt="Andinita - Asistente de V&B Certifica"
                        fill
                        className="object-cover"
                    />
                </motion.button>
            </div>

            <AnimatePresence>
                {abierto && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden"
                        style={{
                            width: 340,
                            height: 480,
                            background: "white",
                            borderRadius: 20,
                            boxShadow: "0 20px 60px rgba(27,79,138,0.2)",
                            border: "1px solid rgba(27,79,138,0.1)",
                        }}
                    >
                        <div
                            className="flex items-center gap-3 px-4 py-3"
                            style={{
                                background: "linear-gradient(135deg, var(--color-vyb-azul), var(--color-vyb-azul-medio))",
                            }}
                        >
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                                <Image
                                    src="/gato.gui.jpg"
                                    alt="Andinita"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-semibold text-sm"
                                    style={{ fontFamily: "var(--font-titulo)" }}>
                                    Andinita
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                                        En línea · Asistente V&B
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setAbierto(false)}
                                className="text-white opacity-70 hover:opacity-100 transition-opacity"
                            >
                                <Minimize2 size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
                            style={{ background: "#F8FAFC" }}>
                            {mensajes.map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex ${m.rol === "usuario" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className="px-4 py-2.5 rounded-2xl text-sm max-w-[80%] leading-relaxed whitespace-pre-line"
                                        style={{
                                            background: m.rol === "usuario"
                                                ? "var(--color-vyb-azul)"
                                                : "white",
                                            color: m.rol === "usuario"
                                                ? "white"
                                                : "var(--color-vyb-gris-oscuro)",
                                            borderRadius: m.rol === "usuario"
                                                ? "18px 18px 4px 18px"
                                                : "18px 18px 18px 4px",
                                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                        }}
                                    >
                                        {m.texto}
                                    </div>
                                </div>
                            ))}

                            {pensando && (
                                <div className="flex justify-start">
                                    <div
                                        className="px-4 py-3 rounded-2xl flex gap-1 items-center"
                                        style={{
                                            background: "white",
                                            borderRadius: "18px 18px 18px 4px",
                                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                        }}
                                    >
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                className="block w-2 h-2 rounded-full"
                                                style={{ background: "var(--color-vyb-azul-medio)" }}
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    delay: i * 0.15,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        <div
                            className="px-3 py-3 flex gap-2 items-center"
                            style={{
                                borderTop: "1px solid rgba(27,79,138,0.08)",
                                background: "white",
                            }}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
                                placeholder="Escribe tu consulta..."
                                className="flex-1 px-4 py-2 text-sm outline-none rounded-full"
                                style={{
                                    background: "#F1F5F9",
                                    color: "var(--color-vyb-gris-oscuro)",
                                    fontFamily: "var(--font-cuerpo)",
                                    border: "none",
                                }}
                            />
                            <button
                                onClick={enviarMensaje}
                                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110 hover:opacity-90"
                                style={{ background: "var(--color-vyb-azul)" }}
                            >
                                <Send size={16} color="white" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}