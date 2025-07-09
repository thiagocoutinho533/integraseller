const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendRecoveryEmail = (to, token) => {
  const resetLink = `https://meliseller.com.br/reset/${token}`;

  const mailOptions = {
    from: `"IntegraSeller" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Recuperação de Senha - IntegraSeller",
    html: `
      <h3>Você solicitou a recuperação de senha</h3>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Se você não solicitou isso, ignore este e-mail.</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
