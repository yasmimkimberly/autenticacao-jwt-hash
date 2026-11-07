import { Router } from "express";
import {
  cadastrar,
  listarUsuarios,
  login,
  me,
} from "../controllers/authController.js";
import { autenticar } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/cadastrar", cadastrar);
router.post("/login", login);
router.get("/usuarios", autenticar, listarUsuarios);
router.get("/me", autenticar, me);
export default router;
