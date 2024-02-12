import jwt, { Secret } from "jsonwebtoken";
import Usuario from "../../usuarios/domain/Usuario";


const SECRET_KEY: Secret = "mi-clave";

const decode = (token: string) =>{
    return jwt.decode(token);
}

const createToken = (usuario: Usuario): string =>{
    const payload = {
        email: usuario.email, 
        alias: usuario.alias,
        nombre: usuario.nombre
    }
    return jwt.sign(payload, SECRET_KEY, {expiresIn: "1 days"});
}
