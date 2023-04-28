import PostService from "../services/post.service.js";

async function createPost(req, res, next) {
  try {
    let post = req.body;
    if (!post.titulo || !post.conteudo) {
      throw new Error("Titulo e conteudo são obrigatórios");
    }
    post = await PostService.createPost(post);
    res.send(post);
    logger.info(`POST /post - ${JSON.stringify(post)}`);
  } catch (err) {
    next(err);
  }
}
async function updatePost(req, res, next) {
  try {
    let post = req.body;
    if (!post.titulo || !post.conteudo || !post._id) {
      throw new Error("Titulo, conteudo e id são obrigatórios");
    }
    post = await PostService.updatePost(post);
    res.send(post);
    logger.info(`PUT /post - ${JSON.stringify(post)}`);
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    await PostService.deletePost(req.params.postId);
    res.end();

    logger.info(`DELETE /post/:post_id`);
  } catch (err) {
    next(err);
  }
}

async function getPosts(req, res, next) {
  try {
    res.send(await PostService.getPosts());
    logger.info("GET /post");
  } catch (err) {
    next(err);
  }
}

async function getPost(req, res, next) {
  try {
    const post = await PostService.getPost(req.params.postId);
    res.send(post);
    logger.info("GET /post/:post_id");
  } catch (err) {
    next(err);
  }
}

async function deleteComentario(req, res, next) {
  try {
    await PostService.deleteComentario(req.params.id, req.params.index);
    logger.info(`DELETE /post/${req.params.id}/comentario/${req.params.index}`);
    res.end();
  } catch (err) {
    next(err);
  }
}

async function getComentarios(req, res, next) {
  try {
    const comentarios = await PostService.getComentarios(req.params.id);
    logger.info(`Get /post/${req.params.id}/comentario`);
    res.send(comentarios);
  } catch (err) {
    next(err);
  }
}

async function getComentario(req, res, next) {
  try {
    const comentario = await PostService.getComentario(
      req.params.id,
      req.params.index
    );
    logger.info(`Get /post/${req.params.id}/comentario/${req.params.index}`);
    res.send(comentario);
  } catch (err) {
    next(err);
  }
}

export default {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
  deleteComentario,
  getComentarios,
  getComentario,
};
