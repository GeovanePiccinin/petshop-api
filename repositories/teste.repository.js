import { connect } from "./db.js";

async function insertTeste(teste) {
  const conn = await connect();

  try {
    const sql =
      "INSERT INTO testes (nome, telefone) VALUES ($1, $2) RETURNING *";
    const values = [teste.nome, teste.telefone];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateTeste(teste) {
  const conn = await connect();
  try {
    const sql =
      "UPDATE testes " +
      " SET nome = $1, telefone = $2 " +
      " WHERE teste_id = $3 RETURNING *";
    const values = [
      teste.nome,
      teste.telefone,
      teste.teste_id,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteTeste(teste_id) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM testes WHERE teste_id = $1", [
      teste_id,
    ]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getTestes() {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * FROM testes");
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getTeste(teste_id) {
  const conn = await connect();
  try {
    const res = await conn.query(
      "SELECT * FROM testes WHERE teste_id = $1",
      [teste_id]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insertTeste,
  updateTeste,
  deleteTeste,
  getTestes,
  getTeste,
};
