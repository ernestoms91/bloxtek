"use client"
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

export default function Dashboard() {

  const { data: session } = useSession();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 h-full w-full"></div>

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center">
               { <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                 <span className="text-black"> Welcome {session?.user?.name}</span>
                </h1>}
               <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-100">
               Unlock new opportunities and bring your vision to life with our cutting-edge solutions designed to inspire and empower you.
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
