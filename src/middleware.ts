import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Acceso restringido", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Panel V&B Certifica"',
        "Content-Type": "text/plain",
      },
    });
  }

  const base64 = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString("utf-8");
  const [usuario, password] = decoded.split(":");

  const usuarioCorrecto = process.env.ADMIN_USER ?? "admin";
  const passwordCorrecta = process.env.ADMIN_PASSWORD ?? "vyb2024secure";

  if (usuario !== usuarioCorrecto || password !== passwordCorrecta) {
    return new NextResponse("Credenciales incorrectas", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Panel V&B Certifica"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};