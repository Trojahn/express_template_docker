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

// Rota de exemplo para executar uma transacao
router.get('/transacao/:id', async (req, res) => {
    const id = req.params.id;

    // Exemplo de operação a ser realizada (dois UPDATES e um SELECT)
    const result = await db.transaction(async (conexao) => {
        await conexao.query("UPDATE usuarios SET nome = nome || '_teste' WHERE id=$1", [id]);
        await conexao.query("UPDATE usuarios SET senha = senha || '_teste' WHERE id=$1", [id]);

        const resultado = await conexao.query("SELECT * FROM usuarios WHERE id=$1", [id]);
        return resultado.rows[0];
    });
    if (result) {
        return res.json({ msg: "Usuário atualizado com sucesso!", data: result });
    }
    return res.status(500).json({ msg: "Erro de operação"});
});

module.exports = router;