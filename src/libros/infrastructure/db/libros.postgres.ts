import LibrosRepository from "../../domain/libros.repository";
import executeQuery from "../../../context/connector/postgres.connector";
import Libro from "../../domain/Libro";


export default class LibrosRepositoryPostgresSQL implements LibrosRepository {

    async getPaginasListables(): Promise<number> {      
        const result: any[] = await executeQuery(`select count(*)/10 from libros`);     
        const numPagListables: number = result[0];   
        return numPagListables;
    }
    async getEjemplaresDisp(libro: Libro): Promise<Libro> {
        const result: any[] = await executeQuery(`select count(disponibles) from ejemplares where libro='${libro.id}'`);
        return this.getLibro(libro);
    }

    async getLibro(libro: Libro): Promise<Libro>{
        const result: any[] = await executeQuery(`select * from libros where id='${libro.id}'`);
        const libroBD: Libro ={
            id: result[0].id,
            titulo: result[0].titulo,
            autor: result[0].autor,
            disponibles: result[0].disponibles,
        }
        return libroBD;
    }
            /* select * from libros 
            where id in(
                select id from 
                ejemplares
                count(disponibles) 
            ) 
            limit 10 offset 0
            */
}