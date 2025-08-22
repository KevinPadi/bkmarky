import { useFolderStore } from "@/stores/global-state";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import type { Bookmark } from "@/stores/global-state";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const addBookmark = async ({
  title,
  url,
  folderId,
  domain,
  favicon,
}: Omit<Bookmark, "_id" | "createdAt">) => {
  try {
    const { data } = await axios.post(
      `${BACKEND_URL}/api/bookmarks`,
      { title, url, folderId, domain, favicon },
      { withCredentials: true }
    );
    useFolderStore.getState().addBookmark(data);
    return data;
  } catch (error: unknown) {
    let errMsg = "Error adding bookmark";
    if (isAxiosError(error)) {
      errMsg = error.response?.data?.error || error.message || errMsg;
    } else if (error instanceof Error) {
      errMsg = error.message || errMsg;
    } else if (typeof error === "string") {
      errMsg = error;
    }

    toast.error(errMsg);
  }
};

export const updateBookmark = async ({
  bookmarkId,
  updates,
}: {
  bookmarkId: string;
  updates: Partial<Bookmark>;
}) => {
  try {
    const { data } = await axios.patch(
      `${BACKEND_URL}/api/bookmarks/${bookmarkId}`,
      updates,
      { withCredentials: true }
    );
    useFolderStore.getState().removeBookmark(data._id);
    useFolderStore.getState().updateBookmarkTitle(data);
    return data;
  } catch (error: unknown) {
    let errMsg = "Error adding bookmark";
    if (isAxiosError(error)) {
      errMsg = error.response?.data?.error || error.message || errMsg;
    } else if (error instanceof Error) {
      errMsg = error.message || errMsg;
    } else if (typeof error === "string") {
      errMsg = error;
    }

    toast.error(errMsg);
  }
};

// ...existing code...
export const moveBookmarkToFolder = async ({
  bookmarkId,
  newFolderId,
}: {
  bookmarkId: string;
  newFolderId: string;
}) => {
  // Optimistic update: elimina el bookmark de la UI si no pertenece a la carpeta activa
  const { activeFolder, bookmarks, removeBookmark, updateBookmarkTitle } =
    useFolderStore.getState();
  const prevBookmarks = [...bookmarks];

  // Encuentra el bookmark a mover
  const bookmarkToMove = bookmarks.find((b) => b._id === bookmarkId);
  if (bookmarkToMove) {
    // Simula el cambio en la UI
    if (
      activeFolder &&
      bookmarkToMove.folderId === activeFolder._id &&
      newFolderId !== activeFolder._id
    ) {
      removeBookmark(bookmarkId);
    }
  }

  try {
    const { data } = await axios.patch(
      `${BACKEND_URL}/api/bookmarks/${bookmarkId}`,
      { folderId: newFolderId },
      { withCredentials: true }
    );
    // Si el bookmark sigue en la carpeta activa, actualiza sus datos
    if (activeFolder && data.folderId === activeFolder._id) {
      updateBookmarkTitle(data);
    }
    return data;
  } catch (error: unknown) {
    // Si falla, revierte el cambio
    useFolderStore.getState().setBookmarks(prevBookmarks);

    let errMsg = "Error moving bookmark";
    if (isAxiosError(error)) {
      errMsg = error.response?.data?.error || error.message || errMsg;
    } else if (error instanceof Error) {
      errMsg = error.message || errMsg;
    } else if (typeof error === "string") {
      errMsg = error;
    }
    toast.error(errMsg);
  }
};

export const deleteBookmark = async (bookmarkId: string) => {
  const { removeBookmark, bookmarks } = useFolderStore.getState();
  const prevBookmarks = [...bookmarks];

  // Optimistic UI: remove immediately
  removeBookmark(bookmarkId);

  try {
    await axios.delete(`${BACKEND_URL}/api/bookmarks/${bookmarkId}`, {
      withCredentials: true,
    });
    return true;
  } catch (error: unknown) {
    // Rollback if error
    useFolderStore.getState().setBookmarks(prevBookmarks);

    let errMsg = "Error deleting bookmark";
    if (isAxiosError(error)) {
      errMsg = error.response?.data?.error || error.message || errMsg;
    } else if (error instanceof Error) {
      errMsg = error.message || errMsg;
    } else if (typeof error === "string") {
      errMsg = error;
    }
    toast.error(errMsg);
    return false;
  }
};
