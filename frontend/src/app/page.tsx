"use client"
import Navbar from "@/components/Navbar";
import Link from "next/link";  // Asegúrate de importar Link

export default function Home() {

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 h-full w-full"></div>

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Welcome to Our Platform
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-100">
                  Discover amazing possibilities and transform your ideas into reality
                  with our innovative solutions.
                </p>
                <div className="mt-10">
                  <Link
                    href="/register"  // Asegúrate de agregar el enlace de la página de registro
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
