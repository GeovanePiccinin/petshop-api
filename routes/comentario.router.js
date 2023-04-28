import express from "express";
import ComentarioController from "../controllers/comentario.controller.js";

const router = express.Router();

//create comentario
router.post("/", ComentarioController.createComentario);

//update comentario
router.put("/", ComentarioController.updateComentario);

//delete comentario
router.delete("/:comentario_id", ComentarioController.deleteComentario);

//selectAll comentario
router.get("/", ComentarioController.getComentarios);

//select comentario by id
router.get("/:comentario_id", ComentarioController.getComentario);

export default router;
