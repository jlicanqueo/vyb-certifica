import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Andinita from "../components/Andinita";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "V&B Certifica — Certificación ISO y Calidad Turística en Chile",
  description: "Organismo líder en evaluación y certificación ISO y calidad turística en Chile.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
        <Footer />
        <Andinita />
      </body>
    </html>
  );
}