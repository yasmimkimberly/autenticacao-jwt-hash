const API = "http://localhost:3000";

async function tratarResposta(response) {
  const dados = await response.json();
  if (!response.ok) {
    throw new Error(dados.mensagem || "Erro na requisição");
  }
  return dados;
}

export async function cadastrar(nome, email, senha) {
  const response = await fetch(`${API}/cadastrar`, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });
  return tratarResposta(response);
}

export async function login(nome, email, senha) {
  const response = await fetch(`${API}/login`, {
    method: "Post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });
  return tratarResposta(response);
}

export async function validarToken(token) {
  const response = await fetch(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return tratarResposta(response);
}

export async function listarUsuarios(token) {
  const response = await fetch(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return tratarResposta(response);
}
