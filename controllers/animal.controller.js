import AnimalService from "../services/animal.service.js";
import { caching } from "../middleware/redis.js";

async function createAnimal(req, res, next) {
  try {
    let animal = req.body;
    if (!animal.nome || !animal.tipo || !animal.proprietarioId) {
      throw new Error("Nome, tipo e proprietário são obrigatórios");
    }
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
    if (!animal.nome || !animal.tipo || !animal.proprietarioId) {
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
    res.send(await AnimalService.getAnimais(req.query.proprietarioId));
    logger.info("GET /animal");
  } catch (err) {
    next(err);
  }
}

async function getAnimaisRedis(req, res, next) {
  try {
    const animais = await AnimalService.getAnimais();
    caching(req.url, animais);
    res.send(animais);
    logger.info("GET /animais/redis-example");
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
  getAnimaisRedis,
};
