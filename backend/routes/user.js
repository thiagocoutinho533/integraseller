// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/novo-cadastro", userController.novoCadastro);

module.exports = router;
