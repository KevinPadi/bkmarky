import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import foldersRouter from "./src/routes/folders_routes.js";
import bookmarksRouter from "./src/routes/bookmarks_routes.js";
import { validationResult } from "express-validator";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { connectDB } from "./src/db.js";

dotenv.config();

const app = express();

// Seguridad y utilidades
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
// Aplicar clerkMiddleware() a todas las rutas
app.use(clerkMiddleware());

// Rate limit básico
const limiter = rateLimit({
  windowMs: 15 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Helper para express-validator
app.use((req, _res, next) => {
  req.validationResult = validationResult.bind(null, req);
  next();
});

// Middleware de autenticación personalizado
const requireAuth = (req, res, next) => {
  const auth = getAuth(req);

  // Si el usuario no está autenticado, retornar error 401
  if (!auth.userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  return next();
};

// Healthcheck público
app.get("/health", (_req, res) => res.json({ ok: true }));

// Rutas protegidas
app.use("/api/folders", requireAuth, foldersRouter);
app.use("/api/bookmarks", requireAuth, bookmarksRouter);

const PORT = process.env.PORT || 4000;

// Arranque
(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () =>
      console.log(`🚀 API running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
})();
