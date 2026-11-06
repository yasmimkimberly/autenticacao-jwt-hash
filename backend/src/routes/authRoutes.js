import { Router } from "express";
import {
  cadastrar,
  listarUsuarios,
  login,
} from "../controllers/authController.js";
import { autenticar } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/cadastrar", cadastrar);
router.post("/login", login);
router.get("/usuarios", autenticar, listarUsuarios);
export default router;
