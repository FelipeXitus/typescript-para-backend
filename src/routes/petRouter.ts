import express from "express";
import PetController from "../controllers/PetController";
import PetRepository from "../repositories/PetRepository";
import AdopterRepository from "../repositories/AdopterRepository";
import { AppDataSource } from "../config/dataSource";
import PetEntity from "../entities/PetEntity";
import AdopterEntity from "../entities/AdopterEntity";

const router = express.Router();
const petRepository = new PetRepository(AppDataSource.getRepository(PetEntity), AppDataSource.getRepository(AdopterEntity));
const adopterRepository = new AdopterRepository(AppDataSource.getRepository(AdopterEntity));
const petController = new PetController(petRepository, adopterRepository);  

router
    .post("/", (req, res) => petController.criaPet(req, res))
    .get("/", (req, res) => petController.listaPets(req, res))
    .get("/filtroPorte", (req, res) => petController.buscaPetPorPorte(req, res))
    .get("/filtro", (req, res) => petController.buscaPetGenerico(req, res))
    .get("/:id", (req, res) => petController.buscaPetPeloId(req, res))
    .put("/:id", (req, res) => petController.atualizaPet(req, res))
    .put("/:petId/:adopterId", (req, res) => petController.adotaPet(req, res))
    .delete("/:id", (req, res) => petController.deletaPet(req, res));

export default router;