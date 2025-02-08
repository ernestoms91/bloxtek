import { Request, Response, NextFunction } from "express";

const validateLoginFields = (req: Request, res: Response, next: NextFunction) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({
      ok: false,
      msg: "Usuario y contraseña son obligatorios",
    });
  }

  next();
};

export default validateLoginFields;
