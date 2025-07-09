// controllers/userController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.novoCadastro = (req, res) => {
  const { email, password, cpf, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  db.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });
    if (result.rows.length > 0) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    const hash = bcrypt.hashSync(password, 10);

    db.query(
      "INSERT INTO users (email, password, cpf, phone) VALUES ($1, $2, $3, $4)",
      [email, hash, cpf, phone],
      (err2) => {
        if (err2) return res.status(500).json({ error: "Erro ao cadastrar" });
        res.json({ message: "Usuário cadastrado com sucesso" });
      }
    );
  });
};
