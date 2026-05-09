// src/app/layout.tsx
// Este archivo es el "esqueleto" de toda la app.
// Todo lo que pongas aquí aparece en CADA página.
// Es el lugar perfecto para el Navbar y el Footer.

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Andinita from "@/components/Andinita";
import Footer from "@/components/Footer";

// Metadata: esto es lo que Google ve cuando indexa tu sitio.
// El título y descripción aparecen en los resultados de búsqueda.
export const metadata: Metadata = {
  title: "V&B Certifica — Certificación ISO y Calidad Turística en Chile",
  description:
    "Organismo líder en evaluación y certificación ISO y calidad turística en Chile. Certificamos empresas y personas hacia la excelencia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* El Navbar aparece en todas las páginas automáticamente */}
        <Navbar />
        {/* "children" es el contenido de cada página específica */}
        {children}
        <Footer />
        {/* Andinita - Chat flotante */}
        <Andinita />
      </body>
    </html>
  );
}