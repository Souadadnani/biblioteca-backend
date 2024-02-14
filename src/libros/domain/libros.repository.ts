import Libro from "./Libro";

export default interface LibrosRepository {

   getPaginasListables(): Promise<number>;
   getEjemplaresDisp(pagina: number): Promise<Libro[]>;
   getLibrosBuscados(buscada: string, pagina: number): Promise<Libro[]>;
}