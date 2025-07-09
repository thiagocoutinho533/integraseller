import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import API_BASE from "../config"; // Domínio da API
import "./Login.css";

export default function Login({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm();

  const senha = watch("password");

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatTelefone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  };

 const onSubmit = async (data) => {
  if (isLoginMode) {
    // Login
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email: data.email,
        password: data.password
      });
      // Trate o login aqui
    } catch (err) {
      // Trate o erro aqui
    }
  } else {
    // Cadastro
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, {
        email: data.email,
        password: data.password,
        cpf: data.cpf,
        phone: data.phone // <-- Troque para phone!
      });
      // Trate o sucesso do cadastro aqui
    } catch (err) {
      // Trate o erro aqui
    }
  }
};


  return (
    <div className="container">
      <div className="form-box">
        <h2>{isLoginMode ? "Login" : "Cadastro"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Email" {...register("email", { required: true })} />
          {errors.email && <p className="error">Email é obrigatório</p>}

          <input placeholder="Senha" type="password" {...register("password", { required: true })} />
          {errors.password && <p className="error">Senha obrigatória</p>}

          {!isLoginMode && (
            <>
              <input
                placeholder="Confirmar Senha"
                type="password"
                {...register("confirmSenha", { required: true })}
              />
              {errors.confirmSenha && <p className="error">Confirmação obrigatória</p>}

              <input
                placeholder="CPF"
                {...register("cpf", { required: true })}
                onChange={(e) => (e.target.value = formatCPF(e.target.value))}
              />
              {errors.cpf && <p className="error">CPF obrigatório</p>}

              <input
                placeholder="phone"
                {...register("phone", { required: true })}
                onChange={(e) => (e.target.value = formatTelefone(e.target.value))}
              />
              {errors.telefone && <p className="error">Telefone obrigatório</p>}
            </>
          )}

          <button type="submit">{isLoginMode ? "Entrar" : "Cadastrar"}</button>
        </form>

        <p>
          {isLoginMode ? "Não tem conta?" : "Já tem conta?"}{" "}
          <span className="link" onClick={() => {
            reset();
            setIsLoginMode(!isLoginMode);
          }}>
            Clique aqui
          </span>

            <span
    className="link"
    onClick={() => window.location.href = "/esqueci-senha"}
  >
    Esqueci minha senha
  </span>
        </p>

      </div>
    </div>
  );
}
