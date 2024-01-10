import express from "express";
import ProprietarioController from "../controllers/proprietario.controller.js";
import { getCached } from "../middleware/redis.js";

const router = express.Router();

//create proprietario
router.post("/", ProprietarioController.createProprietario);

//update proprietario
router.put("/", ProprietarioController.updateProprietario);

//delete proprietario
router.delete("/:proprietario_id", ProprietarioController.deleteProprietario);

//selectAll proprietario
router.get("/", ProprietarioController.getProprietarios);

//selectAll proprietario

router.get(
  "/redis-example-proprietarios",
  getCached,
  ProprietarioController.getProprietariosRedis
);

//select proprietario by id
router.get("/:proprietario_id", ProprietarioController.getProprietario);

export default router;
