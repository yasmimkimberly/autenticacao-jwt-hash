import { Router } from "express";
import {
  cadastrar,
  listarUsuarios,
  login,
} from "../controllers/authController.js";

const router = Router();
router.post("/usuarios", cadastrar);
router.post("/login", login);
router.get("/usuarios", listarUsuarios);
export default router;
