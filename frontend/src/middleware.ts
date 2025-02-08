import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// Middleware para proteger rutas
export async function middleware(req: NextRequest) {
  // Obtén el token de la sesión de NextAuth
  const session = await getToken({
    req, 
    secret: process.env.NEXTAUTH_SECRET // El "secret" de NextAuth es necesario para verificar el JWT.
  });

  // Rutas protegidas (en este caso, "/dashboard")
  const protectedRoutes = ["/dashboard"];

  // Si el usuario intenta acceder a una ruta protegida sin sesión, redirige a /login
  if (protectedRoutes.includes(req.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }


  // Si todo está bien, deja pasar la solicitud
  return NextResponse.next();
}

// Configuración del middleware para las rutas especificadas
export const config = {
  matcher: ["/dashboard"], // Puedes agregar más rutas protegidas aquí
};
