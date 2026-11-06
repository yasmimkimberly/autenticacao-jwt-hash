import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!email || !senha || !nome) {
      return res.status(400).json({
        mensagem: "Email e senha são obrigatórios",
      });
    }

    if (senha.length < 4) {
      return res.status(400).json({
        mensagem: "A senha deve ter pelo menos 4 caracteres",
      });
    }

    const { rows: existentes } = await pool.query(
      "SELECT id FROM usuarios WHERE email = $1 LIMIT 1",
      [email],
    );

    if (existentes.length > 0) {
      return res.status(409).json({
        mensagem: "Usuário já cadastrado",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const { rows } = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id,nome,  email",
      [nome, email, senhaHash],
    );

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      usuario: rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensagem: "Erro ao cadastrar usuário",
    });
  }
}
