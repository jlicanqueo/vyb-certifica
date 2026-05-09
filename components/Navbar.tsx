"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Award, Shield, MapPin } from "lucide-react";
import Link from "next/link";

// Definimos los links de navegación como datos separados.
// Esto es una buena práctica: si mañana agregas un servicio nuevo,
// solo tocas este array, no el HTML.
const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Nosotros", href: "/nosotros" },
    {
        label: "Servicios",
        href: "#",
        // Los sublinks convierten este item en un dropdown
        sublinks: [
            { label: "Calidad Turística", href: "/servicios/turismo", icono: Award },
            { label: "Normas ISO", href: "/servicios/iso", icono: Shield },
            { label: "Guías de Turismo", href: "/servicios/guias", icono: MapPin },
        ],
    },
    { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
    // Estado para el menú móvil (abierto/cerrado)
    const [menuAbierto, setMenuAbierto] = useState(false);
    // Estado para saber si el usuario scrolleó (para cambiar el fondo del navbar)
    const [scrolled, setScrolled] = useState(false);
    // Estado para el dropdown de Servicios
    const [dropdownAbierto, setDropdownAbierto] = useState(false);

    // useEffect: ejecuta código cuando el componente se monta en el navegador.
    // Aquí agregamos un "listener" que detecta el scroll.
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        // La función que retorna es el "cleanup": cuando el componente
        // se desmonta, removemos el listener para no tener memory leaks.
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        // El navbar es position:fixed para que siempre esté visible al scrollear.
        // Cambia de transparente a blanco con sombra cuando el usuario scrollea.
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                boxShadow: scrolled ? "0 1px 24px rgba(27,79,138,0.08)" : "none",
            }}
        >
            <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* LOGO */}
                <Link href="/" className="flex items-center gap-3 group">
                    {/* Ícono geométrico como logo temporal hasta tener el logo real */}
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm transition-transform duration-300 group-hover:scale-110"
                        style={{ background: scrolled ? "var(--color-vyb-azul)" : "white" }}
                    >
                        <span style={{ color: scrolled ? "white" : "var(--color-vyb-azul)" }}>
                            VB
                        </span>
                    </div>
                    <span
                        className="font-bold text-lg transition-colors duration-300"
                        style={{
                            fontFamily: "var(--font-titulo)",
                            color: scrolled ? "var(--color-vyb-azul)" : "white",
                        }}
                    >
                        V&B Certifica
                    </span>
                </Link>

                {/* LINKS DESKTOP — ocultos en móvil */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) =>
                        link.sublinks ? (
                            // Item con dropdown
                            <li key={link.label} className="relative">
                                <button
                                    className="flex items-center gap-1 text-sm font-medium transition-colors duration-200"
                                    style={{
                                        fontFamily: "var(--font-titulo)",
                                        color: scrolled ? "var(--color-vyb-gris-oscuro)" : "rgba(255,255,255,0.9)",
                                    }}
                                    onMouseEnter={() => setDropdownAbierto(true)}
                                    onMouseLeave={() => setDropdownAbierto(false)}
                                >
                                    {link.label}
                                    <ChevronDown
                                        size={14}
                                        className="transition-transform duration-200"
                                        style={{ transform: dropdownAbierto ? "rotate(180deg)" : "rotate(0deg)" }}
                                    />
                                </button>

                                {/* Dropdown panel */}
                                <AnimatePresence>
                                    {dropdownAbierto && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl overflow-hidden"
                                            style={{
                                                background: "white",
                                                boxShadow: "0 8px 32px rgba(27,79,138,0.16)",
                                                border: "1px solid rgba(27,79,138,0.08)",
                                            }}
                                            onMouseEnter={() => setDropdownAbierto(true)}
                                            onMouseLeave={() => setDropdownAbierto(false)}
                                        >
                                            {link.sublinks.map((sub) => (
                                                <Link
                                                    key={sub.label}
                                                    href={sub.href}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 hover:bg-blue-50 group"
                                                    style={{ color: "var(--color-vyb-gris-oscuro)" }}
                                                >
                                                    <sub.icono
                                                        size={16}
                                                        style={{ color: "var(--color-vyb-azul-medio)" }}
                                                    />
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        ) : (
                            // Item normal
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium transition-colors duration-200"
                                    style={{
                                        fontFamily: "var(--font-titulo)",
                                        color: scrolled ? "var(--color-vyb-gris-oscuro)" : "rgba(255,255,255,0.9)",
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        )
                    )}
                </ul>

                {/* BOTÓN CTA DESKTOP */}
                <div className="hidden md:block">
                    <Link
                        href="/contacto"
                        className="text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105"
                        style={{
                            fontFamily: "var(--font-titulo)",
                            background: scrolled ? "var(--color-vyb-azul)" : "white",
                            color: scrolled ? "white" : "var(--color-vyb-azul)",
                        }}
                    >
                        Cotizar ahora
                    </Link>
                </div >

                {/* BOTÓN MENÚ MÓVIL */}
                <button
                    className="md:hidden p-2 rounded-lg"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-label="Abrir menú"
                >
                    {
                        menuAbierto
                            ? <X size={24} color={scrolled ? "var(--color-vyb-azul)" : "white"} />
                            : <Menu size={24} color={scrolled ? "var(--color-vyb-azul)" : "white"} />
                    }
                </button >
            </nav >

            {/* MENÚ MÓVIL desplegable */}
            <AnimatePresence>
                {
                    menuAbierto && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="md:hidden overflow-hidden"
                            style={{ background: "white", borderTop: "1px solid rgba(27,79,138,0.08)" }}
                        >
                            <div className="px-6 py-4 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="py-3 text-sm font-medium border-b"
                                        style={{
                                            fontFamily: "var(--font-titulo)",
                                            color: "var(--color-vyb-gris-oscuro)",
                                            borderColor: "rgba(27,79,138,0.06)",
                                        }}
                                        onClick={() => setMenuAbierto(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/contacto"
                                    className="mt-3 text-center py-3 rounded-full text-sm font-semibold text-white"
                                    style={{ background: "var(--color-vyb-azul)" }}
                                >
                                    Cotizar ahora
                                </Link>
                            </div >
                        </motion.div >
                    )
                }
            </AnimatePresence >
        </header >
    );
}