import { Request, Response, NextFunction } from "express";
import UsuarioModel from "../models/UsuarioModel";

export const validateUniqueEmailAndUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username } = req.body;

    // Verificar si el correo ya está registrado
    const existeEmail = await UsuarioModel.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({ ok: false, msg: "El correo electrónico ya está registrado" });
    }

    // Verificar si el nombre de usuario ya está registrado
    const existeUsername = await UsuarioModel.findOne({ username });
    if (existeUsername) {
      return res.status(400).json({ ok: false, msg: "El nombre de usuario ya está en uso" });
    }

    next(); // Si todo está bien, continúa al siguiente middleware o controlador
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error interno del servidor al verificar unicidad" });
  }
};

export default validateUniqueEmailAndUsername;
