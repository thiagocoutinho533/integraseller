const axios = require("axios");
const db = require("../config/db");

exports.redirectToMLAuth = (req, res) => {
  const url = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}`;
  res.redirect(url);
};

exports.handleMLCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const result = await axios.post("https://api.mercadolibre.com/oauth/token", null, {
      params: {
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const { access_token, refresh_token, user_id } = result.data;
    const systemUserId = 1; // substitua futuramente pelo usuário logado

    await db.query(
      "INSERT INTO tokens (user_id, token, refresh_token) VALUES ($1, $2, $3)",
      [systemUserId, access_token, refresh_token]
    );

    res.send("✅ Conta Mercado Livre integrada com sucesso");
  } catch (err) {
    console.error("Erro no callback do Mercado Livre:", err.response?.data || err.message);
    res.status(500).send("Erro na integração com Mercado Livre");
  }
};
