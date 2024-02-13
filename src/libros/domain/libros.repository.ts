import Libro from "./Libro";

export default interface LibrosRepository {

   getPaginasListables(): Promise<number>;
   getEjemplaresDisp(libro: Libro): Promise<Libro>;
}