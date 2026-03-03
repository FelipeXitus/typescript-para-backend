import express from "express";
import AdopterController from "../controllers/AdopterController";

const router = express.Router();
const adopterController = new AdopterController();  

router
    .post("/", (req, res) => adopterController.criaAdotante(req, res))
    .get("/", (req, res) => adopterController.listaAdotantes(req, res))
    .get("/filtro", (req, res) => adopterController.buscaAdotanteGenerico(req, res))
    .get("/:id", (req, res) => adopterController.buscaAdotantePorId(req, res))
    .put("/:id", (req, res) => adopterController.atualizaAdotante(req, res))
    .patch("/:id", (req, res) => adopterController.atualizaEnderecoAdotante(req, res))
    .delete("/:id", (req, res) => adopterController.deletaAdotante(req, res));

export default router;