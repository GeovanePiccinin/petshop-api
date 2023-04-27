import pg from "pg";

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }
  const pool = new pg.Pool({
    connectionString: process.env.ELEPHANT_SQL_STRING_CONNECTION,
  });
  global.connection = pool;
  return pool.connect();
}

export { connect };
