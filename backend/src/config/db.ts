import mongoose from "mongoose";
import { MONGO_URI } from '../constants/env';

const connectToDatabase = async () => {
    try {
        // await mongoose.connect(MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('✅ Conectado a la base de datos');
    } catch (error) {
        console.log('❌ Error al conectar a la base de datos:', error);
        process.exit(1);
    }
}

export default connectToDatabase;