export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Este layout reemplaza el layout global para /admin
    // Sin Navbar ni Footer — es una página de gestión interna
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}