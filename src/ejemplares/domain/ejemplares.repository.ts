import Libro from "../../libros/domain/Libro";

export default interface EjemplaresRepository {

    getEjemplaresDisp(libro: Libro): Promise<Libro>;
    
}