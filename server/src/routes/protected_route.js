import express from "express";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({ message: "Ruta protegida", _id: req.user });
});

export default router;
