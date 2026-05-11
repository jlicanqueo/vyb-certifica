// src/middleware.ts
// Este archivo se ejecuta en el Edge (servidor de Vercel)
// antes de que cualquier request llegue a una página.
// Es el lugar perfecto para autenticación básica.

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // Solo protegemos rutas que empiecen con /admin
    if (req.nextUrl.pathname.startsWith("/admin")) {

        // HTTP Basic Auth — el navegador muestra un popup
        // pidiendo usuario y contraseña automáticamente
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return new NextResponse("Acceso restringido", {
                status: 401,
                headers: {
                    "WWW-Authenticate": 'Basic realm="Panel V&B Certifica"',
                },
            });
        }

        // Decodificamos las credenciales (vienen en base64)
        const base64 = authHeader.split(" ")[1];
        const decoded = Buffer.from(base64, "base64").toString("utf-8");
        const [usuario, password] = decoded.split(":");

        // Comparamos con las variables de entorno
        const usuarioCorrecto = process.env.ADMIN_USER ?? "admin";
        const passwordCorrecta = process.env.ADMIN_PASSWORD ?? "vyb2024";

        if (usuario !== usuarioCorrecto || password !== passwordCorrecta) {
            return new NextResponse("Credenciales incorrectas", {
                status: 401,
                headers: {
                    "WWW-Authenticate": 'Basic realm="Panel V&B Certifica"',
                },
            });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
