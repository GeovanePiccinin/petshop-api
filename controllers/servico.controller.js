import ServicoService from "../services/servico.service.js";

async function createServico(req, res, next) {
  try {
    let servico = req.body;
    if (!servico.descricao || !servico.valor || !servico.animalId) {
      throw new Error("Descrição, valor e animal são obrigatórios");
    }
    servico = await ServicoService.createServico(servico);
    res.send(servico);
    logger.info(`POST /servico - ${JSON.stringify(servico)}`);
  } catch (err) {
    next(err);
  }
}
async function updateServico(req, res, next) {
  try {
    let servico = req.body;
    if (!servico.descricao || !servico.valor || !servico.animalId) {
      throw new Error("Descrição, valor e animal são obrigatórios");
    }
    servico = await ServicoService.updateServico(servico);
    res.send(servico);
    logger.info(`PUT /servico - ${JSON.stringify(servico)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteServico(req, res, next) {
  try {
    await ServicoService.deleteServico(req.params.servicoId);
    res.end();

    logger.info(`DELETE /servico/:servicoId`);
  } catch (err) {
    next(err);
  }
}

async function getServicos(req, res, next) {
  try {
    if (req.query.proprietarioId) {
      res.send(
        await ServicoService.getServicosByProprietarioId(
          req.query.proprietarioId
        )
      );
    } else {
      res.send(await ServicoService.getServicos(req.query.animalId));
    }

    logger.info("GET /servico");
  } catch (err) {
    next(err);
  }
}

async function addAnimalProprietarioServico(req, res, next) {
  try {
    let servico = req.body;
    if (
      !servico.descricao ||
      !servico.valor ||
      !servico.nomeAnimal ||
      !servico.tipoAnimal ||
      !servico.nomeProprietario ||
      !servico.telefoneProprietario
    ) {
      throw new Error("Todos os campos são obrigatórios");
    }
    servico = await ServicoService.addAnimalProprietarioServico(servico);
    res.send(servico);
    logger.info(
      `POST /addAnimalProprietarioServico - ${JSON.stringify(servico)}`
    );
  } catch (err) {
    next(err);
  }
}

async function getServico(req, res, next) {
  try {
    const servico = await ServicoService.getServico(req.params.servicoId);
    res.send(servico);
    logger.info("GET /servico/:servicoId");
  } catch (err) {
    next(err);
  }
}

export default {
  createServico,
  updateServico,
  deleteServico,
  getServicos,
  getServico,
  addAnimalProprietarioServico,
};
