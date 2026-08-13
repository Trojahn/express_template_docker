const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || "database",
  user: process.env.DB_USER || "usuario",
  password: process.env.DB_PASS || "senha",
  database: process.env.DB_NAME || "bancodados",
  port: process.env.DB_PORT || 5432,
});

// Função usada para operações ACID simples
const query = (text, params) => pool.query(text, params);

// Função usada para realizar operações com transações.
async function transaction(operar) {
  const conexao = await pool.connect();
  try {
    await conexao.query('BEGIN');
    const result = await operar(conexao);
    await conexao.query('COMMIT');
    return result;
  } catch (err) {
    await conexao.query('ROLLBACK');
    throw err;
  } finally {
    conexao.release();
  }
}

module.exports = { query, transaction };