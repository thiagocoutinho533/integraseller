const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const verifyToken = require("./middlewares/authMiddleware");

app.use(cors({
  origin: "https://integraseller.com.br",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/ml", require("./routes/mercadoLivre"));
// server.js ou app.js
app.use("/user", require("./routes/user"));


// Rota protegida de exemplo
app.get("/protegida", verifyToken, (req, res) => {
  res.send(`🔐 Rota protegida acessada pelo usuário ID: ${req.userId}`);
});

app.get("/", (req, res) => {
  res.send("🚀 Backend do IntegraSeller está funcionando!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
