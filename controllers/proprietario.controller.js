/* 
  Exemplo da utilização de cache combinado com o Banco de Dados.
  A "solução de cache" acontece antes da requisição ao banco de dados, evitando consultas desnecessárias.
  Opções (podemos utiliza um ou outro):
  * node-cache: cache na memória do servidor web
  * node-redis: cache em servidor externo (redis)
*/

import NodeCache from "node-cache";
import { caching } from "../middleware/redis.js";
import ProprietarioService from "../services/proprietario.service.js";

/* setup básico do node-cache */
const myCache = new NodeCache({ stdTTL: 600 });

async function createProprietario(req, res, next) {
  try {
    let proprietario = req.body;
    if (!proprietario.nome || !proprietario.telefone) {
      throw new Error("Nome e telefone são obrigatórios");
    }
    proprietario = await ProprietarioService.createProprietario(proprietario);
    res.send(proprietario);
    logger.info(`POST /proprietario - ${JSON.stringify(proprietario)}`);
  } catch (err) {
    next(err);
  }
}
async function updateProprietario(req, res, next) {
  try {
    let proprietario = req.body;
    if (!proprietario.nome || !proprietario.telefone) {
      throw new Error("Nome e telefone são obrigatórios");
    }
    proprietario = await ProprietarioService.updateProprietario(proprietario);
    res.send(proprietario);
    logger.info(`PUT /proprietario - ${JSON.stringify(proprietario)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteProprietario(req, res, next) {
  try {
    await ProprietarioService.deleteProprietario(req.params.proprietario_id);
    res.end();

    logger.info(`DELETE /proprietario/:proprietario_id`);
  } catch (err) {
    next(err);
  }
}

async function getProprietarios(req, res, next) {
  try {
    let proprietarios = myCache.get("allProprietarios");
    if (proprietarios == null) {
      proprietarios = await ProprietarioService.getProprietarios();
      myCache.set("allProprietarios", proprietarios, 300);
    } else {
      console.log("proprietarios from cache");
    }
    res.send(proprietarios);
    logger.info("GET /proprietario");
  } catch (err) {
    next(err);
  }
}

async function getProprietariosRedis(req, res, next) {
  try {
    const proprietarios = await ProprietarioService.getProprietarios();
    caching(req.url, proprietarios);
    res.send(proprietarios);
    logger.info("GET /proprietario/redis-example");
  } catch (err) {
    next(err);
  }
}

async function getProprietario(req, res, next) {
  try {
    const proprietario = await ProprietarioService.getProprietario(
      req.params.proprietario_id
    );
    res.send(proprietario);
    logger.info("GET /proprietario/:proprietario_id");
  } catch (err) {
    next(err);
  }
}

export default {
  createProprietario,
  updateProprietario,
  deleteProprietario,
  getProprietarios,
  getProprietariosRedis,
  getProprietario,
};
