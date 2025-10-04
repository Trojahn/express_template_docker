const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota raiz
router.get('/', (req, res) => {
    res.send('Bem vindo ao express_template_docker!');
});

// Rota de teste para listar usuários
router.get('/usuarios', async (req, res) => {
    try {
        const result = await db.query('SELECT id, nome, data FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: err.message });
    }
});

module.exports = router;