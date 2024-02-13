import express from "express";
import UsuariosUseCases from "../../application/usuarios.usecases";
import UsuariosRepositoryPostgreSQL from "../db/usuarios.postgres";
import {Request, Response} from "express";
import Usuario from "../../domain/Usuario";
import { createToken, isAuth } from "../../../context/security/auth";


const router = express.Router();
const usuariosUseCases: UsuariosUseCases = new UsuariosUseCases(new UsuariosRepositoryPostgreSQL());

router.post("/registro", async(req: Request, res: Response)=>{
    const {email, password, nombre, apellidos} = req.body;
    const usuarioAPI: Usuario = {
        email,
        password,
        nombre,
        apellidos
    }
    const usuario = await usuariosUseCases.registrar(usuarioAPI);
    res.json({email: usuario.email});
});

router.post("/login", async(req: Request, res: Response)=>{
    const {email, password} = req.body;
    const usuarioAPI: Usuario = {
        email,
        password
    }
    const usuarioBD = await usuariosUseCases.login(usuarioAPI);
    if(usuarioBD === null){
        res.status(400).json({mensaje: "Usuario no encontrado"});
    }else{
        const token = createToken(usuarioBD);
        const user: Usuario = {
            email: usuarioBD.email,
            nombre: usuarioBD.nombre,
            apellidos: usuarioBD.apellidos
        }
        res.json({Token: token, Usuario: user});
    }
});

router.put("/registro", isAuth, async(req: Request, res: Response)=>{
    const actualizado: Usuario = {
        email: req.body.email,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos
    }
    const email = req.body.emailPL;
    await usuariosUseCases.actualizarPerfil(actualizado, email);
    res.json({email: actualizado.email});
}); 

export default router;