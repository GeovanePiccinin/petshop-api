import PostRepository from "../repositories/post.repository.js";

async function createPost(post) {
  return await PostRepository.createPost(post);
}

async function updatePost(post) {
  return await PostRepository.updatePost(post);
}

async function deletePost(post_id) {
  return await PostRepository.deletePost(post_id);
}

async function getPosts() {
  return await PostRepository.getPosts();
}

async function getPost(postId) {
  return await PostRepository.getPost(postId);
}

async function createComentario(comentario, postId) {
  return await PostRepository.createComentario(comentario, postId);
}

async function deleteComentario(postId, index) {
  return await PostRepository.deleteComentario(postId, index);
}

async function updateComentario(comentario, postId, index) {
  return await PostRepository.updateComentario(comentario, postId, index);
}

async function getComentarios(postId) {
  return await PostRepository.getComentarios(postId);
}

async function getComentario(postId, index) {
  return await PostRepository.getComentario(postId, index);
}

export default {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
  createComentario,
  deleteComentario,
  updateComentario,
  getComentarios,
  getComentario,
};
