import express from "express";

import { protect } from "../../middleware/auth.js";
import {
  login,
  register,
  createGuestUser,
  deleteUser,
  logout,
} from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/loginGuest", createGuestUser);
router.post("/logout", logout);
router.delete("/delete", protect, deleteUser);

export default router;
