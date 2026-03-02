import express from "express";
import PetController from "../controllers/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import PetEntity from "../entities/PetEntity";

const router = express.Router();
const petRepository = new PetRepository(AppDataSource.getRepository(PetEntity));
const petController = new PetController(petRepository);  

router
    .post("/", petController.criaPet)
    .get("/", petController.listaPets)
    .get("/filtro", petController.buscaPetGenerico)
    .get("/:id", petController.buscaPetPeloId)
    .put("/:id", petController.atualizaPet)
    .delete("/:id", petController.deletaPet);

export default router;