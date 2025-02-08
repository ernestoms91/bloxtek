"use client";

import { capitalizeName } from "@/lib/capitalizeName";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar los iconos
import { useRouter } from "next/navigation"; // Importar useRouter para redirigir
import { toast, ToastContainer } from 'react-toastify'; // Importar toast
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos de toast
import Navbar from "@/components/Navbar";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    apellido1: "",
    apellido2: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    apellido1: "",
    apellido2: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    serverError: "", // Error del backend
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar ambas contraseñas
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para bloquear el botón mientras se envía el formulario
  const router = useRouter(); // Usar useRouter para redirigir

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Prevenir espacios en el campo de email (tanto al principio como al final)
    const trimmedValue = name === "email" ? value.trim() : value.trim();

    // Capitalizar los nombres y apellidos si es necesario
    let formattedValue = trimmedValue;
    if (
      name === "name" ||
      name === "apellido1" ||
      name === "apellido2"
    ) {
      formattedValue = capitalizeName(trimmedValue);
    }

    setErrors({
      ...errors,
      [name]: "",
    });

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambiar la visibilidad de ambas contraseñas
  };

  const validateForm = () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const formErrors: any = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9]{4,}$/;

    // Validaciones de los campos
    if (formData.name.length < 1) formErrors.name = "First name must be at least 2 characters.";
    if (formData.apellido1.length < 2) formErrors.apellido1 = "Surname1 must be at least 2 characters.";
    if (formData.apellido2.length < 2) formErrors.apellido2 = "Surname2 must be at least 2 characters.";
    if (!emailRegex.test(formData.email)) formErrors.email = "Please enter a valid email.";
    if (!usernameRegex.test(formData.username)) formErrors.username = "Username must be alphanumeric and at least 4 characters.";
    if (!passwordRegex.test(formData.password))
      formErrors.password =
        "Password must be 8 chars, with upper, lower, number, and special char";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Passwords must match.";

    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true); // Bloquear el botón de submit

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/registrer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          // Mostrar el mensaje de error del backend
          setErrors({
            ...errors,
            serverError: data.msg || "An error occurred. Please try again.", // Usamos la clave "msg" de la respuesta
          });
        } else {
          // El registro fue exitoso
          console.log("Registration successful:", data);
          toast.success("Account created successfully! Redirecting to login..."); // Mostrar el mensaje de éxito con toast
          // Redirigir al login después de un breve retraso
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        }
      } catch (error) {
        console.log(error)
        // Si hay un error de red o al enviar el formulario
        setErrors({
          ...errors,
          serverError: "An error occurred. Please try again.",
        });
      } finally {
        setIsSubmitting(false); // Desbloquear el botón
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 h-full w-full"></div>

          <div className="relative h-full">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 h-full">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Create Your Account
                </h1>

                <div className="mt-10 max-w-md mx-auto">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
                        placeholder="First Name"
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>

                    {/* Surname1 */}
                    <div>
                      <input
                        type="text"
                        name="apellido1"
                        value={formData.apellido1}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
                        placeholder="Surname 1"
                      />
                      {errors.apellido1 && <p className="text-red-500 text-xs">{errors.apellido1}</p>}
                    </div>

                    {/* Surname2 */}
                    <div>
                      <input
                        type="text"
                        name="apellido2"
                        value={formData.apellido2}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
                        placeholder="Surname 2"
                      />
                      {errors.apellido2 && <p className="text-red-500 text-xs">{errors.apellido2}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
                        placeholder="Email"
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    {/* Username */}
                    <div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
                        placeholder="Username"
                      />
                      {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-600"
                        placeholder="Confirm Password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting} // Deshabilitar el botón mientras se envía el formulario
                      className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {isSubmitting ? "Submitting..." : "Sign Up"}
                    </button>

                    {/* Server Error */}
                    {errors.serverError && <p className="text-red-500 text-xs">{errors.serverError}</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
