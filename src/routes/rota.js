const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de boas-vindas.
 *     description: Endpoint raiz da aplicação.
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: Mensagem retornada com sucesso.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Bem vindo ao express_template_docker!!!
 */
router.get("/", (req, res) => {
  res.send("Bem vindo ao express_template_docker!!!");
});

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista os usuários cadastrados no sistema.
 *     description: Retorna uma lista de todos os usuários cadastrados no banco de dados.
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "José"
 *                   data:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-04T12:58:40.208Z"
 *       500:
 *         description: Erro interno ao buscar usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Erro ao buscar usuários"
 */
router.get("/usuarios", async (req, res) => {
  try {
    const result = await db.query("SELECT id, nome, data FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/**
 * @swagger
 * /transacao/{id}:
 *   get:
 *     summary: Executa uma transação de atualização de usuário.
 *     description: Adiciona "_teste" ao nome e à senha do usuário especificado, retornando o registro atualizado.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Usuário atualizado com sucesso!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "José_teste"
 *                     senha:
 *                       type: string
 *                       example: "1234_teste"
 *                     data:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-10-29T12:58:40.208Z"
 *       500:
 *         description: Erro ao executar a transação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Erro de operação"
 */
router.get("/transacao/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.transaction(async (conexao) => {
      await conexao.query("UPDATE usuarios SET nome = nome || '_teste' WHERE id = $1", [id]);
      await conexao.query("UPDATE usuarios SET senha = senha || '_teste' WHERE id = $1", [id]);

      const resultado = await conexao.query("SELECT * FROM usuarios WHERE id = $1", [id]);
      return resultado.rows[0];
    });

    if (result) {
      return res.json({ msg: "Usuário atualizado com sucesso!", data: result });
    }

    return res.status(500).json({ msg: "Erro de operação" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
