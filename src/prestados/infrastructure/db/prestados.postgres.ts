import executeQuery from "../../../context/connector/postgres.connector";
import Libro from "../../../libros/domain/Libro";
import Ejemplar from "../../domain/Ejemplar";
import Prestado from "../../domain/Prestado";
import PrestadosRepository from "../../domain/prestados.repository";

export default class PrestadosRepositoryPostgreSQL implements PrestadosRepository {

    async prestarEjemplar(id: number): Promise<number> {
        const query = `update ejemplares set disponible='false' where id=(select id from ejemplares where libro=${id} limit 1) returning*`;
        const ejemplarBD: any[] = await executeQuery(query);
        console.log(ejemplarBD);
        console.log(ejemplarBD[0].id);
        return ejemplarBD[0].id;
       /*  const ejemplar: Ejemplar = {
            id: ejemplarBD[0].id,
            libro: ejemplarBD[0].libro,
            disponible: ejemplarBD[0].disponible
        }
        console.log(ejemplar);
        return ejemplar.id; */
    }

    async addPrestado(prestamo: Prestado): Promise<Prestado> {
        console.log(prestamo.fechaPrestamo);
        const query = `insert into prestamos(ejemplar, usuario, fechaprestamo) values('${prestamo.ejemplar}', '${prestamo.usuario}', '${prestamo.fechaPrestamo}') returning*`;
        const prestadoBD: any[] = await executeQuery(query);
        console.log(prestadoBD[0].fechaPrestamo);
        const prestado: Prestado = {
            ejemplar: prestadoBD[0].ejemplar,
            usuario: prestadoBD[0].usuario,
            fechaPrestamo: prestadoBD[0].fechaPrestamo
        }
        console.log(prestado);       
        return prestado;
    }
}

