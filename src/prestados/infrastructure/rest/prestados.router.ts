import express from "express";
import PrestadosUseCases from "../../application/prestados.usecases";
import PrestadosRepositoryPostgreSQL from "../db/prestados.postgres";
import { Request, Response } from "express";
import { isAuth } from "../../../context/security/auth";
import Prestado from "../../domain/Prestado";
import Usuario from "../../../usuarios/domain/Usuario";

const router = express.Router();
const prestadosRepositoryPostgres: PrestadosRepositoryPostgreSQL = new PrestadosRepositoryPostgreSQL();
const prestadosUseCases: PrestadosUseCases = new PrestadosUseCases(prestadosRepositoryPostgres);

router.post("/:libro", isAuth, async (req: Request, res: Response) =>{
    const idLibro = parseInt(req.params.libro);
    const email = req.body.emailPL;
    const idEjemplar = await prestadosUseCases.prestarLibro(idLibro);
    const prestado: Prestado = {
        ejemplar: idEjemplar,
        usuario: email
    }
    const prestadoBD = await prestadosUseCases.addPrestado(prestado);
    res.json(prestadoBD);
});

router.get("", isAuth, async (req: Request, res: Response) => {
    const email = req.body.emailPL;
    const usuario: Usuario = {email};
    const librosPrestados = await prestadosUseCases.mostrarLibrosPrestados(usuario);
    res.json(librosPrestados);
});

router.put("/:ejemplar", isAuth, async(req: Request, res: Response)=>{
    const ejemplar = parseInt(req.params.ejemplar);
    const email = req.body.emailPL;
    const usuario: Usuario = {email};
    const prestado: Prestado = {
        usuario,
        ejemplar
    }
    const devuelto = await prestadosUseCases.devolverPrestado(prestado);
    res.json(devuelto);
});

export default router;