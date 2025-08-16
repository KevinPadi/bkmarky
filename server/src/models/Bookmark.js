import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => /^https?:\/\/.+/.test(v),
        message: "URL must start with http(s)://",
      },
    },
    favicon: {
      type: String,
      trim: true,
      default: "", // puede ser data URL o url absoluta
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isFavorite: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ userId: 1, folderId: 1, createdAt: -1 });
bookmarkSchema.index({ userId: 1, title: "text", url: "text" });

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
