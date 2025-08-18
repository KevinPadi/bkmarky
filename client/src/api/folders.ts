import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createFolder = async (name: string) => {
  try {
    const { data } = await axios.post(
      `${BACKEND_URL}/api/folders`,
      { name: name },
      { withCredentials: true }
    );
    return data;
    toast.success("Folder added");
  } catch (error: unknown) {
    let errMsg = "Error al crear la carpeta";

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
