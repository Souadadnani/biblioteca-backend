import Libro from "../domain/Libro";
import LibrosRepository from "../domain/libros.repository";

export default class LibrosUseCases {
    constructor(private librosRepository: LibrosRepository){}


    getPaginasListables(){
        return this.librosRepository.getPaginasListables();
    }
    getEjemplaresDisp(pagina: number){
        return this.librosRepository.getEjemplaresDisp(pagina);
    }

    getLibrosBuscados(buscada: string, pagina: number){
        return this.librosRepository.getLibrosBuscados(buscada, pagina);
    }
}