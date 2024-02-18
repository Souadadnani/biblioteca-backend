import Usuario from "../../usuarios/domain/Usuario";
import Prestado from "../domain/Prestado";
import PrestadosRepository from "../domain/prestados.repository";

export default class PrestadosUseCases {
    constructor(private prestadosRepository: PrestadosRepository){}

    async prestarLibro(id: number){
        return await this.prestadosRepository.prestarEjemplar(id);
    }
    async addPrestado(prestado: Prestado){
        return this.prestadosRepository.addPrestado(prestado);
    }
    async mostrarLibrosPrestados(usuario: Usuario){
        return await this.prestadosRepository.mostrarLibrosPrestados(usuario);
    }
    async devolverPrestado(prestado: Prestado) {
        return await this.prestadosRepository.devolverPrestado(prestado);
    }
}