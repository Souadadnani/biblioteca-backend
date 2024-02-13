import executeQuery from "../../../context/connector/postgres.connector";
import Usuario from "../../domain/Usuario";
import UsuariosRepository from "../../domain/usuarios.repository";

export default class UsuariosRepositoryPostgreSQL implements UsuariosRepository {

    async registrar(user: Usuario): Promise<Usuario> {
        const query = `insert into usuarios(email, password, nombre, apellidos) values ('${user.email}', '${user.password}', '${user.nombre}', 
                    '${user.apellidos}') returning*`;
        const result: any[] = await executeQuery(query);
        const usuario: Usuario = {
                email: result[0].email,
                password: result[0].password,
                nombre: result[0].nombre,
                apellidos: result[0].apellidos
        }
        return usuario;
    }

    async login(user: Usuario): Promise<Usuario> {
        const query = `select * from usuarios where email='${user.email}'`;
        const rows: any[] = await executeQuery(query);
        if(rows.length === 0){
            throw new Error("Datos de login incorrectos");
        }else{
            const usuario: Usuario ={
                email: rows[0].email,
                password: rows[0].password,
                nombre: rows[0].nombre,
                apellidos: rows[0].apellidos
            }
            return usuario;
        }
    }

    async actualizarPerfil(user: Usuario, email: string) {
        try {
            const query = `update usuarios set email='${user.email}', nombre='${user.nombre}', apellidos='${user.apellidos}' where email='${email}'`;
            await executeQuery(query); 
            console.log("Perfil actualizado");           
        } catch (error) {
           console.error("Error al actulizar el perfil ", error)
        }
    }
}