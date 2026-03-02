import express from "express";
import PetController from "../controllers/PetController";

const router = express.Router();
const petController = new PetController();  

router
    .post("/", petController.criaPet)
    .get("/", petController.listaPets)
    .get("/:id", petController.buscaPetPeloId)
    .put("/:id", petController.atualizaPet)
    .delete("/:id", petController.deletaPet);

export default router;