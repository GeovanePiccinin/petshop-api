import Proprietario from "../models/proprietario.model.js";

async function insertProprietario(proprietario) {
  try {
    return await Proprietario.create(proprietario);
  } catch (err) {
    throw err;
  }
}

async function updateProprietario(proprietario) {
  try {
    await Proprietario.update(proprietario, {
      where: {
        proprietarioId: proprietario.proprietarioId,
      },
    });
    return await getProprietario(proprietario.proprietarioId);
  } catch (err) {
    throw err;
  }
}

async function deleteProprietario(proprietario_id) {
  try {
    await Proprietario.destroy({
      where: {
        proprietarioId: proprietario_id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getProprietarios() {
  try {
    return await Proprietario.findAll();
  } catch (err) {
    throw err;
  }
}

async function getProprietario(proprietario_id) {
  try {
    return await Proprietario.findByPk(proprietario_id);
  } catch (err) {
    throw err;
  }
}

export default {
  insertProprietario,
  updateProprietario,
  deleteProprietario,
  getProprietarios,
  getProprietario,
};
