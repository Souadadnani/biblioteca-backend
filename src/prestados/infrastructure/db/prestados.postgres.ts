import executeQuery from "../../../context/connector/postgres.connector";
import Libro from "../../../libros/domain/Libro";
import Usuario from "../../../usuarios/domain/Usuario";
import Ejemplar from "../../domain/Ejemplar";
import Prestado from "../../domain/Prestado";
import PrestadosRepository from "../../domain/prestados.repository";

export default class PrestadosRepositoryPostgreSQL implements PrestadosRepository {

    async prestarEjemplar(id: number): Promise<number> {
        const query = `update ejemplares set disponible='false' where id=(select id from ejemplares where libro=${id} limit 1) returning*`;
        const ejemplarBD: any[] = await executeQuery(query);
        return ejemplarBD[0].id;
    }

    async addPrestado(prestamo: Prestado): Promise<Prestado> {  
        const query = `insert into prestamos(ejemplar, usuario, fechaprestamo) values('${prestamo.ejemplar}', '${prestamo.usuario}', now()) returning*`;
        const prestadoBD: any[] = await executeQuery(query);
        const prestado: Prestado = {
            ejemplar: prestadoBD[0].ejemplar,
            usuario: prestadoBD[0].usuario,
            fechaPrestamo: prestadoBD[0].fechaprestamo
        }     
        return prestado;
    }

    async mostrarLibrosPrestados(usuario: Usuario): Promise<Prestado[]> {
        const query = `select l.*, e.id as ejemplar, p.fechaprestamo from libros l left join ejemplares e on l.id=e.libro
        left join prestamos p on e.id=p.ejemplar where p.usuario='${usuario.email}' and e.disponible='false'`;
        const prestadosBD: any[] = await executeQuery(query);
        const librosPrestados: Prestado[] = prestadosBD.map(item=>{
            const libro: Libro ={
                id: item.id,
                titulo: item.titulo,
                autor: item.autor
            }
            const ejemplar: Ejemplar = {
                id: item.ejemplar,
                libro: libro
            }
            const prestado: Prestado = {
                ejemplar: ejemplar,
                fechaPrestamo: item.fechaprestamo
            }
            return prestado
        });
        return librosPrestados;
    }

    async devolverPrestado(prestado: Prestado): Promise<Prestado> {
        const result: any[] = await executeQuery(`update prestamos set fechadevolucion=now() where ejemplar=${prestado.ejemplar} and usuario='${prestado.usuario?.email}' returning*`);
        const devuelto: Prestado = {
            usuario: result[0].usuario,
            ejemplar: result[0].ejemplar,
            fechaPrestamo: result[0].fechaprestamo,
            fechaDevolucion: result[0].fechadevolucion
        }
        if(devuelto){
            await executeQuery(`update ejemplares set disponible='true' where id=${devuelto.ejemplar}`);
        }
        return devuelto;     
    }
}

