import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  const usuario = process.env.ADMIN_USER || "admin";
  const password = process.env.ADMIN_PASSWORD || "vyb2024secure";
  const credencialCorrecta = "Basic " + Buffer.from(`${usuario}:${password}`).toString("base64");

  if (authHeader !== credencialCorrecta) {
    return new NextResponse("Acceso restringido", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Panel Admin"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
