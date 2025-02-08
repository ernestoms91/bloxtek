
import  { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "*@icrt.cu" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) { 
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Faltan el usuario o la contraseña.");
          }
  
  
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              user: credentials.username,
              password: credentials.password,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
  
          const data = await res.json();

  
          if (!res.ok || !data.ok) {
            throw new Error(data.msg || "Error de autenticación.");
          }
  
          // Devolvemos los datos en el formato correcto con `id`
          return {
            id: data.uid,   // Cambiamos `uid` a `id`
            name: data.name,
            token: data.token,
          };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id; // `id` en lugar de `uid`
          token.name = user.name;
          token.token = user.token;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string; // `id` en lugar de `uid`
          session.user.name = token.name as string;
          session.user.token = token.token as string;
        }
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
  };