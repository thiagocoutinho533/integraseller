import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE from "../config";

export default function ResetarSenha() {
  const { token } = useParams();
  const { register, handleSubmit, watch } = useForm();
  const senha = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmar) return alert("Senhas diferentes");

    try {
      await axios.post(`${API_BASE}/auth/reset/${token}`, {
        password: data.password
      });
      alert("Senha redefinida com sucesso!");
      window.location.href = "/";
    } catch {
      alert("Erro ao redefinir a senha");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Nova Senha</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="password" placeholder="Nova Senha" {...register("password", { required: true })} />
          <input type="password" placeholder="Confirmar Senha" {...register("confirmar", { required: true })} />
          <button type="submit">Salvar nova senha</button>
        </form>
      </div>
    </div>
  );
}
