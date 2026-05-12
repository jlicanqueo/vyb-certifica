import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Andinita from "../components/Andinita";
import Footer from "../components/Footer";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "V&B Certifica — Certificación ISO y Calidad Turística en Chile",
  description: "Organismo líder en evaluación y certificación ISO y calidad turística en Chile.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const esAdmin = pathname.startsWith("/admin");

  return (
    <html lang="es">
      <body>
        {!esAdmin && <Navbar />}
        {children}
        {!esAdmin && <Footer />}
        {!esAdmin && <Andinita />}
      </body>
    </html>
  );
}