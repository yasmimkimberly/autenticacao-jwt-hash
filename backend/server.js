import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./src/routes/authRoutes.js";
import { pool } from "./src/config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5176" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API de autenticação funcionando" });
});

app.use(authRoutes);

async function iniciar() {
  try {
    const client = await pool.connect();
    console.log("Banco de dados conectado com sucesso");
    client.release();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error("Erro ao conectar no PostgreSQL:", erro.message);
    process.exit(1);
  }
}

iniciar();
