"use client";

import { Mail, Phone, MapPin } from "lucide-react";

const Facebook = ({ size = 24, color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const Instagram = ({ size = 24, color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const Twitter = ({ size = 24, color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

export default function Footer() {
    return (
        <footer style={{ background: "var(--color-vyb-gris-oscuro)" }}>
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Columna 1 — Marca */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                            style={{ background: "var(--color-vyb-azul)", color: "white", fontFamily: "var(--font-titulo)" }}>
                            VB
                        </div>
                        <span className="font-bold text-lg text-white" style={{ fontFamily: "var(--font-titulo)" }}>
                            V&B Certifica
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Organismo líder en evaluación y certificación ISO y calidad turística en Chile.
                    </p>
                    <div className="flex gap-3">
                        {[
                            { icono: Facebook, href: "https://www.facebook.com/vybcertifik/?locale=es_LA" },
                            { icono: Instagram, href: "https://www.instagram.com/vybcertifica/" },
                            { icono: Twitter, href: "https://x.com/VyB_Certifica/" },
                        ].map((r, i) => (
                            <a key={i} href={r.href} target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                style={{ background: "rgba(255,255,255,0.08)" }}>
                                <r.icono size={16} color="rgba(255,255,255,0.7)" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Columna 2 — Links */}
                <div>
                    <h4 className="font-semibold text-white mb-5 text-sm tracking-wider uppercase"
                        style={{ fontFamily: "var(--font-titulo)" }}>
                        Servicios
                    </h4>
                    <ul className="flex flex-col gap-3">
                        {["Calidad Turística", "ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018", "ISO 27001:2022", "Guías de Turismo"].map((link) => (
                            <li key={link}>
                                <a href="#" className="text-sm transition-colors duration-200 hover:text-white"
                                    style={{ color: "rgba(255,255,255,0.5)" }}>
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Columna 3 — Contacto */}
                <div>
                    <h4 className="font-semibold text-white mb-5 text-sm tracking-wider uppercase"
                        style={{ fontFamily: "var(--font-titulo)" }}>
                        Contacto
                    </h4>
                    <ul className="flex flex-col gap-4">
                        {[
                            { icono: MapPin, texto: "Ahumada #254 of. 608, Santiago" },
                            { icono: Phone, texto: "+56 9 29910646" },
                            { icono: Phone, texto: "+56 9 92144113" },
                            { icono: Mail, texto: "contacto@vybcertifica.cl" },
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <item.icono size={15} className="mt-0.5 flex-shrink-0"
                                    style={{ color: "var(--color-vyb-acento)" }} />
                                <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                                    {item.texto}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="border-t px-6 py-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
                    style={{ color: "rgba(255,255,255,0.3)" }}>
                    <span>© {new Date().getFullYear()} V&B Certifica. Todos los derechos reservados.</span>
                    <span>Diseñado con ❤️ en Chile</span>
                </div>
            </div>
        </footer>
    );
}