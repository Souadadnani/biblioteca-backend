import Usuario from "./Usuario";

export default interface UsuariosRepository {
    registrar(user: Usuario): Promise<Usuario>;
    login(user: Usuario): Promise<Usuario>;
    actualizarPerfil(user: Usuario): Promise<Usuario>;
}