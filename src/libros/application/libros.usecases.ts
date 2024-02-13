import Libro from "../domain/Libro";
import LibrosRepository from "../domain/libros.repository";

export default class LibrosUseCases {
    constructor(private librosRepository: LibrosRepository){}


    getPaginasListables(){
        return this.librosRepository.getPaginasListables();
    }
    getEjemplaresDisp(libro: Libro){
        return this.librosRepository.getEjemplaresDisp(libro);
    }
}