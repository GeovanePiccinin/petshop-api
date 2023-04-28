import express from "express";
import ServicoController from "../controllers/servico.controller.js";

const router = express.Router();

//create servico
router.post("/", ServicoController.createServico);

//update servico
router.put("/", ServicoController.updateServico);

//delete servico
router.delete("/:servicoId", ServicoController.deleteServico);

//selectAll servico
router.get("/", ServicoController.getServicos);

//select servico by id
router.get("/:servicoId", ServicoController.getServico);

export default router;
