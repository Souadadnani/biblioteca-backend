import LibrosRepository from "../../domain/libros.repository";
import executeQuery from "../../../context/connector/postgres.connector";
import Libro from "../../domain/Libro";


export default class LibrosRepositoryPostgresSQL implements LibrosRepository {

    async getPaginasListables(): Promise<number> {      
        const result: any[] = await executeQuery(`select count(*)/10 as numpaginas from libros`);     
        return parseInt(result[0].numpaginas);
    }

    async getEjemplaresDisp(pagina: number): Promise<Libro[]> {
        const query = `select *, (select count(*) from ejemplares where disponible='true' and libro=libros.id) as disponibles from libros order by id asc
        limit 10 offset ${pagina} * 10`;
        const result: any[] = await executeQuery(query);    
        const libros: Libro[] = result.map(libro=>{
            const libroBD: Libro ={
                id: libro.id,
                titulo: libro.titulo,
                autor: libro.autor,
                disponibles: libro.disponibles,
            }
            return libroBD;
        })
        return libros;
    }

    async getLibrosBuscados(buscada: string, pagina: number): Promise<Libro[]>{
        const query = `select *, (select count(*) from ejemplares where disponible = 'true' and libro = libros.id) as disponibles
        from libros where titulo like '%${buscada}%' order by id asc limit 10 offset ${pagina} * 10`;
        const result: any[] = await executeQuery(query);
        const libros: Libro[] = result.map(libro=>{
            const libroBD: Libro ={
                id: libro.id,
                titulo: libro.titulo,
                autor: libro.autor,
                disponibles: libro.disponibles,
            }
            return libroBD;
        })
        return libros;
    }

    async getNumPagBusqueda(buscada: string): Promise<number> {
        const result: any[] = await executeQuery(`select count(*)/10 as numpaginas from libros where titulo like '%${buscada}%'`);
        return parseInt(result[0].numpaginas);
    }
    
}