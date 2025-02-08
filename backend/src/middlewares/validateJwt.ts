import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/UsuarioModel"; // Asegúrate de que el modelo esté correctamente importado
import { JWT_SECRET } from "../constants/env";

interface UsuarioToken {
   uid: string;
  username: string;
  email: string;
}

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  // x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    // Verificar y obtener el uid desde el token
    const { uid } = jwt.verify(token, JWT_SECRET) as UsuarioToken;

    // Leer el usuario que tiene el uid
    const usuario = (await Usuario.findById(uid).exec())?.toJSON();

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    // Verificar si su estado está habilitado
    if (!usuario.status) {
      return res.status(401).json({
        ok: false,
        msg: "Tu usuario se encuentra deshabilitado",
      });
    }

    // Adjuntar usuario al request para que esté disponible en los siguientes middlewares
    (req as any).usuario = usuario;

    // Continuar con la siguiente función middleware
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};
