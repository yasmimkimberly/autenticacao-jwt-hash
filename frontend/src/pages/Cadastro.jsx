import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, User, LockKeyhole } from "lucide-react";
import { cadastrar } from "../services/api";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleCadastro(e) {
    e.preventDefault();
    setMensagem("");
    setErro("");

    if (!nome || !senha || !email) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      const response = await cadastrar(nome, email, senha);
      setMensagem(response.mensagem);
      setTimeout(() => navigate("/login"), 800);
    } catch (erro) {
      setErro(erro.message);
    }
  }

  return (
    <main className="page-shell">
      <section className="auth-card">
        <div className="brand-icon">
          <UserPlus size={28} />
        </div>
        <p className="eyebrow">NOVO ACESSO</p>
        <h1>Cadastro</h1>
        <p className="subtitle">Crie um usuário para testar a autenticação.</p>

        <form onSubmit={handleCadastro}>
          <label>
            Nome:
            <div className="input-wrap">
              <User size={18} />
              <input
                placeholder="Escolha um usuário"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </label>

          <label>
            Email:
            <div className="input-wrap">
              <User size={18} />
              <input
                type="email"
                placeholder="Escolha um usuário"
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
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </label>

          {erro && <p className="error">{erro}</p>}
          {mensagem && <p className="success-msg">{mensagem}</p>}

          <button className="primary" type="submit">
            Cadastrar
          </button>
        </form>

        <button className="secondary" onClick={() => navigate("/login")}>
          Voltar para Login
        </button>
      </section>
    </main>
  );
}
