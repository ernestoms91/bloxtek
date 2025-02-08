import { Request, Response } from "express";
import bcrypt from "bcrypt";
import usuarioModel from "../models/UsuarioModel";
import UsuarioModel from "../models/UsuarioModel";
import generarJWT from "../helpers/jwt";

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    // Crear un nuevo objeto usuario con los datos proporcionados
    let usuario = new usuarioModel(req.body);

    // Eliminar espacios extra al principio y al final de los campos
    usuario.name = usuario.name.trim().charAt(0).toUpperCase() + usuario.name.trim().slice(1).toLowerCase();
    usuario.apellido1 = usuario.apellido1.trim().charAt(0).toUpperCase() + usuario.apellido1.trim().slice(1).toLowerCase();
    usuario.apellido2 = usuario.apellido2.trim().charAt(0).toUpperCase() + usuario.apellido2.trim().slice(1).toLowerCase();
    usuario.username = usuario.username.trim().toLowerCase(); // Convertir a minúsculas y eliminar espacios
    usuario.password = usuario.password.trim();

    // 🔐 Encriptar la contraseña con bcrypt
    const saltRounds = 10;
    usuario.password = await bcrypt.hash(usuario.password, saltRounds);

    // Asignar el estado como activo
    usuario.status = true;

    // Guardar el usuario en la base de datos
    await usuario.save();

    // Responder con éxito
    res.status(201).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};




export const loginUsuario = async (req: Request, res: Response) => {
  const { user, password } = req.body;

  try {
        // Buscar al usuario por nombre de usuario o correo electrónico
        const usuario = await UsuarioModel.findOne({
          $or: [{ username: user }, { email: user }],
        });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrecto",
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.status) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrecto",
      });
    }

    // Verificar si la contraseña es correcta
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrecto",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.username, usuario.email);

    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    // Obtener todos los usuarios excluyendo la contraseña
    const usuarios = await UsuarioModel.find({});

    res.status(200).json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
