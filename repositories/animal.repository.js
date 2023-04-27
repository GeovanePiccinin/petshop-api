import Animal from "../models/animal.model.js";

async function insertAnimal(animal) {
  try {
    return await Animal.create(animal);
  } catch (err) {
    throw err;
  }
}

async function updateAnimal(animal) {
  try {
    await Animal.update(animal, {
      where: {
        animalId: animal.animalId,
      },
    });
    return await getAnimal(animal.animalId);
  } catch (err) {
    throw err;
  }
}

async function deleteAnimal(animal_id) {
  try {
    await Animal.destroy({
      where: {
        animalId: animal_id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getAnimais() {
  try {
    return await Animal.findAll();
  } catch (err) {
    throw err;
  }
}

async function getAnimaisByProprietarioId(proprietario_id) {
  try {
    return await Animal.findAll({
      where: {
        proprietarioId: proprietario_id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getAnimal(animal_id) {
  try {
    return await Animal.findByPk(animal_id);
  } catch (err) {
    throw err;
  }
}

export default {
  insertAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimais,
  getAnimal,
  getAnimaisByProprietarioId,
};
