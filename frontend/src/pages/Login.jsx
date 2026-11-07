import { useNavigate } from "react-router-dom";
import { LogIn, User, LockKeyhole } from "lucide-react";
import { login } from "../services/api";
import { useState, useEffect } from "react";

export default function Login({ setIsAuth, setUsuarioLogado }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      const response = await login(nome, email, senha);
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", JSON.stringify(response.email));
      setUsuarioLogado(response.email);
      setIsAuth(true);
      navigate("/sucesso");
    } catch (erro) {
      setErro(erro.message);
    }
  }

  return (
    <main className="page-shell">
      <section className="auth-card">
        <div className="brand-icon">
          <LogIn size={28} />
        </div>
        <p className="eyebrow">ÁREA RESTRITA</p>
        <h1>Login</h1>
        <p className="subtitle">Entre para acessar a rota protegida.</p>

        <form onSubmit={handleLogin}>
          <label>
            Nome:
            <div className="input-wrap">
              <User size={18} />
              <input
                placeholder="Digite seu usuário"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </label>
          <label>
            email:
            <div className="input-wrap">
              <User size={18} />
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          <label>
            Senha
            <div className="input-wrap">
              <LockKeyhole size={18} />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </label>

          {erro && <p className="error">{erro}</p>}

          <button className="primary" type="submit">
            Entrar
          </button>
        </form>

        <p className="switch-text">
          Não tem conta?{" "}
          <button className="link-button" onClick={() => navigate("/cadastro")}>
            Cadastre-se
          </button>
        </p>
      </section>
    </main>
  );
}
