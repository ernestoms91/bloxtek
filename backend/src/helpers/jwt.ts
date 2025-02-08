import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/env';

interface Payload {
  uid: string;
  username: string;
  email: string;
}

// Función para generar el JWT
export const generarJWT = async (uid: string, username: string, email: string): Promise<string> => {
  const payload: Payload = { uid, username, email };

  try {
    const token = await new Promise<string>((resolve, reject) => {
      jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' }, (err, token) => {
        if (err) {
          return reject('No se pudo generar el token: ' + err.message); // Agregar mensaje de error
        }
        resolve(token as string);
      });
    });
    return token;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error al generar el token: ' + error.message); // Capturar cualquier otro error
    } else {
      throw new Error('Error al generar el token');
    }
  }
};

export default generarJWT;