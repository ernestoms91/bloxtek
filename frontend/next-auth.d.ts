// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    id: string;
    name: string;
  }

  interface Session {
    user: User;  // Ahora directamente referenciamos la interfaz User
  }
}