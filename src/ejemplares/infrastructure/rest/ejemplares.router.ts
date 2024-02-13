import express from "express";
import EjemplaresUseCases from "../../application/ejemplares.usecases";
import EjemplaresRepositoryPostgreSQL from "../db/ejemplares.postgres";

const roueter = express.Router();
const ejemplaresUseCases: EjemplaresUseCases = new EjemplaresUseCases(new EjemplaresRepositoryPostgreSQL())


















