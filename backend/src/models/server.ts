import express, { Application } from 'express';
import connectToDatabase from '../config/db';
import cors from 'cors';
import { PORT } from '../constants/env';


class Server {

    app: Application;
    port: string ;
    paths: { [key: string]: string };

    constructor() {
        this.app = express();
        this.port = `${PORT}`;

        this.paths = {
            auth: '/api/auth',         
        }

        // Conectar a base de datos
        this.conectarDB();


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();


    }

    async conectarDB() {
        await connectToDatabase();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
     
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/authRoutes'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}

export default Server;