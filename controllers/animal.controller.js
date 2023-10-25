import AnimalService from "../services/animal.service.js";
import { validationResult } from "express-validator";

async function createAnimal(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors.array(), null, 2));
    }

    let animal = req.body;
    /* if (!animal.nome || !animal.tipo || !animal.proprietario_id) {
      throw new Error("Nome, tipo e proprietário são obrigatórios");
    } */
    animal = await AnimalService.createAnimal(animal);
    res.send(animal);
    logger.info(`POST /animal - ${JSON.stringify(animal)}`);
  } catch (err) {
    next(err);
  }
}
async function updateAnimal(req, res, next) {
  try {
    let animal = req.body;
    if (!animal.nome || !animal.tipo || !animal.proprietario_id) {
      throw new Error("Nome, tipo e proprietário são obrigatórios");
    }
    animal = await AnimalService.updateAnimal(animal);
    res.send(animal);
    logger.info(`PUT /animal - ${JSON.stringify(animal)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAnimal(req, res, next) {
  try {
    await AnimalService.deleteAnimal(req.params.animal_id);
    res.end();

    logger.info(`DELETE /animal/:animal_id`);
  } catch (err) {
    next(err);
  }
}

async function getAnimais(req, res, next) {
  try {
    res.send(await AnimalService.getAnimais(req.query.proprietario_id));
    logger.info("GET /animal");
  } catch (err) {
    next(err);
  }
}

async function getAnimal(req, res, next) {
  try {
    const animal = await AnimalService.getAnimal(req.params.animal_id);
    res.send(animal);
    logger.info("GET /animal/:animal_id");
  } catch (err) {
    next(err);
  }
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimais,
  getAnimal,
};
