import Libro from "../../libros/domain/Libro";
import Ejemplar from "./Ejemplar";
import Prestado from "./Prestado";

export default interface PrestadosRepository {
    prestarEjemplar(id: number): Promise<number>;
    addPrestado(prestamo: Prestado): Promise<Prestado>;
}