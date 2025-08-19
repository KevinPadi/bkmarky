import express from "express";
import { body, param, query } from "express-validator";
import { Bookmark } from "../models/Bookmark.js";
import { Folder } from "../models/Folder.js";
import mongoose from "mongoose";

const router = express.Router();

// Crear bookmark
router.post(
  "/",
  body("folderId").isMongoId(),
  body("title").trim().notEmpty().isLength({ max: 100 }),
  body("url").trim().notEmpty().isURL({ require_protocol: true }),
  body("favicon").optional().isString().isLength({ max: 5000 }),
  body("domain").trim().notEmpty().isLength({ max: 200 }),
  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { folderId, title, url, favicon, domain = "" } = req.body;

      const folder = await Folder.findOne({
        _id: folderId,
        userId: req.auth().userId,
      });
      if (!folder) {
        await session.abortTransaction();
        return res.status(404).json({ error: "Folder not found" });
      }

      const created = await Bookmark.create(
        [
          {
            userId: req.auth().userId,
            folderId,
            title,
            url,
            favicon,
            domain,
          },
        ],
        { session }
      );

      await Folder.updateOne(
        { _id: folderId, userId: req.auth().userId },
        { $inc: { bookmarksCount: 1 } },
        { session }
      );

      await session.commitTransaction();
      res.status(201).json(created[0]);
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      res.status(500).json({ error: "Failed to create bookmark" });
    } finally {
      session.endSession();
    }
  }
);

// Listar bookmarks con filtros
router.get(
  "/",
  query("page").optional().toInt().isInt({ min: 1 }),
  query("limit").optional().toInt().isInt({ min: 1, max: 100 }),
  query("folderId").optional().isMongoId(),
  query("search").optional().isString(),
  query("sortBy").optional().isIn(["createdAt", "title"]),
  query("sortOrder").optional().isIn(["asc", "desc"]),
  async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      const filter = { userId: req.auth().userId };
      if (req.query.folderId) filter.folderId = req.query.folderId;
      if (req.query.search) {
        filter.$text = { $search: String(req.query.search) };
      }

      const sortField = req.query.sortBy || "createdAt";
      const sortOrder = (req.query.sortOrder || "desc") === "asc" ? 1 : -1;
      const sort = { [sortField]: sortOrder };

      const [items, total] = await Promise.all([
        Bookmark.find(filter).sort(sort).skip(skip).limit(limit),
        Bookmark.countDocuments(filter),
      ]);

      res.json({ items, page, limit, total });
    } catch (err) {
      res.status(500).json({ error: "Failed to list bookmarks" });
    }
  }
);

// Actualizar bookmark (mover de folder mantiene conteo)
router.patch(
  "/:id",
  param("id").isMongoId(),
  body("title").optional().trim().notEmpty().isLength({ max: 200 }),
  body("url").optional().trim().isURL({ require_protocol: true }),
  body("favicon").optional().isString().isLength({ max: 5000 }),
  body("folderId").optional().isMongoId(),
  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const id = req.params.id;
      const existing = await Bookmark.findOne({
        _id: id,
        userId: req.auth().userId,
      });
      if (!existing) {
        await session.abortTransaction();
        return res.status(404).json({ error: "Bookmark not found" });
      }

      const updates = { ...req.body };
      const movingFolder =
        updates.folderId &&
        String(updates.folderId) !== String(existing.folderId);

      const updated = await Bookmark.findOneAndUpdate(
        { _id: id, userId: req.auth().userId },
        { $set: updates },
        { new: true, session }
      );

      if (movingFolder) {
        // Ajustar contadores
        await Folder.updateOne(
          { _id: existing.folderId, userId: req.auth().userId },
          { $inc: { bookmarksCount: -1 } },
          { session }
        );
        await Folder.updateOne(
          { _id: updated.folderId, userId: req.auth().userId },
          { $inc: { bookmarksCount: 1 } },
          { session }
        );
      }

      await session.commitTransaction();
      res.json(updated);
    } catch (err) {
      await session.abortTransaction();
      res.status(500).json({ error: "Failed to update bookmark" });
    } finally {
      session.endSession();
    }
  }
);

// Eliminar bookmark
router.delete("/:id", param("id").isMongoId(), async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const doc = await Bookmark.findOneAndDelete(
      { _id: req.params.id, userId: req.auth().userId },
      { session }
    );
    if (!doc) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Bookmark not found" });
    }
    await Folder.updateOne(
      { _id: doc.folderId, userId: req.auth().userId },
      { $inc: { bookmarksCount: -1 } },
      { session }
    );
    await session.commitTransaction();
    res.json({ ok: true });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: "Failed to delete bookmark" });
  } finally {
    session.endSession();
  }
});

export default router;
