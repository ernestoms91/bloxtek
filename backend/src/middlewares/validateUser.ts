import { Request, Response, NextFunction } from "express";

export const validarUsuario = (req: Request, res: Response, next: NextFunction) => {
  const { password, name, apellido1, apellido2, username, email } = req.body;

  if (!name || typeof name !== "string" || name.length < 2) {
    return res.status(400).json({ ok: false, msg: "El nombre debe tener al menos 2 caracteres" });
  }

  if (!apellido1 || typeof apellido1 !== "string") {
    return res.status(400).json({ ok: false, msg: "El primer apellido es obligatorio" });
  }

  if (!apellido2 || typeof apellido2 !== "string") {
    return res.status(400).json({ ok: false, msg: "El segundo apellido es obligatorio" });
  }

  if (!username || typeof username !== "string" || username.length < 4 || !/^[a-zA-Z0-9]+$/.test(username)) {
    return res.status(400).json({ ok: false, msg: "El nombre de usuario debe ser alfanumérico y tener al menos 4 caracteres" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    return res.status(400).json({ ok: false, msg: "El correo electrónico no es válido" });
  }


  if (
    !password ||
    typeof password !== "string" ||
    password.length < 8 ||
    !/[A-Z]/.test(password) || // Al menos una mayúscula
    !/[a-z]/.test(password) || // Al menos una minúscula
    !/[0-9]/.test(password) || // Al menos un número
    !/[\W_]/.test(password) // Al menos un carácter especial
  ) {
    return res.status(400).json({ ok: false, 
        msg: "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.",
     });
  }

  next();
};


export default validarUsuario;