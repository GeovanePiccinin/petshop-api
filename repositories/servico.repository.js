import Animal from "../models/animal.model.js";
import Servico from "../models/servico.model.js";

async function insertServico(servico) {
  try {
    return await Servico.create(servico);
  } catch (err) {
    throw err;
  }
}

async function updateServico(servico) {
  try {
    await Servico.update(servico, {
      where: {
        servicoId: servico.servicoId,
      },
    });
    return await getServico(servico.servicoId);
  } catch (err) {
    throw err;
  }
}

async function deleteServico(servicoId) {
  try {
    await Servico.destroy({
      where: {
        servicoId: servicoId,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getServicos() {
  try {
    return await Servico.findAll();
  } catch (err) {
    throw err;
  }
}

async function getServicosByAnimalId(animal_id) {
  try {
    return await Servico.findAll({
      where: {
        animalId: animal_id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getServicosByProprietarioId(proprietarioId) {
  try {
    return await Servico.findAll({
      include: [
        {
          model: Animal,
          where: {
            proprietarioId,
          },
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getServico(servicoId) {
  try {
    return await Servico.findByPk(servicoId);
  } catch (err) {
    throw err;
  }
}

export default {
  insertServico,
  updateServico,
  deleteServico,
  getServicos,
  getServico,
  getServicosByAnimalId,
  getServicosByProprietarioId,
};
