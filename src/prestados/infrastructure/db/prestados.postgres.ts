import executeQuery from "../../../context/connector/postgres.connector";
import Libro from "../../../libros/domain/Libro";
import Prestado from "../../domain/Prestado";
import PrestadosRepository from "../../domain/prestados.repository";

export default class PrestadosRepositoryPostgreSQL implements PrestadosRepository {

    async prestarEjemplar(libro: Libro): Promise<Prestado> {
    
        try {
            const query = `update ejemplares set disponibles='false' where libro=${libro.id}`;
            await executeQuery(query);

        } catch (error) {
            console.error(error);
        }
        throw new Error()
    }

    async insertPrestamos(prestamo: Prestado){
        //el usuario del payload del token
        
        /* insert into prestamos(ejemplar, usuario, fechaprestamo) values ()
update ejemplares set disponibles='false' where libro=32 */
        const query = `insert into prestamos(ejemplar, usuario, fechaprestamo) values('${prestamo.ejemplar}', '${prestamo.usuario}', '${prestamo.fechaPrestamo}')`;
        await executeQuery(query);
    }

}