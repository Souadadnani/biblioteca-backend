import Libro from "../../libros/domain/Libro";
import Prestado from "./Prestado";

export default interface PrestadosRepository {
    prestarEjemplar(libro: Libro): Promise<Prestado>;
}