import Libro from "../../libros/domain/Libro";
import EjemplaresRepository from "../domain/ejemplares.repository";

export default class EjemplaresUseCases {

    constructor(private ejemplaresRepository: EjemplaresRepository){}

    getEjemplaresDisp(libro: Libro){
        return this.ejemplaresRepository.getEjemplaresDisp(libro);
    }
}