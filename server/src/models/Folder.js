import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    bookmarksCount: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
  },
  { timestamps: true }
);

// Nombre único por usuario
folderSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Folder = mongoose.model("Folder", folderSchema);
