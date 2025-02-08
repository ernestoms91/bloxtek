import { Schema, model, Document } from 'mongoose';

// Definimos la interfaz para el Usuario, que hereda de Document
interface Usuario extends Document {
  name: string;
  apellido1: string;
  apellido2: string;
  username: string;
  email: string;
  password: string;
  status: boolean;
}

const UsuarioSchema = new Schema<Usuario>({
  name: {
    type: String,
    required: true,
  },
  apellido1: {
    type: String,
    required: true,
  },
  apellido2: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

// Personalizar el método toJSON para omitir el password y otros campos innecesarios
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

// Creamos el modelo de Usuario basado en el esquema
// Aquí usamos la interfaz Usuario como tipo del documento
const UsuarioModel = model<Usuario>('Usuario', UsuarioSchema);

export default UsuarioModel;
