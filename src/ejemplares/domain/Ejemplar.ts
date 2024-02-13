import Libro from "../../libros/domain/Libro";

export default interface Ejemplar {
    id?: number,
    libro: Libro,
    disponible: boolean
}