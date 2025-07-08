const express = require("express");
const router = express.Router();
const ml = require("../controllers/mercadoLivreController");

// Inicia o fluxo de autenticação com o Mercado Livre
router.get("/auth", ml.redirectToMLAuth);

// Callback após autenticação (URL de retorno configurada no app do Mercado Livre)
router.get("/callback", ml.handleMLCallback);

module.exports = router;
