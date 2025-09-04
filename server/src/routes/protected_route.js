import express from "express";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  console.log(req);
  res.json({
    message: "Protected route",
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});

export default router;
