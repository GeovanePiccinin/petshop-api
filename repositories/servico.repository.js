import Animal from "../models/animal.model.js";
import Proprietario from "../models/proprietario.model.js";
import Servico from "../models/servico.model.js";
import sequelize from "./db.js";

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

async function addAnimalProprietarioServico(servico) {
  const t = await sequelize.transaction();

  try {
    // Then, we do some calls passing this transaction as an option:

    const { proprietarioId } = await Proprietario.create(
      {
        nome: servico.nomeProprietario,
        telefone: servico.telefoneProprietario,
      },
      { transaction: t }
    );

    console.log("transactions proprietarioId", proprietarioId);

    const { animalId } = await Animal.create(
      {
        nome: servico.nomeAnimal,
        tipo: servico.tipoAnimal,
        proprietarioId,
      },
      { transaction: t }
    );

    console.log("transactions animalId", animalId);

    await Servico.create(
      {
        descricao: servico.descricao,
        valor: servico.valor,
        animalId,
      },
      { transaction: t }
    );

    // If the execution reaches this line, no errors were thrown.
    // We commit the transaction.
    await t.commit();
  } catch (error) {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await t.rollback();
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
  addAnimalProprietarioServico,
};
