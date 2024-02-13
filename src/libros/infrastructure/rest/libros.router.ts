import express from "express";
import LibrosUseCases from "../../application/libros.usecases"
import LibrosRepositoryPostgresSQL from "../db/libros.postgres"
import {Request, Response} from "express";

const librosUseCases: LibrosUseCases = new LibrosUseCases(new LibrosRepositoryPostgresSQL());

const router = express.Router();

router.get("/paginas", async (req: Request, res: Response) => {
    const paginasListables = await librosUseCases.getPaginasListables();
    console.log(paginasListables);
    
    res.json({numPaginas: paginasListables});   
});


export default router;