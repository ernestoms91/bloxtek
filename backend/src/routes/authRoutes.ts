import {crearUsuario, getUsuarios, loginUsuario} from "../controllers/authControllers";
import { validarJWT } from "../middlewares/validateJwt";
import validateLoginFields from "../middlewares/validateLoginFields";
import validateUniqueEmailAndUsername from "../middlewares/validateUniqueEmailAndUsername";
import  validateUser  from "../middlewares/validateUser";


const { Router } = require('express');

const router = Router();

const req = require('express/lib/request');

router.post('/registrer',[ validateUser , validateUniqueEmailAndUsername], crearUsuario);
router.post('/login',[ validateLoginFields], loginUsuario);
router.get('/users',[ validarJWT], getUsuarios);



module.exports = router;