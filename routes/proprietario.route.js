import express from "express";
import ProprietarioController from "../controllers/proprietario.controller.js";

const router = express.Router();

//create proprietario
router.post("/", ProprietarioController.createProprietario);

//update proprietario
router.put("/", ProprietarioController.updateProprietario);

//delete proprietario
router.delete("/:proprietario_id", ProprietarioController.deleteProprietario);

//selectAll proprietario
router.get("/", ProprietarioController.getProprietarios);

//select proprietario by id
router.get("/:proprietario_id", ProprietarioController.getProprietario);

export default router;
