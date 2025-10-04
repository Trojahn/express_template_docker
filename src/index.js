const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const routes = require('./routes/rota');
app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor executando em http://localhost:${port}`);
});