import Usuario from "../../usuarios/domain/Usuario";
import Ejemplar from "./Ejemplar";

export default interface Prestado {
    usuario: Usuario,
    ejemplar: Ejemplar,
    fechaPrestamo: Date,
    fechaDevolucion: Date
}