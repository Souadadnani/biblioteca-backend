import Usuario from "../../usuarios/domain/Usuario";
import Prestado from "./Prestado";

export default interface PrestadosRepository {
    prestarEjemplar(id: number): Promise<number>;
    addPrestado(prestamo: Prestado): Promise<Prestado>;
    mostrarLibrosPrestados(usuario: Usuario): Promise<Prestado[]>;
    devolverPrestado(prestado: Prestado): Promise<Prestado>;
}