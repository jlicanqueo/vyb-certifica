import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Acceso restringido", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }

  const base64 = authHeader.slice(6);
  const decoded = atob(base64); // atob funciona en Edge, Buffer no
  const [usuario, password] = decoded.split(":");

  const usuarioCorrecto = process.env.ADMIN_USER ?? "admin";
  const passwordCorrecta = process.env.ADMIN_PASSWORD ?? "vyb2024secure";

  if (usuario !== usuarioCorrecto || password !== passwordCorrecta) {
    return new NextResponse("Credenciales incorrectas", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
