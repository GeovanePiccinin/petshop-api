import { connect } from "./db.js";

async function insertAnimal(animal) {
  const conn = await connect();

  try {
    const sql =
      "INSERT INTO animais (nome, tipo, proprietario_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [animal.nome, animal.tipo, animal.proprietario_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateAnimal(animal) {
  const conn = await connect();
  try {
    const sql =
      "UPDATE animais " +
      " SET nome = $1, tipo = $2, proprietario_id= $3 " +
      " WHERE animal_id = $4 RETURNING *";
    const values = [
      animal.nome,
      animal.tipo,
      animal.proprietario_id,
      animal.animal_id,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteAnimal(animal_id) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM animais WHERE animal_id = $1", [animal_id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getAnimais() {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * FROM animais");
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getAnimaisByProprietarioId(proprietario_id) {
  const conn = await connect();
  try {
    const res = await conn.query(
      "SELECT * FROM animais WHERE proprietario_id = $1",
      [proprietario_id]
    );
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getAnimal(animal_id) {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * FROM animais WHERE animal_id = $1", [
      animal_id,
    ]);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insertAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimais,
  getAnimal,
  getAnimaisByProprietarioId,
};
