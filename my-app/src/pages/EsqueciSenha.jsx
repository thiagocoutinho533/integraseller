import { useForm } from "react-hook-form";
import axios from "axios";
import API_BASE from "../config";

export default function EsqueciSenha() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_BASE}/auth/forgot`, { email: data.email });
      alert("E-mail de recuperação enviado!");
    } catch {
      alert("Erro ao enviar e-mail.");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Recuperar Senha</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Email" {...register("email", { required: true })} />
          <button type="submit">Enviar link</button>
        </form>
      </div>
    </div>
  );
}
