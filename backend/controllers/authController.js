const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendRecoveryEmail } = require("../utils/emailService");
const crypto = require("crypto");

exports.register = (req, res) => {
  const { email, password, cpf, telefone } = req.body;

  db.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    if (result.rows.length > 0) {
      return res.status(409).send("Email já cadastrado");
    }

    const hash = bcrypt.hashSync(password, 10);

    db.query(
      "INSERT INTO users (email, password, cpf, phone) VALUES ($1, $2, $3, $4)",
      [email, hash, cpf, telefone],
      (err2) => {
        if (err2) return res.status(500).send("Erro ao cadastrar");
        res.send("Usuário cadastrado com sucesso");
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    if (err || result.rows.length === 0) {
      return res.status(401).json({ error: "Email inválido" });
    }

    const user = result.rows[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: "Senha incorreta" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });

    res.json({ userId: user.id, token });
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  db.query("SELECT id FROM users WHERE email = $1", [email], async (err, result) => {
    if (err || result.rows.length === 0) {
      return res.status(404).json({ error: "Email não encontrado" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const userId = result.rows[0].id;
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora

    await db.query(
      "INSERT INTO password_resets (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [userId, token, expiresAt]
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reset/${token}`;
    await sendRecoveryEmail(email, resetUrl);

    res.send("Email de recuperação enviado com sucesso");
  });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const result = await db.query(
    "SELECT * FROM password_resets WHERE token = $1 AND expires_at > NOW()",
    [token]
  );

  if (result.rows.length === 0) {
    return res.status(400).json({ error: "Token inválido ou expirado" });
  }

  const userId = result.rows[0].user_id;
  const hash = bcrypt.hashSync(newPassword, 10);

  await db.query("UPDATE users SET password = $1 WHERE id = $2", [hash, userId]);
  await db.query("DELETE FROM password_resets WHERE user_id = $1", [userId]);

  res.send("Senha atualizada com sucesso");
};
