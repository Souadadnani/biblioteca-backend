import executeQuery from "../../../context/connector/postgres.connector";
import Usuario from "../../domain/Usuario";
import UsuariosRepository from "../../domain/usuarios.repository";

export default class UsuariosRepositoryPostgreSQL implements UsuariosRepository {

    async registrar(user: Usuario): Promise<Usuario> {
        const query = `insert into usuarios(email, alias, password, nombre, apellidos) values email='${user.email}', alias='${user.alias}',
                    password='${user.password}', nombre='${user.nombre}', apellidos='${user.apellidos}' returning*`;
        const result: any[] = await executeQuery(query);
        const usuario: Usuario = {
            email: result[0].email,
            alias: result[0].alias,
            password: result[0].password,
            nombre: result[0].nombre,
            apellidos: result[0].apellidos,
        }
        return usuario;
    }

    async login(user: Usuario): Promise<Usuario> {
        const query = `select * from usuarios where email='${user.email}' or alias='${user.alias}'`;
        const rows: any[] = await executeQuery(query);
        if(rows.length === 0){
            throw new Error("Datos de login incorrectos");
        }else{
            const usuario: Usuario ={
                email: rows[0].email,
                alias: rows[0].alias,
                password: rows[0].password,
                nombre: rows[0].nombre,
                apellidos: rows[0].apellidos, 
            }
            return usuario;
        }
    }

    async actualizarPerfil(user: Usuario): Promise<Usuario> {
        const query = `update usuarios set alias='${user.alias}', password='${user.password}' where email='${user.email}'`;
        const result: any[] = await executeQuery(query);        
        const usuario: Usuario = {
            email: result[0].email,
            alias: result[0].alias,
            password: result[0].password,
            nombre: result[0].nombre,
            apellidos: result[0].apellidos,
        }
        return usuario;
    }
}