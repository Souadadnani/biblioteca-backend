import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import librosRouter from "./src/libros/infrastructure/rest/libros.router";
import usuariosRouter from "./src/usuarios/infrastructure/rest/usuarios.router";
import prestadosRouter from "./src/prestados/infrastructure/rest/prestados.router";



dotenv.config();
const port = process.env.PORT;

const allowedOrigins = ["http://44.198.34.104"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors(options));
const api = "/api/";

app.use(`${api}usuarios`, usuariosRouter);
app.use(`${api}libros`, librosRouter);
app.use(`${api}libros`, prestadosRouter);

app.listen(port, ()=>{
    console.log(`Server is running in port ${port}`);
});
