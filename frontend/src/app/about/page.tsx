"use client"
import Navbar from "@/components/Navbar";

export default function About() {

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
                  About Us
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-100">
                  Our platform was created with the mission to empower individuals and organizations
                  to achieve their goals with cutting-edge solutions and unparalleled support. 
                </p>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
                  Whether you are an entrepreneur, a student, or someone seeking to transform your ideas,
                  we provide the tools and guidance to help you succeed. Join us on this exciting journey!
                </p>
                <div className="mt-10">
                  <h2 className="text-2xl font-semibold text-white">Our Core Values</h2>
                  <ul className="mt-4 text-lg text-gray-200">
                    <li>- Innovation: We embrace new technologies and ideas to drive growth.</li>
                    <li>- Integrity: We are committed to ethical practices and transparency.</li>
                    <li>- Collaboration: We believe in the power of teamwork to achieve success.</li>
                    <li>- Excellence: We strive to provide the best experience and solutions.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
