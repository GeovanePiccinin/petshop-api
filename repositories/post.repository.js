import { connect } from "./mongo.db.js";
import PostSchema from "../schemas/post.schema.js";

async function createPost(post) {
  console.log(connect);
  try {
    const mongoose = await connect();
    console.log("mongoose", mongoose);

    const Post = mongoose.model("Post", PostSchema);
    post = new Post(post);
    post
      .save()
      .then(() => {
        console.log("salvou o post");
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  } catch (err) {
    throw err;
  }
}

async function updatePost(post) {
  try {
    const mongoose = await connect();
    const Post = mongoose.model("Post", PostSchema);
    await Post.findByIdAndUpdate(post._id, post);
  } catch (err) {
    throw err;
  }
}

async function getPost(postId) {
  try {
    const mongoose = await connect();
    const Post = mongoose.model("Post", PostSchema);
    const query = Post.findById(postId);
    return await query.exec();
  } catch (err) {
    throw err;
  }
}

async function getPosts() {
  try {
    const mongoose = await connect();
    const Post = mongoose.model("Post", PostSchema);
    const query = Post.find({});
    return await query.exec();
  } catch (err) {
    throw err;
  }
}

async function deletePost(postId) {
  try {
    const mongoose = await connect();
    const Post = mongoose.model("Post", PostSchema);
    await Post.findByIdAndDelete(postId);
  } catch (err) {
    throw err;
  }
}

async function createComentario(comentario, postId) {
  try {
    const post = await getPost(postId);
    if (!post.comentarios) {
      post.comentarios = [comentario];
    } else {
      post.comentarios.push(comentario);
    }

    await updatePost(post);
  } catch (err) {
    throw err;
  }
}

async function deleteComentario(postId, index) {
  try {
    const post = await getPost(postId);
    post.comentarios.splice(index, 1);
    await updatePost(post);
  } catch (err) {
    throw err;
  }
}

async function updateComentario(comentario, postId, index) {
  try {
    const post = await getPost(postId);
    post.comentarios[index] = comentario;
    post.comentarios = [...post.comentarios];
    await updatePost(post);
  } catch (err) {
    throw err;
  }
}

async function getComentarios(postId) {
  try {
    const post = await getPost(postId);
    if (post.comentarios) {
      return post.comentarios;
    }
    return null;
  } catch (err) {
    throw err;
  }
}
async function getComentario(postId, index) {
  try {
    const post = await getPost(postId);
    if (post.comentarios && post.comentarios[index]) {
      return post.comentarios[index];
    }
    return null;
  } catch (err) {
    throw err;
  }
}

export default {
  createPost,
  deletePost,
  getPosts,
  getPost,
  updatePost,
  createComentario,
  deleteComentario,
  updateComentario,
  getComentarios,
  getComentario,
};
