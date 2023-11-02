import express from "express";
import AnimalController from "../controllers/animal.controller.js";
import { getCached } from "../middleware/redis.js";

const router = express.Router();

//create animal
router.post("/", AnimalController.createAnimal);

//update animal
router.put("/", AnimalController.updateAnimal);

//delete animal
router.delete("/:animal_id", AnimalController.deleteAnimal);

//selectAll animal
router.get("/", AnimalController.getAnimais);

router.get(
  "/redis-example-animais",
  getCached,
  AnimalController.getAnimaisRedis
);

//select animal by id
router.get("/:animal_id", AnimalController.getAnimal);

export default router;
