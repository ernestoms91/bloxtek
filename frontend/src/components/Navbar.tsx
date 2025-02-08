"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: session } = useSession(); // Obteniendo la sesión

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 0);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const navItems = [
        { id: 1, name: "Home", href: "/" },
        { id: 2, name: "About", href: "/about" },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* LOGO */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-2xl font-bold text-blue-600 cursor-pointer">
                                Logo
                            </span>
                        </Link>
                    </div>

                    {/* Menú en pantallas grandes */}
                    <div className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <Link key={item.id} href={item.href}>
                                <span className="px-3 py-2 rounded-md text-sm font-semibold text-gray-800  hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                                    {item.name}
                                </span>
                            </Link>
                        ))}

                        {session ? (
                            <>
                                <Link href="/dashboard">
                                    <span className="px-4 py-2 rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 cursor-pointer">
                                        Dashboard
                                    </span>
                                </Link>
                                <Link href="#" onClick={(e) => { e.preventDefault(); signOut({ callbackUrl: "/" }) }}>
                                    <span
                                        className="px-4 py-2 rounded-md text-sm font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                                    >
                                        Logout
                                    </span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <span className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                                        Login
                                    </span>
                                </Link>
                                <Link href="/register">
                                    <span className="px-4 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">
                                        Register
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Menú hamburguesa en pantallas pequeñas */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú móvil */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link key={item.id} href={item.href}>
                                <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                                    {item.name}
                                </span>
                            </Link>
                        ))}

                        {session ? (
                            <>
                                <Link href="/dashboard">
                                    <span className="block w-full px-3 py-2 rounded-md text-base font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 cursor-pointer">
                                        Dashboard
                                    </span>
                                </Link>
                                <Link href="#" onClick={(e) => { e.preventDefault();signOut({ callbackUrl: "/" }) }}>
                                    <span
                                        className="block w-full px-3 py-2 rounded-md text-base font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                                    >
                                        Logout
                                    </span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <span className="block w-full px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                                        Login
                                    </span>
                                </Link>
                                <Link href="/register">
                                    <span className="block w-full px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 cursor-pointer">
                                        Register
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
