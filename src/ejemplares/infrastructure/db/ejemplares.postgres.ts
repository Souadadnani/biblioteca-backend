import executeQuery from "../../../context/connector/postgres.connector";
import Libro from "../../../libros/domain/Libro";
import EjemplaresRepository from "../../domain/ejemplares.repository";

export default class EjemplaresRepositoryPostgreSQL implements EjemplaresRepository{

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

}