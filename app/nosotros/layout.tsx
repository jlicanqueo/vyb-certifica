import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nosotros — V&B Certifica",
    description: "Conoce la historia, misión y valores de V&B Certifica, organismo líder en certificación ISO y calidad turística en Chile desde 2013.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}