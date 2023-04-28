import { getClient } from "./mongo.db.js";
import { ObjectId } from "mongodb";

async function createPost(post) {
  const client = getClient();
  try {
    await client.connect();
    await client.db("petshop-posts").collection("posts").insertOne(post);
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function updatePost(post) {
  const client = getClient();
  const id = new ObjectId(post._id);
  delete post._id;
  try {
    await client.connect();
    await client
      .db("petshop-posts")
      .collection("posts")
      .updateOne({ _id: id }, { $set: { ...post } });
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function getPost(postId) {
  const client = getClient();
  try {
    await client.connect();
    const post = await client
      .db("petshop-posts")
      .collection("posts")
      .findOne({ _id: new ObjectId(postId) });

    console.log("post", JSON.stringify(post));

    return post;
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function getPosts() {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db("petshop-posts")
      .collection("posts")
      .find({})
      .toArray();
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function deletePost(postId) {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db("petshop-posts")
      .collection("posts")
      .deleteOne({ _id: new ObjectId(postId) });
  } catch (err) {
    throw err;
  } finally {
    await client.close();
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
