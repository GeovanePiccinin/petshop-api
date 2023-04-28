import express from "express";
import PostController from "../controllers/post.controller.js";

const router = express.Router();

//create post
router.post("/", PostController.createPost);

//update post
router.put("/", PostController.updatePost);

//delete post
router.delete("/:postId", PostController.deletePost);

//selectAll post
router.get("/", PostController.getPosts);

//select post by id
router.get("/:postId", PostController.getPost);

//get post comentarios
router.get("/:id/comentario", PostController.getComentarios);

//get post comentario
router.get("/:id/comentario/:index", PostController.getComentario);

//delete post comentario
router.delete("/:id/comentario/:index", PostController.deleteComentario);

export default router;
