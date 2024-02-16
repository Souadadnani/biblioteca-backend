import express from "express";
import PrestadosUseCases from "../../application/prestados.usecases";
import PrestadosRepositoryPostgreSQL from "../db/prestados.postgres";
import { Request, Response } from "express";
import { isAuth } from "../../../context/security/auth";
import Prestado from "../../domain/Prestado";
import Ejemplar from "../../domain/Ejemplar";

const router = express.Router();
const prestadosRepositoryPostgres: PrestadosRepositoryPostgreSQL = new PrestadosRepositoryPostgreSQL();
const prestadosUseCases: PrestadosUseCases = new PrestadosUseCases(prestadosRepositoryPostgres);

router.post("/:libro", isAuth, async (req: Request, res: Response) =>{
    const idLibro = parseInt(req.params.libro);
    const email = req.body.emailPL;
    const idEjemplar = await prestadosUseCases.prestarLibro(idLibro);
    const prestado: Prestado = {
        ejemplar: idEjemplar,
        usuario: email,
        fechaPrestamo: new Date().toISOString()
    }
    const prestadoBD = await prestadosUseCases.addPrestado(prestado);
    res.json(prestadoBD);
});

export default router;