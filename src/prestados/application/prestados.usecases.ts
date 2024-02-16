import Libro from "../../libros/domain/Libro";
import Prestado from "../domain/Prestado";
import PrestadosRepository from "../domain/prestados.repository";

export default class PrestadosUseCases {
    constructor(private prestadosRepository: PrestadosRepository){}

    async prestarLibro(id: number){
        return await this.prestadosRepository.prestarEjemplar(id);
    }
    addPrestado(prestado: Prestado){
        return this.prestadosRepository.addPrestado(prestado);
    }
}