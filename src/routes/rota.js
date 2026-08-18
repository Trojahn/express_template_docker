const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo ao express_template_docker!!!" });
});

module.exports = router;
