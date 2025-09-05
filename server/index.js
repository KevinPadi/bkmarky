import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import foldersRouter from "./src/routes/folders_routes.js";
import bookmarksRouter from "./src/routes/bookmarks_routes.js";
import { validationResult } from "express-validator";
import { connectDB } from "./src/db.js";
import authRoutes from "./src/routes/auth_routes.js";
import { protect } from "./middleware/auth.js";
import protectedRoute from "./src/routes/protected_route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

// Seguridad y utilidades
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

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

// Healthcheck público
app.get("/health", (_req, res) => res.json({ ok: true }));

// rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas protegidas
app.use("/api", protectedRoute); // ruta protegida
app.use("/api/folders", protect, foldersRouter);
app.use("/api/bookmarks", protect, bookmarksRouter);

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
