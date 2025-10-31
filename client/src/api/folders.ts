import { useFolderStore, type Folder } from "@/stores/global-state";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const createFolder = async (name: string) => {
  try {
    const { data } = await axios.post(
      `${BACKEND_URL}/api/folders`,
      { name: name },
      { withCredentials: true }
    );
    toast.success("Folder added");
    return data;
  } catch (error: unknown) {
    let errMsg = "Failed to create folder";

    if (isAxiosError(error)) {
      // Buscar el mensaje de error en el orden correcto
      errMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        errMsg;
    } else if (error instanceof Error) {
      errMsg = error.message || errMsg;
    } else if (typeof error === "string") {
      errMsg = error;
    }

    toast.error(errMsg);
    // IMPORTANTE: Re-lanzar el error para que onSubmit lo pueda catchear
    throw new Error(errMsg);
  }
};

export const deleteFolder = async (folderId: string) => {
  const activeFolder = useFolderStore.getState().activeFolder;
  const folders = useFolderStore.getState().folders;
  const removeFolder = useFolderStore.getState().removeFolder;
  const setActiveFolder = useFolderStore.getState().setActiveFolder;
  if (!activeFolder) return;
  try {
    const { data } = await axios.delete(
      `${BACKEND_URL}/api/folders/${folderId}`,
      { withCredentials: true }
    );
    toast.success("Folder deleted");
    setActiveFolder(folders[1]);
    removeFolder(activeFolder?._id);
    return data;
  } catch (error: unknown) {
    let errMsg = "Error al eliminar la carpeta";

    if (isAxiosError(error)) {
      errMsg = error.response?.data?.message || error.message || errMsg;
    } else if (error instanceof Error) {
      errMsg = error.message || errMsg;
    } else if (typeof error === "string") {
      errMsg = error;
    }

    toast.error(errMsg);
  }
};

export const updateFolderName = async ({
  folderId,
  updates,
}: {
  folderId: string;
  updates: Partial<Folder>;
}) => {
  const store = useFolderStore.getState();
  const prev = store.folders.find((f) => f._id === folderId);

  if (!prev) return;

  // Optimistic update
  store.updateFolderName({ ...prev, ...updates });
  store.setActiveFolder({ ...store.activeFolder!, ...updates });
  try {
    const { data } = await axios.patch(
      `${BACKEND_URL}/api/folders/${folderId}`,
      updates,
      { withCredentials: true }
    );

    // sync con backend
    store.updateFolderName(data);
    return data;
  } catch (error: unknown) {
    // rollback
    store.updateFolderName(prev);

    let errMsg = "Error updating bookmark";
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
