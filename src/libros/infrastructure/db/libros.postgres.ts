import LibrosRepository from "../../domain/libros.repository";
import executeQuery from "../../../context/connector/postgres.connector";


export default class LibrosRepositoryPostgresSQL implements LibrosRepository {

    async getPaginasListables(): Promise<number> {      
        const result: any[] = await executeQuery(`select count(*)/10 from libros`);
        const numPagListables: number = result[0];   
        return numPagListables;
    }

}