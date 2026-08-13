const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", require("./routes/rota"));

app.listen(3000, () => {
  console.log(`Servidor executando em http://localhost:3000`);
});
