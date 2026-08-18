const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/hello", require("./routes/rota"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.listen(3000, () => {
  console.log(`Servidor executando em http://localhost:3000`);
});
