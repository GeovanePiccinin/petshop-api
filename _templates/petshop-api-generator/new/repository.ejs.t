---
to: repositories/<%= name %>.repository.js
---

import { connect } from "./db.js";

async function insert<%= h.capitalize(name) %>(<%= name %>) {
  const conn = await connect();

  try {
    const sql =
      "INSERT INTO <%=name %>s (nome, telefone) VALUES ($1, $2) RETURNING *";
    const values = [<%= name %>.nome, <%= name %>.telefone];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function update<%= h.capitalize(name) %>(<%= name %>) {
  const conn = await connect();
  try {
    const sql =
      "UPDATE <%=name %>s " +
      " SET nome = $1, telefone = $2 " +
      " WHERE <%=name %>_id = $3 RETURNING *";
    const values = [
      <%= name %>.nome,
      <%= name %>.telefone,
      <%= name %>.<%=name %>_id,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function delete<%= h.capitalize(name) %>(<%=name %>_id) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM <%=name %>s WHERE <%=name %>_id = $1", [
      <%=name %>_id,
    ]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function get<%= h.capitalize(name) %>s() {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * FROM <%=name %>s");
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function get<%= h.capitalize(name) %>(<%=name %>_id) {
  const conn = await connect();
  try {
    const res = await conn.query(
      "SELECT * FROM <%=name %>s WHERE <%=name %>_id = $1",
      [<%=name %>_id]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insert<%= h.capitalize(name) %>,
  update<%= h.capitalize(name) %>,
  delete<%= h.capitalize(name) %>,
  get<%= h.capitalize(name) %>s,
  get<%= h.capitalize(name) %>,
};
