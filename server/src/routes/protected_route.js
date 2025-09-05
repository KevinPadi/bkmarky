import express from "express";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    message: "Protected route",
    _id: req.user.userId,
    name: req.user.name,
    email: req.user.email,
  });
});

export default router;
