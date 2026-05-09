import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacto — V&B Certifica",
    description: "Contáctanos para cotizar tu certificación ISO o calidad turística. Respondemos en menos de 24 horas hábiles.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}