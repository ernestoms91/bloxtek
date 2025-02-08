"use client";
import { FC, PropsWithChildren } from "react"
import { SessionProvider } from "next-auth/react";
import '@/ui/globals.css'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body>
      <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
export default RootLayout