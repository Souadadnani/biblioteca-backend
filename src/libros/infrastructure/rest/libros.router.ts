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

router.get("/:pagina", async (req: Request, res: Response) => {
    let pagina = parseInt(req.params.pagina);
    let librosBD = await librosUseCases.getEjemplaresDisp(pagina);    
    res.json(librosBD);
});

router.get("/:busca/:pagina", async (req: Request, res: Response) => {
    let buscada = req.params.busca;
    let pagina = parseInt(req.params.pagina);
    
    const librosBD = await librosUseCases.getLibrosBuscados(buscada, pagina);   
    res.json(librosBD);
});

export default router;