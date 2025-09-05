import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { loginSchema, registerSchema } from "../validations/auth_validation.js";

export const register = async (req, res) => {
  dotenv.config();

  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "El usuario ya existe" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
    });

    res.status(201).json({ message: "Usuario registrado y logueado", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  dotenv.config();

  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email incorrecto" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
    });

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  dotenv.config();

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
  });

  res.status(200).json({ message: "Logout exitoso" });
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    await User.findByIdAndDelete(userId);

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
    });

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar usuario", error: error.message });
  }
};

export const createGuestUser = async (req, res) => {
  dotenv.config();

  try {
    const guestUser = {
      email: `guest_${Date.now()}@gmail.com`,
      password: "guest_password",
    };

    const user = await User.create(guestUser);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // delete user after 1 hour
    setTimeout(async () => {
      try {
        req.user = user._id;
        await deleteUser(req, res);
      } catch (error) {
        console.error(`Error deleting guest user ${user._id}:`, error);
      }
    }, 60 * 60 * 1000);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
    });

    res.json({ message: "Guest account created", user });
  } catch (error) {
    console.error("Error creating guest account:", error);
    res.status(500).json({ message: "Error creating guest account", error });
  }
};
