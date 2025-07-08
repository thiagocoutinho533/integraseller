const express = require("express");
const router = express.Router();
const { login, register, forgotPassword, resetPassword } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

// 🔐 Rotas de recuperação de senha
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

module.exports = router;
