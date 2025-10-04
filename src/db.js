const { Pool } = require('pg');

const pool = new Pool({
    user: 'usuario',
    host: 'database',
    database: 'bancodados',
    password: 'senha',
    port: 5432,
});

const query = (text, params) => pool.query(text, params);

module.exports = { query };