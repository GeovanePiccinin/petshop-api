import PostService from "../services/post.service.js";

async function createComentario(req, res, next) {
  try {
    let comentario = req.body;
    if (!comentario.postId || !comentario.nome || !comentario.conteudo) {
      throw new Error("Nome e conteudo são obrigatórios");
    }
    comentario = await PostService.createComentario(
      comentario,
      comentario.postId
    );
    res.send(comentario);
    logger.info(`POST /comentario - ${JSON.stringify(comentario)}`);
  } catch (err) {
    next(err);
  }
}
async function updateComentario(req, res, next) {
  try {
    let comentario = req.body;
    if (
      !comentario.postId ||
      !comentario.nome ||
      !comentario.conteudo ||
      !!comentario.index
    ) {
      throw new Error("Nomem, conteudo, postId e index são obrigatórios");
    }
    comentario = await PostService.updateComentario(
      comentario,
      comentario.postId,
      comentario.index
    );
    res.send(comentario);
    logger.info(`PUT /comentario - ${JSON.stringify(comentario)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteComentario(req, res, next) {
  try {
    await PostService.deleteComentario(
      req.params.postId,
      req.params.comentarioIndex
    );
    res.end();

    logger.info(`DELETE /comentario/:comentario_id`);
  } catch (err) {
    next(err);
  }
}

async function getComentarios(req, res, next) {
  try {
    res.send(await PostService.getComentarios(req.params.postId));
    logger.info("GET /comentario");
  } catch (err) {
    next(err);
  }
}

async function getComentario(req, res, next) {
  try {
    const comentario = await PostService.getComentario(
      req.params.postId,
      req.params.comentarioId
    );
    res.send(comentario);
    logger.info("GET /comentario/:comentario_id");
  } catch (err) {
    next(err);
  }
}

export default {
  createComentario,
  updateComentario,
  deleteComentario,
  getComentarios,
  getComentario,
};
