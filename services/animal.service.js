import AnimalRepository from "../repositories/animal.repository.js";
import ProprietarioRepository from "../repositories/proprietario.repository.js";

async function createAnimal(animal) {
  if (await ProprietarioRepository.getProprietario(animal.proprietario_id)) {
    return await AnimalRepository.insertAnimal(animal);
  }
  throw new Error("O proprietario_id informado não existe");
}

async function updateAnimal(animal) {
  if (await ProprietarioRepository.getProprietario(animal.proprietario_id)) {
    return await AnimalRepository.updateAnimal(animal);
  }
  throw new Error("O proprietario_id informado não existe");
}

async function deleteAnimal(animal_id) {
  return await AnimalRepository.deleteAnimal(animal_id);
}

async function getAnimais(proprietario_id, sortby, sort, size, offset) {
  if (proprietario_id) {
    return await AnimalRepository.getAnimaisByProprietarioId(proprietario_id);
  }
  return await AnimalRepository.getAnimais(sortby, sort, size, offset);
}

async function getAnimal(animal_id) {
  return await AnimalRepository.getAnimal(animal_id);
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimais,
  getAnimal,
};
