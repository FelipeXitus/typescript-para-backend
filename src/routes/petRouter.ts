import express from "express";
import PetController from "../controllers/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import PetEntity from "../entities/PetEntity";

const router = express.Router();
const petRepository = new PetRepository(AppDataSource.getRepository(PetEntity));
const petController = new PetController(petRepository);  

router
    .post("/", (req, res) => petController.criaPet(req, res))
    .get("/", (req, res) => petController.listaPets(req, res))
    .get("/filtro", (req, res) => petController.buscaPetGenerico(req, res))
    .get("/:id", (req, res) => petController.buscaPetPeloId(req, res))
    .put("/:id", (req, res) => petController.atualizaPet(req, res))
    .delete("/:id", (req, res) => petController.deletaPet(req, res));

export default router;