import express from "express";
import { body, param, query } from "express-validator";
import { Folder } from "../models/Folder.js";
import { Bookmark } from "../models/Bookmark.js";
import mongoose from "mongoose";

const router = express.Router();

// POST: Crear folder
router.post(
  "/",
  body("name").trim().notEmpty().isLength({ max: 100 }),
  async (req, res) => {
    try {
      const errors = req.validationResult?.();
      if (errors && !errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const folder = await Folder.create({
        name: req.body.name,
        userId: req.auth().userId,
      });
      res.status(201).json(folder);
    } catch (err) {
      if (err?.code === 11000)
        return res.status(409).json({ error: "Folder name already exists" });
      res.status(500).json({ error: "Failed to create folder" });
    }
  }
);

// GET: Listar folders
router.get("/", async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.auth().userId }).sort({
      createdAt: -1,
    });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: "Failed to list folders" });
  }
});

// PATCH: Renombrar
router.patch(
  "/:id",
  param("id").isMongoId(),
  body("name").trim().notEmpty().isLength({ max: 100 }),
  async (req, res) => {
    try {
      const folder = await Folder.findOneAndUpdate(
        { _id: req.params.id, userId: req.auth().userId },
        { $set: { name: req.body.name } },
        { new: true }
      );
      if (!folder) return res.status(404).json({ error: "Folder not found" });
      res.json(folder);
    } catch (err) {
      if (err?.code === 11000)
        return res.status(409).json({ error: "Folder name already exists" });
      res.status(500).json({ error: "Failed to update folder" });
    }
  }
);

// DELETE: Eliminar folder (y sus bookmarks)
router.delete("/:id", param("id").isMongoId(), async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const folder = await Folder.findOneAndDelete(
      { _id: req.params.id, userId: req.auth().userId },
      { session }
    );
    if (!folder) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Folder not found" });
    }
    await Bookmark.deleteMany(
      { folderId: folder._id, userId: req.auth().userId },
      { session }
    );
    await session.commitTransaction();
    res.json({ ok: true });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: "Failed to delete folder" });
  } finally {
    session.endSession();
  }
});

export default router;
